import { createApp } from 'vue';
import { NewbiePlugin } from '../../../src/entry-vue3';
import App from './App.vue';

const app = createApp(App);
app.use(NewbiePlugin, { createApp });
app.mount('#app');
