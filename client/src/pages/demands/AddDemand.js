import React from 'react';
import { useHistory } from 'react-router-dom';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
import Checkbox from 'antd/lib/checkbox';
import Select from 'antd/lib/select';
import DatePicker from 'antd/lib/date-picker';

import { defineConfig } from '@/../config/config';
import { useAddNewDemandMutation } from './demandsSlice';
import PrivateForm from '@/utils/PrivateForm';

function AddDemandForm({ onFinish }) {
  const { Option } = Select;
  const { demandsColumnsInfo } = defineConfig;

  const name = 'create_demand_form';
  const initialValues = {
    description: '',
    columns: '',
    applicant: localStorage.getItem('email'),
  };
  const entriesData = demandsColumnsInfo.AddDemandFormColumns;
  const mapFn = ([key, value]) => {
    let rules = [{ required: true, message: `请输入${value}!` }];
    let content;
    let valuePropName;
    switch (key) {
      case 'description':
        content = <Input.TextArea allowClear showCount placeholder="填写需求的背景和描述" />;
        break;
      case 'cols':
        content = <Input.TextArea allowClear showCount placeholder="填写需求的字段" />;
        break;
      case 'applicant':
        content = <Input disabled />;
        break;
      case 'executor':
        content = (
          <Select placeholder="选择处理该需求的分析师">
            {
              ['yh']
                .map((option) => (
                  <Option value={option} key={option}>
                    {option}
                  </Option>
                ))
            }
          </Select>
        );
        break;
      case 'expectedTime':
        rules = [{ required: true, message: `请输入${value}!` }];
        content = (
          <DatePicker />
        );
        break;
      case 'isUrgency':
        rules = null;
        valuePropName = 'checked';
        content = (
          <Checkbox value="1">
            是否紧急
          </Checkbox>
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
        valuePropName={valuePropName}
      >
        {content}
      </Form.Item>
    );
  };

  return PrivateForm(null, name, entriesData, mapFn, initialValues, true, onFinish);
}

function AddDemand() {
  const history = useHistory();
  const [addNewDeamnd] = useAddNewDemandMutation();

  const onFinish = async (formData) => {
    try {
      await addNewDeamnd({
        ...formData,
        expectedTime: formData.expectedTime.format('YYYY-MM-DD'),
        status: 'waiting',
        reviewStatus: 'stop',
      }).unwrap();
      message.success('需求添加成功', 3);
      history.push('/demands');
    } catch (err) {
      message.error(`需求添加失败，错误:${err.data.error}`, 3);
    }
  };

  return (
    <AddDemandForm onFinish={onFinish} />
  );
}

export default AddDemand;
