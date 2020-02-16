import Vue from "vue";
import { NavBar } from "vant";
Vue.use(NavBar);

export default Vue.extend({
  name: "app",
  methods: {
    onClickLeft() {},
    onClickRight() {}
  },
  render() {
    return (
      <div>
        <van-nav-bar
          title="标题"
          left-text="返回"
          right-text="按钮"
          left-arrow
          on-click-left={this.onClickLeft}
          on-click-right={this.onClickRight}
        />
        <router-view></router-view>
      </div>
    );
  }
});
