######### Build vuejs to html

FROM node:20.8.0 AS node-builder

WORKDIR /vue-ui

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

######### build nginx with more module

FROM nginx:1.27.0-alpine

COPY --from=node-builder /vue-ui/dist /usr/share/nginx/html

COPY ./infrastructure/prod/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./infrastructure/prod/nginx/conf.d/app.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
