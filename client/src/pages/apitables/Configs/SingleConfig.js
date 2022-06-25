import React from 'react';
import { useParams } from 'react-router-dom';

import Card from 'antd/lib/card';
import Descriptions from 'antd/lib/descriptions';

import UpdateConfigModal from './UpdateConfigModal';
import { useGetConfigQuery } from './configsSlice';
import SingleFilter from '../Filters/SingleFilter';
import { defineConfig } from '@/../config/config';

function SingleConfig() {
  const { id } = useParams();
  const { apiTablesColumnsInfo } = defineConfig;

  const {
    data,
    isLoading,
    isSuccess,
    isError,
  } = useGetConfigQuery(id);

  if (isLoading || isError) {
    return null;
  }
  const singleConfig = isSuccess && JSON.parse(
    JSON.stringify(data.data, apiTablesColumnsInfo.SingleConfigColumns),
  );

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
            extra={<UpdateConfigModal singleConfig={singleConfig} />}
          >
            {
              Object.entries(singleConfig).map(([key, value]) => (key !== '_id' ? (<Descriptions.Item label={key} key={key}>{value}</Descriptions.Item>) : null))
            }
          </Descriptions>
        </Card>
        <SingleFilter id={data.data?.filters} url={singleConfig.url} />
      </>
    )
  );
}

export default SingleConfig;
