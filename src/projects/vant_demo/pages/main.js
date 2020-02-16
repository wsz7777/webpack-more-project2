import Vue from "vue";
import router from "@/projects/vant_demo/router/index";
import App from "@/projects/vant_demo/view/app";
// import S from "./index.module.scss";

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
