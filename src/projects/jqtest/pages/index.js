import Vue from "vue";
import S from "./index.module.scss";

Promise.all([
  import("vue"),
  import(/* webpackChunkName: "func" */ "@/components/createApp")
]).then(([{ default: Vue }]) => {
  new Vue({
    name: "index",
    render() {
      return (
        <div class={S.fx}>
          <div class={S.child}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Accusantium, delectus.
            <a href={`${process.env.PUBLIC_PATH}/vuetest/index.html`}>to index</a>
          </div>
        </div>
      );
    }
  }).$mount("#app");
});
