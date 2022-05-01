import { user } from '../models/user';
import { Controller } from '../utils/interface';
import * as bcrypt from 'bcrypt';
export const getUsers: Controller = async (req, res) => {
	const users = await user.find({});
	return res.status(200).json({ message: 'OK', data: users });
};
export const getUser: Controller = async (req, res) => {
	const { id } = req.params;
	const usr = await user.findById(id);
	if (!usr) return res.status(404).json({ message: 'Utilisateur introuvable' });
	const { email, nom, prenom } = usr;
	const data = { email, nom, prenom };
	return res.status(200).json({ message: 'OK', data });
};
export const newUser: Controller = async (req, res) => {
	const { nom, prenom, email, password, role } = req.body;
	const usr = await user.findOne({ email });
	if (!password || password.length < 7 || !email || !prenom || !nom || !role) {
		return res.status(401).json({ message: 'Formulaire incorrect' });
	}
	if (usr) return res.status(409).json({ message: "L'email existe deja" });
	const pwd = await bcrypt.hash(password, process.env.BCRYPT_SALT_ROUND);
	const toCreate = await user.create({ nom, prenom, email, role });
};
