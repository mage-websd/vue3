## Base vue3

Framework [vue](https://vuejs.org/guide/quick-start.html)

## 1. Production:

1. Not exists file .env, run: `cp ./.env.example ./.env`
1. Change value vi ./.env

   ```
   VITE_BASE_API={URL}  // url of api
   ```

1. Run cmd `cd infrastructure/prod/` (environment dev, staging in respective folder)
1. Build and up app, run cmd: `docker compose up -d --build`
1. Info:

   - url: [http://localhost](http://localhost)

1. Check container running, run cmd: `docker ps`

## Only Developer

#### start develop

- `npm install`
- `npm run dev`

###### Command more

- `npm run lint`: check eslint format code.
