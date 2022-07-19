import { Request, Response } from 'express';
import { parcours } from '$utils/microService';

export const newParcours = async (req: Request, res: Response) => {
	const { authorization } = req.headers;
	const response = await parcours.post({
		path: '/parcours',
		body: { ...req.body },
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
export const modifyParcours = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { authorization } = req.headers;
	const response = await parcours.post({
		path: `/parcours/${id}`,
		body: { ...req.body },
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
export const deleteParcours = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { authorization } = req.headers;
	const response = await parcours.delete({
		path: `/parcours/${id}`,
		body: { ...req.body },
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
export const getParcourss = async (req: Request, res: Response) => {
	const { authorization } = req.headers;
	const response = await parcours.get({
		path: '/parcours',
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
export const getParcours = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { authorization } = req.headers;
	const response = await parcours.get({
		path: `/parcours/${id}`,
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
