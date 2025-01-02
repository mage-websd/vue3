import { defineStore } from 'pinia';

export const userFormListFilterStore = defineStore('formListFilterStore', {
  state: () => {
    return {
      filter: {
        email: null,
      },
      paginator: {
        page: 1,
      },
    };
  },
});
