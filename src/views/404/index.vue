<template>
  <div class="not-found">
    <div class="content">
      <div class="error-code">404</div>
      <div class="error-title">页面不存在</div>
      <p class="error-desc">抱歉，您访问的页面不存在或正在开发中，请联系软件开发者</p>
      <router-link to="/" class="back-btn">返回首页</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style lang="less" scoped>
@import "@/styles/404.less";
</style>
