import Vue from "vue";

export default Vue.extend({
  name: "app",
  render() {
    return (
      <div>
        <router-view></router-view>
      </div>
    );
  }
});
