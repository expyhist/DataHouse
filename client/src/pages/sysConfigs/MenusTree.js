import React, { useState } from 'react';

import Result from 'antd/lib/result';
import Tree from 'antd/lib/tree';

import { useGetMenusQuery } from '@/utils/apisSlice';

function MenusTree() {
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMenusQuery('menusTree');

  const onExpand = () => {
    setAutoExpandParent(false);
  };

  const onCheck = () => {
    // console.log(props);
  };

  let content;

  if (isLoading) {
    content = <div />;
  } else if (isSuccess) {
    content = (
      <Tree
        checkable
        onExpand={onExpand}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        treeData={data.data}
      />
    );
  } else if (isError && error.data.message !== 'Unauthorized') {
    content = <Result status="error" title="未能获得菜单树数据" />;
  } else {
    content = <Result status="error" title="无权获得菜单树表数据" />;
  }

  return content;
}

export default MenusTree;
