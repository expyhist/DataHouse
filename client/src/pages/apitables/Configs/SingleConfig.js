import React from "react";
import { withRouter } from "react-router";

import { Badge, Card, Descriptions, Divider, Table } from "antd";

import UpdateConfigForm from "./UpdateConfigForm";
import { useGetConfigQuery } from "./configsSlice";

const SingleConfig = (props) => {

  const { match } = props;
  const id = match.params.id;

  const { 
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetConfigQuery(id);

  const singleConfig = isSuccess && JSON.parse(JSON.stringify(data.data, ["_id", "url", "author", "title", "applicant", "createdAt", "updatedAt"]));

  return (
    <Card bordered={false}>
      {
        isSuccess && (
          <Descriptions
            title="配置详情"
            style={{
              marginBottom: 32,
            }}
            bordered
            extra={<UpdateConfigForm singleConfig={singleConfig}/>}
          >
            {
              Object.entries(singleConfig).map(([key,value]) => {
                return (
                  <Descriptions.Item label={key} key={key}>{value}</Descriptions.Item>
                );
              })
            }
          </Descriptions>
        )
      }
    </Card>
  );
}

export default withRouter(SingleConfig);