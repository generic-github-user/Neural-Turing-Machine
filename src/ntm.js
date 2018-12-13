// ntm.js
// Functions for interacting with the memory system of the Neural Turing Machine

// const ntm = class {
//       constructor(config) {
//             this.data = new Array(128);
//       }
// }

const ntm = {};

// Create mutable tensor to store data for NTM memory
ntm.memory = tf.variable(
      // Initialize memory with zero values in all cells
      tf.zeros(memory_shape),
      // Do not allow optimizers to directly alter the memory values
      false
);

// Set values of memory system for Neural Turing Machine
ntm.set_values = function(inputs, multiplier, confirm) {
      // ntm = ntm.mul(tf.tensor([
      //       [0, 1],
      //       [1, 0]
      // ]));
      // inputs.flatten().slice([0], [2]).print()
      var new_state = tf.tensor([1]);
      // Cycle through each pair of write head nodes
      for (var i = 0; i < inputs.size / 2; i++) {
            // Compute product of all memory inputs
            new_state = tf.outerProduct(new_state, inputs.flatten().slice([i], [2])).flatten();
      }
      new_state = new_state
            // Shape updated memory value tensor to match NTM memory
            .reshape(memory_shape)
            // Multiply by multiplier node value
            .mul(multiplier);

      // Update memory of NTM with new values
      ntm.memory.assign(
            // Compute weighted average of current values and new values based on confirm value
            tf.add(
                  tf.mul(
                        // Current state of NTM memory
                        ntm.memory,
                        tf.sub(tf.scalar(1), confirm)
                  ),
                  tf.mul(
                        // Updated state based on output of controller network
                        new_state,
                        confirm
                  )
            )
      );
}