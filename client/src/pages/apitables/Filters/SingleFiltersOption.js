import React from "react";

import { Select, Form, Divider } from "antd";

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

export default SingleFiltersOption;