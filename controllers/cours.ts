import { Request, Response } from 'express';
import { cours } from '$utils/microService';

export const newCours = async (req: Request, res: Response) => {
	const { authorization } = req.headers;
	const response = await cours.post({
		path: '/cours',
		body: { ...req.body },
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
export const modifyCours = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { authorization } = req.headers;
	const response = await cours.post({
		path: `/cours/${id}`,
		body: { ...req.body },
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
export const deleteCours = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { authorization } = req.headers;
	const response = await cours.delete({
		path: `/cours/${id}`,
		body: { ...req.body },
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
export const getCourss = async (req: Request, res: Response) => {
	const { authorization } = req.headers;
	const response = await cours.get({
		path: '/cours',
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
export const getCours = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { authorization } = req.headers;
	const response = await cours.get({
		path: `/cours/${id}`,
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
