import Vue from "vue";
export default Vue.extend({
  name: "view-404",
  render() {
    console.log(this.$router);
    return (
      <div>
        <h1>404!!!</h1>
        <p>not found</p>
      </div>
    );
  }
});
