import { useContext } from 'react';

import { AuthContext } from './AuthContext';

export const useIsUserConnected = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated;
};
