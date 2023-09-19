import { createContext, SetStateAction } from 'react';

import { hasAccessToken } from 'services/api/auth/utils';

type AuthContextProps = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: hasAccessToken(),
  setIsAuthenticated: () => {
    return null;
  },
});
