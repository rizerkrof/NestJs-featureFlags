import { GetUserDto, UpdateUserDto } from '@test/interfaces';
import useSWR from 'swr';

import { logger } from 'services/logger';

import { ApiRoutes } from '../apiRoutes';
import { apiClient } from '../client';

export const useGetMe = () => {
  const { data, error } = useSWR<GetUserDto, unknown>(ApiRoutes.me.url);

  if (error !== undefined) {
    logger.error(error);

    return;
  }

  return data;
};

export const updateMe = async (data: UpdateUserDto): Promise<void> => {
  await apiClient.patch<unknown>(ApiRoutes.users.url, data);
};
