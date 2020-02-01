import Vue from "vue";
import { Button } from "ant-design-vue";
import compA from "@p/vuetest/components/compA/compA";

Vue.component(Button.name, Button);

export default Vue.extend({
  name: "main-main",
  methods: {
    goTest() {
      this.$router.push({ name: "test" });
    }
  },
  render() {
    return (
      <div>
        <div>this is main</div>
        <compA></compA>
        <a-button on-click={this.goTest}>go to test</a-button>
      </div>
    );
  }
});
