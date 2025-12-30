import { app, BrowserWindow, ipcMain, Tray, Menu, shell } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// ES6 模块中获取 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 设置文件路径
const settingsPath = path.join(app.getPath('userData'), 'settings.json');

// 默认设置
const defaultSettings = {
	closeToTray: true, // 关闭窗口时最小化到托盘
};

// 读取设置
function getSettings() {
	try {
		if (fs.existsSync(settingsPath)) {
			const data = fs.readFileSync(settingsPath, 'utf-8');
			return { ...defaultSettings, ...JSON.parse(data) };
		}
	} catch (error) {
		console.error('Error reading settings:', error);
	}
	return defaultSettings;
}

// 保存设置
function saveSettings(settings) {
	try {
		fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
		return true;
	} catch (error) {
		console.error('Error saving settings:', error);
		return false;
	}
}

// Set App User Model ID for Windows Taskbar Icon
app.setAppUserModelId('com.electron.template');

let mainWindow;
let tray = null;

// Get icon path based on platform
function getIconPath() {
	const icoPath = path.join(__dirname, 'build/icon.ico');
	const pngPath = path.join(__dirname, 'build/icon.png');

	// Windows prefers .ico format
	if (process.platform === 'win32' && fs.existsSync(icoPath)) {
		return icoPath;
	}
	return pngPath;
}

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1000,
		height: 700,
		frame: false, // Frameless window for custom title bar
		icon: getIconPath(),
		show: false, // Don't show until ready
		webPreferences: {
			preload: path.join(__dirname, 'preload.cjs'),
			nodeIntegration: false,
			contextIsolation: true,
		},
	});

	// Show window when ready to prevent visual flash
	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
	});

	// Load different URLs based on environment
	const isDev = process.env.NODE_ENV === 'development';

	if (isDev) {
		// In development mode, load from Vite dev server
		mainWindow.loadURL('http://localhost:5179');
		// Open DevTools in development
		mainWindow.webContents.openDevTools();
	} else {
		// In production, load the built file
		mainWindow.loadFile(path.join(__dirname, 'dist-ui/index.html'));
	}

	mainWindow.on('closed', () => {
		mainWindow = null;
	});

	// Open external links in system browser
	mainWindow.webContents.setWindowOpenHandler(({ url }) => {
		shell.openExternal(url);
		return { action: 'deny' };
	});

	// Disable refresh shortcuts (Ctrl+R, F5, Ctrl+Shift+R)
	mainWindow.webContents.on('before-input-event', (event, input) => {
		if (
			(input.control && input.key.toLowerCase() === 'r') ||
			input.key === 'F5' ||
			(input.control && input.shift && input.key.toLowerCase() === 'r')
		) {
			event.preventDefault();
		}
	});
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
	app.quit();
} else {
	app.on('second-instance', () => {
		// Someone tried to run a second instance, we should focus our window.
		if (mainWindow) {
			if (mainWindow.isMinimized()) mainWindow.restore();
			mainWindow.focus();
		}
	});

	app.whenReady().then(() => {
		// Set icon for Windows taskbar in development
		if (process.platform === 'win32') {
			app.setAppUserModelId(app.name);
		}
		createWindow();
		createTray();
	});
}

// IPC Handlers - Basic example
ipcMain.handle('get-app-version', () => {
	return app.getVersion();
});

// 设置管理
ipcMain.handle('get-settings', () => {
	return getSettings();
});

ipcMain.handle('save-settings', (event, settings) => {
	return saveSettings(settings);
});

// Window Controls
ipcMain.on('window-minimize', () => {
	mainWindow?.minimize();
});

ipcMain.on('window-maximize', () => {
	if (mainWindow?.isMaximized()) {
		mainWindow.unmaximize();
	} else {
		mainWindow?.maximize();
	}
});

ipcMain.on('window-close', () => {
	const settings = getSettings();
	if (settings.closeToTray) {
		// 最小化到托盘
		mainWindow?.hide();
	} else {
		// 直接退出应用
		app.quit();
	}
});

// Open external link in default browser
ipcMain.on('open-external', (event, url) => {
	shell.openExternal(url);
});

// Create system tray icon
function createTray() {
	const iconPath = getIconPath();
	tray = new Tray(iconPath);

	const contextMenu = Menu.buildFromTemplate([
		{
			label: '显示窗口',
			click: () => {
				if (mainWindow) {
					mainWindow.show();
					mainWindow.focus();
				}
			},
		},
		{ type: 'separator' },
		{
			label: `版本（v${app.getVersion()}）`,
			enabled: false,
		},
		{
			label: '检查更新',
			click: () => {
				const repoUrl = 'https://github.com/anghunk/electron-template/releases';
				shell.openExternal(repoUrl);
			},
		},
		{ type: 'separator' },
		{
			label: '重启',
			click: () => {
				app.relaunch();
				app.quit();
			},
		},
		{
			label: '退出',
			click: () => {
				app.quit();
			},
		},
	]);

	tray.setToolTip('Electron Template');
	tray.setContextMenu(contextMenu);

	// Click on tray icon to show window
	tray.on('click', () => {
		if (mainWindow && !mainWindow.isVisible()) {
			mainWindow.show();
			mainWindow.focus();
		}
	});
}

app.on('window-all-closed', () => {
	const settings = getSettings();
	// 如果设置为关闭到托盘，允许应用在没有窗口的情况下继续运行
	// 否则遵循默认行为（macOS 保持运行，其他平台退出）
	if (!settings.closeToTray && process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
