import React, { useContext } from 'react';
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

import Access from '@/utils/Access';
import { AccessContext } from '@/utils/AccessContext';
import { defineConfig } from '@/../config/config';
import { useGetDemandsQuery, useDeleteDemandMutation } from './demandsSlice';
import AddDemandForm from './AddDemandModal';

const statusTag = (content) => {
  if (content === 'finish') {
    return (
      <Tag icon={<CheckCircleOutlined />} color="success">
        finish
      </Tag>
    );
  } if (content === 'processing') {
    return (
      <Tag icon={<SyncOutlined spin />} color="processing">
        processing
      </Tag>
    );
  } if (content === 'waiting') {
    return (
      <Tag icon={<ClockCircleOutlined />} color="default">
        waiting
      </Tag>
    );
  } if (content === 'stop') {
    return (
      <Tag icon={<MinusCircleOutlined />} color="default">
        stop
      </Tag>
    );
  }
  return (
    <Tooltip placement="topLeft" title={content}>
      {content}
    </Tooltip>
  );
};

function DemandsTable({ dataSource, loading, access }) {
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

        <Access accessible={access.GetDeamnd}>
          <Button type="link">
            <NavLink to={`/demand/single/${record._id}`}>
              详情
            </NavLink>
          </Button>
        </Access>

        <Access accessible={access.DeleteDemand}>
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
        </Access>

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

  const access = useContext(AccessContext);
  let content;

  if (isLoading) {
    content = <DemandsTable dataSource={null} loading={isLoading} access={access} />;
  } else if (isSuccess) {
    content = <DemandsTable dataSource={data.data} loading={!isSuccess} access={access} />;
  } else if (isError && error.data.message !== 'Unauthorized') {
    content = <Result status="error" title="未能获得需求列表数据" />;
  } else {
    content = <Result status="error" title="无权获得需求列表数据" />;
  }

  return (
    <>
      {
        isSuccess && (
          <Access accessible={access.AddNewDemand}>
            <AddDemandForm />
          </Access>
        )
      }
      <Access
        accessible={access.GetDemands}
        fallback={<Result status="error" title="无权限获得配置中心数据，请向管理员申请" />}
      >
        {content}
      </Access>
    </>
  );
}

export default DemandsList;
