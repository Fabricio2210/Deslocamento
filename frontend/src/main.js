import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import BootstrapVue from "bootstrap-vue";
import axios from "axios";
import Notifications from "vue-notification";
//import Loading from 'vue-loading-overlay';
import "vue-loading-overlay/dist/vue-loading.css";
import "vue-awesome/icons/flag";
import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";

Vue.component("v-icon", Icon);

Vue.use(Notifications);

Vue.prototype.$http = axios;

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
