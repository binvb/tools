import Router from '@koa/router'
import { userController } from './src/controller/index'

const router = new Router()

router.get('/user', userController.getUser)
router.post('/addUser', userController.addUser)

export default router