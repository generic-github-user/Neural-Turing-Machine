// settings.js
// Settings for Neural Turing Machine and memory system

var dimensions = 3;
var memory_shape = new Array(dimensions).fill(2);
var rwhl = 2 * dimensions;
var output_size = rwhl + 1 + rwhl + 2 + data.input.shape[1];