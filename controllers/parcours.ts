import { Request, Response } from 'express';
import { cours } from '$utils/microService';

export const newParcours = async (req: Request, res: Response) => {
	const { authorization } = req.headers;
	const response = await cours.post({
		path: '/parcours',
		body: { ...req.body },
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
export const modifyParcours = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { authorization } = req.headers;
	const response = await cours.post({
		path: `/parcours/${id}`,
		body: { ...req.body },
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
export const deleteParcours = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { authorization } = req.headers;
	const response = await cours.delete({
		path: `/parcours/${id}`,
		body: { ...req.body },
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
export const getParcourss = async (req: Request, res: Response) => {
	const { authorization } = req.headers;
	const response = await cours.get({
		path: '/parcours',
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
export const getParcours = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { authorization } = req.headers;
	const response = await cours.get({
		path: `/parcours/${id}`,
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
