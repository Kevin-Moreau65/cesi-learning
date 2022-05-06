import { Middleware, Roles } from './interface';

export default class checkRole {
	static isAdmin: Middleware = async (req, res, next) => {
		const { role } = res.locals;
		if (role !== Roles.Admin) return res.status(401).json({ message: 'Unauthorized' });
		next();
	};
	static isTeacher: Middleware = async (req, res, next) => {
		const { role } = res.locals;
		if (role === Roles.Student) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		next();
	};
	static isSameA: Middleware = async (req, res, next) => {
		const { id, role } = res.locals;
		const userId = req.params.id;
		if (role !== Roles.Admin && id !== userId) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		next();
	};
	static isSameT: Middleware = async (req, res, next) => {
		const { id, role } = res.locals;
		const userId = req.params.id;
		if (role === Roles.Student && id !== userId) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		next();
	};
	static isSameStrict: Middleware = async (req, res, next) => {
		const { id } = res.locals;
		const userId = req.params.id;
		if (id !== userId) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		next();
	};
}
