import express from 'express';
import * as projetCtrl from 'controllers/projet';
import { checkTokenMiddleware } from 'utils/jsonwebtoken';

const routerParcours = express.Router();
routerParcours.get('/', projetCtrl.getProjets);
routerParcours.post('/', checkTokenMiddleware, projetCtrl.newProjet);
routerParcours.get('/:id', checkTokenMiddleware, projetCtrl.getProjet);
routerParcours.patch('/:id', checkTokenMiddleware, projetCtrl.modifyProjet);
routerParcours.delete('/:id', checkTokenMiddleware, projetCtrl.deleteProjet);
export default routerParcours;
