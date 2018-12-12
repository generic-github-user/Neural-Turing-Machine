var ntm = tf.ones([2, 2, 2, 2]);

const set_values = function(inputs, multiplier, confirm) {
      // ntm = ntm.mul(tf.tensor([
      //       [0, 1],
      //       [1, 0]
      // ]));
      const new_state = ntm.mul(inputs).mul(multiplier);
      return tf.add(
            tf.mul(
                  new_state,
                  tf.sub(tf.scalar(1), confirm)
            ),
            tf.mul(
                  new_state,
                  confirm
            )
      );
}