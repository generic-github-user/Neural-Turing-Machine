// Set up canvas
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");
// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.width = window.innerHeight;

// Map one range of numbers to another, given an input value and the two ranges
// https://stackoverflow.com/a/23202637
const map = function(num, in_min, in_max, out_min, out_max) {
      return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const display = function() {
      // Get values from NTM memory
      var memory = ntm.memory.dataSync();
      // Find minimum and maximum values of memory for range mapping
      var min = Math.min(...memory);
      var max = Math.max(...memory);
      // Find width of one block
      var width = canvas.width / memory.length;
      // Loop through all memory cells
      for (var i = 0; i < memory.length; i++) {
            // Map value of memory cell to range of values
            var hue = map(memory[i], min, max, 250, 300);
            // Set color of cell based on value
            ctx.fillStyle = "hsla(" + hue + ", 100%, 50%, 1)";
            // Fill in block to represent memory cell
            ctx.fillRect(
                  // x
                  width * i,
                  // y
                  0,
                  width,
                  canvas.height
            );
      }
}