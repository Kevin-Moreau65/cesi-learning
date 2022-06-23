import { Controller } from '$utils/interface';
import { user } from '$utils/microService';
export const searchStudent: Controller = async (req, res) => {
	const { param } = req.params;
	const { authorization } = req.headers;
	const response = await user.get({
		path: `/search/student/${param ? param : ''}`,
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
export const searchTeacher: Controller = async (req, res) => {
	const { param } = req.params;
	const { authorization } = req.headers;
	const response = await user.get({
		path: `/search/teacher/${param ? param : ''}`,
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
export const searchAdmin: Controller = async (req, res) => {
	const { param } = req.params;
	const { authorization } = req.headers;
	const response = await user.get({
		path: `/search/admin/${param ? param : ''}`,
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
