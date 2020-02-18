import Vue from "vue";
import { Button } from "vant";
Vue.use(Button);

export default Vue.extend({
  name: "home",
  render() {
    console.log(this.$router);
    return (
      <div>
        <van-button>kkk</van-button>
      </div>
    );
  }
});
