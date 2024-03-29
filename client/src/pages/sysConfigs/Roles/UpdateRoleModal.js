import React, { useState } from 'react';
import { Base64 } from 'js-base64';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
import TreeSelect from 'antd/lib/tree-select';

import { defineConfig } from '@/../config/config';
import { useGetAuthsQuery } from '@/utils/apisSlice';
import { useUpdateRoleMutation } from '../sysConfigsSlice';
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

function RoleForm({ form, initialValues, roleTreeData }) {
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
        key={key + value}
        label={value}
        name={key}
        rules={rules}
      >
        {content}
      </Form.Item>
    );
  };

  return PrivateForm(form, name, entriesData, mapFn, initialValues, false, null, layout);
}

const UpdateRoleForm = withModalForm(RoleForm);

function UpdateRoleModal({ roleTreeData, initialValues }) {
  const [visible, setVisible] = useState(false);
  const [updateRole] = useUpdateRoleMutation();

  const {
    data,
    isLoading,
    isSuccess,
    isError,
  } = useGetAuthsQuery(Base64.encode(JSON.stringify({ rolesName: initialValues.name })));

  if (isLoading || isError) {
    return null;
  }

  const filterAuth = isSuccess && Object.keys(data.data).filter((item) => !/^(\/\w+)+/.test(item));

  const onCreate = async (formData) => {
    try {
      await updateRole({ ...formData, ...{ menusTree: roleTreeData } }).unwrap();
      setVisible(false);
      message.success('权限更新成功', 3);
    } catch (err) {
      message.error(`权限更新失败，${err.data.msg}`, 3);
    }
  };

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
        initialValues={{ ...initialValues, auth: filterAuth }}
        roleTreeData={roleTreeData}
      />
    )
  );
}

export default UpdateRoleModal;
