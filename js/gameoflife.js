function seed() {
  return Array.prototype.slice.call(arguments);
}
/*
The arguments object is not an Array. 
It is similar, but lacks all Array properties except length.
However, it can be converted to a real Array:
var args = Array.prototype.slice.call(arguments);
// Using an array literal is shorter than above but allocates an empty array
var args = [].slice.call(arguments);
let args = Array.from(arguments);
// or
let args = [...arguments];
*/

function same([x, y], [j, k]) {
  return x === j && y === k;
}
/*check if x axis is equal and y axis is equal 
then return a boolean indicating two 'cells' are the same*/

// The game state to search for `cell` is passed as the `this` value of the function.
function contains(cell) {
  return this.some((c) => same(c, cell))
}

/*test if the cell is alive in the past game state 
using the some() to test if the game state contains a cell that is the same as the past cell*/

const printCell = (cell, state) => {
  return contains.call(state, cell) ? "\u25A3": "\u25A2";
};

/*printCell return a string representation of a cell state, 
use a ternary operator to check if game state contains the cell and return 
the unicode character for a white square with small black square 
and if otherwise returns unicode char white square with rounded corners*/

const corners = (state = []) => {
  if (state.length === 0) {
    return {
      topRight: [0,0],
      bottomLeft: [0,0]
    }
  }

  const xs = state.map(([x, _]) => x);
  const ys = state.map(([_, y]) => y);
  return {
    topRight: [Math.max(...xs), Math.max(...ys)],
    bottomLeft: [Math.min(...xs), Math.min(...ys)]
  }
};

/*function corners calculates the top-right and bottom-left coordinates of 
the smallest rectangle that contains all living cells anf if no argument is passed, 
the argument should default to an empty game state ([]) using a default parameter*/

const printCells = (state) => {
  const { bottomLeft, topRight } = corners(state);
  //calculate the corners
  let accumulator = "";
  //loop throught grid rows from top to bottom
  for (let y = topRight[1]; y y >= bottomLeft[1]; y--) {
    let row = [];
    //for each row loop through grid columns from left to right
    for (let x = bottomLeft[0]; x <= topRight[0]; x++) {
      //convert each cell to a string using printCell function
      row.push(printCell([x,y], state));
    }
    //print each row and add it to the accumulaotr variable
    accumulator += row.join(" ") + "\n";
  }
  //then return the accumulator
  return accumulator;
};

/*uses the printCell and corners functions completed previously 
to build a string representation of the game state ... */

const getNeighborsOf = ([x, y]) => {};

const getLivingNeighbors = (cell, state) => {};

const willBeAlive = (cell, state) => {};

const calculateNext = (state) => {};

const iterate = (state, iterations) => {};

const main = (pattern, iterations) => {};

const startPatterns = {
    rpentomino: [
      [3, 2],
      [2, 3],
      [3, 3],
      [3, 4],
      [4, 4]
    ],
    glider: [
      [-2, -2],
      [-1, -2],
      [-2, -1],
      [-1, -1],
      [1, 1],
      [2, 1],
      [3, 1],
      [3, 2],
      [2, 3]
    ],
    square: [
      [1, 1],
      [2, 1],
      [1, 2],
      [2, 2]
    ]
  };
  
  const [pattern, iterations] = process.argv.slice(2);
  const runAsScript = require.main === module;
  
  if (runAsScript) {
    if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
      main(pattern, parseInt(iterations));
    } else {
      console.log("Usage: node js/gameoflife.js rpentomino 50");
    }
  }
  
  exports.seed = seed;
  exports.same = same;
  exports.contains = contains;
  exports.getNeighborsOf = getNeighborsOf;
  exports.getLivingNeighbors = getLivingNeighbors;
  exports.willBeAlive = willBeAlive;
  exports.corners = corners;
  exports.calculateNext = calculateNext;
  exports.printCell = printCell;
  exports.printCells = printCells;
  exports.startPatterns = startPatterns;
  exports.iterate = iterate;
  exports.main = main;