<template>
  <aside
    class="pb-2 pt-2 w-[220px] h-[100%] overflow-y-auto flex flex-col [&::-webkit-scrollbar]:hidden border-r border-border-light"
  >
    <nav class="flex-1 p-4 py-2 flex flex-col gap-1.5">
      <router-link to="/" class="nav-item" active-class="active">
        <span class="w-[25px] inline-flex items-center justify-center shrink-0">
          <PhHouseLine :size="18" weight="bold" />
        </span>
        <span>首页</span>
      </router-link>
      <router-link to="/settings" class="nav-item" active-class="active">
        <span class="w-[25px] inline-flex items-center justify-center shrink-0">
          <PhGear :size="18" weight="bold" />
        </span>
        <span>设置</span>
      </router-link>
      <router-link to="/about" class="nav-item" active-class="active">
        <span class="w-[25px] inline-flex items-center justify-center shrink-0">
          <PhInfo :size="18" weight="bold" />
        </span>
        <span>关于</span>
      </router-link>
    </nav>

    <!-- 暗黑模式切换按钮 - 放在左下角 -->
    <div class="p-4 py-0">
      <div class="flex">
        <!-- 主题切换按钮 -->
        <button
          @click="cycleTheme"
          class="theme-toggle-btn flex items-center justify-center w-[35px] h-[35px] relative"
          :title="getButtonTitle()"
        >
          <!-- 主图标：根据状态显示不同图标 -->
          <component :is="getMainIcon()" :size="16" />
        </button>
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
aside {
  background: var(--color-aside-background);
}
.nav-item {
  @apply flex items-center gap-2 px-2 h-[32px] rounded-theme-sm no-underline transition-all duration-200  font-medium whitespace-nowrap;
  font-size: 15px;
}

.nav-item.active {
  background: var(--color-accent);
}

.nav-item svg {
  color: var(--color-primary);
}

.theme-toggle-btn {
  @apply transition-all duration-200;
}

.theme-toggle-btn:hover {
  @apply text-text;
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
