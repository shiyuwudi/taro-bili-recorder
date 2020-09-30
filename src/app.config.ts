export default {
  pages: [
    'pages/index/index',
    'pages/logs/index',
    'pages/wishlist/index',
    'pages/my/index',
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
        selectedIconPath: 'assets/progress_1.png',
        iconPath: './assets/progress_0.png',
        text: '在看',
      },
      {
        pagePath: 'pages/wishlist/index',
        selectedIconPath: 'assets/wishlist_1.png',
        iconPath: './assets/wishlist_0.png',
        text: '想看',
      },
      {
        pagePath: 'pages/my/index',
        selectedIconPath: 'assets/my_1.png',
        iconPath: './assets/my_0.png',
        text: '我的',
      },
    ],
  },
}
