import * as jwt from 'jsonwebtoken';
import { Middleware, Roles } from './interface';

const extractBearer = (authorization: string | undefined) => {
	if (typeof authorization !== 'string') {
		return false;
	}

	const matches = authorization.match(/(bearer)\s+(\S+)/i);

	return matches && matches[2];
};

export const checkTokenMiddleware: Middleware = (req, res, next) => {
	const token =
		req.headers.authorization && extractBearer(req.headers.authorization);

	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	jwt.verify(
		token,
		process.env.JWT_SECRET,
		(err, decodedToken: { id: string; role: Roles }) => {
			if (err) {
				return res.status(401).json({ message: 'Bad token' });
			}
			res.locals = { id: decodedToken.id, role: decodedToken.role };
			next();
		}
	);
};
