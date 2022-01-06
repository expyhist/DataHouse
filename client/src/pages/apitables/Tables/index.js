import React from "react";
import { withRouter } from "react-router";
import { useSelector } from "react-redux";

import Table from "antd/lib/table";
import Layout from "antd/lib/layout";
import Result from "antd/lib/result";

import TableFilter from "./TableFilter";
import { parseParamFromURL } from "@/utils/parseParamFromURL";
import { useGetConfigQuery } from "../Configs/configsSlice";

const ApiTable = (props) => {
  
  const { match } = props;
  const id = match.params.id;
  
  const tableContent = useSelector(state => state.tableContent);
  const dataSource = tableContent[tableContent.length-1].dataSource;
  const columns = tableContent[tableContent.length-1].columns;

  const { Content } = Layout;

  const { 
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetConfigQuery(id);

  let content;
  let payload;

  if (isLoading) {
    content = <Table dataSource={null} columns={null} loading={isLoading}/>
  } else if (isSuccess) {
    content = <Table dataSource={dataSource} columns={columns} rowKey={"uuid"} loading={!isSuccess}/>
    const params = parseParamFromURL(data.data.url);
    payload = {...{ id: id, pageSize: 10000, pageNum: 1, appCode: null }, ...{appCode: params.appCode}};
  } else if (isError) {
    content = <Result status="error" title="未能获得报表数据" extra={error.error}/>
  }
  
  return (
    <Layout>
      {isSuccess && <TableFilter filterId={data.data.connection.filters} payload={payload} />} 
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        {content}
      </Content>
    </Layout>
  );
}

export default withRouter(ApiTable);