import { user } from '../models/user';
import { Controller, User } from '../utils/interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
type toLogin = {
	email: string;
	password: string;
};
export const login: Controller = async (req, res) => {
	const { email, password }: toLogin = req.body;
	if (!email || !password) return res.status(401).json({ message: 'Formulaire mal remplie' });
	const usr: null | User = await user.findOne({ email });
	if (!usr) return res.status(401).json({ message: 'Email ou mot de passe non valide' });
	const pwdOK = await bcrypt.compare(password, usr.password);
	if (!pwdOK) return res.status(401).json({ message: 'Email ou mot de passe non valide' });
	const { nom, prenom } = usr;
	const token = jwt.sign({ id: usr._id, role: usr.role }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_DURING
	});
	return res.status(200).json({ message: 'OK', token, data: { nom, prenom, role: usr.role } });
};
