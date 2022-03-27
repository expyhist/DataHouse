import React from 'react';

import Form from 'antd/lib/form';
import Button from 'antd/lib/button';

const initalLayout = {
  labelCol: {
    offset: 2,
    span: 5,
  },
  wrapperCol: {
    span: 10,
  },
};

function PrivateForm(
  form,
  name,
  entriesData,
  mapFn,
  initialValues,
  isButton,
  onFinish,
  layout = initalLayout,
) {
  const [formDefault] = Form.useForm();
  return onFinish ? (
    <Form
      {...layout}
      form={form || formDefault}
      name={name}
      initialValues={initialValues || ''}
      onFinish={onFinish}
    >
      {
        Object.entries(entriesData).map(mapFn)
      }
      {
        isButton ? (
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        ) : null
      }
    </Form>
  ) : (
    <Form
      {...layout}
      form={form || formDefault}
      name={name}
      initialValues={initialValues || ''}
    >
      {
        Object.entries(entriesData).map(mapFn)
      }
      {
        isButton ? (
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        ) : null
      }
    </Form>
  );
}

export default PrivateForm;
