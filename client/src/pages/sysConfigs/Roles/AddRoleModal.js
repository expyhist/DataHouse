import React, { useState } from 'react';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
// import Button from 'antd/lib/button';
import message from 'antd/lib/message';
// import Select from 'antd/lib/select';

import { defineConfig } from '@/../config/config';
import { useAddNewRoleMutation } from '../sysConfigsSlice';
// import MenusTree from '../MenusTree';
import withModalForm from '@/utils/withModalForm';
import FormInModal from '@/utils/FormInModal';

function RoleForm({ form }) {
  const { sysConfigsColumnsInfo } = defineConfig;

  const name = 'create_roles_form_in_modal';
  const entriesData = sysConfigsColumnsInfo.AddRoleFormColumns;
  const mapFn = ([key, value]) => {
    const rules = [{ required: true, message: `请输入${value}!` }];
    const content = <Input />;
    // switch (key) {
    //   case 'auth':
    //     content =
    //     break;
    //   default:
    // }
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
      await addNewRole(formData).unwrap();
      setVisible(false);
      message.success('角色添加成功', 3);
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
