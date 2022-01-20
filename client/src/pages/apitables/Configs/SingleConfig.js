import React from 'react';
import { useParams } from 'react-router';

import Card from 'antd/lib/card';
import Descriptions from 'antd/lib/descriptions';

import UpdateConfigModal from './UpdateConfigModal';
import { useGetConfigQuery } from './configsSlice';
import SingleFilter from '../Filters/SingleFilter';

function SingleConfig() {
  const { id } = useParams();

  const {
    data,
    isLoading,
    isSuccess,
    isError,
  } = useGetConfigQuery(id);

  if (isLoading || isError) {
    return null;
  }

  const singleConfig = isSuccess && JSON.parse(JSON.stringify(data.data, ['_id', 'url', 'author', 'title', 'applicant', 'defaultParams', 'createdAt', 'updatedAt']));

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
              Object.entries(singleConfig).map(([key, value]) => (
                <Descriptions.Item label={key} key={key}>{value}</Descriptions.Item>
              ))
            }
          </Descriptions>
        </Card>
        <SingleFilter id={data.data.connection.filters} url={singleConfig.url} />
      </>
    )
  );
}

export default SingleConfig;
