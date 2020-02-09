import Vue from "vue";
import router from "@p/vuetest/router/index";
import App from "@p/vuetest/view/app";
// import S from "./index.module.scss";

import "@/components/createApp";
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
