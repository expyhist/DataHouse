import React, { useState } from "react";

import { Form, Input, Button, message } from "antd";

import { defineConfig } from "@/../config/config";
import { useUpdateConfigMutation } from "./configsSlice";
import withModelForm from "@/utils/withModelForm";

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

  const { form, data } = props;
  const { _id, url, author, title, applicant } = data;
  const apiTablesColumnsInfo = defineConfig.apiTablesColumnsInfo;

  return (
    <Form
      {...layout}
      form={form}
      name="config_update_form_in_modal"
      initialValues={{
        id: _id,
        url: url,
        title: title,
        author: author,
        applicant: applicant
      }}
    >
      {
        Object.entries(apiTablesColumnsInfo.UpdateConfigFormColumns).map(([key,value]) => {
          return (
            <Form.Item
              key={key}
              label={value}
              name={key}
              rules={
                key === "url"
                ? [{ required: true, message: `请输入 ${value}!` }, { type: "url", message: `请输入正确 ${value}!` }]
                : [{ required: true, message: `请输入 ${value}!` }]
              }
            >
              { key === "id" ? <Input disabled={true}/> : <Input /> }
            </Form.Item>
          );
        })
      }
    </Form>
  ); 
}

const ConfigUpdateForm = withModelForm(ConfigForm);

const UpdateConfigForm = (props) => {

  const { singleConfig } = props;
  const [visible, setVisible] = useState(false);
  const [updateConfig] = useUpdateConfigMutation();

  const onCreate = async (formData) => {
    try {
      await updateConfig(formData)
        .unwrap()
        .then(() => {
          setVisible(false);
          message.success("配置更新成功", 3);
        });
    } catch (err) {
      message.error(`配置更新失败，错误:${err.data.error}`, 3)
    }
  }

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        更新
      </Button> 
        <ConfigUpdateForm
          visible={visible}
          title="更新API报表配置"
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
          okText={"Update"}
          data={singleConfig}
        />
    </div>
  );
}

export default UpdateConfigForm;