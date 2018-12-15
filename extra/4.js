const a = tf.tensor1d([1, 2, 3]);
const b = tf.tensor1d([3, 4, 5]);
const c = tf.tensor1d([6, 7, 8])
const d = tf.outerProduct(a, b).flatten()
tf.outerProduct(d, c).reshape([3, 3, 3]).print();