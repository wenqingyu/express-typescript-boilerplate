/**
 * GET /*
 * Greeting page.
 */
exports.greet = (req, res) => {
  res.json({result: 'hello, this is Simplex Payment Gateway'});
};
