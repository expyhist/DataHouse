import React from "react";
import { withRouter } from "react-router";

import Card from "antd/lib/card";
import Descriptions from "antd/lib/descriptions";

import UpdateConfigForm from "./UpdateConfigForm";
import { useGetConfigQuery } from "./configsSlice";
import SingleFilter from "../Filters/SingleFilter";

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
    isSuccess && (
      <>
        <Card bordered={false}>
          <Descriptions
            title="配置详情"
            style={{
              marginBottom: 32,
            }}
            bordered
            extra={<UpdateConfigForm singleConfig={singleConfig} />}
          >
            {
              Object.entries(singleConfig).map(([key, value]) => {
                return (
                  <Descriptions.Item label={key} key={key}>{value}</Descriptions.Item>
                );
              })
            }
          </Descriptions>
        </Card>
        <SingleFilter id={data.data.connection.filters} url={singleConfig.url}/>
      </>
    )
  );
}

export default withRouter(SingleConfig);