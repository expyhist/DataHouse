import React from "react";
import { withRouter } from "react-router";

import { Card, Descriptions, Collapse } from "antd";

import UpdateFilterForm from "./UpdateFilterForm";
import { useGetFilterQuery } from "./filtersSlice";

const SingleFilter = (props) => {

  const { id, url } = props;

  const { 
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetFilterQuery(id);

  const regex = new RegExp("rangeDate|singleDate|text|enum");
  const singleFilter = isSuccess && JSON.parse(JSON.stringify(data.data));

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
            extra={<UpdateFilterForm singleFilter={singleFilter} url={url} />}
          >
            {
              Object.entries(singleFilter).map(([key, value]) => {
                if (regex.test(key)) {
                  return (
                    <Descriptions.Item label={key} key={key}>
                      {
                        value.map(data => {
                          return Object.entries(data).map(([k, v]) => {
                            if (k !== "_id") {
                              return (
                                <p key={k}>
                                  {`${k}: ${v}`}
                                </p>
                              );
                            }
                          });
                        })
                      }
                    </Descriptions.Item>
                  );
                }
              })
            }
          </Descriptions>
        )
      }
    </Card>
  );
}

export default withRouter(SingleFilter);