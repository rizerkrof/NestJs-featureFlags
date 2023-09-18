import { PropsWithChildren } from 'react';

import { AuthContext } from 'services/api/auth/AuthContext';
import { hasAccessToken } from 'services/api/auth/utils';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const isAuthenticated = hasAccessToken();

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
