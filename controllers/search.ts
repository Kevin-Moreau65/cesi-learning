import { user } from '$models/user';
import { Controller, Roles, User } from '$utils/interface';

const search = async (role: Roles, param?: string) => {
	let users: User[];
	if (param) {
		const reg = new RegExp(param, 'i');
		console.log(reg);
		users = await user
			.find({ role: role })
			.or([{ nom: { $regex: reg } }, { prenom: { $regex: reg } }, { email: { $regex: reg } }]);
	} else {
		users = await user.find({ role: role });
	}
	return users;
};

export const getStudents: Controller = async (req, res) => {
	const { param } = req.params;
	const students = await search(Roles.Student, param);
	return res.status(200).json({ message: 'OK', data: students });
};

export const getTeachers: Controller = async (req, res) => {
	const { param } = req.params;
	const teachers = await search(Roles.Teacher, param);
	return res.status(200).json({ message: 'OK', data: teachers });
};
export const getAdmins: Controller = async (req, res) => {
	const { param } = req.params;
	const admins = await search(Roles.Admin, param);
	return res.status(200).json({ message: 'OK', data: admins });
};
