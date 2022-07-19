import { Request, Response } from 'express';
import { projet } from '$utils/microService';

export const newProjet = async (req: Request, res: Response) => {
	const { authorization } = req.headers;
	const response = await projet.post({
		path: '/projet',
		body: { ...req.body },
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
export const modifyProjet = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { authorization } = req.headers;
	const response = await projet.post({
		path: `/projet/${id}`,
		body: { ...req.body },
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
export const deleteProjet = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { authorization } = req.headers;
	const response = await projet.delete({
		path: `/projet/${id}`,
		body: { ...req.body },
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
export const getProjets = async (req: Request, res: Response) => {
	const { authorization } = req.headers;
	const response = await projet.get({
		path: '/projet',
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
export const getProjet = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { authorization } = req.headers;
	const response = await projet.get({
		path: `/projet/${id}`,
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
