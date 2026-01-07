<template>
  <div
    class="h-8 bg-background flex justify-between items-center select-none border-b border-border-light"
    style="-webkit-app-region: drag"
  >
    <div
      class="px-4 font-heading text-xs text-secondary font-semibold flex items-center gap-2"
    >
      <img src="@/assets/images/icon.png" alt="Electron Template" class="w-4 h-4" />
      Electron Template
    </div>
    <div class="flex h-full" style="-webkit-app-region: no-drag">
      <el-button
        @click="minimize"
        text
        class="h-8 w-10 !rounded-none text-secondary hover:!bg-fill-dark hover:!text-text"
      >
        <PhMinus :size="16" weight="bold" />
      </el-button>
      <el-button
        @click="maximize"
        text
        class="h-8 w-10 !rounded-none text-secondary hover:!bg-fill-dark hover:!text-text"
      >
        <PhCornersOut :size="16" weight="bold" />
      </el-button>
      <el-button
        @click="close"
        text
        class="h-8 w-10 !rounded-none text-secondary hover:!bg-error hover:!text-surface"
      >
        <PhX :size="16" weight="bold" />
      </el-button>
    </div>
  </div>
</template>

<script>
import { Minus, FullScreen, Close } from "@element-plus/icons-vue";

export default {
  name: "TitleBar",
  components: {
    Minus,
    FullScreen,
    Close,
  },
  data() {
    return {
      Minus,
      FullScreen,
      Close,
    };
  },
  methods: {
    minimize() {
      window.api.minimize();
    },
    maximize() {
      window.api.maximize();
    },
    close() {
      window.api.close();
    },
  },
};
</script>
