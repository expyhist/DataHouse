import React, { useState } from 'react';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import message from 'antd/lib/message';

import { defineConfig } from '@/../config/config';
import { useAddNewRoleMutation } from '../sysConfigsSlice';
import { useGetMenusQuery } from '@/utils/apisSlice';
import withModalForm from '@/utils/withModalForm';
import FormInModal from '@/utils/FormInModal';

function RoleForm({ form }) {
  const { Option } = Select;
  const { sysConfigsColumnsInfo } = defineConfig;

  const {
    data,
    isLoading,
    isSuccess,
    isError,
  } = useGetMenusQuery();

  if (isLoading || isError) {
    return null;
  }

  const name = 'create_roles_form_in_modal';
  const entriesData = sysConfigsColumnsInfo.AddRoleFormColumns;
  const mapFn = ([key, value]) => {
    const rules = [{ required: true, message: `请输入${value}!` }];
    let content = <Input />;
    switch (key) {
      case 'auth':
        content = (
          <Select
            mode="multiple"
            placeholder="Please select a value"
          >
            {
              isSuccess && data.data
                .filter((item) => item.parentPath === '')
                .map((item) => (
                  <Option value={item.path} key={item.path}>
                    {item.path}
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

  return FormInModal(form, name, entriesData, mapFn);
}

const CreateRoleForm = withModalForm(RoleForm);

function AddRoleModal() {
  const [visible, setVisible] = useState(false);
  const [addNewRole] = useAddNewRoleMutation();

  const onCreate = async (formData) => {
    try {
      if (Array.isArray(formData.auth)) {
        const authObj = formData.auth.map((item) => {
          const obj = {};
          obj[item] = [];
          return obj;
        });
        await addNewRole({ ...formData, ...{ auth: authObj } }).unwrap();
        setVisible(false);
        message.success('角色添加成功', 3);
      }
    } catch (err) {
      message.error(`角色添加失败，错误:${err.data.error}`, 3);
    }
  };

  return (
    <CreateRoleForm
      buttonTitle="新增"
      onClick={() => {
        setVisible(true);
      }}
      visible={visible}
      title="新增角色"
      onCreate={onCreate}
      onCancel={() => {
        setVisible(false);
      }}
      okText="Create"
    />
  );
}

export default AddRoleModal;
