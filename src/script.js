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
      // Write to NTM memory using output of model
      ntm.write(
            prediction.slice([0, 0], [1, 2 * dimensions]),
            prediction.slice([0, 2 * dimensions + 0], [1, 1]),
            prediction.slice([0, 2 * dimensions + 1], [1, 1])
      );
      // Calculate loss of network based on predicted values and actual values and return loss
      return prediction.slice([0, (2 * dimensions) + 2], [1, 4])
            // Subtract actual values to find difference
            .sub(label)
            // Apply mean squared error metric to losses
            .square()
            .mean();
}

// Train the model
for (var i = 0; i < 10; i++) {
      // Use tf.tidy to reduce memory usage
      tf.tidy(
            () => {
                  // data.input.print();
                  // Log loss value to console
                  loss(model.predict(data.input), data.output).print()
                  // const prediction = model.predict(data.input);
                  optimizer.minimize(
                        () => loss(
                              // Use predictions from model as predicted output value
                              model.predict(data.input),
                              // Use training data as actual output value
                              data.output
                        )
                  );
                  // console.log(loss(model.predict(data.input), data.output));
            }
      );
}