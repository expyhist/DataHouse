import React from "react";
import { NavLink, withRouter } from "react-router-dom";

import { Layout, Table, Space, Tooltip, Popconfirm, Button, message, Result, Tag } from "antd";
import {
  CheckCircleOutlined,
  SyncOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

import { defineConfig } from "@/../config/config";
import { useGetDemandsQuery, useDeleteDemandMutation } from "./demandsSlice";
import AddDemandForm from "./AddDemandForm";

const statusTag = (status) => {
  if (status==="finish") {
    return (
      <Tag icon={<CheckCircleOutlined />} color="success">
        finish
      </Tag>
    );
  } else if (status==="processing") {
    return (
      <Tag icon={<SyncOutlined spin />} color="processing">
        processing
      </Tag>
    );
  } else if (status==="waiting") {
    return (
      <Tag icon={<ClockCircleOutlined />} color="default">
        waiting
      </Tag>
    );
  } else if (status==="stop") {
    return (
      <Tag icon={<MinusCircleOutlined />} color="default">
        stop
      </Tag>
    );
  } else {
    return (
      <Tooltip placement="topLeft" title={status}>
        {status}
      </Tooltip>
    );
  }
}

const DemandsTable = ({ dataSource, loading }) => {

  if (loading === true) return <Table columns={null} dataSource={null} loading={loading} />

  const [deleteDemand] = useDeleteDemandMutation();
  const demandsColumnsInfo = defineConfig.demandsColumnsInfo;

  const columns = Object.entries(demandsColumnsInfo.DemandsListColumns)
    .map(([key, value]) => ({
      title: value, 
      dataIndex: key, 
      key: key,
      ellipsis: {
          showTitle: false,
      },
      render: content => statusTag(content),
      sorter: (a, b) => a[key].localeCompare(b[key]),
      sortDirections: ["descend", "ascend"],
    })
  );
  
  columns.push({
    title: "操作",
    key: "action",
    render: (text, record) => {
      return  (
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
                  message.success("demand delete successfully", 3);
                } catch (err) {
                  message.error("demand delete failed", 3);
                }
              }
            }
            okText="Yes"
            cancelText="No"
          >
            <Button type="link">删除</Button>
          </Popconfirm>
        </Space>
      );
    }
  });

  return (
    <div>
      <Table 
        className="table-demands-demandslist"
        columns={columns}
        dataSource={dataSource} 
        loading={loading} 
        rowKey="_id"
      />
    </div>
  );
}

const DemandsList = () => {

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetDemandsQuery();

  const { Content } = Layout;

  let content;

  if (isLoading) {
    content = <DemandsTable dataSource={null} loading={isLoading} />
  } else if (isSuccess) {
    content = <DemandsTable dataSource={data.data} loading={!isSuccess} />
  } else if (isError) {
    content = <Result status="error" title="未能获得需求列表数据" extra={error.error}/>
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
            {isSuccess && <AddDemandForm />}
            {content}
          </Space>
        </div>
      </Content>
    </Layout>
  );
}

export default withRouter(DemandsList);