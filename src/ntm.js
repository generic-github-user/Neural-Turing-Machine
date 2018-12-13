// const ntm = class {
//       constructor(config) {
//             this.data = new Array(128);
//       }
// }

const ntm = {};

ntm.memory = tf.variable(
      tf.zeros(memory_shape),
      false
);

ntm.set_values = function(inputs, multiplier, confirm) {
      // ntm = ntm.mul(tf.tensor([
      //       [0, 1],
      //       [1, 0]
      // ]));
      // inputs.flatten().slice([0], [2]).print()
      var new_state = tf.tensor([1]);
      for (var i = 0; i < inputs.size / 2; i++) {
            new_state = tf.outerProduct(new_state, inputs.flatten().slice([i], [2])).flatten();
      }

      new_state = new_state.reshape(memory_shape).mul(multiplier);
      ntm.memory.assign(
            tf.add(
                  tf.mul(
                        ntm.memory,
                        tf.sub(tf.scalar(1), confirm)
                  ),
                  tf.mul(
                        new_state,
                        confirm
                  )
            )
      );
}