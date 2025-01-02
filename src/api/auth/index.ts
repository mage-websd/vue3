import type { AxiosResponse } from 'axios';
import type { ILoginRequest, IRefreshTokenRequest, IRefreshTokenResponse } from './interface';
import type { CommonResponse } from '../interfaces';
import axios from '../axios';
import endpoints from '../endpoints';

export const refreshToken = async (body: IRefreshTokenRequest): Promise<IRefreshTokenResponse> => {
  const result: CommonResponse<AxiosResponse> = await axios.post(endpoints.auth.refreshToken, body);

  return result.data.data;
};

export const login = async (body: ILoginRequest): Promise<IRefreshTokenResponse> => {
  const res: CommonResponse<AxiosResponse> = await axios.post(endpoints.auth.login, body);

  return res.data.data;
};

export const logout = async (body: IRefreshTokenRequest): Promise<any> => {
  const res: CommonResponse<AxiosResponse> = await axios.post(endpoints.auth.logout, body);

  return res.data.data;
};
