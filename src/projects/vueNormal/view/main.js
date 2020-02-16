import Vue from "@/projects/vueNormal/view/vue";
import { Button } from "@/projects/vueNormal/view/ant-design-vue";
import compA from "@/projects/vueNormal/view/@p/vuetest/components/compA/compA";

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
        <div>{process.env.APP_TITLE}</div>
        <compA></compA>
        <a-button on-click={this.goTest}>go to test</a-button>
      </div>
    );
  }
});
