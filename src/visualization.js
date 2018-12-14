var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;

// Map one range of numbers to another, given an input value and the two ranges
// https://stackoverflow.com/a/23202637
const map = function(num, in_min, in_max, out_min, out_max) {
      return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const display = function() {
      var memory = ntm.memory.dataSync();
      var min = Math.min(...memory);
      var max = Math.max(...memory);
      var width = canvas.width / memory.length;
      for (var i = 0; i < memory.length; i++) {
            var hue = map(memory[i], min, max, 250, 300);
            ctx.fillStyle = "hsla(" + hue + ", 100%, 50%, 1)";
            ctx.fillRect(
                  width * i,
                  0,
                  width,
                  canvas.height
            );
      }
}