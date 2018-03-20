import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Bacon from 'baconjs';

import { patterns } from './patternsDict.js'; /* pre-defined GOL patterns */

import Grid from './grid.js'; /* display component */
import { updateWorld, toggleCell } from './app.js'; /* main app logic */

const HEIGHT = 40;
const WIDTH = 40;
const TICK = 1000; /* tick interval in ms */

/* initial empty state of the world */
let initialWorld = Array(HEIGHT * WIDTH).fill(false);

/* draw the named pattern in the world at (originX, originY) */
function drawPattern(world, patternName, originX, originY) {
    let pattern = patterns[[patternName]];

    /* make a copy of world to modify */
    let newWorld = world.slice();

    /* update each cell according to the pattern */
    let x, y;
    for (y = 0; y < pattern.length; y++) {
        for (x = 0; x < pattern[0].length; x++) {
            /* check that we are still within the bounds of the world */
            if (originY + y < HEIGHT && originX + x < WIDTH) {
                newWorld[(originY + y) * WIDTH + originX + x] = pattern[y][x] == 1;
            }
        }
    }

    return newWorld;
}

/* add a beacon at (20,20) */
initialWorld = drawPattern(initialWorld, 'SPARKY', 5, 5);

/* wrap update functions to include HEIGHT and WIDTH as defined here */
const myUpdateWorld = world => updateWorld(world, HEIGHT, WIDTH);
const myToggleCell = (world, x, y) => toggleCell(world, x, y, HEIGHT, WIDTH);

/* attach the display component to the DOM */
document.addEventListener('DOMContentLoaded', () => {
    let root = document.getElementById('root');
    /* display the initial state of the world */
    ReactDOM.render(<Grid world={initialWorld} height={HEIGHT} width={WIDTH} />, root);

    /* create a stream of click events on the grid, where each event corresponds
       to a new myToggleCell closure
       we assume we are passed the coordinates of the cell that was clicked
       in event.target.dataset */
    let clickStream = Bacon.fromEvent(root, 'click').map(event => world =>
        myToggleCell(world, parseInt(event.target.dataset.x), parseInt(event.target.dataset.y))
    );

    /* create a stream of pause events, and reduce it so that each successive reduced
       value corresponds to whether we are currently active (not paused)
       intially, we are not paused */
    let activeStream = Bacon.fromEvent(document.getElementById('pause-btn'), 'click').scan(
        true,
        (prevState, _) => !prevState
    );

    /* create a stream of tick events, where each event corresponds to a new 
       myUpdateWorld closure */
    let tickStream = Bacon.interval(TICK, myUpdateWorld);

    /* filter the tick stream events so that there are no ticks when we are paused 
       (i.e. filter out ticks that occur when we are not active) */
    tickStream = tickStream.filter(activeStream);

    /* combine the event streams into a single stream */
    let eventStream = Bacon.mergeAll(clickStream, tickStream);

    /* reduce the event stream by composing updateWorldFunc, with initialWorld
       as the initial value passed to updateWorldFunc */
    eventStream
        .scan(initialWorld, (oldWorld, updateWorldFunc) => updateWorldFunc(oldWorld))
        /* update the display grid each time a new world is produced */
        .onValue(world => {
            ReactDOM.render(<Grid world={world} height={HEIGHT} width={WIDTH} />, root);
        });
});
