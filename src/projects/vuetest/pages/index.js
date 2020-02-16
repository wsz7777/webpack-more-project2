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
