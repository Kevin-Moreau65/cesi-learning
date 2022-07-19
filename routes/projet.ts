import express from 'express';
import * as projetCtrl from '$controllers/projet';
const routerProjet = express.Router();

routerProjet.get('/', projetCtrl.getProjets);
routerProjet.get('/:id', projetCtrl.getProjet);
routerProjet.post('/', projetCtrl.newProjet);
routerProjet.put('/:id', projetCtrl.modifyProjet);
routerProjet.delete('/:id', projetCtrl.deleteProjet);

export default routerProjet;
