import { Request, Response } from 'express';
import { user } from '$utils/microService';

export const newUser = async (req: Request, res: Response) => {
	const { authorization } = req.headers;
	const response = await user.post({
		path: '/user',
		body: { ...req.body },
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
export const modifyUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { authorization } = req.headers;
	const response = await user.post({
		path: `/user/${id}`,
		body: { ...req.body },
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
export const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { authorization } = req.headers;
	const response = await user.delete({
		path: `/user/${id}`,
		body: { ...req.body },
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
export const getUsers = async (req: Request, res: Response) => {
	const { authorization } = req.headers;
	const response = await user.get({
		path: '/user',
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
export const getUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { authorization } = req.headers;
	const response = await user.get({
		path: `/user/${id}`,
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
