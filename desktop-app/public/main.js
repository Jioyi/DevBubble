const { app, BrowserWindow, Tray, Menu } = require('electron');
let mainWindow;
let tray = null;

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 1024,
		height: 768,
		minWidth: 940,
		minHeight: 500,
		frame: false,
		title: 'Dev Bubble',
		icon: 'C:/Users/Jioyi/Desktop/Git/Projects/DevBubble/desktop-app/public/icons/logo3.png',
		nativeWindowOpen: true,
		backgroundColor: '#202225',
		webPreferences: {
			contextIsolation: false,
			nodeIntegration: true,
			nodeIntegrationInWorker: true,
			enableRemoteModule: true,
		},
	});
	mainWindow.loadURL('http://localhost:3000');
	mainWindow.webContents.openDevTools(); //only in dev
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
	mainWindow.minimizeApp = () => {
		mainWindow.hide();
	};
	tray = new Tray(
		'C:/Users/Jioyi/Desktop/Git/Projects/DevBubble/desktop-app/public/icons/logo3.png'
	);
	const contextMenu = Menu.buildFromTemplate([
		{
			label: 'Show Dev Bubble',
			click: () => {
				mainWindow.show();
			},
		},
		{
			label: 'Quit Dev Bubble',
			click: () => {
				mainWindow.isQuiting = true;
				app.quit();
			},
		},
	]);
	tray.on('double-click', (event) => {
		mainWindow.show();
	});
	tray.setToolTip('Tray Tutorial');
	tray.setContextMenu(contextMenu);
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
