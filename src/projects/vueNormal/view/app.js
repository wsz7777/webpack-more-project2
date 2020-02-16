import Vue from "@/projects/vueNormal/view/vue";

import { Layout, Menu, Icon } from "@/projects/vueNormal/view/ant-design-vue";

Vue.use(Layout);
Vue.use(Menu);
Vue.component(Icon.name, Icon);

import "./app.scss";

export default Vue.extend({
  name: "app",
  data() {
    return {
      collapsed: false
    };
  },
  render() {
    return (
      <a-layout id="components-layout-demo-custom-trigger">
        <a-layout-sider
          // trigger={<a-icon type="upload" />}
          trigger={null}
          collapsible
          v-model={this.collapsed}>
          <div class="logo" />
          <a-menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <a-menu-item
              key="1"
              on-click={() => this.$router.push({ name: "main" })}>
              <a-icon type="user" />
              <span>nav 1</span>
            </a-menu-item>
            <a-menu-item
              key="2"
              on-click={() => this.$router.push({ name: "test" })}>
              <a-icon type="video-camera" />
              <span>to test</span>
            </a-menu-item>
            <a-menu-item key="3" on-click={() => this.$router.push("/home")}>
              <a-icon type="upload" />
              <span>to home</span>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout>
          <a-layout-header style="background: #fff; padding: 0">
            <a-icon
              class="trigger"
              type={this.collapsed ? "menu-unfold" : "menu-fold"}
              on-click={() => (this.collapsed = !this.collapsed)}
            />
          </a-layout-header>
          <a-layout-content
            style={{
              margin: "24px 16px",
              padding: "24px",
              background: "#fff",
              minHeight: "280px"
            }}>
            <router-view></router-view>
          </a-layout-content>
        </a-layout>
      </a-layout>
    );
  }
});
