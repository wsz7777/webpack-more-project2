import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: `${process.env.PUBLIC_PATH}/vant_demo`,
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
