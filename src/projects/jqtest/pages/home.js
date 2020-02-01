import "./home.scss";
// const { default: $ } = await import("jquery");

Promise.all([
  import("axios"),
  import("jquery"),
  import("@/components/createApp")
]).then(([{ default: axios }, { default: $ }]) => {
  axios.get("/data/get.json").then(resp => {
    // console.log(resp.data);
    console.log($("#app"));
    $("#app").append(`
<div class="fx">
  <div class="child"></div>
</div>
<a href="/assets/jqtest/index.html">to index</a>
${JSON.stringify(resp.data)}
    `);
  });
});
