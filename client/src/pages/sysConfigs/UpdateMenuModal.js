import React, { useState } from 'react';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';

import { defineConfig } from '@/../config/config';
import { useUpdateMenuMutation } from './sysConfigsSlice';
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

function MenuForm({ form, initialValues }) {
  const { sysConfigsColumnsInfo } = defineConfig;

  return (
    <Form
      {...layout}
      form={form}
      name="update_menu_form_in_modal"
      initialValues={initialValues}
    >
      {
        Object.entries(sysConfigsColumnsInfo.UpdateMenuFormColumns).map(([key, value]) => {
          let rules;
          let disabled;
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

const UpdateMenuForm = withModalForm(MenuForm);

function UpdateMenuModal({ initialValues }) {
  const [visible, setVisible] = useState(false);
  const [updateMenu] = useUpdateMenuMutation();

  const onCreate = async (formData) => {
    try {
      await updateMenu(formData)
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
      <UpdateMenuForm
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

export default UpdateMenuModal;
