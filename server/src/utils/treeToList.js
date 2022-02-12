module.exports = (treeData) => {
  const arr = [];

  const recusiveTreeData = (node) => {
    const { children, key } = node;
    const childrenKeys = children.map((ele) => ele.key).toString();
    const obj = {};

    if (/[A-Z]\w+/.test(childrenKeys)) {
      const auths = children
        .filter((child) => /[A-Z]\w+/.test(child.key))
        .map((data) => data.key);
      obj[key] = auths;
      arr.push(obj);
    }

    if (/\/\w+/.test(childrenKeys)) {
      obj[key] = [];
      arr.push(obj);
      children.forEach((data) => recusiveTreeData(data));
    }
  };

  treeData.forEach((node) => recusiveTreeData(node));
  return arr;
};
