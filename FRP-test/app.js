/* check whether the cell at these indices exists and is alive */
function isAlive(x, y, world, height, width) {
    return x >= 0 && y >= 0 && x < width && y < height && world[y * width + x];
}

/* return an int that represents the number of live neighbours around this cell */
function getNumLiveNeighbours(x, y, world, height, width) {
    let total = 0;

    // cell has neighbour(s) below
    total += isAlive(x, y + 1, world, height, width);

    // cell has neighbour below left
    total += isAlive(x - 1, y + 1, world, height, width);

    // cell has neighbour below right
    total += isAlive(x + 1, y + 1, world, height, width);

    // cell has neighbour(s) above
    total += isAlive(x, y - 1, world, height, width);

    // cell has neighbour above left
    total += isAlive(x - 1, y - 1, world, height, width);

    // cell has neighbour above right
    total += isAlive(x + 1, y - 1, world, height, width);

    // cell has neighbour(s) left
    total += isAlive(x - 1, y, world, height, width);

    // cell has neighbour(s) right
    total += isAlive(x + 1, y, world, height, width);

    return total;
}

/* return the state of the cell in the current world according to the following rules:
     * - any live cell with fewer than two live neighbours in the most 
     * recent environment state dies, as if caused by under-population
     * - any live cell with more than three live neighbours in the most 
     * recent environment state dies, as if by overcrowding
     * - any dead cell with exactly three live neighbours in the most 
     * recent environment state becomes a live cell, as if by reproduction
     */
function updateCellState(x, y, world, height, width) {
    /* find the number of live neighbours of the cell */
    let numLiveNeighbours = getNumLiveNeighbours(x, y, world, height, width);

    /* return the new state of the cell if it is changing */
    if (numLiveNeighbours < 2 || numLiveNeighbours > 3) {
        return false;
    } else if (numLiveNeighbours == 3) {
        return true;
    }

    /* otherwise, return the same state of the cell */
    return world[y * width + x];
}

/* return the updated state of all cells based on the previous state of the world */
function updateWorld(world, height, width) {
    /* make a copy of world to modify */
    let newWorld = world.slice();

    /* update each cell */
    let x, y;
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            newWorld[y * width + x] = updateCellState(x, y, world, height, width);
        }
    }

    return newWorld;
}

/* return the world with the (x, y) cell state toggled */
function toggleCell(world, x, y, height, width) {
    /* make a copy of world to modify */
    let newWorld = world.slice();
    newWorld[y * width + x] = !world[y * width + x];
    return newWorld;
}

export { updateWorld, toggleCell };
