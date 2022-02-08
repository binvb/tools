import { Menu, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './index.less'

function handleClick() {

}

const menu = (
  <Menu onClick={handleClick}>
       <Menu.Item key="setting:1">退出登录</Menu.Item>
  </Menu>
)

export default () => {
  return (
    <div className="header">
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>vb</a>
        </Dropdown>
    </div>
  )
}