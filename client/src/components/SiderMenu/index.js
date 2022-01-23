import React, { useState, useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';

import { recursiveMenu } from './recursiveMenu';
import { useGetMenusByAccessMutation } from '@/utils/apisSlice';
import { AccessContext } from '@/utils/useAccess';

function SiderMenu() {
  const [singleMenuData, setSingleMenuData] = useState(null);
  const [collapsed, setCollapsed] = useState(true);
  const [getMenusByAccess] = useGetMenusByAccessMutation();
  const access = useContext(AccessContext);
  const { path } = useRouteMatch();

  const accessPath = Object.keys(access);

  useEffect(() => {
    const getSiderMenu = async () => {
      const resp = await getMenusByAccess({ path: accessPath });
      const menuData = resp.data.data.filter((item) => item.path === path);
      setSingleMenuData(menuData);
    };
    getSiderMenu();
  }, []);

  const { Sider } = Layout;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      style={{ background: 'white' }}
    >
      {
        singleMenuData ? (
          <Menu mode="inline" style={{ borderRight: 0 }}>
            {
              singleMenuData.map((item) => recursiveMenu(item.children))
            }
          </Menu>
        ) : null
      }
    </Sider>
  );
}

export default SiderMenu;
