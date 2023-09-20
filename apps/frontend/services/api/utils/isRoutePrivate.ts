import { ApiRoutes } from '../apiRoutes';

export const isRoutePrivate = (url: string | undefined): boolean => {
  const route = Object.values(ApiRoutes).find(apiRoute => apiRoute.url === url);
  console.log(url);

  return route?.isPrivate === true;
};
