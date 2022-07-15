import { projet } from 'models/projet';
import { Controller } from 'utils/interface';
import * as bcrypt from 'bcrypt';

export const getProjets: Controller = async (req, res) => {
	const prjts = await projet.find({});
	return res.status(200).json({ message: 'OK', data: prjts });
};
const checkObjectId = new RegExp('^[0-9a-fA-F]{24}$');
export const getProjet: Controller = async (req, res) => {
	const { id } = req.params;
	if (!checkObjectId.test(id))
		return res.status(404).json({ message: 'Projet introuvable' });
	const prjt = await projet.findById(id);
	if (!prjt) return res.status(404).json({ message: 'Projet introuvable' });
	return res.status(200).json({ message: 'OK', data: prjt });
};
export const newProjet: Controller = async (req, res) => {
	const { nom, theme, objectif, cours } = req.body;
	const prjt = await projet.findOne({ nom });
	if (!theme || !nom || !objectif || !cours) {
		return res.status(400).json({ message: 'Formulaire incorrect' });
	}
	if (prjt) return res.status(409).json({ message: 'Le projet existe deja' });

	const projetCreated: any = await projet.create({
		nom,
		theme,
		objectif,
		cours
	});
	return res.status(201).json({ data: projetCreated });
};
export const modifyProjet: Controller = async (req, res) => {
	const { nom, theme, objectif, cours } = req.body;
	const { id } = req.params;
	if (!id) return res.status(401).json({ message: 'Id manquant' });
	if (!nom || !theme || !objectif || !cours) {
		return res.status(401).json({ message: 'Info manquante' });
	}
	const prjt = await projet.findByIdAndUpdate(id, {
		nom,
		theme,
		objectif,
		cours
	});
	if (!prjt) return res.status(404).json({ message: 'Projet non trouvé' });
	return res.status(200).json({ message: 'OK', data: projet });
};
export const deleteProjet: Controller = async (req, res) => {
	const { id } = req.params;
	if (!id) return res.status(401).json({ message: 'Id manquant' });
	const prjt = await projet.findByIdAndRemove(id);
	if (!prjt) return res.status(404).json({ message: 'Projet non trouvé' });
	return res.status(201).send();
};
