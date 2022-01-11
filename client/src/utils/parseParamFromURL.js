export const parseParamFromURL = (url) => {
  const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后⾯的字符串取出来
  const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
  const paramsObj = {};
  // 将 params 存到对象中
  paramsArr.forEach((param) => {
    if (/=/.test(param)) {
      // 处理有 value 的参数
      const [key, value] = param.split('='); // 分割 key 和 value
      const devalue = decodeURIComponent(value); // 解码
      const val = /^\d+$/.test(devalue) ? parseFloat(devalue) : devalue; // 判断是否转为数字
      if (Object.prototype.hasOwnProperty.call(paramsObj, key)) {
        // 如果对象有 key，则添加⼀个值
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else {
        // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val;
      }
    } else {
      // 处理没有 value 的参数
      paramsObj[param] = true;
    }
  });
  return paramsObj;
};
