// 检测payload的Keys是否存在
const checkKeysExists = (body, checkedKeys) => {
  if (Array.isArray(checkedKeys)) {
    return checkedKeys.reduce(
      (acc, cur) => acc && Object.prototype.hasOwnProperty.call(body, cur),
      true,
    );
  }
  return true;
};
// 检测payload的特定Keys的Values是否存在
const checkValuesExists = (body, checkedKeys, skipKeys) => {
  let filterBody = {};

  if (skipKeys) {
    body.forEach(([key, value]) => {
      if (!skipKeys.includes(key)) {
        filterBody[key] = value;
      }
    });
  }

  filterBody = body;

  return Object
    .entries(filterBody)
    .map(([key, value]) => {
      if (checkedKeys.includes(key)) {
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
};

module.exports = (checkedKeys, skipKeys, valueExistNum = 0) => (req, res, next) => {
  if (/POST|PUT/.test(req.method)) {
    if (!checkKeysExists(req.body, checkedKeys)) {
      return res.status(400).json({
        success: false,
        msg: 'You must provide correct keys of json',
      });
    }

    if (valueExistNum !== null) {
      if (checkValuesExists(req.body, checkedKeys, skipKeys) !== valueExistNum) {
        return res.status(400).json({
          success: false,
          msg: 'You must provide correct values of json',
        });
      }
    }
  }
  next();
};
