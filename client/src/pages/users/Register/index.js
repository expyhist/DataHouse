import React from 'react';
import { useHistory } from 'react-router-dom';
import config from 'config';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Space from 'antd/lib/space';
import message from 'antd/lib/message';

import { useRegisterMutation } from '../usersSlice';

function Register() {
  const [register] = useRegisterMutation();
  const history = useHistory();

  const onFinish = async (formData) => {
    try {
      await register({
        email: formData.email,
        password: formData.password,
      })
        .unwrap();
      message.success('注册成功', 3);
      history.push('/login');
    } catch (err) {
      message.error(`注册失败，错误:${err.data.error}`);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="邮件"
        name="email"
        rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Space>
          <Button type="primary" htmlType="submit" disabled={config.rejectRegister}>
            注册
          </Button>
          <Button type="link" href="/users/login">
            已经有账号？立即登录
          </Button>
        </Space>
      </Form.Item>

    </Form>
  );
}

export default Register;
