# CLAUDE.md

此文件为 CADUDE 代码（claude.ai/code）在此存储库中工作时的代码提供指导。

## 简介

这是一个使用 Vue 3、Vite、Element Plus 和 Tailwind CSS 的现代 Electron 桌面应用程序模板。该应用程序具有暖色调且优雅的 UI 设计，包括自定义无边框窗口、托盘集成和设置管理。

## 常用命令

```bash
# 安装依赖
npm install

# 开发模式（同时运行 Vite + Electron）
npm run dev

# 仅构建（用于测试）
npm run pack

# 全生产构建（带有安装程序）
npm run dist

# 清理构建工件
npm run rf

# 单个开发服务器（如果需要）
npm run dev:vite      # 仅 Vite 开发服务器（端口 5179）
npm run dev:electron  # 仅 Electron（需要运行 Vite）
```

## 架构

### 进程分离

**主进程** (`main.js`):
- 处理窗口创建、托盘、IPC 处理器
- 设置管理（存储在 `userData` 目录）
- 单实例锁定强制
- 窗口控制（最小化、最大化、带托盘行为关闭）

**渲染进程** (`src/`):
- 使用 Vue Router 的 Vue 3 应用程序
- 开发期间使用 Vite 开发服务器，生产构建的文件
- 通过预加载脚本与主进程通信

**预加载脚本** (`preload.cjs`):
- 通过 `contextBridge` 向渲染器暴露安全 API
- 提供：`window.api.getAppVersion()`、`window.api.getSettings()`、`window.api.saveSettings()`、窗口控制

### 关键文件结构

```
├── main.js              # Electron 主进程（180+ 行）
├── preload.cjs          # IPC 的上下文桥梁
├── src/
│   ├── App.vue          # 根布局（标题栏 + 侧边栏 + RouterView）
│   ├── main.js          # Vue 入口点
│   ├── components/
│   │   ├── TitleBar.vue # 自定义窗口控制（最小化/最大化/关闭）
│   │   └── Aside.vue    # 导航侧边栏
│   ├── router/
│   │   ├── index.js     # 路由配置（hash 历史）
│   │   └── routes.js    # 路由定义
│   ├── views/           # 页面组件（主页、设置、关于、404）
│   └── styles/
│       └── index.less   # 主题 + CSS 变量 + 布局样式
├── vite.config.js       # Vite 配置，具有自动导入
├── tailwind.config.js   # 自定义主题颜色和实用程序
└── postcss.config.js    # PostCSS 设置
```

### 构建配置

**Vite** (`vite.config.js`):
- 输出：`dist-ui/`
- 端口：5179（严格）
- Element Plus 组件自动导入
- 别名：`@/` → `src/`

**Electron Builder** (`package.json`):
- Windows：NSIS 安装程序
- macOS：DMG
- Linux：AppImage
- 包含文件：`dist-ui/**`、`build/icon.png`、`main.js`、`preload.cjs`

### 主题系统

**CSS 变量**（在 `src/styles/index.less` 中）:
- 主色：`#d97757`（暖色调橙色）
- 自定义 Element Plus 主题覆盖
- Tailwind 扩展：`primary`、`secondary`、`surface`、`background` 等。

**Tailwind Config**：
- 将 CSS 变量映射到 Tailwind 类
- 自定义阴影、边框半径实用程序
- 基于“有助的温暖”主题的颜色调板

### IPC 通信流程

1. **渲染器→主进程**：`window.api.<方法>()` 调用
2. **预加载**：通过 `contextBridge` 暴露方法
3. **主进程**：`ipcMain.handle()` 或 `ipcMain.on()` 处理器

**可用 API**：
- `getAppVersion()` → 返回应用程序版本
- `getSettings()` → 返回设置对象
- `saveSettings(settings)` → 持久化设置
- `minimize()` / `maximize()` / `close()` → 窗口控制

### 设置管理

- **位置**：`userData/settings.json`（平台相关）
- **默认**：`{ closeToTray: true }`
- **功能**：
  - 关闭到托盘行为切换
  - 在应用程序重启后持续存在
  - UI 中的设置页面

### 窗口行为

- **无边框**：自定义标题栏带有拖动区域
- **单实例**：防止多次启动应用程序
- **托盘集成**：
  - 显示/隐藏窗口
  - 版本显示
  - 更新检查链接
  - 重新启动/退出
- **关闭按钮**：可配置（托盘或退出）
- **开发模式**：自动打开 DevTools

### 开发工作流程

1. `npm run dev` 启动 Vite（5179）和 Electron 同时
2. Vite 提供具有 HMR 的 Vue 应用程序
3. Electron 在开发中加载 `http://localhost:5179`
4. Vue 文件更改自动热重载
5. 主进程更改需要重新启动

### 生产构建流程

1. `vite build` → 输出到 `dist-ui/`
2. `electron-builder` 打包：
   - 打包 `dist-ui/**`
   - 包括 `main.js`、`preload.cjs`
   - 从 `build/` 包括图标
   - 为特定平台创建安装程序

### 重要注意事项

- **无刷新**：禁用 Ctrl+R、F5、Ctrl+Shift+R
- **外部链接**：通过 `shell.openExternal()` 在系统浏览器中打开
- **端口 5179**：必须可用，启用严格端口检查
- **图标**：Windows 使用 `.ico`，其他使用从 `build/` 中的 `.png`
- **自动导入**：Unplugin auto-imports Vue 和 Element Plus 组件

### 添加新功能

**新页面**：
1. 在 `src/views/` 中创建组件
2. 在 `src/router/routes.js` 中添加路由
3. 在 `Aside.vue` 中添加导航链接

**新 IPC 方法**：
1. 在 `main.js` 中使用 `ipcMain.handle()` 或 `ipcMain.on()` 添加处理程序
2. 通过 `contextBridge.exposeInMainWorld()` 在 `preload.cjs` 中暴露
3. 从渲染器调用：`window.api.newMethod()`

**样式**：
- 使用 Tailwind 类和自定义主题颜色
- 参考 CSS 变量以保持主题一致性
- Less 文件用于全局样式和布局

### 环境

- `.env` / `.env.example`：环境变量
- `.npmrc`：npm 配置（仓库镜像）
- `.prettierrc`：代码格式化规则（制表符、单引号、120 宽度）

### 依赖

**核心**：
- Electron 33
- Vue 3.5
- Vite 6
- Vue Router 4.5

**UI**：
- Element Plus 2.9
- Tailwind CSS 3.4

**工具**：
- Unplugin Auto Import
- Unplugin Vue Components
- Concurrently（dev）
- Wait-on（dev）
- Cross-env（dev）

**构建**：
- Electron Builder 25
