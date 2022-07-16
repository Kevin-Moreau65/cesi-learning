import express from 'express';
import * as projetCtrl from 'controllers/projet';

const routerParcours = express.Router();
routerParcours.get('/', projetCtrl.getProjets);
routerParcours.post('/', projetCtrl.newProjet);
routerParcours.get('/:id', projetCtrl.getProjet);
routerParcours.patch('/:id', projetCtrl.modifyProjet);
routerParcours.delete('/:id', projetCtrl.deleteProjet);
export default routerParcours;
