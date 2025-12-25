const { app, BrowserWindow, ipcMain, Tray, Menu, shell } = require('electron');
const path = require('path');

const fs = require('fs');

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
			preload: path.join(__dirname, 'preload.js'),
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
	mainWindow?.close();
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
		if (mainWindow) {
			if (mainWindow.isVisible()) {
				mainWindow.hide();
			} else {
				mainWindow.show();
				mainWindow.focus();
			}
		}
	});
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
