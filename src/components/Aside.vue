<template>
  <aside class="aside-nav">
    <div class="nav-header">
      <span class="title">Electron Template</span>
    </div>
    <nav class="nav-menu">
      <router-link to="/" class="nav-item" active-class="active">
        <span class="label">首页</span>
      </router-link>
      <router-link to="/settings" class="nav-item" active-class="active">
        <span class="label">设置</span>
      </router-link>
      <router-link to="/about" class="nav-item" active-class="active">
        <span class="label">关于</span>
      </router-link>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "Aside",
};
</script>

<style lang="less" scoped>
@import "@/styles/aside.less";
</style>
