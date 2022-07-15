import express from 'express';
import * as coursCtrl from 'controllers/cours';
import { checkTokenMiddleware } from 'utils/jsonwebtoken';

const routerParcours = express.Router();
routerParcours.get('/', coursCtrl.getCourss);
routerParcours.post('/', checkTokenMiddleware, coursCtrl.newCours);
routerParcours.get('/:id', checkTokenMiddleware, coursCtrl.getCours);
routerParcours.patch('/:id', checkTokenMiddleware, coursCtrl.modifyCours);
routerParcours.delete('/:id', checkTokenMiddleware, coursCtrl.deleteCours);
export default routerParcours;
