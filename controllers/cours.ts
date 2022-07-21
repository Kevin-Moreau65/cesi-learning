import { cours } from 'models/cours';
import { Controller } from 'utils/interface';
import * as bcrypt from 'bcrypt';

export const getCourss: Controller = async (req, res) => {
	const parcs = await cours.find({});
	return res.status(200).json({ message: 'OK', data: parcs });
};
const checkObjectId = new RegExp('^[0-9a-fA-F]{24}$');
export const getCours: Controller = async (req, res) => {
	const { id } = req.params;
	if (!checkObjectId.test(id))
		return res.status(404).json({ message: 'Cours introuvable' });
	const crs = await cours.findById(id);
	if (!crs) return res.status(404).json({ message: 'Cours introuvable' });
	return res.status(200).json({ message: 'OK', data: crs });
};
export const newCours: Controller = async (req, res) => {
	const { nom, description, contenu, ressouces, propriétaire } = req.body;
	const crs = await cours.findOne({ nom });
	if (!contenu || !nom || !description || !ressouces || !propriétaire) {
		return res.status(400).json({ message: 'Formulaire incorrect' });
	}
	if (crs) return res.status(409).json({ message: 'Le cours existe deja' });

	const coursCreated: any = await cours.create({
		nom,
		description,
		contenu,
		ressouces,
		propriétaire
	});
	return res.status(201).json({ data: coursCreated });
};
export const modifyCours: Controller = async (req, res) => {
	const { nom, description, contenu, ressouces } = req.body;
	const { id } = req.params;
	if (!id) return res.status(401).json({ message: 'Id manquant' });
	if (!nom || !contenu || !ressouces) {
		return res.status(401).json({ message: 'Info manquante' });
	}
	const crs = await cours.findByIdAndUpdate(id, {
		nom,
		description,
		contenu,
		ressouces
	});
	if (!crs) return res.status(404).json({ message: 'Cours non trouvé' });
	return res.status(200).json({ message: 'OK', data: cours });
};
export const deleteCours: Controller = async (req, res) => {
	const { id } = req.params;
	if (!id) return res.status(401).json({ message: 'Id manquant' });
	const crs = await cours.findByIdAndRemove(id);
	if (!crs) return res.status(404).json({ message: 'Cours non trouvé' });
	return res.status(200).json({ message: 'Cours supprimé' });
};
