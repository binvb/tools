import Router from '@koa/router'
import { userController } from './src/controller/index'

const router = new Router()

// select
router.get('/user', userController.getUser) // e.g. curl http://127.0.0.1:3001/user\?id\=1
router.get('/userRaw', userController.getUserRaw) // e.g. curl http://127.0.0.1:3001/userRaw\?id\=1
// add
router.post('/addUser', userController.addUser) // e.g. curl -H "Content-Type: application/json" http://127.0.0.1:3001/addUser -X POST -d '{"email": "wenbin.vb@gmail.com", "name": "vb"}'
router.post('/addUserRaw', userController.addUserRaw) // e.g. curl -H "Content-Type: application/json" http://127.0.0.1:3001/addUserRaw -X POST -d '{"email": "wenbin.vb1@gmail.com", "name": "vb1"}'
// update
router.put('/updateUser', userController.updateUser) // e.g. curl http://127.0.0.1:3001/updateUser -X PUT -d '{"email": "wenbin.vb3@gmail.com", "name": "vb3","id":3}' -H "Content-Type: application/json"
// delete
router.delete('/delUser', userController.delUser) // e.g. curl http://127.0.0.1:3001/delUser\?id\=4 -X DELETE

export default router