import { type FormRules } from 'element-plus';
import { reactive } from 'vue';
import { validateRequired, validateXss } from '@/helpers/validation-cutom';
import __ from '@/helpers/lang';

export const useFormRules = (): FormRules => {
  return reactive<FormRules>({
    email: [
      {
        validator: (rule, value, callback) => {
          validateRequired(value, callback, 'email');
        },
      },
      {
        max: 50,
        message: __('validate.max_string', {
          label: 'email',
          max: 50,
        }),
      },
      {
        validator: (rule, value, callback) => {
          validateXss(value, callback, 'email');
        },
      },
    ],
  });
};
