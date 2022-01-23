import React, { useState } from 'react';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import Select from 'antd/lib/select';

import { defineConfig } from '@/../config/config';
import { useUpdateUserMutation, useGetRolesQuery } from './usersSlice';
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
  const { Option } = Select;
  const { userColumnsInfo } = defineConfig;

  const {
    data,
    isLoading,
    isSuccess,
    isError,
  } = useGetRolesQuery();

  if (isLoading || isError) {
    return null;
  }

  const options = isSuccess && data.data;

  return (
    <Form
      {...layout}
      form={form}
      name="update_user_form_in_modal"
      initialValues={initialValues}
    >
      {
        isSuccess
        && Object.entries(userColumnsInfo.UpdateUserFormColumns).map(([key, value]) => {
          let rules;
          let content;
          switch (key) {
            case '_id':
            case 'password':
              content = <Input disabled />;
              break;
            case 'rolesName':
              content = (
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Please select a value"
                >
                  {
                  options
                    .map((option) => (
                      <Option value={option.name} key={option.name}>
                        {option.name}
                      </Option>
                    ))
                }
                </Select>
              );
              break;
            default:
              rules = [];
              content = <Input />;
          }
          return (
            <Form.Item
              key={key}
              label={value}
              name={key}
              rules={rules}
            >
              {content}
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
      await updateUser(formData)
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
