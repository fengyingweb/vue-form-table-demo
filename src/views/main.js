import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible'
import '../assets/css/base.less'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import SearchField from '../components/searchField.vue';
Vue.use(ElementUI)
Vue.component(SearchField.name, SearchField)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
