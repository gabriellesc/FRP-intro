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

/* add an initial pattern */
initialWorld = drawPattern(initialWorld, 'SPARKY', 5, 5);

/* wrap update functions to include HEIGHT and WIDTH as defined here */
const myUpdateWorld = world => updateWorld(world, HEIGHT, WIDTH);
const myToggleCell = (world, x, y) => toggleCell(world, x, y, HEIGHT, WIDTH);

/* create event type constants */
const PAUSE_CLICK_EVENT = 1;
const CELL_CLICK_EVENT = 2;
const TICK_EVENT = 3;

/* our main event processing + rendering function, which can be called with a mocked
   event stream for testing purposes
   eventStream is expected to be a combined single stream of tick, click, and/or
   pause events, with an appropriate 'myType' attribute indicating the event type */

function main(initialWorld, eventStream) {
    let root = document.getElementById('root');
    /* display the initial state of the world */
    ReactDOM.render(<Grid world={initialWorld} height={HEIGHT} width={WIDTH} />, root);

    eventStream
        /* add a boolean 'active' attribute to each event, computed from the preceding 
	   pause events */
        .scan({ active: true }, (prevEvent, event) =>
            Object.assign(event, {
                active: event.myType == PAUSE_CLICK_EVENT ? !prevEvent.active : prevEvent.active,
            })
        )
        /* remove the pause events, and the tick events that are "not active" */
        .filter(
            event =>
                event.myType == CELL_CLICK_EVENT || (event.myType == TICK_EVENT && event.active)
        )
        /* map each event to the appropriate function closure which updates the world */
        .map(event => {
            switch (event.myType) {
                case TICK_EVENT:
                    return myUpdateWorld;
                case CELL_CLICK_EVENT:
                    return world =>
                        myToggleCell(
                            world,
                            parseInt(event.target.dataset.x),
                            parseInt(event.target.dataset.y)
                        );
            }
        })
        /* reduce the event stream by composing updateWorldFunc, with initialWorld
	   as the initial value passed to updateWorldFunc */
        .scan(initialWorld, (oldWorld, updateWorldFunc) => updateWorldFunc(oldWorld))
        /* update the display grid each time a new world is produced */
        .onValue(world =>
            ReactDOM.render(<Grid world={world} height={HEIGHT} width={WIDTH} />, root)
        );
}

/* attach the display component to the DOM */
document.addEventListener('DOMContentLoaded', () => {
    let root = document.getElementById('root');

    /* create streams for each type of event, and add an appropriate 'myType' 
       attribute to each event */

    let clickStream = Bacon.fromEvent(root, 'click').map(event =>
        Object.assign(event, { myType: CELL_CLICK_EVENT })
    );

    let activeStream = Bacon.fromEvent(document.getElementById('pause-btn'), 'click').map(event =>
        Object.assign(event, { myType: PAUSE_CLICK_EVENT })
    );

    let tickStream = Bacon.interval(TICK, { myType: TICK_EVENT });

    /* combine the event streams into a single stream */
    let eventStream = Bacon.mergeAll(clickStream, activeStream, tickStream);

    main(initialWorld, eventStream);
});
