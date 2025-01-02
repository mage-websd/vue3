import type { IFormCreate } from '@/api/list/interface';
import { defineStore } from 'pinia';

const initFormCreateInput = {
  email: null,
};

export const useFormCreateStore = defineStore('formCreate', {
  state: () => {
    return {
      form: {
        ...initFormCreateInput,
      } as IFormCreate,
    };
  },
});
