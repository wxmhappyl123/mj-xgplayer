import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui'
import './ourPlayer/assets/css/common.css'
import 'element-ui/lib/theme-chalk/index.css'
import './ourPlayer/assets/iconfont/iconfont.css'
Vue.use(ElementUI)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
