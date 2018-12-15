var values = tf.tensor([0, 1, 1, 0, 1, 0])
var result = tf.tensor([1]);
// Cycle through each pair of write head nodes
for (var i = 0; i < values.size; i += 2) {
      // Compute product of all memory inputs
      result = tf.outerProduct(
                  result,
                  values.flatten().slice([i], [2])
            )
            .flatten();
}
result = result.reshape([2, 2, 2])
result.print()