const pushObjToArray = (obj, arr) => {
  // 把obj的key和value，都放到arr里
  Object.entries(obj).forEach(([key, value]) => {
    arr.push(key);
    if (Array.isArray(value)) {
      arr.push(...value);
    } else arr.push(value);
  });
  return arr;
};

module.exports = (auths) => {
  const obj = {};
  if (Array.isArray(auths)) {
    auths
      // 先把auths的key，value都放到array中
      .reduce((acc, cur) => {
        const arr = [];
        pushObjToArray(cur, arr);
        return acc.concat(arr);
      }, [])
      // 再把充满auths的array变成 {auth1: true, auth2: true, ...}的对象
      .forEach((item) => {
        obj[item] = true;
        return null;
      });

    return obj;
  }
  return obj;
};
