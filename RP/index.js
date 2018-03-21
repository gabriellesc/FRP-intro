import React from 'react';
import ReactDOM from 'react-dom';

import { patterns } from './patternsDict.js'; /* pre-defined GOL patterns */

import Grid from './grid.js'; /* display component */
import { updateWorld, toggleCell } from './app.js'; /* main app logic */

const HEIGHT = 40;
const WIDTH = 40;
const TICK = 1000; /* tick interval in ms */

/* state of the world (initially empty) */
let worldState = Array(HEIGHT * WIDTH).fill(false);

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

/* add an initial pattern */
worldState = drawPattern(worldState, 'SPARKY', 5, 5);

/* whether we are currently active (not paused); initially, we are active */
let activeState = true;

/* wrap update functions to update worldState and to include HEIGHT and WIDTH as defined here */
const myUpdateWorld = world => updateWorld(world, HEIGHT, WIDTH);
const myToggleCell = (world, x, y) => toggleCell(world, x, y, HEIGHT, WIDTH);

/* attach the display component to the DOM */
document.addEventListener('DOMContentLoaded', () => {
    let root = document.getElementById('root');
    /* display the initial state of the world */
    ReactDOM.render(<Grid world={worldState} height={HEIGHT} width={WIDTH} />, root);

    /* add a click handler to the pause button which toggles activeState */
    document
        .getElementById('pause-btn')
        .addEventListener('click', () => (activeState = !activeState));

    /* add a click handler to the root, which receives clicks bubbling up from the cells,
       which triggers a state update
       we assume we are passed the coordinates of the cell that was clicked
       in event.target.dataset */
    root.addEventListener('click', event => {
        worldState = myToggleCell(
            worldState,
            parseInt(event.target.dataset.x),
            parseInt(event.target.dataset.y)
        );
        ReactDOM.render(<Grid world={worldState} height={HEIGHT} width={WIDTH} />, root);
    });

    /* set an interval (tick) on which to update, if we are currently active */
    setInterval(() => {
        if (activeState) {
            worldState = myUpdateWorld(worldState);
            ReactDOM.render(<Grid world={worldState} height={HEIGHT} width={WIDTH} />, root);
        }
    }, TICK);
});
