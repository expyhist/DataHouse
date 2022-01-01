import React, { useState } from "react";

import { Layout, Table, Space, Tooltip, Popconfirm, Button, message, Result, Tree  } from "antd";

import { useGetMenusQuery, useDeleteMenuMutation } from "./sysConfigsSlice";
import AddMenuForm from "./AddMenuForm";

const MenusTree = () => {

  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetMenusQuery("menusTree");
  
  const { Content } = Layout;

  const onExpand = () => {
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue) => {
  };

  let content;

  if (isLoading) {
    content = <div></div>
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
  } else if (isError) {
    content = <Result status="error" title="未能获得菜单树数据" extra={error.error}/>
  }

  return (
    <Layout style={{ padding: "0 24px 24px" }}>
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
            {isSuccess && <AddMenuForm />}
            {content}
          </Space>
        </div>
      </Content>
    </Layout>
  );
}

export default MenusTree;