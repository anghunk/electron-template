<template>
  <div class="flex items-center justify-center h-full bg-background">
    <div
      class="text-center py-12 px-14 bg-surface rounded-theme shadow-card border border-border-light"
    >
      <div class="font-heading text-[72px] font-bold text-primary leading-none mb-4">
        404
      </div>
      <div class="font-heading text-2xl font-bold text-text mb-3">页面不存在</div>
      <p class="text-[15px] text-muted mb-8 leading-relaxed">
        抱歉，您访问的页面不存在或正在开发中，请联系软件开发者
      </p>
      <router-link
        to="/"
        class="inline-block py-3 px-8 bg-primary text-surface no-underline rounded-theme-lg text-sm font-semibold transition-all duration-200 shadow-primary-lg hover:-translate-y-0.5 hover:shadow-primary-hover hover:bg-accent"
      >
        返回首页
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>
