import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loadingStore', {
  state: () => ({
    loading: false,
  }),
  actions: {
    setLoading(loadingState: boolean) {
      this.loading = loadingState;
    },
  },
});
