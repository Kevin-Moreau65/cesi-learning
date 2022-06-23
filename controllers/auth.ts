import { Request, Response } from 'express';
import { auth } from '$utils/microService';

export const login = async (req: Request, res: Response) => {
	const { authorization } = req.headers;
	const response = await auth.post({
		path: '/login',
		body: { ...req.body },
		token: authorization
	});
	return res.status(response.status).json({ ...response.data });
};
