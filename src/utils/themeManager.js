/**
 * 暗黑模式管理器
 * 负责管理应用的主题切换和持久化
 */

class ThemeManager {
  constructor() {
    this.isDark = false;
    this.followSystem = false; // 是否跟随系统主题
    this.listeners = [];
    this.systemMediaQuery = null;
  }

  /**
   * 初始化主题管理器
   * 从设置中加载保存的主题偏好，如果没有则检测系统主题
   */
  async init() {
    try {
      if (window.api && window.api.getSettings) {
        const settings = await window.api.getSettings();

        // 检查是否跟随系统
        if (settings.followSystem) {
          this.followSystem = true;
          this.applySystemTheme();
          this.startSystemThemeListener();
          return;
        }

        if (settings.darkMode !== undefined) {
          // 使用保存的设置
          this.setDarkMode(settings.darkMode, false);
        } else {
          // 没有保存的设置，检测系统主题
          this.detectSystemTheme();
        }
      } else {
        // 降级：从 localStorage 读取
        const saved = localStorage.getItem('followSystem');
        if (saved === 'true') {
          this.followSystem = true;
          this.applySystemTheme();
          this.startSystemThemeListener();
          return;
        }

        const darkMode = localStorage.getItem('darkMode');
        if (darkMode === 'true') {
          this.setDarkMode(true, false);
        } else if (darkMode === null) {
          // 没有保存的设置，检测系统主题
          this.detectSystemTheme();
        }
      }
    } catch (error) {
      console.error('初始化主题失败:', error);
      // 出错时也检测系统主题
      this.detectSystemTheme();
    }
  }

  /**
   * 检测系统主题偏好
   */
  detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setDarkMode(true, false);
    }
  }

  /**
   * 应用系统主题
   */
  applySystemTheme() {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setDarkMode(isDark, false);
  }

  /**
   * 开始监听系统主题变化
   */
  startSystemThemeListener() {
    if (this.systemMediaQuery) {
      this.systemMediaQuery.removeEventListener('change', this.handleSystemThemeChange);
    }

    this.systemMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.handleSystemThemeChange = (e) => {
      if (this.followSystem) {
        this.setDarkMode(e.matches, false);
      }
    };

    this.systemMediaQuery.addEventListener('change', this.handleSystemThemeChange);
  }

  /**
   * 停止监听系统主题变化
   */
  stopSystemThemeListener() {
    if (this.systemMediaQuery && this.handleSystemThemeChange) {
      this.systemMediaQuery.removeEventListener('change', this.handleSystemThemeChange);
      this.systemMediaQuery = null;
      this.handleSystemThemeChange = null;
    }
  }

  /**
   * 切换暗黑模式
   */
  toggleDarkMode() {
    // 如果正在跟随系统，先关闭跟随
    if (this.followSystem) {
      this.setFollowSystem(false);
    }
    this.setDarkMode(!this.isDark);
  }

  /**
   * 切换跟随系统主题
   */
  toggleFollowSystem() {
    this.setFollowSystem(!this.followSystem);
  }

  /**
   * 设置是否跟随系统主题
   * @param {boolean} follow - 是否跟随系统
   */
  setFollowSystem(follow) {
    this.followSystem = follow;

    if (follow) {
      // 开始跟随系统
      this.applySystemTheme();
      this.startSystemThemeListener();
    } else {
      // 停止跟随系统
      this.stopSystemThemeListener();
    }

    // 保存设置
    this.saveToSettings();
    this.notifyListeners();
  }

  /**
   * 设置暗黑模式状态
   * @param {boolean} isDark - 是否启用暗黑模式
   * @param {boolean} save - 是否保存到设置
   */
  setDarkMode(isDark, save = true) {
    this.isDark = isDark;

    // 更新 DOM 的 class
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // 保存到设置（如果不在跟随系统模式下）
    if (save && !this.followSystem) {
      this.saveToSettings();
    }

    // 通知监听器
    this.notifyListeners();
  }

  /**
   * 保存主题设置到 Electron 设置
   */
  async saveToSettings() {
    try {
      if (window.api && window.api.saveSettings) {
        // 先读取现有设置，然后更新主题相关字段
        const currentSettings = await window.api.getSettings();
        await window.api.saveSettings({
          ...currentSettings,
          darkMode: this.isDark,
          followSystem: this.followSystem,
        });
      } else {
        // 降级：使用 localStorage
        localStorage.setItem('darkMode', this.isDark.toString());
        localStorage.setItem('followSystem', this.followSystem.toString());
      }
    } catch (error) {
      console.error('保存主题设置失败:', error);
    }
  }

  /**
   * 添加状态变化监听器
   * @param {Function} callback - 回调函数
   */
  onChange(callback) {
    this.listeners.push(callback);
  }

  /**
   * 移除监听器
   * @param {Function} callback - 回调函数
   */
  removeChangeListener(callback) {
    this.listeners = this.listeners.filter(cb => cb !== callback);
  }

  /**
   * 通知所有监听器
   */
  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback(this.isDark);
      } catch (error) {
        console.error('监听器回调错误:', error);
      }
    });
  }

  /**
   * 获取当前主题状态
   */
  getIsDark() {
    return this.isDark;
  }

  /**
   * 获取是否跟随系统
   */
  getFollowSystem() {
    return this.followSystem;
  }

  /**
   * 获取图标名称（用于切换按钮）
   */
  getThemeIcon() {
    return this.isDark ? 'PhSun' : 'PhMoon';
  }
}

// 创建单例实例
const themeManager = new ThemeManager();

export default themeManager;
