import React from "react"

import { Select, Form, Divider, Tag } from "antd";

import { defineConfig } from "@/../config/config";

const filtersInfo = defineConfig.filtersInfo;

const SingleFiltersOption = (props) => {

  const { keyName, rank, options } = props;
  const { Option } = Select;

  return (
    <>
      <Divider>{filtersInfo[keyName]["cn"]}</Divider>
      {
        filtersInfo[keyName]["values"].map(filterValue => {
          const unique = rank + "-" + keyName + "-" + filterValue;
          const content = filterValue === "title" ? (<input />) : (
            <Select placeholder="Please select a value">
              {
                Object
                  .keys(options)
                  .map(option => (
                        <Option value={option} key={unique + "-" + option}>
                          {option}
                        </Option>
                        )
                      )
              }
            </Select>
          );
          return (
            <Form.Item
              initialValue={""}
              label={filterValue}
              name={unique}
              key={unique}
            >
              {content}
            </Form.Item>
          );
        })
      }
    </>
  );
}

export const FiltersOption = (props) => {

  const { url, form, filtersNum } = props;

  const urlParams = url.match(/(?<=\?)(.*)/g)[0];
  const urlParamsJson = JSON.parse(`{"` + urlParams.replaceAll(`=`, `":"`).replaceAll(`&`, `","`) + `"}`);
  const regex = new RegExp("appCode|pageNum|pageSize");
  const options = JSON.parse(JSON.stringify(urlParamsJson, (k, v) => { if (typeof k === "string" && regex.test(k)) { return undefined } return v }));

  return (
    <Form 
      name="filter-option"
      form = {form}
    >
      {
        options && 
        Object.keys(options).map(key => {
          return (<Tag color="cyan" key={key}>{key}</Tag>);
        })
      }
      {
        filtersNum && 
        Object.entries(filtersNum).map(([key, value]) => {
          for (let i=0; i<parseInt(value); i++) {
            return (<SingleFiltersOption keyName={key} rank={i} options={options} key={key+i} />);
          }
        })
      }
    </Form>
  );
}
