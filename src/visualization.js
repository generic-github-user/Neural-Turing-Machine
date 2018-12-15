// Set up canvas
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");
// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Map one range of numbers to another, given an input value and the two ranges
// https://stackoverflow.com/a/23202637
const map = function(num, in_min, in_max, out_min, out_max) {
      return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const display = function() {
      // Find width of one block
      var width = canvas.width / memory[0].length;
      var height = canvas.height / memory.length;
      // https://stackoverflow.com/a/39342975
      var minRow = memory.map(function(row) {
            return Math.min.apply(Math, row);
      });
      var maxRow = memory.map(function(row) {
            return Math.max.apply(Math, row);
      });
      // Find minimum and maximum values of memory for range mapping
      var min = Math.min(...minRow);
      var max = Math.max(...maxRow);
      // Loop through all memory cells
      for (var i = 0; i < memory.length; i++) {
            // Loop through all memory cells
            for (var j = 0; j < memory[i].length; j++) {
                  // Map value of memory cell to range of values
                  var hue = map(memory[i][j], min, max, 250, 300);
                  // Set color of cell based on value
                  ctx.fillStyle = "hsla(" + hue + ", 100%, 50%, 1)";
                  // Fill in block to represent memory cell
                  ctx.fillRect(
                        // x
                        width * j,
                        // y
                        height * i,
                        width,
                        height
                  );
            }
      }
}