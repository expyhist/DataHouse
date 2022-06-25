import React from 'react';
import { useParams } from 'react-router-dom';

import Timeline from 'antd/lib/timeline';
import Card from 'antd/lib/card';
import Descriptions from 'antd/lib/descriptions';
import Space from 'antd/lib/space';

import { useGetDemandQuery } from './demandsSlice';
import { defineConfig } from '@/../config/config';

function SingleDemand() {
  const { id } = useParams();
  const { demandsColumnsInfo } = defineConfig;

  const {
    data,
    isLoading,
    isSuccess,
    isError,
  } = useGetDemandQuery(id);

  if (isLoading || isError) {
    return null;
  }
  const singleDemand = isSuccess && JSON.parse(
    JSON.stringify(data.data, demandsColumnsInfo.SingleDemandColumns),
  );

  return (
    isSuccess && (
      <Space>
        <Timeline
          mode="left"
          style={{
            padding: 10,
            border: 'solid',
          }}
        >
          <Timeline.Item label="2015-09-01">Create a services</Timeline.Item>
          <Timeline.Item label="2015-09-01 09:12:11">Solve initial network problems</Timeline.Item>
        </Timeline>
        <Card bordered={false}>
          <Descriptions
            title="配置详情"
            style={{
              marginBottom: 32,
            }}
            bordered
            // extra={<UpdateConfigModal singleConfig={singleConfig} />}
          >
            {
              Object.entries(singleDemand).map(([key, value]) => (key !== '_id' ? (<Descriptions.Item label={key} key={key}>{value}</Descriptions.Item>) : null))
            }
          </Descriptions>
        </Card>
      </Space>
    )
  );
}

export default SingleDemand;
