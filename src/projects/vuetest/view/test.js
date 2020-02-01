import Vue from "vue";
import { Button } from "ant-design-vue";
import compB from "@p/vuetest/components/compB/compB";

Vue.component(Button.name, Button);

export default Vue.extend({
  name: "view-test",
  data() {
    return {
      clickOne: "null"
    };
  },
  methods: {
    changeClickOne(val) {
      this.clickOne = val;
    }
  },
  render() {
    return (
      <div>
        <div>this is test</div>
        <a-button
          on-click={() => {
            this.$router.push({ name: "main" });
          }}>
          go to main
        </a-button>
        <div>here is components test: {this.clickOne}</div>
        <compB on-haveClick={this.changeClickOne} />
      </div>
    );
  }
});
