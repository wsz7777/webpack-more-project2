import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const router = new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@p/vant_demo/view/home")
    },
    {
      path: "/homes",
      name: "homes",
      component: () => import("@p/vant_demo/view/home")
    },
    {
      path: "*",
      component: () => import("@p/vuetest/view/404")
    }
  ]
});

export default router;
