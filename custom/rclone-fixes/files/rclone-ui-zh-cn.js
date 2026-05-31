(function () {
  'use strict';

  var dict = {
    'About': '关于',
    'Access': '访问',
    'Actions': '操作',
    'Add': '添加',
    'Add a file-filtering rule': '添加文件过滤规则',
    'All': '全部',
    'Allow connections with no authentication': '允许无认证连接',
    'Allow prompt for password for encrypted configuration': '允许为加密配置提示输入密码',
    'Backend': '后端',
    'Backends': '后端',
    'Browse': '浏览',
    'Cancel': '取消',
    'Clear': '清空',
    'Close': '关闭',
    'Config': '配置',
    'Configs': '配置',
    'Configuration': '配置',
    'Confirm': '确认',
    'Copy': '复制',
    'Create': '创建',
    'Dashboard': '仪表盘',
    'Delete': '删除',
    'Destination': '目标',
    'Directory': '目录',
    'Download': '下载',
    'Edit': '编辑',
    'Error': '错误',
    'Explorer': '文件浏览',
    'File': '文件',
    'Files': '文件',
    'Filter': '过滤',
    'Help': '帮助',
    'Host': '主机',
    'Jobs': '任务',
    'List': '列表',
    'Local': '本地',
    'Login': '登录',
    'Logout': '退出登录',
    'Logs': '日志',
    'Mount': '挂载',
    'Mounts': '挂载',
    'Move': '移动',
    'Name': '名称',
    'New': '新建',
    'No': '否',
    'OK': '确定',
    'Open': '打开',
    'Operation': '操作',
    'Operations': '操作',
    'Options': '选项',
    'Password': '密码',
    'Path': '路径',
    'Port': '端口',
    'Progress': '进度',
    'Refresh': '刷新',
    'Remote': '远程',
    'Remotes': '远程',
    'Rename': '重命名',
    'Reset': '重置',
    'Save': '保存',
    'Search': '搜索',
    'Select': '选择',
    'Settings': '设置',
    'Size': '大小',
    'Source': '源',
    'Start': '启动',
    'Status': '状态',
    'Stop': '停止',
    'Sync': '同步',
    'Transfers': '传输',
    'Type': '类型',
    'Update': '更新',
    'Upload': '上传',
    'Username': '用户名',
    'Waiting': '等待中',
    'Yes': '是',
    'Rclone WebUI': 'Rclone 网页界面',
    'Welcome to Rclone': '欢迎使用 Rclone',
    'You need to enable JavaScript to run this app.': '需要启用 JavaScript 才能运行此应用。'
  };

  var phraseDict = {
    'An angular web application for rclone': 'Rclone 的 Angular 网页管理界面',
    'A reactjs based web UI for rclone': 'Rclone 的 React 网页管理界面',
    'A full fledged UI for the rclone cloud sync tool.': 'Rclone 云同步工具的完整网页管理界面。',
    'An error occurred': '发生错误',
    'No data available': '暂无数据',
    'Loading': '正在加载',
    'Please wait': '请稍候',
    'Are you sure': '确定继续吗',
    'This action cannot be undone': '此操作无法撤销'
  };

  function translateText(value) {
    if (!value)
      return value;

    var trimmed = value.replace(/\s+/g, ' ').trim();
    if (!trimmed)
      return value;

    if (dict[trimmed])
      return value.replace(trimmed, dict[trimmed]);

    var result = value;
    Object.keys(phraseDict).forEach(function (key) {
      result = result.replace(new RegExp(escapeRegExp(key), 'g'), phraseDict[key]);
    });

    return result;
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function translateNode(node) {
    if (!node || node.nodeType !== 1)
      return;

    var tag = node.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA')
      return;

    ['title', 'placeholder', 'aria-label', 'value'].forEach(function (attr) {
      if (!node.hasAttribute || !node.hasAttribute(attr))
        return;

      var oldValue = node.getAttribute(attr);
      var newValue = translateText(oldValue);
      if (newValue !== oldValue)
        node.setAttribute(attr, newValue);
    });

    Array.prototype.forEach.call(node.childNodes || [], function (child) {
      if (child.nodeType === 3) {
        var oldText = child.nodeValue;
        var newText = translateText(oldText);
        if (newText !== oldText)
          child.nodeValue = newText;
      } else if (child.nodeType === 1) {
        translateNode(child);
      }
    });
  }

  function translatePage() {
    if (document.title)
      document.title = translateText(document.title);
    translateNode(document.body);
  }

  function observe() {
    var timer = 0;
    var observer = new MutationObserver(function () {
      clearTimeout(timer);
      timer = setTimeout(translatePage, 50);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['title', 'placeholder', 'aria-label', 'value']
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      translatePage();
      observe();
    });
  } else {
    translatePage();
    observe();
  }
})();
