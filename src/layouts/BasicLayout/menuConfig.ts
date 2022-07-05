const headerMenuConfig = [];

const asideMenuConfig = [

  {
    name: 'mock代理',
    path: '/',
    icon: 'copy',
    children: [
      {
        name: '数据代理',
        path: '/home',
      },
      {
        name: '资源代理',
        path: '/form/two',
      },

    ],
  },
  {
    name: '远程调试',
    path: '/',
    icon: 'chart-bar',
    children: [
      {
        name: '基础列表',
        path: '/list/basic',
      },
      {
        name: '卡片列表',
        path: '/list/card',
      },
      {
        name: '表格列表',
        path: '/',
        children: [
          {
            name: '基础过滤',
            path: '/list/table/filter',
          },
          {
            name: '单列过滤',
            path: '/list/table/singlecol',
          },
          {
            name: '多列过滤',
            path: '/list/table/mutilcol',
          },
          {
            name: '带操作列',
            path: '/list/table/action',
          },
          {
            name: '可展开表',
            path: '/list/table/expand',
          },
          {
            name: '单层树表',
            path: '/list/table/singletree',
          },
          {
            name: '弹窗表格',
            path: '/list/table/dialog',
          },
          {
            name: '合并单元格',
            path: '/list/table/mergecell',
          },
        ],
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
