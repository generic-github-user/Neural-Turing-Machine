// ntm.js
// Functions for interacting with the memory system of the Neural Turing Machine

// const ntm = class {
//       constructor(config) {
//             this.data = new Array(128);
//       }
// }

const ntm = {};

// Create mutable tensor to store data for NTM memory
ntm.memory = tf.zeros(memory_shape);

ntm.reset = function() {
      ntm.memory = tf.zeros(memory_shape);
}

ntm.form = function(values, multiplier) {
      // const result = tf.variable(
      //       tf.tensor([1]),
      //       false
      // );
      var result = tf.tensor([1]);
      // Cycle through each pair of write head nodes
      for (var i = 0; i < values.size; i += 2) {
            // Compute product of all memory inputs
            result = tf.outerProduct(
                        result,
                        values.flatten().slice([i], [2])
                  )
                  .flatten();
      }
      result = result
            // Shape updated memory value tensor to match NTM memory
            .reshape(memory_shape)
            // Multiply by multiplier node value
            .mul(multiplier);

      return result;
}

ntm.read = function(inputs, multiplier) {
      return ntm.memory.mul(
            ntm.form(inputs, multiplier)
      ).mean();
}

// Set values of memory system for Neural Turing Machine using write head input values, global multiplier, and a confirmation value
ntm.write = function(inputs, multiplier, confirm) {
      // ntm = ntm.mul(tf.tensor([
      //       [0, 1],
      //       [1, 0]
      // ]));
      // inputs.flatten().slice([0], [2]).print()
      const new_state = ntm.form(inputs, multiplier);

      // Update memory of NTM with new values
      ntm.memory =
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
            );
}