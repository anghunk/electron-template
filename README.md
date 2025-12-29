# Electron Template

现代化的 Electron 桌面应用模板，集成 Vue3、Vite 和 Element Plus，采用温暖优雅的 UI 设计。

![](https://github.com/user-attachments/assets/3e20060b-e09e-474a-bad1-0dcee75e5648)

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
- Vue Router

## 项目结构

```
├── src/
│   ├── components/      # UI 组件（TitleBar, Aside）
│   ├── views/           # 页面视图
│   ├── router/          # 路由配置
│   ├── styles/          # 主题样式
│   └── main.js          # Vue 入口
├── build/               # 构建资源（图标）
├── main.js              # Electron 主进程
├── preload.js           # 预加载脚本
└── vite.config.js       # Vite 配置
```

## 核心功能

**桌面体验**: 无边框窗口、自定义标题栏、系统托盘  
**开发友好**: Vite 热重载、一键启动开发环境  
**跨平台**: 支持 Windows、macOS、Linux 打包  
**单实例**: 防止应用重复启动

## 自定义主题

修改 `src/styles/index.less` 中的 CSS 变量即可定制主题：

```css
:root {
  --color-primary: #d97757;     /* 主色调 */
  --color-background: #fcf7f1;  /* 背景色 */
  --font-heading: "Merriweather", serif;
  --font-body: "DM Sans", sans-serif;
  --radius: 1rem;               /* 圆角半径 */
}
```

## License

[Apache-2.0 license](./LICENSE)
