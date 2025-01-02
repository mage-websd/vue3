import './assets/styles/index.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router';
import { FontAwesomeIcon } from './providers/fontawesome';
import { clickOutside } from './providers/directives/click-outside';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.component('Fa', FontAwesomeIcon);

app.directive('click-outside', clickOutside);

app.mount('#app');
