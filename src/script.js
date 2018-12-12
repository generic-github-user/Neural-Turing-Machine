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

const input = tf.input({
      shape: [4]
});
const layers = [
      tf.layers.dense({
            units: 12,
            activation: "relu"
      }),
      tf.layers.dense({
            units: 16,
            activation: "softmax"
      })
];
const output = layers[1].apply(layers[0].apply(input));

const model = tf.model({
      inputs: input,
      outputs: output
});

model.predict(tf.ones([1, 4])).reshape([2, 2, 2, 2]).print();