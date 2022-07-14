import express from 'express';
import * as parcoursCtrl from 'controllers/parcours';
import { checkTokenMiddleware } from 'utils/jsonwebtoken';

const routerParcours = express.Router();
routerParcours.get('/', parcoursCtrl.getParcourss);
routerParcours.post('/', checkTokenMiddleware, parcoursCtrl.newParcours);
routerParcours.get('/:id', checkTokenMiddleware, parcoursCtrl.getParcours);
routerParcours.patch('/:id', checkTokenMiddleware, parcoursCtrl.modifyParcours);
routerParcours.delete(
	'/:id',
	checkTokenMiddleware,
	parcoursCtrl.deleteParcours
);
export default routerParcours;
