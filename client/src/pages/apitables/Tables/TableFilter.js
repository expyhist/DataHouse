import React, { useContext } from 'react';
import produce from 'immer';
import { useSelector, useDispatch } from 'react-redux';

import message from 'antd/lib/message';
import { DatePicker } from 'antd';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';

import moment from 'moment';

import ExportTable from '@/components/ExportTable';
import Access from '@/utils/Access';
import { AccessContext } from '@/utils/AccessContext';
import { parseFormData } from './parseFormData';
import { useGetFilterQuery } from '../Filters/filtersSlice';
import { useGetTableDataMutation, tableContentAdded } from './tablesSlice';

function SingleTableFilter({ filtersType, filtersOption }) {
  const { RangePicker } = DatePicker;

  let content;

  switch (filtersType) {
    case 'rangeDate':
      content = (
        <RangePicker
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
          }}
        />
      );
      break;
    case 'singleDate':
      content = (
        <DatePicker
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
          }}
        />
      );
      break;
    case 'text':
      content = (<Input />);
      break;

    default:
      break;
  }

  return (
    <Form.Item
      label={filtersOption.title}
      name={filtersOption.title}
      key={filtersOption.title}
    >
      {content}
    </Form.Item>
  );
}

function TableFilter({ configInfo, payload }) {
  const { connection, title } = configInfo;
  const access = useContext(AccessContext);
  const [getTableData] = useGetTableDataMutation();
  const tableContent = useSelector((state) => state.tableContent);
  const { dataSource } = tableContent[tableContent.length - 1];
  const dispatch = useDispatch();

  const {
    data,
    isLoading,
    isSuccess,
    isError,
  } = useGetFilterQuery(connection?.filters);

  if (isLoading || isError) {
    return null;
  }

  const filtersOption = isSuccess ? data.data : null;

  const ManyTableFilter = () => {
    const manyTableFilterList = [];
    Object.entries(filtersOption).map(([key, value]) => {
      if (Array.isArray(value) && value.length !== 0) {
        for (let i = 0; i < value.length; i += 1) {
          manyTableFilterList.push(
            <SingleTableFilter filtersType={key} filtersOption={value[i]} key={key + i} />,
          );
        }
      }
      return null;
    });
    return manyTableFilterList;
  };

  const onFinish = async (formData) => {
    if (formData === {}) {
      message.error('查询错误，输入筛选条件', 3);
      return null;
    }

    const newPayLoad = produce(payload, (draft) => {
      const aData = draft;
      Object.entries(filtersOption).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length !== 0) {
          for (let i = 0; i < value.length; i += 1) {
            const newFormData = parseFormData(key, value[i], formData);
            Object.entries(newFormData).forEach(([k, v]) => {
              aData[k] = v;
            });
          }
        }
      });
      return aData;
    });

    try {
      const tableData = await getTableData(newPayLoad).unwrap();
      const aDataSource = tableData.data;
      const columns = Object
        .keys(aDataSource[0])
        .map((value) => {
          if (value !== 'uuid') {
            return { title: value, dataIndex: value, key: value };
          }
          return { title: null, dataIndex: null, key: null };
        });
      if (aDataSource && columns) {
        dispatch(
          tableContentAdded(aDataSource, columns),
        );
      }
    } catch (err) {
      message.error(`报表获取失败，错误:${err.data.error}`, 3);
    }

    return null;
  };

  return (
    <Form
      layout="inline"
      name="table-filter"
      onFinish={onFinish}
    >
      <ManyTableFilter />
      <Form.Item>
        <Access accessible={access[`${title}-GetTableData`]}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Access>
      </Form.Item>
      <Form.Item>
        <Access accessible={access[`${title}-GetTableData`]}>
          <ExportTable dataSource={dataSource} />
        </Access>
      </Form.Item>
    </Form>
  );
}

export default TableFilter;
