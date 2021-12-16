import { SwaggerRouter } from "koa-swagger-decorator";
import { user } from './src/controller/index'
import path from 'path'

const router = new SwaggerRouter();

router.get('/user', user.getUser)
router.post('/addUser', user.addUser)

router.mapDir(path.resolve(__dirname, './src/controller/'));

export default router