import React from 'react';

import Layout from 'antd/lib/layout';

import HeaderMenu from './HeaderMenu';
import SiderMenu from './SiderMenu';
import Copyright from './Copyright';

function PrivateLayout({ children }) {
  const { Header, Content, Footer } = Layout;

  return (
    <Layout style={{ height: '100vh' }}>
      <Header>
        <HeaderMenu />
      </Header>
      <Layout>
        <SiderMenu />
        <Layout style={{ overflow: 'auto', minHeight: '80vh' }}>
          <Content style={{ padding: 24, margin: 0 }}>
            {children}
          </Content>
        </Layout>
      </Layout>
      <Footer style={{ padding: 13 }}>
        <Copyright />
      </Footer>
    </Layout>
  );
}

export default PrivateLayout;
