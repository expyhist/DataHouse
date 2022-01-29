import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import Button from 'antd/lib/button';
import Menu from 'antd/lib/menu';
import { LoginOutlined } from '@ant-design/icons';

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
  } = useGetMenusQuery('normal');

  if (isLoading || isError) {
    return null;
  }

  const pages = isSuccess && data.data.filter((item) => {
    const accessList = Object.keys(access);
    return item.parentPath === '' && accessList.includes(item.path);
  });

  return (
    <Menu
      theme="dark"
      mode="horizontal"
    >
      {
        isSuccess && pages
          .sort((a, b) => sortList[a.path] - sortList[b.path])
          .map((page) => {
            const { path, name } = page;
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
          <Button danger type="text" icon={<LoginOutlined />} onClick={() => localStorage.clear()} />
        </NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default HeaderMenu;
