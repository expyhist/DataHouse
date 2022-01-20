import React from 'react';
import { NavLink } from 'react-router-dom';

import Table from 'antd/lib/table';
import Space from 'antd/lib/space';
import Tooltip from 'antd/lib/tooltip';
import Popconfirm from 'antd/lib/popconfirm';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import Result from 'antd/lib/result';
import Tag from 'antd/lib/tag';
import {
  CheckCircleOutlined,
  SyncOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';

import { defineConfig } from '@/../config/config';
import { useGetDemandsQuery, useDeleteDemandMutation } from './demandsSlice';
import AddDemandForm from './AddDemandModal';

const statusTag = (status) => {
  if (status === 'finish') {
    return (
      <Tag icon={<CheckCircleOutlined />} color="success">
        finish
      </Tag>
    );
  } if (status === 'processing') {
    return (
      <Tag icon={<SyncOutlined spin />} color="processing">
        processing
      </Tag>
    );
  } if (status === 'waiting') {
    return (
      <Tag icon={<ClockCircleOutlined />} color="default">
        waiting
      </Tag>
    );
  } if (status === 'stop') {
    return (
      <Tag icon={<MinusCircleOutlined />} color="default">
        stop
      </Tag>
    );
  }
  return (
    <Tooltip placement="topLeft" title={status}>
      {status}
    </Tooltip>
  );
};

function DemandsTable({ dataSource, loading }) {
  if (loading === true) return <Table columns={null} dataSource={null} loading={loading} />;

  const [deleteDemand] = useDeleteDemandMutation();
  const { demandsColumnsInfo } = defineConfig;

  const columns = Object.entries(demandsColumnsInfo.DemandsListColumns)
    .map(([key, value]) => ({
      title: value,
      dataIndex: key,
      key,
      ellipsis: {
        showTitle: false,
      },
      render: (content) => statusTag(content),
      sorter: (a, b) => a[key].localeCompare(b[key]),
      sortDirections: ['descend', 'ascend'],
    }));

  columns.push({
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Space direction="vertical">
        <Button type="link">
          <NavLink to={`/demand/single/${record._id}`}>
            详情
          </NavLink>
        </Button>
        <Popconfirm
          title="Sure to delete?"
          onConfirm={
              async () => {
                try {
                  await deleteDemand(record._id);
                  message.success('需求删除成功', 3);
                } catch (err) {
                  message.error(`需求删除失败，错误:${err.data.error}`, 3);
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
      className="table-demands-demandslist"
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey="_id"
    />
  );
}

function DemandsList() {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetDemandsQuery();

  let content;

  if (isLoading) {
    content = <DemandsTable dataSource={null} loading={isLoading} />;
  } else if (isSuccess) {
    content = <DemandsTable dataSource={data.data} loading={!isSuccess} />;
  } else if (isError && error.data.message !== 'Unauthorized') {
    content = <Result status="error" title="未能获得需求列表数据" />;
  } else {
    content = <Result status="error" title="无权获得需求列表数据" />;
  }

  return (
    <>
      {isSuccess && <AddDemandForm />}
      {content}
    </>
  );
}

export default DemandsList;
