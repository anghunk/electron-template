<template>
  <div class="layout-title">设置</div>
  <div class="settings">
    <!-- 通用设置组 -->
    <div class="settings-group">
      <div class="group-title">通用设置</div>
      <ul class="settings-list">
        <li class="settings-item">
          <div class="item-label">
            <span class="label-text">语言</span>
            <span class="label-desc">选择应用显示语言</span>
          </div>
          <div class="item-control">
            <el-select v-model="language" placeholder="请选择" size="default">
              <el-option label="简体中文" value="zh-CN" />
              <el-option label="English" value="en-US" />
            </el-select>
          </div>
        </li>


        

      
      </ul>
    </div>

    <!-- 外观设置组 -->
    <div class="settings-group">
      <div class="group-title">外观设置</div>
      <ul class="settings-list">
        <li class="settings-item">
          <div class="item-label">
            <span class="label-text">字体大小</span>
            <span class="label-desc">调整界面文字显示大小</span>
          </div>
          <div class="item-control">
            <el-slider v-model="fontSize" :min="12" :max="20" :step="2" show-stops />
          </div>
        </li>

        <li class="settings-item">
          <div class="item-label">
            <span class="label-text">窗口透明度</span>
            <span class="label-desc">调整窗口背景透明度</span>
          </div>
          <div class="item-control">
            <el-slider v-model="opacity" :min="60" :max="100" show-input />
          </div>
        </li>

        <li class="settings-item">
          <div class="item-label">
            <span class="label-text">紧凑模式</span>
            <span class="label-desc">使用更紧凑的界面布局</span>
          </div>
          <div class="item-control">
            <el-switch v-model="compactMode" />
          </div>
        </li>
      </ul>
    </div>

    <!-- 操作按钮组 -->
    <div class="settings-actions">
      <el-button>重置默认</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      language: "zh-CN",
      theme: "light",
      autoStart: false,
      notification: true,
      fontSize: 14,
      opacity: 100,
      compactMode: false,
      cachePath: "C:/Users/username/AppData/Local/electron-app",
      hardwareAcceleration: true,
      devMode: false,
    };
  },
};
</script>

<style lang="less" scoped>
@import "@/styles/settings.less";
</style>
