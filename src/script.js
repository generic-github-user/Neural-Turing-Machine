// script.js
// Main code for training model and displaying results

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
const last_prediction = tf.variable(tf.zeros([1, 20]), false);
// Calculate output precition based on inputs and current state of NTM
const predict = function(inputs) {
      ntm.reset();

      const prediction_ts = [];

      // Loop through each timestep in input series
      for (var i = 0; i < inputs.shape[0]; i++) {
            const timestep = inputs.slice([i], [1]);

            // Timesteps must be processed one at a time
            const prediction_t = model.predict(
                  // Combine value from read head with network inputs
                  tf.concat([
                        // Network input values
                        timestep,
                        // Value read from memory
                        ntm.read(
                              // Read controller values
                              last_prediction.slice([0, 0], [1, rwhl]),
                              // Multiplier
                              last_prediction.slice([0, rwhl], [1, 1])
                        ).reshape([1, 1])
                  ], 1)
            );

            // Write to NTM memory using output of model
            ntm.write(
                  // Write controller values
                  prediction_t.slice([0, rwhl + 1], [1, rwhl]),
                  // Multiplier
                  prediction_t.slice([0, rwhl + 1 + rwhl], [1, 1]),
                  // Confirmation
                  prediction_t.slice([0, rwhl + 1 + rwhl + 1], [1, 1])
            );

            // Update previous prediction
            last_prediction.assign(prediction_t);

            prediction_ts.push(prediction_t.slice([0, rwhl + 1 + rwhl + 2], [1, data.input.shape[1]]));
      }
      return tf.stack(prediction_ts);
}

// Train the model
for (var i = 0; i < 100; i++) {
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