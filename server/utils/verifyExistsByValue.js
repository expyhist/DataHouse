const valuesLength = (body, skipProperty) => Object
  .entries(body)
  .map(([key, value]) => {
    if (key === skipProperty) {
      return 0;
    }
    return value.length;
  })
  .reduce((acc, cur) => acc + cur);

module.exports = (skipProperty, createElement) => (req, res, next) => {
  if (/POST|PUT/.test(req.method) && valuesLength(req.body, skipProperty) === 0) {
    return res.status(400).json({
      success: false,
      error: `You must provide a ${createElement}`,
    });
  }
  next();
};
