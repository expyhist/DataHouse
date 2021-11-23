import React, { useState, useEffect } from "react";

import { Form, Input, Button, message } from "antd";

import { defineConfig } from "@/../config/config";
import { useAddNewConfigMutation } from "./configsSlice";
import { useAddNewMenuMutation } from "@/pages/sysConfigs/sysConfigsSlice";
import withModalForm from "@/utils/withModalForm";

const layout = {
  labelCol: {
    offset: 2,
    span: 5
  },
  wrapperCol: {
    span: 10
  }
};

const ConfigForm = (props) => {

  const { form } = props;
  const apiTablesColumnsInfo = defineConfig.apiTablesColumnsInfo;

  return (
    <Form
      {...layout}
      form={form}
      name="config_create_form_in_modal"
    >
      {
        Object.entries(apiTablesColumnsInfo.AddConfigFormColumns).map(([key, value]) => {
          return (
            <Form.Item
              initialValue={""}
              key={key}
              label={value}
              name={key}
              rules={
                key === "url"
                ? [{ required: true, message: `请输入 ${value}!` }, { type: "url", message: `请输入正确 ${value}!` }]
                : [{ required: true, message: `请输入 ${value}!` }]
              }
            >
              <Input />
            </Form.Item>
          );
        })
      }
    </Form>
  ); 
}

const ConfigCreateForm = withModalForm(ConfigForm);

const AddConfigForm = () => {

  const [visible, setVisible] = useState(false);
  const [newConfig, setNewConfig] = useState({});
  const [addNewConfig] = useAddNewConfigMutation();
  const [addNewMenu] = useAddNewMenuMutation();

  const onCreate = async (formData) => {
    
    try {
      await addNewConfig(formData)
        .unwrap()
        .then((resp) => {
          setNewConfig(resp);
          setVisible(false);
          message.success("配置添加成功", 3);
        });
    } catch (err) {
      message.error(`配置添加失败，错误:${err.data.error}`, 3)
    }
  }

  useEffect(
    async () => {
      if (Object.keys(newConfig).length !== 0) {
        try {
          await addNewMenu({
            "apiTableId": newConfig.id,
            "parentPath": "/tables/databoard/:id",
            "path": `/tables/databoard/${newConfig.id}`,
            "name": newConfig.title
          })
          .unwrap()
          .then(() => {
            message.success("菜单添加成功", 3);
          });
        } catch (error) {
          message.error(`菜单添加失败，错误:${error.data.error}`, 3)
        }
      }
    }, [newConfig]
  );

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        新增
      </Button>
      <ConfigCreateForm
        visible={visible}
        title="新增API报表"
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        okText={"Create"}
      />
    </div>
  );
}

export default AddConfigForm;