import { user } from '../models/user';
import { Middleware, Roles, User } from './interface';

export default class checkRole {
	static isAdmin: Middleware = async (req, res, next) => {
		const { id } = res.locals;
		if (!id) return res.status(401).json({ message: 'Unauthorized' });
		const usr: User = await user.findById(id);
		if (!usr) return res.status(401).json({ message: 'Unauthorized' });
		if (usr.role !== Roles.Admin) return res.status(401).json({ message: 'Unauthorized' });
		next();
	};
	static isTeacher: Middleware = async (req, res, next) => {
		const { id } = res.locals;
		if (!id) return res.status(401).json({ message: 'Unauthorized' });
		const usr: User = await user.findById(id);
		if (!usr) return res.status(401).json({ message: 'Unauthorized' });
		if (usr.role !== Roles.Teacher && usr.role !== Roles.Admin) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		next();
	};
}
