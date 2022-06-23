import express from 'express';
import * as userCtrl from '$controllers/user';
const routerUser = express.Router();

routerUser.get('/', userCtrl.getUsers);
routerUser.get('/:id', userCtrl.getUser);
routerUser.post('/', userCtrl.newUser);
routerUser.put('/:id', userCtrl.modifyUser);
routerUser.delete('/:id', userCtrl.deleteUser);

export default routerUser;
