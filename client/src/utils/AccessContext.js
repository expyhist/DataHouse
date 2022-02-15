import React from 'react';

export const AccessContext = React.createContext();

function AccessProvider({ access, children }) {
  if (access) {
    return (
      <AccessContext.Provider value={access}>
        {children}
      </AccessContext.Provider>
    );
  }
  return children;
}

export default AccessProvider;
