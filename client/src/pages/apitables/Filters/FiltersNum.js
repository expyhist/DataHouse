import React from 'react';
import { useDispatch } from 'react-redux';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Space from 'antd/lib/space';

import { filtersNumAdded } from './filtersSlice';
import { defineConfig } from '@/../config/config';

const { filtersInfo } = defineConfig;

function FiltersNum({ initialValues }) {
  const dispatch = useDispatch();

  const onFinish = (formData) => {
    dispatch(filtersNumAdded(formData));
  };

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
            .map((value) => (
              <Form.Item
                key={value}
                label={value}
                name={value}
                rules={[
                  { required: true },
                  { type: 'number', message: '请输入数字!', transform: (val) => parseInt(val, 10) },
                ]}
                normalize={(val) => parseInt(val, 10)}
              >
                <Input />
              </Form.Item>
            ))
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

export default FiltersNum;
