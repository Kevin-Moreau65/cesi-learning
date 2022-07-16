import express from 'express';
import * as parcoursCtrl from 'controllers/parcours';

const routerParcours = express.Router();
routerParcours.get('/', parcoursCtrl.getParcourss);
routerParcours.post('/', parcoursCtrl.newParcours);
routerParcours.get('/:id', parcoursCtrl.getParcours);
routerParcours.patch('/:id', parcoursCtrl.modifyParcours);
routerParcours.delete('/:id', parcoursCtrl.deleteParcours);
export default routerParcours;
