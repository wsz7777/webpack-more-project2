import Vue from "vue";

export default Vue.extend({
  name: "compA",
  render() {
    return (
      <div>
        <ul>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(v => (
            <li>list {v}</li>
          ))}
        </ul>
      </div>
    );
  }
});
