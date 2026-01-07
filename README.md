# Electron Template

现代化的 Electron 桌面应用模板，采用温暖优雅的 UI 设计。

![preview](https://github.com/user-attachments/assets/a5749b54-3688-48d6-9a4f-1b1fc4b54319)

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 打包应用
npm run dist              # Windows
npm run dist -- --mac     # macOS
npm run dist -- --linux   # Linux
```

## 技术栈

- Electron 33
- Vue 3.5
- Vite 6
- Element Plus
- Tailwind CSS
- Phosphor Icons
- Vue Router

## 项目结构

```
├── src/
│   ├── components/      # UI 组件（TitleBar, Aside）
│   ├── views/           # 页面视图
│   ├── router/          # 路由配置
│   ├── styles/          # 主题样式（Less + Tailwind）
│   └── main.js          # Vue 入口
├── build/               # 构建资源（图标）
├── main.js              # Electron 主进程
├── preload.js           # 预加载脚本
├── tailwind.config.js   # Tailwind CSS 配置
├── postcss.config.js    # PostCSS 配置
└── vite.config.js       # Vite 配置
```

## 核心功能

**桌面体验**: 无边框窗口、自定义标题栏、系统托盘  
**开发友好**: Vite 热重载、一键启动开发环境  
**跨平台**: 支持 Windows、macOS、Linux 打包  
**单实例**: 防止应用重复启动

## 开发说明

### 并发开发服务

项目使用 `concurrently` 同时启动 Vite 和 Electron：
- Vite 开发服务器运行在 `http://localhost:5179`
- Electron 等待 Vite 启动后自动加载

### 构建流程

1. **开发模式**: `npm run dev`
2. **打包测试**: `npm run pack`（不生成安装包）
3. **生产打包**: `npm run dist`
4. **清理构建**: `npm run rf`

## License

[Apache-2.0 license](./LICENSE)
