import React, { useState } from 'react';

import Layout from 'antd/lib/layout';
import Space from 'antd/lib/space';
import Result from 'antd/lib/result';
import Tree from 'antd/lib/tree';

import { useGetMenusQuery } from './sysConfigsSlice';

function MenusTree() {
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMenusQuery('menusTree');

  const { Content } = Layout;

  const onExpand = () => {
    setAutoExpandParent(false);
  };

  // const onCheck = (checkedKeysValue) => {
  // };

  let content;

  if (isLoading) {
    content = <div />;
  } else if (isSuccess) {
    content = (
      <Tree
        checkable
        onExpand={onExpand}
        autoExpandParent={autoExpandParent}
        // onCheck={onCheck}
        treeData={data.data}
      />
    );
  } else if (isError) {
    content = <Result status="error" title="未能获得菜单树数据" extra={error.error} />;
  }

  return (
    <Layout style={{ padding: '0 24px 24px' }}>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <div>
          <Space direction="vertical">
            {content}
          </Space>
        </div>
      </Content>
    </Layout>
  );
}

export default MenusTree;
