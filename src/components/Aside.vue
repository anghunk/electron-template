<template>
  <aside
    class="pb-2 w-[220px] h-[100%] overflow-y-auto my-4 flex flex-col [&::-webkit-scrollbar]:hidden border-r border-border-light"
  >
    <nav class="flex-1 p-2 flex flex-col gap-1.5">
      <router-link to="/" class="nav-item" active-class="active">
        <span class="w-[25px] inline-flex items-center justify-center shrink-0">
          <PhHouseLine :size="18" weight="bold" />
        </span>
        <span class="flex-1 text-sm font-medium whitespace-nowrap">首页</span>
      </router-link>
    </nav>

    <!-- 暗黑模式切换按钮 - 放在左下角 -->
    <div class="p-4 pt-0">
      <div class="border-t border-border-light my-2"></div>
      <div class="flex">
        <router-link
          active-class="active"
          to="/settings"
          class="icon-btn bg-fill-light flex items-center justify-center w-[35px] h-[35px] rounded-theme-sm relative"
        >
          <span class="w-[25px] inline-flex items-center justify-center shrink-0">
            <PhGear :size="16" />
          </span>
        </router-link>

        <!-- 主题切换按钮 -->
        <button
          @click="cycleTheme"
          class="theme-toggle-btn bg-fill-light flex items-center justify-center w-[35px] h-[35px] rounded-theme-sm relative"
          :title="getButtonTitle()"
        >
          <!-- 主图标：根据状态显示不同图标 -->
          <component :is="getMainIcon()" :size="16" />
        </button>

        <router-link
          active-class="active"
          to="/about"
          class="icon-btn bg-fill-light flex items-center justify-center w-[35px] h-[35px] rounded-theme-sm relative"
        >
          <span class="w-[25px] inline-flex items-center justify-center shrink-0">
            <PhInfo :size="16" />
          </span>
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script>
import themeManager from "@/utils/themeManager";
import { PhMoon, PhSun, PhDesktop } from "@phosphor-icons/vue";

export default {
  name: "Aside",
  components: {
    PhMoon,
    PhSun,
    PhDesktop,
  },
  data() {
    return {
      isDark: false,
      followSystem: false,
    };
  },
  mounted() {
    // 初始化主题状态
    this.isDark = themeManager.getIsDark();
    this.followSystem = themeManager.getFollowSystem();

    // 监听主题变化
    themeManager.onChange(() => {
      this.isDark = themeManager.getIsDark();
      this.followSystem = themeManager.getFollowSystem();
    });
  },
  methods: {
    // 循环切换主题：浅色 → 暗黑 → 跟随系统 → 浅色
    cycleTheme() {
      if (!this.followSystem && !this.isDark) {
        // 当前是浅色模式 → 切换到暗黑模式
        themeManager.setDarkMode(true);
      } else if (!this.followSystem && this.isDark) {
        // 当前是暗黑模式 → 切换到跟随系统
        themeManager.setFollowSystem(true);
      } else {
        // 当前是跟随系统 → 切换到浅色模式
        themeManager.setFollowSystem(false);
        themeManager.setDarkMode(false);
      }
    },
    getButtonTitle() {
      if (this.followSystem) {
        return `跟随系统 (${this.isDark ? "暗黑" : "浅色"})`;
      }
      return `${this.isDark ? "暗黑" : "浅色"}模式`;
    },
    getMainIcon() {
      if (this.followSystem) {
        return PhDesktop; // 跟随系统：显示器图标 🖥️
      }
      return this.isDark ? PhSun : PhMoon; // 暗黑：太阳 ☀️，浅色：月亮 🌙
    },
  },
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

.theme-toggle-btn {
  @apply transition-all duration-200;
}
.theme-toggle-btn:hover {
  @apply bg-fill-dark text-text;
}

.icon-btn {
  @apply transition-all duration-200 text-secondary;
}
.icon-btn:hover {
  @apply text-primary;
}
.icon-btn.active {
  @apply text-primary;
}
</style>
