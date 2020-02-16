import Vue from "vue";
import router from "@/projects/vantDemo/router/index";
import App from "@/projects/vantDemo/view/app";
// import S from "./index.module.scss";

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
