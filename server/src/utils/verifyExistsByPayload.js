// 检测payload的Propety是否存在
const checkProperty = (body, propertyList) => {
  if (Array.isArray(propertyList)) {
    return propertyList.reduce(
      (acc, cur) => acc && Object.prototype.hasOwnProperty.call(body, cur),
      true,
    );
  }
  return true;
};
// 检测payload的Value是否存在
const valuesLength = (body, propertyList, skipPropertys) => Object
  .entries(body)
  .map(([key, value]) => {
    if (key === skipPropertys) {
      return 0;
    }

    if (propertyList.includes(key)) {
      if (value === '') {
        return 0;
      } if (Array.isArray(value) && value.length === 0) {
        return 0;
      }
      return [value].length;
    }
    return 0;
  })
  .reduce((acc, cur) => acc + cur, 0);

module.exports = (propertyList, skipPropertys, valueExistNum = 0) => (req, res, next) => {
  if (/POST|PUT/.test(req.method)) {
    if (!checkProperty(req.body, propertyList)) {
      return res.status(400).json({
        success: false,
        error: 'You must provide correct keys of json',
      });
    }

    if (valueExistNum !== null) {
      if (valuesLength(req.body, propertyList, skipPropertys) !== valueExistNum) {
        return res.status(400).json({
          success: false,
          error: 'You must provide correct values of json',
        });
      }
    }
  }
  next();
};
