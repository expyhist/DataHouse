import React, { useState } from 'react';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
import TreeSelect from 'antd/lib/tree-select';

import { defineConfig } from '@/../config/config';
import { useGetMenusByTreeQuery } from '@/utils/apisSlice';
import { useUpdateRoleMutation } from '../sysConfigsSlice';
import withModalForm from '@/utils/withModalForm';
import FormInModal from '@/utils/FormInModal';

const layout = {
  labelCol: {
    offset: 2,
    span: 3,
  },
  wrapperCol: {
    span: 100,
  },
};

function RoleForm({ form, initialValues, treeData }) {
  const { sysConfigsColumnsInfo } = defineConfig;
  const { SHOW_ALL } = TreeSelect;

  const name = 'update_role_form_in_modal';
  const entriesData = sysConfigsColumnsInfo.UpdateRoleFormColumns;
  const mapFn = ([key, value]) => {
    const rules = [];
    let content = <Input />;
    switch (key) {
      case '_id':
        content = <Input disabled />;
        break;
      case 'auth':
        content = (
          <TreeSelect
            treeData={treeData}
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

  return FormInModal(form, name, entriesData, mapFn, initialValues, layout);
}

const UpdateRoleForm = withModalForm(RoleForm);

function UpdateRoleModal({ initialValues }) {
  const [visible, setVisible] = useState(false);
  const [updateRole] = useUpdateRoleMutation();

  const pushObjToArray = (obj, arr) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (Array.isArray(key)) {
        arr.push(...key);
      } else arr.push(key);
      if (Array.isArray(value)) {
        arr.push(...value);
      } else arr.push(value);
    });
    return arr;
  };

  const initalAuths = initialValues.auth
    .reduce((acc, cur) => {
      const arr = [];
      pushObjToArray(cur, arr);
      return acc.concat(arr);
    }, []);

  const onCreate = async (formData) => {
    try {
      await updateRole(formData).unwrap();
      setVisible(false);
      message.success('权限更新成功', 3);
    } catch (err) {
      message.error(`权限更新失败，错误:${err.data.error}`, 3);
    }
  };

  const {
    data,
    isLoading,
    isSuccess,
    isError,
  } = useGetMenusByTreeQuery();

  if (isLoading || isError) {
    return null;
  }

  return (
    isSuccess && (
      <UpdateRoleForm
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
        initialValues={{ ...initialValues, auth: initalAuths }}
        treeData={data.data}
      />
    )
  );
}

export default UpdateRoleModal;
