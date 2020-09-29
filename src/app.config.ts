export default {
  pages: [
    'pages/index/index',
    'pages/logs/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#bfbfbf',
    selectedColor: '#3eb440',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        selectedIconPath: 'assets/search_1.png',
        iconPath: './assets/search_0.png',
        text: '搜索',
      },
      {
        pagePath: 'pages/logs/index',
        selectedIconPath: 'assets/menu_1.png',
        iconPath: './assets/menu_0.png',
        text: '进度',
      },
    ],
  },
}
