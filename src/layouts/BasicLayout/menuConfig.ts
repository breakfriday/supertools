const headerMenuConfig = [];

const asideMenuConfig = [

  {
    name: 'mock代理',
    path: '/',
    icon: 'copy',
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
    icon: 'chart-bar',
    children: [
      {
        name: 'remote_proxy',
        path: '/remote',
      },
    ],
  },


  {
    name: '登录&注册',
    path: '/',
    icon: 'account',
    children: [
      {
        name: '登录',
        path: '/user/login',
      },
      {
        name: '注册',
        path: '/user/register',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
