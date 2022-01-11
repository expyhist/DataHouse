import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';
import Menu from 'antd/lib/menu';
import { LoginOutlined } from '@ant-design/icons';

function Headers() {
  const { Header } = Layout;

  return (
    <Header className="header">
      <Menu
        theme="dark"
        mode="horizontal"
      >
        <Menu.Item key="/demands">
          <NavLink to="/demands">
            需求系统
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/tables">
          <NavLink to="/tables">
            报表系统
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/sysconfigs">
          <NavLink to="/sysconfigs">
            全局配置
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/loginout">
          <NavLink to="/users">
            <Button danger type="text" icon={<LoginOutlined />} onClick={() => localStorage.clear()} />
          </NavLink>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default withRouter(Headers);
