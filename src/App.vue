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

export default {
  name: "App",
  components: {
    TitleBar,
    Aside,
  },
};
</script>

<style lang="less">
@import "@/styles/index.less";
</style>
