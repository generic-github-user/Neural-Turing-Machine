// data.js
// Training data for Neural Turing Machine

"use strict";

// Training data
const data = {
      // Size of all timesteps must match
      "input": tf.tensor([
            [1],
            [2],
            [0],
            [0],
      ]),
      "output": tf.tensor([
            [0],
            [0],
            [1],
            [2],
      ])
};