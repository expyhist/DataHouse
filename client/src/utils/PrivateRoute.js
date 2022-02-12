import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import jwtDecode from 'jwt-decode';

function PrivateRoute({ component: Component, ...rest }) {
  let token = localStorage.getItem('token');

  if (token) {
    const jwtTokenDecoded = jwtDecode(token);
    if (jwtTokenDecoded.exp * 1000 < Date.now()) {
      localStorage.clear();
      token = false;
    }
  }

  return (
    <Route
      {...rest}
      render={
        (props) => (
          token
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/users/login', state: { from: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;
