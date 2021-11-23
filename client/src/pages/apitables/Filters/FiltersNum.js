import React from "react";
import { useDispatch } from "react-redux";

import { Form, Input, Button, Space } from "antd";

import { filtersNumAdded } from "./filtersSlice";
import { defineConfig } from "@/../config/config.js";

const filtersInfo = defineConfig.filtersInfo;

export const FiltersNum = (props) => {

  const { initialValues } = props
  const dispatch = useDispatch();

  const onFinish = (formData) => {
    dispatch(filtersNumAdded(formData))
  }

  return (
    <Form 
      name="filter-option-num"
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Space wrap>
        {
          Object
            .keys(filtersInfo)
            .map(value => {
              return (
                <Form.Item
                  key={value}
                  label={value}
                  name={value}
                  rules={[
                    { required: true },
                    { type: "number", message: `请输入数字!`, transform: value => parseInt(value) }
                  ]}
                  normalize={value => parseInt(value)}
                >
                  <Input />
                </Form.Item>
              );
            })
        }
      </Space>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
