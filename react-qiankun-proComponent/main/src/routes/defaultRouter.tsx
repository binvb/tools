import Wellcome from './../pages/wellcome'
import Login from './../pages/login'
// 这里主要是写默认的路由
export default [
  {
    path: '/',
    component: <Wellcome />,
  },
  {
    path: '/login',
    component: <Login />,
  }
]