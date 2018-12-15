optimizer.minimize(
      () => {
            loss(
                  model.predict(data.input),
                  data.output
            )
      }
);

optimizer.minimize(
      () => loss(
            model.predict(data.input),
            data.output
      )
);