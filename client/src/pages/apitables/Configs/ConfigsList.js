import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import Layout from 'antd/lib/layout';
import Table from 'antd/lib/table';
import Space from 'antd/lib/space';
import Tooltip from 'antd/lib/tooltip';
import Popconfirm from 'antd/lib/popconfirm';
import message from 'antd/lib/message';
import Button from 'antd/lib/button';
import Result from 'antd/lib/result';

import { defineConfig } from '@/../config/config';
import { useGetConfigsQuery, useDeleteConfigMutation } from './configsSlice';
import { useDeleteFilterMutation } from '../Filters/filtersSlice';
import { useDeleteMenuMutation } from '@/pages/sysConfigs/sysConfigsSlice';
import AddConfigForm from './AddConfigForm';
import AddFiltersForm from '../Filters/AddFiltersForm';

function ConfigsTable(props) {
  const { dataSource, loading } = props;

  if (loading === true) return (<Table columns={null} dataSource={null} loading={loading} />);

  const [deleteConfig] = useDeleteConfigMutation();
  const [deleteFilter] = useDeleteFilterMutation();
  const [deleteMenu] = useDeleteMenuMutation();
  const { apiTablesColumnsInfo } = defineConfig;

  const columns = Object.entries(apiTablesColumnsInfo.ConfigsListColumns)
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
      sorter: (a, b) => a[key].localeCompare(b[key]),
      sortDirections: ['descend', 'ascend'],
    }));

  columns.push({
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Space direction="vertical">
        <AddFiltersForm id={record._id} url={record.url} />
        <Button type="link">
          <NavLink to={`/tables/configs/single/${record._id}`}>
            详情
          </NavLink>
        </Button>
        <Popconfirm
          title="Sure to delete?"
          onConfirm={
              async () => {
                try {
                  await deleteConfig(record._id);
                  message.success('配置删除成功', 3);
                  if (record?.connection?.filters) {
                    await deleteFilter(record.connection.filters);
                    message.success('筛选条件删除成功', 3);
                  }
                  if (record?.connection?.menus) {
                    await deleteMenu(record?.connection?.menus);
                    message.success('菜单删除成功', 3);
                  }
                } catch (err) {
                  message.error(`配置删除失败，错误:${err.data.error}`, 3);
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
      className="table-apitable-configslist"
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey="_id"
    />
  );
}

function ConfigsList() {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetConfigsQuery();

  const { Content } = Layout;

  let content;

  if (isLoading) {
    content = <ConfigsTable dataSource={null} loading={isLoading} />;
  } else if (isSuccess) {
    content = <ConfigsTable dataSource={data.data} loading={!isSuccess} />;
  } else if (isError) {
    content = <Result status="error" title="未能获得配置中心数据" extra={error.error} />;
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
        <Space direction="vertical">
          {isSuccess && <AddConfigForm />}
          {content}
        </Space>
      </Content>
    </Layout>
  );
}

export default withRouter(ConfigsList);
