export default [
  {
    path: '/menu1',
    name: '菜单1',
    routes: [
      {
        path: '/menu1/test1',
        name: '子菜单1',
        exact: true
      },
      {
        path: '/menu1/test2',
        name: '子菜单2',
        exact: true
      }
    ]
  },
  {
    path: '/menu2',
    name: '菜单2',
    routes: [
      {
        path: '/menu2/test3',
        name: '子菜单1',
        exact: true
      }
    ]
  }
];