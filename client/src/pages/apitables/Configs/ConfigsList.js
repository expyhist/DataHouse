import React, { useContext, useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import Table from 'antd/lib/table';
import Space from 'antd/lib/space';
import Tooltip from 'antd/lib/tooltip';
import Popconfirm from 'antd/lib/popconfirm';
import message from 'antd/lib/message';
import Button from 'antd/lib/button';
import Result from 'antd/lib/result';

import AddConfigModal from './AddConfigModal';
import AddFiltersModal from '../Filters/AddFiltersModal';
import Access from '@/utils/Access';
import { AccessContext } from '@/utils/AccessContext';
import { defineConfig } from '@/../config/config';
import { useGetConfigsQuery, useDeleteConfigMutation } from './configsSlice';

function ConfigsTable({ dataSource, loading, access }) {
  if (loading === true) return (<Table columns={null} dataSource={null} loading={loading} />);

  const [deleteConfig] = useDeleteConfigMutation();
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

        <Access accessible={access.AddNewFilter}>
          {
            useMemo(() => <AddFiltersModal id={record._id} url={record.url} />, [record])
          }
        </Access>

        <Access accessible={access.GetConfig}>
          <Button type="link">
            <NavLink to={`/tables/configs/single/${record._id}`}>
              详情
            </NavLink>
          </Button>
        </Access>

        <Access accessible={access.DeleteConfig}>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={
              async () => {
                try {
                  const resp = await deleteConfig(record._id);
                  if (resp?.data.success) {
                    resp.data.info.split(',').forEach((ele) => {
                      message.success(`${ele}删除成功`, 3);
                    });
                  }
                } catch (err) {
                  message.error(`配置删除失败，${err.data.msg}`, 3);
                }
              }
            }
            okText="Yes"
            cancelText="No"
          >
            <Button type="link">删除</Button>
          </Popconfirm>
        </Access>

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

  const access = useContext(AccessContext);
  let content;

  if (isLoading) {
    content = <ConfigsTable dataSource={null} loading={isLoading} access={access} />;
  } else if (isSuccess) {
    content = <ConfigsTable dataSource={data.data} loading={!isSuccess} access={access} />;
  } else if (isError && error.data.message !== 'Unauthorized') {
    content = <Result status="error" title="未能获得配置中心数据" />;
  } else {
    content = <Result status="error" title="无权获得配置中心数据" />;
  }

  return (
    <>
      {
        isSuccess && (
          <Access accessible={access.AddNewConfig}>
            <AddConfigModal />
          </Access>
        )
      }
      <Access
        accessible={access.GetConfigs}
        fallback={<Result status="error" title="无权限获得配置中心数据，请向管理员申请" />}
      >
        {content}
      </Access>
    </>
  );
}

export default ConfigsList;
