import React from 'react';

export const AccessContext = React.createContext();

function AccessProvider({ access, children }) {
  return access && (
    <AccessContext.Provider value={access}>
      {children}
    </AccessContext.Provider>
  );
}

export default AccessProvider;
