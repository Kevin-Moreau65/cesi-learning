import express from 'express';
import { checkTokenMiddleware } from '../utils/jsonwebtoken';
import * as authCtrl from '../controllers/auth';
const routerAuth = express.Router();

routerAuth.post('/', authCtrl.login);

export default routerAuth;
