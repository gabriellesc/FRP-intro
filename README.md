# An Introduction to Functional Reactive Programming

**For Mathew Zaleski's CSC302 (*Software Engineering Large Systems*) course at the University of Toronto, I created and delivered a set of lectures on Functional Reactive Programming.**

The lecture slides are available [here](https://docs.google.com/presentation/d/e/2PACX-1vQ06TaoEe3o9Xu7FluNigjqaKwXreoPj4xYgZ-ZCAw4cXlMSPpEqAH0re11eP2_uzw7N_hpEZ33gWsG/pub?start=false&loop=false&delayms=3000). 
This repo contains the complete code for the demos discussed in the slides.

The [content below](#getting-started-with-functional-reactive-programming) is intended to be a tutorial version of the lectures.

---

## Demos
All demos use React.js, and all FRP demos use <a href="https://github.com/baconjs/bacon.js">Bacon.js</a>.


<table>
  <tbody>
    <tr><td><a href="https://github.com/gabriellesc/FRP-intro/tree/master/FRP-GOL-init">FRP-GOL-init</a></td>
    <td>
      A very simple interactive FRP JS implementation of <a href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life">Conway's Game of Life</a>.<br />
      Modeled directly on the Haskell FRP Game of Life from Tikhon Jelvis' talk, <a href="https://begriffs.com/posts/2016-07-27-tikhon-on-frp.html">A Sensible Intro to FRP</a>.
    </td></tr>
    <tr><td><a href="https://github.com/gabriellesc/FRP-intro/tree/master/FRP-GOL-testable">FRP-GOL-testable</a></td>
    <td>
      A slightly more complex interactive FRP JS implementation of <a href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life">Conway's Game of Life</a> <b>(structured for improved testability over <a href="https://github.com/gabriellesc/FRP-intro/tree/master/FRP-GOL-init">FRP-GOL-init</a>)</b>.
    </td></tr>            
    <tr><td><a href="https://github.com/gabriellesc/FRP-intro/tree/master/non-FRP-GOL">non-FRP-GOL</a></td>
    <td>
      An interactive JS implementation of <a href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life">Conway's Game of Life</a> <b>(without using FRP principles)</b>.
    </td></tr>   
    <tr><td><a href="https://github.com/gabriellesc/FRP-intro/tree/master/FRP-twitter">FRP-twitter</a></td>
      <td /></tr>
  </tbody>
</table>

### [FRP-GOL-init](FRP-GOL-init) / [FRP-GOL-testable](FRP-GOL-testable) / [non-FRP-GOL](non-FRP-GOL) contents
<dl>
  <dt>app.js</dt><dd>Game of Life logic (world update functions, etc.)</dd>  
  <dt>bundle.js</dt><dd>bundled code produced by the compiler</dd>  
  <dt>grid.js</dt><dd>React grid component</dd>  
  <dt>index.html</dt><dd>main HTML page</dd>  
  <dt>index.js</dt><dd>main app logic, combining the Game of Life logic, React grid component, and app interaction implementation</dd>  
  <dt>patternsDict.js</dt><dd>dictionary of Game of Life patterns</dd>  
</dl>
        
### [FRP-twitter](FRP-twitter) contents


## How to use this code
**Each demo is live:**

| Demo                                 | Running at |
| :----------------------------------: | ---------- |
| [FRP-GOL-init](FRP-GOL-init)         | [gabriellesc.github.io/FRP-intro/FRP-GOL-init/](https://gabriellesc.github.io/FRP-intro/FRP-GOL-init) |
| [FRP-GOL-testable](FRP-GOL-testable) | [gabriellesc.github.io/FRP-intro/FRP-GOL-testable/](https://gabriellesc.github.io/FRP-intro/FRP-GOL-testable) |
| [non-FRP-GOL](non-FRP-GOL)           | [gabriellesc.github.io/FRP-intro/non-FRP-GOL/](https://gabriellesc.github.io/FRP-intro/non-FRP-GOL) |
| [FRP-twitter](FRP-twitter)           | [gabriellesc.github.io/FRP-intro/FRP-twitter/](https://gabriellesc.github.io/FRP-intro/FRP-twitter) |

To run any of the demos locally, simply download its main directory and open index.html.

To modify any of the demos, start by running `npm install` inside its main directory to install the required Node.js modules.  
Build a demo after modifying it by running `npm run build` inside its main directory, or run `npm run watch` to automatically re-build the demo each time it is modified.

Some modifications may require additional Babel plugins to be installed (see [http://babeljs.io/docs/plugins](http://babeljs.io/docs/plugins)).


## Getting Started With Functional Reactive Programming



## License
Licensed under the MIT License. See [LICENSE](LICENSE) for more information.
