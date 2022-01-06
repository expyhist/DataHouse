import React from "react";
import { withRouter } from "react-router";

import Card from "antd/lib/card";
import Descriptions from "antd/lib/descriptions";

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

  const regex = /rangeDate|singleDate|text|enum/;

  return (
    <Card bordered={false}>
      {
        isSuccess && data.data !== null && (
          <Descriptions
            title="筛选条件详情"
            style={{
              marginBottom: 32,
            }}
            bordered
            extra={<UpdateFilterForm filterId={id} singleFilter={data.data} url={url} />}
          >
            {
              Object.entries(data.data).map(([key, value]) => {
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