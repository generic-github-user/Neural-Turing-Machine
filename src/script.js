const data = {
      "input": tf.tensor([
            [1, 2, 3, 4]
      ]),
      "output": tf.tensor([
            [1, 2, 3, 4]
      ])
};

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

const loss = function(prediction, label) {
      ntm.set_values(
            prediction.slice([0, 0], [1, 2 * dimensions]),
            prediction.slice([0, 2 * dimensions + 0], [1, 1]),
            prediction.slice([0, 2 * dimensions + 1], [1, 1])
      );
      return prediction.slice([0, (2 * dimensions) + 2], [1, 4])
            .sub(label)
            .square()
            .mean();
}

for (var i = 0; i < 10; i++) {
      tf.tidy(
            () => {
                  // data.input.print();
                  loss(model.predict(data.input), data.output).print()
                  // const prediction = model.predict(data.input);
                  optimizer.minimize(
                        () => loss(
                              model.predict(data.input),
                              data.output
                        )
                  );
                  // console.log(loss(model.predict(data.input), data.output));
            }
      );
}