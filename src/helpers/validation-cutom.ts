import __ from './lang';

export const validateXss = (value: any, callback: any, fieldName: any) => {
  if (value && /["<>&:;]/.test(value)) {
    callback(new Error(__('validate.xss', { fieldName: fieldName })));
  }
  callback();
};

export const validateRequired = (value: any, callback: any, fieldName: any) => {
  const trimmedValue = value?.trim();

  if (!value || trimmedValue === '') {
    return callback(new Error(__('validate.required', { label: fieldName })));
  }

  callback();
};
