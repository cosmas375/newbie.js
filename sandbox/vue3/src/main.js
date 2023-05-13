import { createApp } from 'vue';
import App from './App.vue';
import { NewbiePlugin } from '../../../src/entry-vue3';

const app = createApp(App);

app.use(NewbiePlugin, { createApp });

app.mount('#app');
