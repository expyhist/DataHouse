import React from 'react';

import Table from 'antd/lib/table';
import Space from 'antd/lib/space';
import Tooltip from 'antd/lib/tooltip';
import Popconfirm from 'antd/lib/popconfirm';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import Result from 'antd/lib/result';
import Tag from 'antd/lib/tag';

import UpdateUserModal from './UpdateUserModal';
import { defineConfig } from '@/../config/config';
import { useGetUsersQuery, useDeleteUserMutation } from '@/pages/users/usersSlice';

const rolesNameTag = (content) => {
  if (Array.isArray(content)) {
    return content.map((item) => <Tag color="blue" key={item}>{item}</Tag>);
  }
  return (
    <Tooltip placement="topLeft" title={content}>
      {content}
    </Tooltip>
  );
};

function UsersTable({ dataSource, loading }) {
  if (loading === true) return <Table columns={null} dataSource={null} loading={loading} />;

  const [deleteUser] = useDeleteUserMutation();
  const { userColumnsInfo } = defineConfig;

  const columns = Object.entries(userColumnsInfo.UsersListColumns)
    .map(([key, value]) => ({
      title: value,
      dataIndex: key,
      key,
      ellipsis: {
        showTitle: false,
      },
      render: (content) => rolesNameTag(content),
      sorter: (a, b) => a[key].localeCompare(b[key]),
      sortDirections: ['descend', 'ascend'],
    }));

  columns.push({
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Space direction="horizontal">
        <UpdateUserModal initialValues={record} />
        <Popconfirm
          title="Sure to delete?"
          onConfirm={
              async () => {
                try {
                  await deleteUser(record._id);
                  message.success('用户删除成功', 3);
                } catch (err) {
                  message.error(`用户删除失败，错误:${err.data.error}`, 3);
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
      className="table-users-roleslist"
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey="_id"
    />
  );
}

function UsersList() {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;

  if (isLoading) {
    content = <UsersTable dataSource={null} loading={isLoading} />;
  } else if (isSuccess) {
    content = <UsersTable dataSource={data.data} loading={!isSuccess} />;
  } else if (isError && error.data.message !== 'Unauthorized') {
    content = <Result status="error" title="未能获得用户列表数据" />;
  } else {
    content = <Result status="error" title="无权获得用户列表数据" />;
  }

  return content;
}

export default UsersList;
