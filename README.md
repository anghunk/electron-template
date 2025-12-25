# Electron Template

一个现代化的 Electron 桌面应用模板，集成 Vue3 + Vite + Element Plus。

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式（一键启动 Vite + Electron）
npm run dev

# 打包应用
npm run dist
```

## 技术栈

- Electron 33
- Vue 3.5
- Vite 6
- Element Plus
- Vue Router

## 项目结构

```
├── src/                # 前端源码
│   ├── components/     # 组件
│   ├── pages/          # 页面
│   ├── router/         # 路由
│   └── styles/         # 样式
├── build/              # 构建资源（图标等）
├── main.js             # Electron 主进程
├── preload.js          # 预加载脚本
└── vite.config.js      # Vite 配置
```

## 功能特性

- 无边框窗口 + 自定义标题栏
- 系统托盘支持
- 单实例锁定
- 开发/生产环境自动切换

## LICENSE

[Apache-2.0 license](./LICENSE)
