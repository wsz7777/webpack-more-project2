// const { default: $ } = await import("jquery");

import axios from "axios";
import $ from "jquery";
import "@/components/createApp";

import "./home.scss";

axios.get("/data/get.json").then(resp => {
  // console.log(resp.data);
  console.log($("#app"), resp?.data);
  console.log(resp?.kkk ?? "wo 可以用判空语法了");
  $("#app").append(`
<div class="fx">
  <div class="child"></div>
</div>
<a href="${process.env.PUBLIC_PATH}/jqtest/index.html">to index</a>
`);
});
/**
 * TODO: 使用JSON.stringify 打包体积会增大10kb
 */
// ${window.JSON.stringify(resp.data)}
