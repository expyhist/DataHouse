import React from 'react';

import Card from 'antd/lib/card';
import Descriptions from 'antd/lib/descriptions';

import UpdateFilterModal from './UpdateFilterModal';
import { useGetFilterQuery } from './filtersSlice';

function SingleFilter({ id, url }) {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
  } = useGetFilterQuery(id);

  if (isLoading || isError) {
    return null;
  }

  // 不要使用JSON.parse or JSON.stringify, 会清空value
  const regex = /rangeDate|singleDate|text|enum/;

  return (
    <Card bordered={false}>
      {
        isSuccess && (
          <Descriptions
            title="筛选条件详情"
            style={{
              marginBottom: 32,
            }}
            bordered
            extra={<UpdateFilterModal filterId={id} singleFilter={data.data} url={url} />}
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
                } if (/.*At$/.test(key)) {
                  return (<Descriptions.Item label={key} key={key}>{value}</Descriptions.Item>);
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

export default SingleFilter;
