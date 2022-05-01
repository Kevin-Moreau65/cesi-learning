import express from 'express';
import * as userCtrl from '../controllers/user';
import checkRole from '../utils/checkRole';
const routerUser = express.Router();
routerUser.get('/', userCtrl.getUsers);
routerUser.get('/:id', userCtrl.getUsers);
export default routerUser;
