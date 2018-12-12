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

const data = {
      "input": tf.tensor([
            [1, 2, 3, 4]
      ]),
      "output": tf.tensor([
            [1, 2, 3, 4]
      ])
};

const learningRate = 0.1;
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
            units: 4
      })
];
const output = layers[1].apply(layers[0].apply(input));

const model = tf.model({
      inputs: input,
      outputs: output
});

model.predict(tf.ones([1, 4])).reshape([2, 2]).print();

const loss = (pred, label) => pred.sub(label).square().mean();

for (let i = 0; i < 10; i++) {
      optimizer.minimize(() => loss(model.predict(data.input), data.output));
      console.log(loss(model.predict(data.input), data.output).print());
      // console.log(model.predict(data.input).print());
}