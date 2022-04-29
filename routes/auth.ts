import express from 'express';
import * as authCtrl from '../controllers/auth';
const routerAuth = express.Router();

routerAuth.post('/', authCtrl.login);

export default routerAuth;
