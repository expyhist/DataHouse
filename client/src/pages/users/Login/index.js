import React from 'react';
import { useHistory } from 'react-router';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Space from 'antd/lib/space';
import message from 'antd/lib/message';

import { useLoginMutation } from '../usersSlice';

function Login() {
  const [login] = useLoginMutation();
  const history = useHistory();

  const rememberCheckbox = localStorage.getItem('rememberCheckbox');
  const remerberEmail = localStorage.getItem('remerberEmail');

  const onFinish = async (formData) => {
    if (formData.remember) {
      localStorage.setItem('rememberCheckbox', formData.remember);
      localStorage.setItem('remerberEmail', formData.email);
    }

    try {
      await login({
        email: formData.email,
        password: formData.password,
      })
        .unwrap()
        .then((resp) => {
          localStorage.setItem('email', resp.email);
          localStorage.setItem('token', resp.token);
          localStorage.setItem('roles', resp.roles);
          localStorage.setItem('rolesName', resp.rolesName);
          message.success('登录成功', 3);
          history.push('/demands');
        });
    } catch (err) {
      message.error(`登录失败，错误:${err.data.message}`, 3);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onFinish={onFinish}
      autoComplete="off"
      initialValues={{
        email: remerberEmail || 'guest@datahouse.com',
        password: 'guest@datahouse.com',
      }}
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

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 4, span: 16 }}
        initialValue={rememberCheckbox || false}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
          <Button type="link" href="/users/register">
            没有账号？立即注册
          </Button>
        </Space>
      </Form.Item>

    </Form>
  );
}

export default Login;
