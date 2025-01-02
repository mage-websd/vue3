import axios, { type AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import { getToken, saveToken, destroyAll } from '@/helpers/storages/local';
import config from '@/config';
import router from '@/router';
import { refreshToken } from '@/api/auth';
import endpoints from '@/api/endpoints';
import __ from '@/helpers/lang';

const api = axios.create({
  baseURL: config.VITE_BASE_API,
  proxy: false,
  responseType: 'json',
});

api.interceptors.request.use((config: AxiosRequestConfig): any => {
  const newConfig: AxiosRequestConfig = { ...config };
  const tokens = getToken();

  if (!newConfig.headers) {
    newConfig.headers = {};
  }

  if (tokens.access) {
    newConfig.headers['Authorization'] = `Bearer ${tokens.access}`;
  }

  if (newConfig.headers['Content-Type'] === 'multipart/form-data') {
    return newConfig;
  }

  return newConfig;
});

api.interceptors.response.use(
  (response) => {
    if (response.data?.tokens) {
      if (response.data.tokens.access && response.data.tokens.refresh) {
        saveToken(response.data.tokens.access, response.data.tokens.refresh);
      }
    }

    return response;
  },
  (error) => {
    return doError(error);
  },
);

const recallRefreshToken = async (error: any) => {
  if (error.config.url === endpoints.auth.refreshToken || error.config.params?.isRecall) {
    return do401();
  }

  const tokens = getToken();

  try {
    const refreshedToken = await refreshToken({
      refreshToken: String(tokens.refresh),
    });

    saveToken(refreshedToken.accessToken, refreshedToken.refreshToken);

    if (!error.config.params) {
      error.config.params = {};
    }

    error.config.params.isRecall = true;
    error.config.headers.Authorization = `Bearer ${refreshedToken.accessToken}`;

    // Retry the original request if refresh pass
    return axios.request(error.config).catch((e: any) => {
      return doError(e);
    });
  } catch (_e) {
    return do401();
  }
};

const do401 = () => {
  destroyAll();
  window.location.href = '/';
};

const doError = (error: any): any => {
  if (error.message === 'Request aborted') {
    return Promise.reject(error);
  }

  if (error.code === 'ERR_NETWORK') {
    router.push({ name: '500' });

    return Promise.reject(error);
  }

  if (error.response) {
    if (error.response.status === 401) {
      return recallRefreshToken(error);
    } else if (error.response.status === 404) {
      router.push({ name: '404' });
    } else if (error.response.status === 500) {
      router.push({ name: '500' });
    } else if (error.response.status === 400) {
      if (error.response.data?.message) {
        if (typeof error.response.data.message === 'string') {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error(__('common.500_message'));
        }
      }
    } else {
      router.push({ name: '500' });
    }
  } else if (error.message) {
    router.push({ name: '500' });
  }

  return Promise.reject(error);
};

export default api;
