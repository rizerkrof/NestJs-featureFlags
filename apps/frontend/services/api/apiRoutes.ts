export const ApiRoutes = {
  logout: { url: '/auth/jwt/logout', isPrivate: true },
  login: { url: '/auth/jwt/create', isPrivate: false },
  refresh: { url: '/auth/jwt/refresh', isPrivate: false },
  me: { url: '/users/me', isPrivate: true },
  users: { url: '/users/', isPrivate: true },
} as const;
