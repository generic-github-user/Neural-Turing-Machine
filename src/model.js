// model.js
// TensorFlow.js model creation code using high-level layers API

// Learning rate for optimizer
const learningRate = 0.25;
// Optimizer to train model with
const optimizer = tf.train.sgd(learningRate);

// Input layer of model
const input = tf.input({
      shape: [data.input.shape[1] + 1]
});
// Hidden layers of neural network (between input and output layers)
const layers = [
      // Hidden layer 1
      tf.layers.dense({
            units: 4,
            activation: "tanh"
      }),
      // Hidden layer 2
      tf.layers.dense({
            units: rwhl + 1 + rwhl + 2 + 4
      })
];
// Define flow of data between layers of network
const output = layers[1].apply(
      layers[0].apply(
            input
      )
);

// Create model with TensorFlow.js
const model = tf.model({
      inputs: input,
      outputs: output
});