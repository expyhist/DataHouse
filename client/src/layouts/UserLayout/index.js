import React from 'react';

import Copyright from '../Copyright';

import './UsersLayout.css';

function UsersLayout({ children }) {
  return (
    <>
      <div className="login">
        <div className="login-container">
          <div className="login-header">
            <span className="login-logo">
              <img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" alt="" />
            </span>
            <span className="login-title">DataHouse</span>
          </div>
          <div className="login-desc">
            <span>YangHua自建的小型数据中台</span>
          </div>
          <div className="login-main">
            {children}
          </div>
        </div>
      </div>
      <Copyright />
    </>
  );
}

export default UsersLayout;
