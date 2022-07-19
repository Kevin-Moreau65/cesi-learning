import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routerUser from 'routes/user';
import { checkTokenMiddleware } from 'utils/jsonwebtoken';
import routerSearch from 'routes/search';
const app = express();
const createServer = () => {
	app.use(cors());
	app.use(helmet());
	app.use(
		helmet.dnsPrefetchControl({
			allow: true
		})
	);
	app.use(helmet.hidePoweredBy());
	app.use(helmet.noSniff());
	app.use(helmet.xssFilter());
	app.use(helmet({ crossOriginEmbedderPolicy: false }));
	app.use(express.json({ limit: '50mb' }));
	app.get('/', (req, res) => res.status(200).send('OK'));
	app.use('/user', checkTokenMiddleware, routerUser);
	app.use('/search', checkTokenMiddleware, routerSearch);
	app.use('*', (req, res) => res.status(404).send('Route not found'));
	return app;
};
export default createServer;
