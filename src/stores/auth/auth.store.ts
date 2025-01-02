import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import {
  getToken,
  saveToken,
  get,
  USER_NAME,
  destroyAll,
  REFRESH_TOKEN_KEY,
} from '@/helpers/storages/local';
import { login, logout } from '@/api/auth';
import { useLoadingStore } from '../loading.store';
import router from '@/router';
import type { ILoginRequest, IRefreshTokenRequest } from '@/api/auth/interface';
import __ from '@/helpers/lang';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    isAuth: !!getToken().access,
    username: get(USER_NAME),
  }),
  actions: {
    checkAuth() {
      this.isAuth = !!getToken().access;
      this.username = get(USER_NAME);

      return this.isAuth;
    },

    async login(body?: ILoginRequest) {
      if (!body) {
        body = {
          username: 'soda',
          password: 'soda',
        };
      }

      await login(body)
        .then(async (data) => {
          if (!data.accessToken) {
            router.push({
              name: '404',
            });

            return true;
          }

          saveToken(data.accessToken, data.refreshToken);
          ElMessage.success(__('common.login success'));

          router.push({
            name: 'home',
          });
        })
        .catch((_e) => {
          router.push({
            name: '404',
          });
        })
        .finally(() => {
          this.checkAuth();
        });
    },

    async logout() {
      const loadingStore = useLoadingStore();
      loadingStore.loading = true;
      const body: IRefreshTokenRequest = {
        refreshToken: String(get(REFRESH_TOKEN_KEY)),
      };

      logout(body).finally(async () => {
        destroyAll();
        this.checkAuth();
        loadingStore.loading = false;

        router.push({
          name: 'home',
        });
      });
    },
  },
});
