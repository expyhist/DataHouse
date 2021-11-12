import React from "react";

import { Form, Modal, message } from "antd";

const withModelForm = (WrappedComponent) => {

  const HOC = ({ ...props }) => {

    const { visible, title, onCancel, onCreate, okText } = props;
    const [form] = Form.useForm();
    
    return (
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
              .then(values => { 
                form.resetFields();
                onCreate(values);
              })
              .catch(err => message.error(err, 3));
          }
        }
      >
        <WrappedComponent form={form} {...props} />
      </Modal>
    );
  }
  return HOC;
};

export default withModelForm;