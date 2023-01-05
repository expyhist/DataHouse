import React, { useState } from 'react';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';

import { defineConfig } from '@/../config/config';
import { useUpdateMenuMutation } from '../sysConfigsSlice';
import withModalForm from '@/utils/withModalForm';
import PrivateForm from '@/utils/PrivateForm';

function MenuForm({ form, initialValues }) {
  const { sysConfigsColumnsInfo } = defineConfig;

  const name = 'update_menu_form_in_modal';
  const entriesData = sysConfigsColumnsInfo.UpdateMenuFormColumns;
  const mapFn = ([key, value]) => {
    let rules = [];
    let disabled = false;
    switch (key) {
      case 'path':
        rules = [
          { required: true, message: `请输入${value}!` },
          {
            validator: async (_, path) => {
              if (!/^(\/\w+)+/.test(path)) {
                return Promise.reject(new Error('输入正确的路径格式。如，/a，/a/b'));
              }
              return null;
            },
          },
        ];
        break;
      case 'name':
        rules = [{ required: true, message: `请输入${value}!` }];
        break;
      case '_id':
        disabled = true;
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
        <Input disabled={disabled} />
      </Form.Item>
    );
  };

  return PrivateForm(form, name, entriesData, mapFn, initialValues);
}

const UpdateMenuForm = withModalForm(MenuForm);

function UpdateMenuModal({ initialValues }) {
  const [visible, setVisible] = useState(false);
  const [updateMenu] = useUpdateMenuMutation();

  const onCreate = async (formData) => {
    try {
      await updateMenu(formData).unwrap();
      setVisible(false);
      message.success('配置更新成功', 3);
    } catch (err) {
      message.error(`配置更新失败，${err.data.msg}`, 3);
    }
  };

  return (
    <UpdateMenuForm
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

export default UpdateMenuModal;
