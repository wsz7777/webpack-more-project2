import Vue from "@/projects/vueNormal/router/vue";
import Router from "@/projects/vueNormal/router/vue-router";
Vue.use(Router);

const router = new Router({
  mode: "hash",
  // 恢复 上次浏览位置 仅在同一个项目中可用
  scrollBehavior(to, from, savedPosition) {
    console.log("scrollBehavior", to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: "/",
      redirect: "/main"
    },
    {
      path: "/main",
      name: "main",
      component: () => import("@/projects/vueNormal/router/@p/vuetest/view/main")
    },
    {
      path: "/test",
      name: "test",
      component: () => import("@/projects/vueNormal/router/@p/vuetest/view/test")
    },
    {
      path:"*",
      component: () => import("@/projects/vueNormal/router/@p/vuetest/view/404")
    }
  ]
});

export default router;
