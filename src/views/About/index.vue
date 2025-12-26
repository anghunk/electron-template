<template>
  <div class="layout-title">关于</div>
  <div class="about">
    <ul class="list">
      <li>
        <label>Github</label>
        <div class="input-content">
          <a href="https://github.com/anghunk/electron-template" target="_blank"
            >https://github.com/anghunk/electron-template</a
          >
        </div>
      </li>

      <li>
        <label>Author</label>
        <div class="input-content">
          <a href="https://github.com/anghunk" target="_blank"
            >https://github.com/anghunk</a
          >
        </div>
      </li>

      <li>
        <label>E-mail</label>
        <div class="input-content">anghunk@gmail.com</div>
      </li>

      <li>
        <label>Version</label>
        <div class="input-content">{{ version }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      version: "",
    };
  },
  async mounted() {
    this.version = await window.api.getAppVersion();
  },
};
</script>

<style lang="less" scoped>
@import "@/styles/about.less";
</style>
