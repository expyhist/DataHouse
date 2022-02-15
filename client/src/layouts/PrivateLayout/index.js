import React, {
  useState, useEffect, useContext, useMemo,
} from 'react';
import { useRouteMatch } from 'react-router-dom';

import Layout from 'antd/lib/layout';

import HeaderMenu from '../HeaderMenu';
import SiderMenu from '../SiderMenu';
import Copyright from '../Copyright';

import { AccessContext } from '@/utils/AccessContext';
import { useGetMenusByAccessMutation } from '@/utils/apisSlice';

function PrivateLayout({ children }) {
  const [menuData, setMenuData] = useState(null);
  const [getMenusByAccess] = useGetMenusByAccessMutation();
  const access = useContext(AccessContext);
  const { path } = useRouteMatch();

  const { Header, Content, Footer } = Layout;

  useEffect(() => {
    (async () => {
      if (access && Object.keys(access).length !== 0) {
        const resp = await getMenusByAccess({ path: Object.keys(access) });
        const singleMenuData = resp.data.data.filter((item) => item.path === path);
        setMenuData(singleMenuData);
      }
    })();
  }, []);

  return (
    <Layout style={{ height: '100vh' }}>
      <Header>
        { useMemo(() => <HeaderMenu />, []) }
      </Header>
      <Layout>
        { useMemo(() => <SiderMenu menuData={menuData} />, [menuData]) }
        <Layout style={{ overflow: 'auto', minHeight: '80vh' }}>
          <Content style={{ padding: 24, margin: 0 }}>
            {children}
          </Content>
        </Layout>
      </Layout>
      <Footer style={{ padding: 13 }}>
        { useMemo(() => <Copyright />, []) }
      </Footer>
    </Layout>
  );
}

export default PrivateLayout;
