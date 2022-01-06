import React, { useState } from "react";

import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import message from "antd/lib/message";

import { defineConfig } from "@/../config/config";
import { useAddNewDemandMutation } from "./demandsSlice";
import withModalForm from "@/utils/withModalForm";

const layout = {
  labelCol: {
    offset: 2,
    span: 5
  },
  wrapperCol: {
    span: 15
  }
};

const DemandForm = (props) => {

  const { form } = props;
  const demandsColumnsInfo = defineConfig.demandsColumnsInfo;

  return (
    <Form
      {...layout}
      form={form}
      name="demand_create_form_in_modal"
    >
      {
        Object.entries(demandsColumnsInfo.AddDemandFormColumns)
          .map(([key, value]) => {
            return (
              <Form.Item
                initialValue={""}
                key={key}
                label={value}
                name={key}
                rules={[{ required: true, message: `请输入 ${value}!` }]}
              >
                <Input />
              </Form.Item>
            );
          })
      }
    </Form>
  ); 
}

const DemandCreateForm = withModalForm(DemandForm);

const AddDemandForm = () => {

  const [visible, setVisible] = useState(false);
  const [addNewDeamnd] = useAddNewDemandMutation();

  const onCreate = async (formData) => {
    const { description, content, applicant } = formData;
    try {
      await addNewDeamnd({ description, content, applicant, status: "waiting", reviewStatus: "stop" })
        .unwrap()
        .then(() => {
          setVisible(false);
          message.success("需求添加成功", 3);
        });
    } catch (err) {
      message.error(`需求添加失败，错误:${err.data.error}`, 3)
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
        新增
      </Button>
      <DemandCreateForm
        visible={visible}
        title="新增需求"
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        okText={"Create"}
      />
    </div>
  );

}

export default AddDemandForm;