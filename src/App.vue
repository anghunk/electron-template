<template>
  <div class="layout-container">
    <TitleBar />
    <main class="layout-main">
      <Aside />
      <div class="layout-content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import TitleBar from "@/components/TitleBar.vue";
import Aside from "@/components/Aside.vue";
import themeManager from "@/utils/themeManager";

export default {
  name: "App",
  components: {
    TitleBar,
    Aside,
  },
  mounted() {
    // 初始化主题管理器
    themeManager.init();
  },
};
</script>
