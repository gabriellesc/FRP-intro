# An Introduction to Functional Reactive Programming
### CSC302H1 (Winter 2018), University of Toronto

| Slides available [here](https://docs.google.com/presentation/d/e/2PACX-1vQ06TaoEe3o9Xu7FluNigjqaKwXreoPj4xYgZ-ZCAw4cXlMSPpEqAH0re11eP2_uzw7N_hpEZ33gWsG/pub?start=false&loop=false&delayms=3000). |
| ------------- |


## Demos
- [FRP-GOL-init](FRP-GOL-init)
  - A very simple FRP JS implementation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life).
  - Uses [Bacon.js](https://github.com/baconjs/bacon.js) and React.js.
  - Modeled directly on the Haskell FRP Game of Life from Tikhon Jelvis' talk, [A Sensible Intro to FRP](https://begriffs.com/posts/2016-07-27-tikhon-on-frp.html).
  - Responds to regular ticks, cell clicks, and pausing/unpausing.

- [FRP-GOL-testable](FRP-GOL-testable)
  - A slightly more complex FRP JS implementation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life), which is structured for improved testability over [FRP-GOL-init](FRP-GOL-init).
  - Uses [Bacon.js](https://github.com/baconjs/bacon.js) and React.js.
  - Responds to regular ticks, cell clicks, and pausing/unpausing.

- [non-FRP-GOL](non-FRP-GOL)
  - A JS implementation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life), which does *not* use FRP principles.
  - Uses React.js.
  - Responds to regular ticks, cell clicks, and pausing/unpausing.

## Demo Contents
- [FRP-GOL-init](FRP-GOL-init) / [FRP-GOL-testable](FRP-GOL-testable) / [non-FRP-GOL](non-FRP-GOL)
  - **app.js**  
  Game of Life logic (world update functions, etc.)
  - **bundle.js**  
  bundled code produced by the compiler
  - **grid.js**  
  React grid component
  - **index.html**  
  main HTML page
  - **index.js**  
  main app logic, combining the Game of Life logic, React grid component, and app interaction implementation
  - **patternsDict.js**  
  dictionary of Game of Life patterns

## How to use it
To run any of the demos, simply download its main directory and open index.html.

To modify any of the demos, start by running `npm install` inside its main directory to install the required node.js modules.  
Build a demo after modifying it by running `npm run build` inside its main directory, or run `npm run watch` to automatically re-build the demo each time it is modified.

Some modifications may require additional Babel plugins to be installed (see http://babeljs.io/docs/plugins).

## License
Licensed under the MIT License. See [LICENSE](LICENSE) for more information.
