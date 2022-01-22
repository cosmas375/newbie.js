import Vue from 'vue'
import App from './App.vue'
import { NewbiePlugin } from '../../../src/entry-vue';

Vue.use(NewbiePlugin);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
