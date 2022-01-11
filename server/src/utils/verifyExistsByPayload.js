// 检测payload的Propety是否存在
const checkProperty = (body, propertys) => {
  if (Array.isArray(propertys)) {
    return propertys.reduce((acc, cur) => acc && Object.prototype.hasOwnProperty.call(body, cur), true);
  }
  return true;
};
// 检测payload的Value是否存在
const valuesLength = (body, skipPropertys) => {
  return Object
    .entries(body)
    .map(([key, value]) => {
      if (key === skipPropertys) {
        return 0;
      }
      return value.length;
    })
    .reduce((acc, cur) => acc + cur, 0);
} 

module.exports = (propertyList, skipPropertys) => (req, res, next) => {
  if (/POST|PUT/.test(req.method)) {
    if (!checkProperty(req.body, propertyList) || valuesLength(req.body, skipPropertys) === 0) {
      return res.status(400).json({
        success: false,
        error: 'You must provide a correct json',
      });
    }
  }
  next();
};
