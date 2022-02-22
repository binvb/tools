import request from './../services/axios/index'
export default () => {
  async function fn() {
    const data = await request.get<{data: {name: string}}>('/test')
    console.log(33333333)
  }
  fn()
  return (
    <div>登录</div>
  )
}