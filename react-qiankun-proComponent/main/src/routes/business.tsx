import Menu1 from './../pages/menu1'
import Test from './../pages/test'
import Login from './../pages/login'

// 这里写的是业务逻辑路由
export default [
  {
    path: '/menu1',
    name: '菜单1',
    component: <Menu1 />,
    children: [
      {
        path: '/test1',
        component: <Login />
      },
      {
        path: '/test2',
        component: <Test />
      }
    ]
  }
]