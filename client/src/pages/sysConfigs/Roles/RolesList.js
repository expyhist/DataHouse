import React from 'react';

import Table from 'antd/lib/table';
import Space from 'antd/lib/space';
import Tooltip from 'antd/lib/tooltip';
import Popconfirm from 'antd/lib/popconfirm';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import Result from 'antd/lib/result';

import AddRoleModal from './AddRoleModal';
// import UpdateRoleModal from './UpdateRoleModal';
import { defineConfig } from '@/../config/config';
import { useGetRolesQuery, useDeleteRoleMutation } from '../sysConfigsSlice';

function RolesTable({ dataSource, loading }) {
  if (loading === true) return <Table columns={null} dataSource={null} loading={loading} />;

  const [deleteRole] = useDeleteRoleMutation();
  const { sysConfigsColumnsInfo } = defineConfig;

  const columns = Object.entries(sysConfigsColumnsInfo.RolesListColumns)
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
        {/* <UpdateRoleModal initialValues={record} /> */}
        <Popconfirm
          title="Sure to delete?"
          onConfirm={
              async () => {
                try {
                  await deleteRole(record._id);
                  message.success('角色删除成功', 3);
                } catch (err) {
                  message.error(`角色删除失败，错误:${err.data.error}`, 3);
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
    <Table
      className="table-sysconfigs-roleslist"
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey="_id"
    />
  );
}

function RolesList() {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRolesQuery();

  let content;

  if (isLoading) {
    content = <RolesTable dataSource={null} loading={isLoading} />;
  } else if (isSuccess) {
    content = <RolesTable dataSource={data.data} loading={!isSuccess} />;
  } else if (isError && error.data.message !== 'Unauthorized') {
    content = <Result status="error" title="未能获得菜单列表数据" />;
  } else {
    content = <Result status="error" title="无权获得菜单列表数据" />;
  }

  return (
    <>
      {isSuccess && <AddRoleModal />}
      {content}
    </>
  );
}

export default RolesList;
