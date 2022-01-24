import React from 'react';

import Form from 'antd/lib/form';
import Modal from 'antd/lib/modal';
import message from 'antd/lib/message';
import Button from 'antd/lib/button';

const withModalForm = (WrappedComponent) => {
  function HOC({
    visible, title, buttonType, buttonTitle, onClick, onCancel, onCreate, okText, ...other
  }) {
    const [form] = Form.useForm();

    return (
      <>
        <Button
          type={buttonType || 'primary'}
          onClick={onClick}
        >
          {buttonTitle}
        </Button>
        <Modal
          visible={visible}
          title={title}
          okText={okText}
          cancelText="Cancel"
          onCancel={onCancel}
          onOk={
            () => {
              form
                .validateFields()
                .then((values) => {
                  form.resetFields();
                  onCreate(values);
                })
                .catch((err) => message.error(err, 3));
            }
          }
        >
          <WrappedComponent form={form} {...other} />
        </Modal>
      </>
    );
  }
  return HOC;
};

export default withModalForm;
