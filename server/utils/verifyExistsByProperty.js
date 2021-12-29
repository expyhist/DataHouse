const checkProperty = (body, propertys) => {
  if (Array.isArray(propertys)) {
    return propertys.reduce((acc, cur) => acc && Object.prototype.hasOwnProperty.call(body, cur), true);
  }
  return true;
};

module.exports = (propertyList) => (req, res, next) => {
  if (req.method === 'POST' && req.url === '/' && !checkProperty(req.body, propertyList)) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a correct json',
    });
  }
  next();
};
