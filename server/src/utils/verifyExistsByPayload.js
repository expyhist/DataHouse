const checkProperty = (body, propertys) => {
  if (Array.isArray(propertys)) {
    return propertys.reduce((acc, cur) => acc && Object.prototype.hasOwnProperty.call(body, cur), true);
  }
  return true;
};

const valuesLength = (body, skipProperty) => Object
  .entries(body)
  .map(([key, value]) => {
    if (key === skipProperty) {
      return 0;
    }
    return value.length;
  })
  .reduce((acc, cur) => acc + cur);

module.exports = (propertyList, skipProperty) => (req, res, next) => {
  if (/POST|PUT/.test(req.method)) {
    if (!checkProperty(req.body, propertyList) || valuesLength(req.body, skipProperty) === 0) {
      return res.status(400).json({
        success: false,
        error: 'You must provide a correct json',
      });
    }
  }
  next();
};
