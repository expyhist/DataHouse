import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import Table from 'antd/lib/table';
import Result from 'antd/lib/result';

import TableFilter from './TableFilter';
import { parseParamFromURL } from '@/utils/parseParamFromURL';
import { useGetConfigQuery } from '../Configs/configsSlice';

function ApiTable() {
  const { id } = useParams();

  const tableContent = useSelector((state) => state.tableContent);
  const { dataSource } = tableContent[tableContent.length - 1];
  const { columns } = tableContent[tableContent.length - 1];

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetConfigQuery(id);

  let content;
  let payload;

  if (isLoading) {
    content = <Table dataSource={null} columns={null} loading={isLoading} />;
  } else if (isSuccess) {
    content = <Table dataSource={dataSource} columns={columns} rowKey="uuid" loading={!isSuccess} />;
    const urlParams = parseParamFromURL(data.data.url);
    payload = { ...urlParams, ...data.data.defaultParams, id };
  } else if (isError && error.data.message !== 'Unauthorized') {
    content = <Result status="error" title="未能获得报表数据" />;
  } else {
    content = <Result status="error" title="无权获得报表数据" />;
  }

  return (
    <>
      {isSuccess && <TableFilter filterId={data.data.connection?.filters} payload={payload} />}
      {content}
    </>
  );
}

export default ApiTable;
