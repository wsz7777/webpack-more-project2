import Vue from "@/projects/vueNormal/components/compB/vue";

export default Vue.extend({
  name: "compB",
  methods: {
    clickThis(val) {
      this.$emit("haveClick", val);
    }
  },
  render() {
    return (
      <div>
        <ul>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(v => (
            <li on-click={() => this.clickThis(v)}>compB number {v}</li>
          ))}
        </ul>
      </div>
    );
  }
});
