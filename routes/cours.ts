import express from 'express';
import * as coursCtrl from '$controllers/cours';
const routerCours = express.Router();

routerCours.get('/', coursCtrl.getCourss);
routerCours.get('/:id', coursCtrl.getCours);
routerCours.post('/', coursCtrl.newCours);
routerCours.put('/:id', coursCtrl.modifyCours);
routerCours.delete('/:id', coursCtrl.deleteCours);

export default routerCours;
