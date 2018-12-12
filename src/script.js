var ntm = tf.variable(
      tf.zeros([2, 2, 2, 2]),
      false
);

const set_values = function(inputs, multiplier, confirm) {
      // ntm = ntm.mul(tf.tensor([
      //       [0, 1],
      //       [1, 0]
      // ]));
      // inputs.flatten().slice([0], [2]).print()
      var new_state = tf.tensor([1]);
      for (var i = 0; i < inputs.size / 2; i++) {
            new_state = tf.outerProduct(new_state, inputs.flatten().slice([i], [2])).flatten();
      }

      new_state = new_state.reshape([2, 2, 2, 2]).mul(multiplier);
      ntm.assign(
            tf.add(
                  tf.mul(
                        ntm,
                        tf.sub(tf.scalar(1), confirm)
                  ),
                  tf.mul(
                        new_state,
                        confirm
                  )
            )
      );
}

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
            units: (2 * 4) + 2 + 4
      })
];
const output = layers[1].apply(layers[0].apply(input));

const model = tf.model({
      inputs: input,
      outputs: output
});

const loss = function(prediction, label) {
      set_values(
            prediction.slice([0, 0], [1, 2 * 4]),
            prediction.slice([0, 2 * 4 + 0], [1, 1]),
            prediction.slice([0, 2 * 4 + 1], [1, 1])
      );
      return prediction.slice([0, (2 * 4) + 2], [1, 4])
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