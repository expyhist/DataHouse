module.exports = (treeData, keepCondition) => {
  const filterNode = (nodes) => {
    if (!nodes?.length) {
      return nodes;
    }

    return nodes.filter((item) => {
      // 先筛选子树，如果子树中没有符合条件的，children 会是 [] 或 undefined
      const filterChildren = filterNode(item.children);
      // 根据当前节点情况和子树筛选结果判断是否保留当前节点
      if (keepCondition(item) || filterChildren?.length) {
        // 如果要保留，children 应该用筛选出来的那个；不保留的话就不 care 子节点了
        item.children = filterChildren;
        return true;
      }
      return false;
    });
  };

  return filterNode(treeData);
};
