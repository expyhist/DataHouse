import React from 'react';

import Form from 'antd/lib/form';

const initalLayout = {
  labelCol: {
    offset: 2,
    span: 5,
  },
  wrapperCol: {
    span: 10,
  },
};

function FormInModal(form, name, entriesData, mapFn, initialValues = '', layout = initalLayout) {
  return (
    <Form
      {...layout}
      form={form}
      name={name}
      initialValues={initialValues}
    >
      {
        Object.entries(entriesData).map(mapFn)
      }
    </Form>
  );
}

export default FormInModal;
