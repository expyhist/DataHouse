import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';

import { recursiveMenu } from './recursiveMenu';
import { useGetMenusQuery } from '@/utils/apisSlice';

function SiderMenu({ style }) {
  const [collapsed, setCollapsed] = useState(true);
  const { path } = useRouteMatch();

  const {
    data,
    isLoading,
    isSuccess,
    isError,
  } = useGetMenusQuery('siderMenus');

  if (isLoading || isError) {
    return null;
  }

  const singleMenuDatas = isSuccess && data.data.filter((item) => item.path === path);

  const { Sider } = Layout;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      style={style}
    >
      {
        isSuccess ? (
          <Menu
            mode="inline"
            style={{ borderRight: 0 }}
          >
            {
              singleMenuDatas.map((singleMenuData) => recursiveMenu(singleMenuData.children))
            }
          </Menu>
        ) : null
      }
    </Sider>
  );
}

export default SiderMenu;
