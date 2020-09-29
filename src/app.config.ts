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
    color: 'lightgray',
    selectedColor: 'green',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '搜索',
      },
      {
        pagePath: 'pages/logs/index',
        text: '进度',
      },
    ],
  },
}
