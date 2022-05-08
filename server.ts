import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { user } from './models/user';
import { Roles } from './utils/interface';
import routerUser from './routes/user';
import { checkTokenMiddleware } from './utils/jsonwebtoken';
import routerSearch from './routes/search';
const app = express();
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
app.get('/', (req, res) => res.status(200).send('Salut ca va ?'));
app.use('/user', checkTokenMiddleware, routerUser);
app.use('/search', checkTokenMiddleware, routerSearch);
app.use('*', (req, res) => res.status(404).send('Retour arrière frérot'));
mongoose
	.connect(process.env.MONGO_URI)
	.then(async () => {
		console.log('Connection a la base de donnée OK');
		const users = await user.find();
		if (users.length === 0) {
			console.log('Aucun user trouvé, user par défaut en création');
			const pwd = await bcrypt.hash(
				process.env.DEFAULT_PASSWORD,
				parseInt(process.env.BCRYPT_SALT_ROUND)
			);
			await user.create({
				nom: process.env.DEFAULT_NOM,
				prenom: process.env.DEFAULT_PRENOM,
				email: process.env.DEFAULT_EMAIL,
				role: Roles.Admin,
				password: pwd
			});
		}
		app.listen(process.env.SERVER_PORT, () =>
			console.log(`Le serveur est OK sur le port ${process.env.SERVER_PORT}`)
		);
	})
	.catch((err) => console.log('Database error', err));
