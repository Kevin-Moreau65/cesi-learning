import { parcours } from 'models/parcours';
import { Controller } from 'utils/interface';
import * as bcrypt from 'bcrypt';

export const getParcourss: Controller = async (req, res) => {
	const parcs = await parcours.find({});
	return res.status(200).json({ message: 'OK', data: parcs });
};
const checkObjectId = new RegExp('^[0-9a-fA-F]{24}$');
export const getParcours: Controller = async (req, res) => {
	const { id } = req.params;
	if (!checkObjectId.test(id))
		return res.status(404).json({ message: 'Parcours introuvable' });
	const parc = await parcours.findById(id);
	if (!parc) return res.status(404).json({ message: 'Parcours introuvable' });
	return res.status(200).json({ message: 'OK', data: parc });
};
export const newParcours: Controller = async (req, res) => {
	const { nom, theme, projets } = req.body;
	const parc = await parcours.findOne({ nom });
	if (!theme || !nom || !projets) {
		return res.status(400).json({ message: 'Formulaire incorrect' });
	}
	if (parc) return res.status(409).json({ message: 'Le parcours existe deja' });

	const parcoursCreated: any = await parcours.create({
		nom,
		theme,
		projets
	});
	return res.status(201).json({ data: parcoursCreated });
};
export const modifyParcours: Controller = async (req, res) => {
	const { nom, theme, projets } = req.body;
	const { id } = req.params;
	if (!id) return res.status(401).json({ message: 'Id manquant' });
	if (!nom || !theme || !projets) {
		return res.status(401).json({ message: 'Info manquante' });
	}
	const parc = await parcours.findByIdAndUpdate(id, {
		nom,
		theme,
		projets
	});
	if (!parc) return res.status(404).json({ message: 'Parcours non trouvé' });
	return res.status(200).json({ message: 'OK', data: parcours });
};
export const deleteParcours: Controller = async (req, res) => {
	const { id } = req.params;
	if (!id) return res.status(401).json({ message: 'Id manquant' });
	const parc = await parcours.findByIdAndRemove(id);
	if (!parc) return res.status(404).json({ message: 'Parcours non trouvé' });
	return res.status(201).send();
};
