import { user } from '$models/user';
import { Controller, Roles, User } from '$utils/interface';
import * as bcrypt from 'bcrypt';
export const getUsers: Controller = async (req, res) => {
	const users = await user.find({});
	return res.status(200).json({ message: 'OK', data: users });
};
const checkFind = (id: string, userId: string, role: Roles, userRole: Roles) => {
	if (role === Roles.Admin || id === userId) return true;
	if (role === Roles.Teacher && userRole !== Roles.Student) return false;
	return true;
};
export const getUser: Controller = async (req, res) => {
	const { id } = req.params;
	const userId = res.locals.id;
	const userRole = res.locals.role;
	const usr: User = await user.findById(id);
	if (!usr) return res.status(404).json({ message: 'Utilisateur introuvable' });
	const { email, nom, prenom, role } = usr;
	if (!checkFind(id, userId, userRole, role)) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	const data = { email, nom, prenom, role };
	return res.status(200).json({ message: 'OK', data });
};
export const newUser: Controller = async (req, res) => {
	const { nom, prenom, email, password, role } = req.body;
	const usr = await user.findOne({ email });
	if (!password || !email || !prenom || !nom || !role) {
		return res.status(401).json({ message: 'Formulaire incorrect' });
	}
	if (password.length < 7) {
		return res.status(401).json({ message: 'Le mot de passe doit contenir plus de 6 caractères' });
	}
	if (usr) return res.status(409).json({ message: "L'email existe deja" });
	const pwd = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));
	const userCreated: User = await user.create({ nom, prenom, email, role, password: pwd });
	return res.status(201).json({ nom, prenom, email, id: userCreated._id });
};
export const modifyUser: Controller = async (req, res) => {
	const { nom, prenom, email, role } = req.body;
	const { id } = req.params;
	if (!id) return res.status(401).json({ message: 'Id manquant' });
	if (!nom || !prenom || !email || !role) {
		return res.status(401).json({ message: 'Info manquante' });
	}
	const usr = await user.findByIdAndUpdate(id, { nom, prenom, email, role });
	if (!usr) return res.status(404).json({ message: 'User non trouvé' });
	return res.status(200).json({ message: 'OK', data: { nom, email, prenom, role } });
};
export const modifyPassword: Controller = async (req, res) => {
	const { id } = req.params;
	const { password } = req.body;
	if (!id || !password || password.length < 7) {
		return res.status(401).json({ message: 'Formulaire incorrect' });
	}
	const pwd = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));
	const usr = await user.findByIdAndUpdate(id, { password: pwd });
	if (!usr) return res.status(404).json({ message: 'User non trouvé' });
	return res.status(200).json({ message: 'OK' });
};
export const deleteUser: Controller = async (req, res) => {
	const { id } = req.params;
	if (!id) return res.status(401).json({ message: 'Id manquant' });
	const usr = user.findByIdAndRemove(id);
	if (!usr) return res.status(404).json({ message: 'User non trouvé' });
	return res.status(201).json({ message: 'OK' });
};
