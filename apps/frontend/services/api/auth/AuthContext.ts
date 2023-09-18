import { createContext } from 'react';

import { hasAccessToken } from './utils';

export const AuthContext = createContext({ isAuthenticated: hasAccessToken() });
