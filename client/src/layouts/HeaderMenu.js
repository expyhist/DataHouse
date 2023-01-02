import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import Button from 'antd/lib/button';
import Menu from 'antd/lib/menu';
import Avatar from 'antd/lib/avatar';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';

import { AccessContext } from '@/utils/AccessContext';
import { useGetMenusQuery } from '@/utils/apisSlice';
import { defineConfig } from '@/../config/config';

function HeaderMenu() {
  const { sortList } = defineConfig;
  const access = useContext(AccessContext);

  const {
    data,
    isLoading,
    isSuccess,
    isError,
  } = useGetMenusQuery();

  if (isLoading || isError) {
    return null;
  }

  const headerNames = isSuccess && data.data.filter((item) => {
    const accessList = Object.keys(access);
    return item.parentPath === '/' && accessList.includes(item.path);
  });

  const loginOut = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('rolesName');
    localStorage.removeItem('token');
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
    >
      {
        isSuccess && headerNames
          .sort((a, b) => sortList[a.path] - sortList[b.path])
          .map((headerName) => {
            const { path, name } = headerName;
            return (
              <Menu.Item key={path}>
                <NavLink to={path}>
                  {name}
                </NavLink>
              </Menu.Item>
            );
          })
      }
      <Menu.Item key="/loginout">
        <NavLink to="/users/login">
          <Button danger type="text" icon={<LoginOutlined />} onClick={loginOut} />
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/profile">
        <NavLink to="/users/profile">
          <Avatar icon={<UserOutlined />} />
        </NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default HeaderMenu;
