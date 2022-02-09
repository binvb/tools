import { Outlet } from "react-router-dom"

export default () => {
  return (
    <div>
      <h1>子菜单1</h1>
      <Outlet />
    </div>
  )
}