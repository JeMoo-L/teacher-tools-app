import { app, BrowserWindow, dialog, ipcMain, nativeTheme, shell } from 'electron';
import path from 'node:path';
import MenuBuilder from './menu';
import { store } from './store-node';
const { autoUpdater } = require('electron-updater');

// // 配置自动更新行为
// autoUpdater.autoDownload = true; // 检测到更新时自动下载
// autoUpdater.autoInstallOnAppQuit = true; // 应用退出时自动安装更新

class AppUpdater {
  constructor() {
    // log.transports.file.level = 'info';
    // const locale = new Locale();

    // autoUpdater.logger = log;
    autoUpdater.setFeedURL({
      provider: 'github',
      owner: 'JeMoo-L',
      repo: 'teacher-tools-app',
    });
    autoUpdater.checkForUpdatesAndNotify();
    autoUpdater.once('update-downloaded', (event) => {
      dialog
        .showMessageBox({
          type: 'info',
          buttons: ['重启', '稍后'],
          title: '应用更新',
          message: event.releaseName || '新版本',
          detail: '新版本已经下载好，重启应用以应用更新。',
        })
        .then((returnValue) => {
          if (returnValue.response === 0) autoUpdater.quitAndInstall();
        });
    });
  }
}

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'), // 确保路径正确
      nodeIntegration: false,
    },
  });

  console.log('NODE_ENV==>', process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  mainWindow.setMenuBarVisibility(false);

  new AppUpdater();

  nativeTheme.on('updated', () => {
    mainWindow?.webContents.send('system-theme-updated');
  });

  //应用系统顶部菜单
  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  mainWindow.webContents.openDevTools();
};

app
  .whenReady()
  .then(() => {
    createWindow();

    app.on('activate', () => {
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC

ipcMain.handle('getStoreValue', (event, key) => {
  return store.get(key);
});
ipcMain.handle('setStoreValue', (event, key, dataJson) => {
  const data = JSON.parse(dataJson);
  return store.set(key, data);
});
ipcMain.handle('delStoreValue', (event, key) => {
  return store.delete(key);
});
ipcMain.handle('getAllStoreValues', (event) => {
  return JSON.stringify(store.store);
});
ipcMain.handle('setAllStoreValues', (event, dataJson) => {
  const data = JSON.parse(dataJson);
  store.store = data;
});
ipcMain.handle('shouldUseDarkColors', () => nativeTheme.shouldUseDarkColors);
