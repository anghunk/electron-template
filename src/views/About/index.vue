<template>
  <div class="layout-title">关于</div>
  <div>
    <ul class="flex flex-col">
      <li
        class="bg-surface border border-border-light rounded-theme-sm px-[18px] min-h-[48px] flex items-center justify-between mb-3 transition-all duration-200 hover:shadow-card-hover"
      >
        <label class="font-semibold text-text font-heading">Github</label>
        <div class="text-muted no-underline">
          <a
            href="https://github.com/anghunk/electron-template"
            target="_blank"
            class="text-primary no-underline transition-colors duration-200 hover:text-accent"
          >
            https://github.com/anghunk/electron-template
          </a>
        </div>
      </li>

      <li
        class="bg-surface border border-border-light rounded-theme-sm px-[18px] min-h-[48px] flex items-center justify-between mb-3 transition-all duration-200 hover:shadow-card-hover"
      >
        <label class="font-semibold text-text font-heading">Author</label>
        <div class="text-muted no-underline">
          <a
            href="https://github.com/anghunk"
            target="_blank"
            class="text-primary no-underline transition-colors duration-200 hover:text-accent"
          >
            https://github.com/anghunk
          </a>
        </div>
      </li>

      <li
        class="bg-surface border border-border-light rounded-theme-sm px-[18px] min-h-[48px] flex items-center justify-between mb-3 transition-all duration-200 hover:shadow-card-hover"
      >
        <label class="font-semibold text-text font-heading">E-mail</label>
        <div class="text-muted no-underline">anghunk@gmail.com</div>
      </li>

      <li
        class="bg-surface border border-border-light rounded-theme-sm px-[18px] min-h-[48px] flex items-center justify-between mb-3 transition-all duration-200 hover:shadow-card-hover"
      >
        <label class="font-semibold text-text font-heading">Version</label>
        <div class="text-muted no-underline">{{ version }}</div>
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
