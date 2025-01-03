/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, AxiosResponse } from 'axios';

import { IRequestParamsOptions } from './types';

const API_URL = {
  GET_CATEGORIES: '/api/categories',
};

export async function getCategories<R = any, D = any>(
  requestParamsOptions: IRequestParamsOptions<D>,
): Promise<AxiosResponse<R>> {
  const { api, url } = requestParamsOptions;

  try {
    const requestUrl = API_URL.GET_CATEGORIES + url;
    const response = await api.get(requestUrl);

    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
}
