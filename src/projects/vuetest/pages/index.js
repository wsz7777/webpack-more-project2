// import Vue from "vue";
// import router from "@p/vuetest/router/index";
// import App from "@p/vuetest/view/app";
// // import S from "./index.module.scss";

// import("@/components/func1").then(() => {
//   new Vue({
//     router,
//     render: h => h(App)
//   }).$mount("#app");
// });

Promise.all([
  import("vue"),
  import("@p/vuetest/router/index"),
  import("@p/vuetest/view/app"),
  import("@/components/createApp")
]).then(([{ default: Vue }, { default: router }, { default: App }]) => {
  new Vue({
    router,
    render: h => h(App)
  }).$mount("#app");
});
