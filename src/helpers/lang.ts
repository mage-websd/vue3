import config from '@/config';

/**
 * 'Field :field is' {field: 'email'} => 'Field email is'
 */
export const strReplace = (formatMessage: string, params: any) => {
  let validateMessage = formatMessage;

  for (const keyParam in params) {
    validateMessage = validateMessage?.replaceAll(`:${keyParam}`, params[keyParam]);
  }

  return validateMessage;
};

/**
 * load all file json in folder
 * {
 *  common: {key1: text1, key2, text2}
 *  form: {key1: text1, key2, text2}
 * }
 */
const loadJsondata = (modules: any) => {
  const jsonData: any = {};

  Object.keys(modules).forEach((key) => {
    const fileName = key.substring(key.lastIndexOf('/') + 1).replace('.json', '');
    jsonData[fileName] = modules[key];
  });

  return jsonData;
};

/**
 * obj: {
 *   l1: {
 *     l2: {
 *       'form': 'value any',
 *     }
 *   }
 * }
 *
 * path: l1.l2.form
 * => return 'value any'
 */
const getNestedValue = (obj: any, path: any) => {
  return path.split('.').reduce((acc: any, key: any) => (acc ? acc[key] : undefined), obj);
};

const langObj = (lang: string): any => {
  if (!lang) {
    lang = config.APP_LANG;
  }

  if (!lang) {
    lang = 'en';
  }

  switch (lang) {
    case 'en':
    default:
      const modules = import.meta.glob('../lang/en/*.json', { eager: true });
      return loadJsondata(modules);
  }
};

const lang = langObj(config.APP_LANG);

const __ = (word: string, params?: any) => {
  return strReplace(getNestedValue(lang, word), params);
};

export default __;
