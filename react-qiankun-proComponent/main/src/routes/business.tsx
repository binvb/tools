import Menu1 from './../pages/menu1'
import Menu2 from './../pages/menu2'
import Test from './../pages/test'
// 这里写的是业务逻辑路由
export default [
  {
    path: 'menu1',
    component: <Menu1 />,
    children: [
      {
        path: 'test1',
        component: <Test />
      },
      {
        path: 'test2',
        component: <Test />
      }
    ]
  },
  {
    path: 'menu2',
    component: <Menu2 />,
    children: [
      {
        path: 'test1',
        component: <Test />
      },
      {
        path: 'test2',
        component: <Test />
      }
    ]
  }
]