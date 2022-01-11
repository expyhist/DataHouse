import React from 'react';
import { withRouter } from 'react-router';

import Card from 'antd/lib/card';
import Descriptions from 'antd/lib/descriptions';

import UpdateFilterForm from './UpdateFilterForm';
import { useGetFilterQuery } from './filtersSlice';

function SingleFilter(props) {
  const { id, url } = props;

  const {
    data,
    isSuccess,
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
                        value.map((val) => Object.entries(val).map(([k, v]) => {
                          if (k !== '_id') {
                            return (
                              <p key={k}>
                                {`${k}: ${v}`}
                              </p>
                            );
                          }
                          return null;
                        }))
                      }
                    </Descriptions.Item>
                  );
                }
                return null;
              })
            }
          </Descriptions>
        )
      }
    </Card>
  );
}

export default withRouter(SingleFilter);
