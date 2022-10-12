const headerMenuConfig = [];

const asideMenuConfig = [

  {
    name: 'MOCK代理',
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
    name: 'RRWEB录屏',
    path: '/',
    icon: '',
    children: [
    ],
  },
  {
    name: '数据埋点',
    path: '/',
    icon: '',
    children: [
      {
        name: '埋点验收',
        path: '/check_data_tracking',
      },
      {
        name: '埋点查看',
        path: '/data_tracking',
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
        path: '/ruler',
      },
      {
        name: '截图工具',
        path: '/screenshots',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
