let config = import.meta.env;

config = Object.assign(
  {
    APP_LANG: 'en',
  },
  config,
);

export default config;
