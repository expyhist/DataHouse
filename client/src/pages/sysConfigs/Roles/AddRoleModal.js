import React, { useState } from 'react';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
import TreeSelect from 'antd/lib/tree-select';

import { defineConfig } from '@/../config/config';
import { useGetMenusByTreeQuery } from '@/utils/apisSlice';
import { useAddNewRoleMutation } from '../sysConfigsSlice';
import withModalForm from '@/utils/withModalForm';
import PrivateForm from '@/utils/PrivateForm';

const layout = {
  labelCol: {
    offset: 1,
    span: 4,
  },
  wrapperCol: {
    span: 100,
  },
};

function RoleForm({ form, roleTreeData }) {
  const { sysConfigsColumnsInfo } = defineConfig;
  const { SHOW_ALL } = TreeSelect;

  const name = 'create_roles_form_in_modal';
  const entriesData = sysConfigsColumnsInfo.AddRoleFormColumns;
  const mapFn = ([key, value]) => {
    const rules = [{ required: true, message: `请输入${value}!` }];
    let content = <Input />;
    switch (key) {
      case 'auth':
        content = (
          <TreeSelect
            treeData={roleTreeData}
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeCheckable
            showCheckedStrategy={SHOW_ALL}
            showSearch
            allowClear
            treeDefaultExpandAll
            placeholder="输入并搜索"
          />
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

  return PrivateForm(form, name, entriesData, mapFn, null, false, null, layout);
}

const CreateRoleForm = withModalForm(RoleForm);

function AddRoleModal() {
  const [visible, setVisible] = useState(false);
  const [addNewRole] = useAddNewRoleMutation();

  const {
    data,
    isLoading,
    isSuccess,
    isError,
  } = useGetMenusByTreeQuery();

  if (isLoading || isError) {
    return null;
  }

  const onCreate = async (formData) => {
    try {
      if (Array.isArray(formData.auth)) {
        await addNewRole({ ...formData, ...{ menusTree: data?.data } }).unwrap();
        setVisible(false);
        message.success('角色添加成功', 3);
      }
    } catch (err) {
      message.error(`角色添加失败，${err.data.msg}`, 3);
    }
  };

  return isSuccess && (
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
      roleTreeData={data?.data}
    />
  );
}

export default AddRoleModal;
