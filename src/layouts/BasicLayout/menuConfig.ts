const headerMenuConfig = [];

const asideMenuConfig = [

  {
    name: 'mock代理',
    path: '/',
    icon: '',
    children: [
      {
        name: '场景',
        path: '/scence',
      },

    ],
  },
  {
    name: '远程调试',
    path: '/',
    icon: '',
    children: [
      {
        name: 'remote_proxy',
        path: '/remote',
      },
    ],
  },
  {
    name: '数据埋点',
    path: '/',
    icon: '',
    children: [
      {
        name: '埋点验收',
        path: '/remote',
      },
      {
        name: '埋点查看',
        path: '/remote2',
      },
    ],
  },


  {
    name: '其他',
    path: '/',
    icon: '',
    children: [
      {
        name: '标尺测量',
        path: '/user/login',
      },
      {
        name: '截图工具',
        path: '/user/register',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
