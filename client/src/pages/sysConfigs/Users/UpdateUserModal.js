import React, { useState } from 'react';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
import Select from 'antd/lib/select';

import { defineConfig } from '@/../config/config';
import { useGetRolesQuery } from '../sysConfigsSlice';
import { useUpdateUserMutation } from '@/pages/users/usersSlice';
import withModalForm from '@/utils/withModalForm';
import PrivateForm from '@/utils/PrivateForm';

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

  const name = 'update_user_form_in_modal';
  const entriesData = userColumnsInfo.UpdateUserFormColumns;
  const mapFn = ([key, value]) => {
    const rules = [];
    let content = <Input />;
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
              isSuccess && data.data.map((option) => (
                <Option value={option.name} key={option.name}>
                  {option.name}
                </Option>
              ))
            }
          </Select>
        );
        break;
      default:
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
  };

  return PrivateForm(form, name, entriesData, mapFn, initialValues);
}

const UpdateUserForm = withModalForm(UserForm);

function UpdateUserModal({ initialValues }) {
  const [visible, setVisible] = useState(false);
  const [updateUser] = useUpdateUserMutation();

  const onCreate = async (formData) => {
    try {
      await updateUser(formData).unwrap();
      setVisible(false);
      message.success('配置更新成功', 3);
    } catch (err) {
      message.error(`配置更新失败，${err.data.msg}`, 3);
    }
  };

  return (
    <UpdateUserForm
      buttonType="link"
      buttonTitle="更新"
      onClick={() => {
        setVisible(true);
      }}
      visible={visible}
      title="更新菜单"
      onCreate={onCreate}
      onCancel={() => {
        setVisible(false);
      }}
      okText="Update"
      initialValues={initialValues}
    />
  );
}

export default UpdateUserModal;
