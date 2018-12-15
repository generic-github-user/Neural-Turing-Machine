set_values(
      tf.tensor([1, 0, 1, 0, 1, 0, 1, 0]),
      tf.tensor([1]),
      tf.tensor([0.5])
)

ntm.read(
      tf.tensor([1, 0, 1, 0, 1, 0, 1, 0]),
      tf.tensor([1])
)

ntm.write(
      tf.tensor([1, 0, 1, 0, 1, 0, 1, 0]),
      tf.tensor([1]),
      tf.tensor([1])
)