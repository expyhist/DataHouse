import React, { useState } from 'react';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';

import { defineConfig } from '@/../config/config';
import { useUpdateUserMutation } from './usersSlice';
import withModalForm from '@/utils/withModalForm';

const layout = {
  labelCol: {
    offset: 2,
    span: 5,
  },
  wrapperCol: {
    span: 10,
  },
};

function UserForm({ form, initialValues }) {
  const { userColumnsInfo } = defineConfig;

  return (
    <Form
      {...layout}
      form={form}
      name="update_menu_form_in_modal"
      initialValues={initialValues}
    >
      {
        Object.entries(userColumnsInfo.UpdateUserFormColumns).map(([key, value]) => {
          let rules;
          let disabled;
          switch (key) {
            case '_id':
            case 'password':
              disabled = true;
              break;
            default:
              rules = [];
              disabled = false;
          }
          return (
            <Form.Item
              key={key}
              label={value}
              name={key}
              rules={rules}
            >
              <Input disabled={disabled} />
            </Form.Item>
          );
        })
      }
    </Form>
  );
}

const UpdateUserForm = withModalForm(UserForm);

function UpdateUserModal({ initialValues }) {
  const [visible, setVisible] = useState(false);
  const [updateUser] = useUpdateUserMutation();

  const onCreate = async (formData) => {
    try {
      await updateUser({ ...formData, ...{ roles: [formData.roles] } })
        .unwrap()
        .then(() => {
          setVisible(false);
          message.success('配置更新成功', 3);
        });
    } catch (err) {
      message.error(`配置更新失败，错误:${err.data.error}`, 3);
    }
  };

  return (
    <div>
      <Button
        type="link"
        onClick={() => {
          setVisible(true);
        }}
      >
        更新
      </Button>
      <UpdateUserForm
        visible={visible}
        title="更新菜单"
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        okText="Update"
        initialValues={initialValues}
      />
    </div>
  );
}

export default UpdateUserModal;
