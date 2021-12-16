import Koa from 'koa'
import router from './router'
import bodyParser from 'koa-bodyparser';

const app = new Koa()
const port = 3001

app.use(bodyParser())
app.use(router.routes())
app.listen(port, () => {
  console.log(`listening ${port}`)
})