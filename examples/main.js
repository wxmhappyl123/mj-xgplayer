import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui'
import '../packages/ourPlayer/assets/css/common.css'
import 'element-ui/lib/theme-chalk/index.css'
import '../packages/ourPlayer/assets/iconfont/iconfont.css'
Vue.use(ElementUI)
import mjplayer from '../packages/index'
Vue.use(mjplayer)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
