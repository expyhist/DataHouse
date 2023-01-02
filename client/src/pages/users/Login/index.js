import React from 'react';
import { useHistory } from 'react-router-dom';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Space from 'antd/lib/space';
import message from 'antd/lib/message';

import { useLoginMutation } from '../usersSlice';
import { useGetPublicKeyQuery } from '@/utils/apisSlice';
import { encryptedByRSA } from '@/utils/encryptedByRSA';

function Login() {
  const [login] = useLoginMutation();
  const {
    data,
    isLoading,
    isSuccess,
    isError,
  } = useGetPublicKeyQuery();
  const history = useHistory();

  if (isLoading || isError) {
    return null;
  }

  const rememberCheckbox = localStorage.getItem('rememberCheckbox');
  const remerberEmail = localStorage.getItem('remerberEmail');

  const onFinish = async (formData) => {
    if (formData.remember) {
      localStorage.setItem('rememberCheckbox', formData.remember);
      localStorage.setItem('remerberEmail', formData.email);
    } else if (rememberCheckbox) {
      localStorage.removeItem('rememberCheckbox');
      localStorage.removeItem('remerberEmail');
    }

    try {
      const { email, password } = formData;
      const encryptedPassword = encryptedByRSA(password, data);

      const resp = await login({
        email,
        password: encryptedPassword,
      }).unwrap();

      if (!resp.success) {
        message.error(resp.msg, 3);
        return null;
      }

      localStorage.setItem('email', resp.email);
      localStorage.setItem('token', resp.token);
      localStorage.setItem('rolesName', resp.rolesName);
      message.success('登录成功', 3);
      history.push('/demands');
      location.reload();
    } catch (err) {
      message.error(`登录失败，错误:${err.msg}`, 3);
    }
  };

  return isSuccess && (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onFinish={onFinish}
      autoComplete="off"
      initialValues={{
        email: remerberEmail || 'guest@datahouse.com',
        password: remerberEmail ? '' : 'guest@datahouse.com',
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
