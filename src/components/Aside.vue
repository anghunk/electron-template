<template>
  <aside class="w-[220px] h-[calc(100%-32px)] overflow-y-auto m-4 bg-surface flex flex-col rounded-theme shadow-card border border-border-light [&::-webkit-scrollbar]:hidden">
    <nav class="flex-1 p-4 px-3 flex flex-col gap-1.5">
      <router-link to="/" class="nav-item" active-class="active">
        <span class="w-[25px] inline-flex items-center justify-center shrink-0">
          <PhHouseLine :size="18" weight="bold" />
        </span>
        <span class="flex-1 text-sm font-medium whitespace-nowrap">首页</span>
      </router-link>
      <router-link to="/settings" class="nav-item" active-class="active">
        <span class="w-[25px] inline-flex items-center justify-center shrink-0">
          <PhGear :size="18" weight="bold" />
        </span>
        <span class="flex-1 text-sm font-medium whitespace-nowrap">设置</span>
      </router-link>
      <router-link to="/about" class="nav-item" active-class="active">
        <span class="w-[25px] inline-flex items-center justify-center shrink-0">
          <PhInfo :size="16" weight="bold" />
        </span>
        <span class="flex-1 text-sm font-medium whitespace-nowrap">关于</span>
      </router-link>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "Aside",
};
</script>

<style scoped>
.nav-item {
  @apply flex items-center gap-2.5 px-4 h-[42px] rounded-theme-sm text-secondary no-underline transition-all duration-200;
}
.nav-item:hover {
  @apply bg-fill-dark text-text;
}
.nav-item.active {
  @apply bg-primary text-surface shadow-primary;
}
</style>
