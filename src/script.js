// script.js
// Main code for training model and displaying results

// Training data
const data = {
      "input": tf.tensor([
            [1, 2, 3, 4]
      ]),
      "output": tf.tensor([
            [1, 2, 3, 4]
      ])
};

// Loss (cost) function to evaluate the accuracy of the model
const loss = function(prediction, label) {
      // Calculate loss of network based on predicted values and actual values and return loss
      return prediction
            // Subtract actual values to find difference
            .sub(label)
            // Apply mean squared error metric to losses
            .square().mean();
}

// Store previous predictions to use when determining input value read from NTM memory
const last_prediction = tf.variable(tf.zeros([1, 23]), false);
// Calculate output precition based on inputs and current state of NTM
const predict = function(inputs) {
      const prediction = model.predict(
            // Combine value from read head with network inputs
            tf.concat([
                  // Value read from memory
                  ntm.read(
                        last_prediction.slice([0, 0], [1, rwhl]),
                        last_prediction.slice([0, rwhl], [1, 1])
                  ).reshape([1, 1]),
                  // Network input values
                  inputs
            ], 1)
      );
      // Write to NTM memory using output of model
      ntm.write(
            prediction.slice([0, rwhl + 1], [1, rwhl]),
            prediction.slice([0, rwhl + 1 + rwhl], [1, 1]),
            prediction.slice([0, rwhl + 1 + rwhl + 1], [1, 1])
      );

      // Update previous prediction
      last_prediction.assign(prediction);

      return prediction.slice([0, (rwhl) + 2], [1, 4]);
}

// Train the model
for (var i = 0; i < 10; i++) {
      // Use tf.tidy to reduce memory usage
      tf.tidy(
            () => {
                  // data.input.print();
                  // Log loss value to console
                  loss(predict(data.input), data.output).print()
                  // const prediction = model.predict(data.input);
                  optimizer.minimize(
                        () => loss(
                              // Use predictions from model as predicted output value
                              predict(data.input),
                              // Use training data as actual output value
                              data.output
                        )
                  );
                  // console.log(loss(model.predict(data.input), data.output));
            }
      );
}