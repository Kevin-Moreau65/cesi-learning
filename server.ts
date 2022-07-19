import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routerParcours from 'routes/parcours';
import routerCours from 'routes/cours';
import routerProjet from 'routes/projet';
import mongoose from 'mongoose';
import { checkTokenMiddleware } from 'utils/jsonwebtoken';

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
app.use('/parcours', checkTokenMiddleware, routerParcours);
app.use('/cours', checkTokenMiddleware, routerCours);
app.use('/projet', checkTokenMiddleware, routerProjet);

app.use('*', (req, res) => res.status(404).send('Retour arrière frérot'));

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Connection a la base de donnée OK');
		app.listen(process.env.SERVER_PORT, () =>
			console.log(`Le serveur est OK sur le port ${process.env.SERVER_PORT}`)
		);
	})
	.catch((err) => console.log('Database error', err));
