import React from "react";
import produce from "immer";
import { useSelector, useDispatch } from "react-redux";

import message from "antd/lib/message";
import { DatePicker } from "antd";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Input from "antd/lib/input";

import moment from "moment";

import ExportTable from "@/components/ExportTable";
import { useGetFilterQuery } from "../Filters/filtersSlice";
import { useGetTableDataMutation, tableContentAdded } from "./tablesSlice";

const SingleTableFilter = (props) => {

  const { RangePicker } = DatePicker;
  const { filtersType, filtersOption } = props;
  
  let content;

  switch (filtersType) {
    case "rangeDate":
      content = (
        <RangePicker
          ranges={{
            Today: [moment(), moment()],
            "This Month": [moment().startOf("month"), moment().endOf("month")],
          }}
        />
      );
      break;
    case "singleDate":
      content = (
        <DatePicker
          ranges={{
            Today: [moment(), moment()],
            "This Month": [moment().startOf("month"), moment().endOf("month")],
          }}
        />
      );
      break;
    case "text":
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

const parseFormData = (filtersType, filtersOption, formData) => {

  const title = filtersOption.title;
  let payload = {};

  switch (filtersType) {
    case "rangeDate":
      const rangeData = [formData[title][0].format("YYYY-MM-DD"), formData[title][1].format("YYYY-MM-DD")];
      payload[filtersOption.startData] = rangeData[0]
      payload[filtersOption.endDate] = rangeData[1]
      break;
    case "singleDate":
      const singleDate = formData[title].format("YYYY-MM-DD");
      payload[filtersOption.date] = singleDate;
      break;
    case "text":
      const text = formData[title];
      payload[filtersOption.content] = text
      break;
  
    default:
      break;
  }
  
  return payload
}

const TableFilter = (props) => {

  const { payload, filterId } = props;
  const [getTableData] = useGetTableDataMutation();
  const tableContent = useSelector(state => state.tableContent);
  const dataSource = tableContent[tableContent.length-1].dataSource;
  const dispatch = useDispatch()

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetFilterQuery(filterId);

  if (isLoading || isError) {
    return null;
  }

  const filtersOption = isSuccess ? data.data: null;

  const ManyTableFilter = () => {
    let manyTableFilterList = [];
    if (isSuccess) {
      Object.entries(filtersOption).forEach(([key, value])=> {
        if(Array.isArray(value) && value.length !==0) {
          for (let i = 0; i < value.length; i++) {
            manyTableFilterList.push(<SingleTableFilter filtersType={key} filtersOption={value[i]} key={key+i}/>)
          } 
        }
      });
    }
    return manyTableFilterList
  }
  
  const onFinish = async(formData) => {

    if (formData === {}) {
      return message.error("查询错误，输入筛选条件", 3);
    }

    const newPayLoad = produce(payload, draft => {
      Object.entries(filtersOption).forEach(([key, value]) => {
        if(Array.isArray(value) && value.length !==0) {
          for (let i = 0; i < value.length; i++) {
            const newFormData = parseFormData(key, value[i], formData);
            Object.entries(newFormData).forEach(([key, value]) => {
              draft[key] = value
            });
          }
        }
      });
    });

    try {
      const tableData = await getTableData(newPayLoad).unwrap();
      const dataSource = tableData.data;
      const columns = Object
        .keys(dataSource[0])
        .map(value => { 
          if (value !== "uuid") {
            return {title: value, dataIndex: value, key: value}
          }
          return {title: null, dataIndex: null, key: null} 
        });
      if (dataSource && columns) {
        dispatch(
          tableContentAdded(dataSource, columns)
        )
      }
    } catch (err) {
      message.error(`报表获取失败，错误:${err.data.error}`, 3)
    }
  }

  return (
    <Form 
      layout="inline"
      name="table-filter"
      onFinish={onFinish}
    >
      <ManyTableFilter />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
      </Form.Item>
      <Form.Item>
        <ExportTable dataSource={dataSource}/>
      </Form.Item>
    </Form>
  );
}

export default TableFilter;