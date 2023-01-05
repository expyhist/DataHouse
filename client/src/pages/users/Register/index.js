import React from 'react';
import { useHistory } from 'react-router-dom';
import config from 'webpackConfig';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Space from 'antd/lib/space';
import message from 'antd/lib/message';

import { useRegisterMutation } from '../usersSlice';
import { useGetPublicKeyQuery } from '@/utils/apisSlice';
import { encryptedByRSA } from '@/utils/encryptedByRSA';

function Register() {
  const [register] = useRegisterMutation();
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

  const onFinish = async (formData) => {
    try {
      const { email, password } = formData;
      const encryptedPassword = encryptedByRSA(password, data);

      await register({
        email,
        password: encryptedPassword,
      })
        .unwrap();

      message.success('注册成功', 3);
      history.push('/login');
    } catch (err) {
      message.error(`注册失败，${err.data.msg}`);
    }
  };

  return isSuccess && (
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
