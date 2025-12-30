<template>
  <div
    class="h-8 bg-background flex justify-between items-center select-none border-b border-border-light"
    style="-webkit-app-region: drag"
  >
    <div class="px-4 font-heading text-xs text-secondary font-semibold">
      Electron Template
    </div>
    <div class="flex h-full" style="-webkit-app-region: no-drag">
      <el-button
        @click="minimize"
        :icon="Minus"
        text
        class="h-8 w-10 !rounded-none text-secondary hover:!bg-fill-dark hover:!text-text"
      />
      <el-button
        @click="maximize"
        :icon="FullScreen"
        text
        class="h-8 w-10 !rounded-none text-secondary hover:!bg-fill-dark hover:!text-text"
      />
      <el-button
        @click="close"
        :icon="Close"
        text
        class="h-8 w-10 !rounded-none text-secondary hover:!bg-error hover:!text-surface"
      />
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
