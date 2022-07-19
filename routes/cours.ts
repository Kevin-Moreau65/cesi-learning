import express from 'express';
import * as coursCtrl from 'controllers/cours';

const routerParcours = express.Router();
routerParcours.get('/', coursCtrl.getCourss);
routerParcours.post('/', coursCtrl.newCours);
routerParcours.get('/:id', coursCtrl.getCours);
routerParcours.patch('/:id', coursCtrl.modifyCours);
routerParcours.delete('/:id', coursCtrl.deleteCours);
export default routerParcours;
