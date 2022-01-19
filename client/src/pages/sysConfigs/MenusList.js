import React from 'react';

import Layout from 'antd/lib/layout';
import Table from 'antd/lib/table';
import Space from 'antd/lib/space';
import Tooltip from 'antd/lib/tooltip';
import Popconfirm from 'antd/lib/popconfirm';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import Result from 'antd/lib/result';

import AddMenuModal from './AddMenuModal';
import UpdateMenuModal from './UpdateMenuModal';
import { defineConfig } from '@/../config/config';
import { useGetMenusQuery, useDeleteMenuMutation } from './sysConfigsSlice';

function MenusTable({ dataSource, loading }) {
  if (loading === true) return <Table columns={null} dataSource={null} loading={loading} />;

  const [deleteMenu] = useDeleteMenuMutation();
  const { sysConfigsColumnsInfo } = defineConfig;

  const columns = Object.entries(sysConfigsColumnsInfo.MenusListColumns)
    .map(([key, value]) => ({
      title: value,
      dataIndex: key,
      key,
      ellipsis: {
        showTitle: false,
      },
      render: (content) => (
        <Tooltip placement="topLeft" title={content}>
          {content}
        </Tooltip>
      ),
      sorter: (a, b) => (key !== 'auth' ? a[key].localeCompare(b[key]) : null),
      sortDirections: ['descend', 'ascend'],
    }));

  columns.push({
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Space direction="horizontal">
        <UpdateMenuModal initialValues={record} />
        <Popconfirm
          title="Sure to delete?"
          onConfirm={
              async () => {
                try {
                  await deleteMenu(record._id);
                  message.success('菜单删除成功', 3);
                } catch (err) {
                  message.error(`菜单删除失败，错误:${err.data.error}`, 3);
                }
              }
            }
          okText="Yes"
          cancelText="No"
        >
          <Button type="link">删除</Button>
        </Popconfirm>
      </Space>
    ),
  });

  return (
    <div>
      <Table
        className="table-sysconfigs-menuslist"
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey="_id"
      />
    </div>
  );
}

function MenusList() {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMenusQuery('normal');

  const { Content } = Layout;

  let content;

  if (isLoading) {
    content = <MenusTable dataSource={null} loading={isLoading} />;
  } else if (isSuccess) {
    content = <MenusTable dataSource={data.data} loading={!isSuccess} />;
  } else if (isError) {
    content = <Result status="error" title="未能获得菜单列表数据" extra={error.error} />;
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
            {isSuccess && <AddMenuModal />}
            {content}
          </Space>
        </div>
      </Content>
    </Layout>
  );
}

export default MenusList;
