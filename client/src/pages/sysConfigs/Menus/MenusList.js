import React, { useMemo } from 'react';

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
import { useDeleteMenuMutation } from '../sysConfigsSlice';
import { useGetMenusQuery } from '@/utils/apisSlice';

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
        {
          useMemo(() => <UpdateMenuModal initialValues={record} />, [record])
        }
        <Popconfirm
          title="Sure to delete?"
          onConfirm={
              async () => {
                try {
                  const resp = await deleteMenu(record._id);
                  if (resp?.data.success) {
                    message.success('菜单删除成功', 3);
                  }
                } catch (err) {
                  message.error(`菜单删除失败，${err.data.msg}`, 3);
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
      className="table-sysconfigs-menuslist"
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey="_id"
    />
  );
}

function MenusList() {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMenusQuery();

  let content;

  if (isLoading) {
    content = <MenusTable dataSource={null} loading={isLoading} />;
  } else if (isSuccess) {
    content = <MenusTable dataSource={data.data} loading={!isSuccess} />;
  } else if (isError && error.data.message !== 'Unauthorized') {
    content = <Result status="error" title="未能获得菜单列表数据" />;
  } else {
    content = <Result status="error" title="无权获得菜单列表数据" />;
  }

  return (
    <>
      {isSuccess && <AddMenuModal />}
      {content}
    </>
  );
}

export default MenusList;
