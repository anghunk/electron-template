# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a modern Electron desktop application template with Vue 3, Vite, Element Plus, and Tailwind CSS. The app features a warm, elegant UI design with a custom frameless window, system tray integration, and settings management.

## Common Commands

```bash
# Install dependencies
npm install

# Development mode (concurrent Vite + Electron)
npm run dev

# Build only (for testing)
npm run pack

# Full production build with installer
npm run dist

# Clean build artifacts
npm run rf

# Individual development servers (if needed)
npm run dev:vite      # Vite dev server only (port 5179)
npm run dev:electron  # Electron only (requires Vite running)
```

## Architecture

### Process Separation

**Main Process** (`main.js`):
- Electron main process handling window creation, tray, IPC handlers
- Settings management (stored in `userData` directory)
- Single instance lock enforcement
- Window controls (minimize, maximize, close with tray behavior)

**Renderer Process** (`src/`):
- Vue 3 application with Vue Router
- Vite dev server during development, built files in production
- Communicates with main process via preload script

**Preload Script** (`preload.cjs`):
- Exposes safe API to renderer via `contextBridge`
- Provides: `window.api.getAppVersion()`, `window.api.getSettings()`, `window.api.saveSettings()`, window controls

### Key Files Structure

```
├── main.js              # Electron main process (180+ lines)
├── preload.cjs          # Context bridge for IPC
├── src/
│   ├── App.vue          # Root layout (TitleBar + Aside + RouterView)
│   ├── main.js          # Vue entry point
│   ├── components/
│   │   ├── TitleBar.vue # Custom window controls (min/max/close)
│   │   └── Aside.vue    # Navigation sidebar
│   ├── router/
│   │   ├── index.js     # Router config (hash history)
│   │   └── routes.js    # Route definitions
│   ├── views/           # Page components (Home, Settings, About, 404)
│   └── styles/
│       └── index.less   # Theme + CSS variables + Layout styles
├── vite.config.js       # Vite config with auto-imports
├── tailwind.config.js   # Custom theme colors & utilities
└── postcss.config.js    # PostCSS setup
```

### Build Configuration

**Vite** (`vite.config.js`):
- Output: `dist-ui/`
- Port: 5179 (strict)
- Auto-imports for Element Plus components
- Alias: `@/` → `src/`

**Electron Builder** (`package.json`):
- Windows: NSIS installer
- macOS: DMG
- Linux: AppImage
- Files include: `dist-ui/**`, `build/icon.png`, `main.js`, `preload.cjs`

### Theme System

**CSS Variables** (in `src/styles/index.less`):
- Primary color: `#d97757` (warm orange)
- Custom Element Plus theme overrides
- Tailwind extensions: `primary`, `secondary`, `surface`, `background`, etc.

**Tailwind Config**:
- Maps CSS variables to Tailwind classes
- Custom shadows, border-radius utilities
- Color palette based on "Helpful Warmth" theme

### IPC Communication Flow

1. **Renderer → Main**: `window.api.<method>()` calls
2. **Preload**: Exposes methods via `contextBridge`
3. **Main**: `ipcMain.handle()` or `ipcMain.on()` handlers

**Available APIs**:
- `getAppVersion()` → Returns app version
- `getSettings()` → Returns settings object
- `saveSettings(settings)` → Persists settings
- `minimize()` / `maximize()` / `close()` → Window controls

### Settings Management

- **Location**: `userData/settings.json` (platform-specific)
- **Default**: `{ closeToTray: true }`
- **Features**:
  - Close-to-tray behavior toggle
  - Persists across app restarts
  - Settings page in UI

### Window Behavior

- **Frameless**: Custom title bar with drag region
- **Single Instance**: Prevents multiple app launches
- **Tray Integration**:
  - Show/Hide window
  - Version display
  - Update check link
  - Restart/Exit
- **Close Button**: Configurable (tray vs quit)
- **Dev Mode**: Opens DevTools automatically

### Development Workflow

1. `npm run dev` starts Vite (5179) and Electron concurrently
2. Vite serves Vue app with HMR
3. Electron loads `http://localhost:5179` in dev
4. Changes to Vue files hot-reload automatically
5. Main process changes require restart

### Production Build Flow

1. `vite build` → outputs to `dist-ui/`
2. `electron-builder` packages:
   - Bundles `dist-ui/**`
   - Includes `main.js`, `preload.cjs`
   - Adds icons from `build/`
   - Creates platform-specific installer

### Important Notes

- **No Refresh**: Ctrl+R, F5, Ctrl+Shift+R are disabled in production
- **External Links**: Open in system browser via `shell.openExternal()`
- **Port 5179**: Must be available, strict port checking enabled
- **Icons**: Windows uses `.ico`, others use `.png` from `build/`
- **Auto-imports**: Unplugin auto-imports Vue and Element Plus components

### Adding New Features

**New Page**:
1. Create component in `src/views/`
2. Add route in `src/router/routes.js`
3. Add navigation link in `Aside.vue`

**New IPC Method**:
1. Add handler in `main.js` with `ipcMain.handle()` or `ipcMain.on()`
2. Expose in `preload.cjs` via `contextBridge.exposeInMainWorld()`
3. Call from renderer: `window.api.newMethod()`

**Styling**:
- Use Tailwind classes with custom theme colors
- Reference CSS variables for theme consistency
- Less files for global styles and layout

### Environment

- `.env` / `.env.example`: Environment variables
- `.npmrc`: npm configuration (registry mirrors)
- `.prettierrc`: Code formatting rules (tabs, single quotes, 120 width)

### Dependencies

**Core**:
- Electron 33
- Vue 3.5
- Vite 6
- Vue Router 4.5

**UI**:
- Element Plus 2.9
- Tailwind CSS 3.4

**Tooling**:
- Unplugin Auto Import
- Unplugin Vue Components
- Concurrently (dev)
- Wait-on (dev)
- Cross-env (dev)

**Build**:
- Electron Builder 25