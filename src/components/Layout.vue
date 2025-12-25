<template>
  <div class="layout-container">
    <TitleBar />
    <main class="layout-main">
      <router-view />
    </main>
  </div>
</template>

<script>
import TitleBar from "./TitleBar.vue";

export default {
  name: "Layout",
  components: {
    TitleBar,
  },
};
</script>

<style lang="less" scoped>
@import "@/styles/layout.less";
</style>
