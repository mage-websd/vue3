export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
export const USER_NAME = 'username';

const HOST = window.location.hostname;

export const getKey = (key: string) => {
  return HOST + '.soda.' + key;
};

export const get = (key: string) => {
  return window.localStorage.getItem(getKey(key));
};

export const save = (key: string, value: any) => {
  window.localStorage.setItem(getKey(key), value);
};

export const remove = (key: string) => {
  window.localStorage.removeItem(getKey(key));
};

export const getToken = () => {
  return {
    access: get(ACCESS_TOKEN_KEY),
    refresh: get(REFRESH_TOKEN_KEY),
  };
};

export const saveToken = (token: string, refresh?: string) => {
  save(ACCESS_TOKEN_KEY, token);
  save(REFRESH_TOKEN_KEY, refresh);
};

export const destroyAll = () => {
  return window.localStorage.clear();
};
