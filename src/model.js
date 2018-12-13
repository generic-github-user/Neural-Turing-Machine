const learningRate = 0.25;
const optimizer = tf.train.sgd(learningRate);

const input = tf.input({
      shape: [4]
});
const layers = [
      tf.layers.dense({
            units: 4,
            activation: "tanh"
      }),
      tf.layers.dense({
            units: (2 * dimensions) + 2 + 4
      })
];
const output = layers[1].apply(layers[0].apply(input));

const model = tf.model({
      inputs: input,
      outputs: output
});