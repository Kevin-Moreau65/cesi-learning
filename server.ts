import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routerUser from '$routes/user';
import routerAuth from '$routes/auth';
import routerSearch from '$routes/search';
import routerCours from '$routes/cours';
import routerParcours from '$routes/parcours';
import routerProjet from '$routes/projet';
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
app.use('/user', routerUser);
app.use('/login', routerAuth);
app.use('/cours', routerCours);
app.use('/projet', routerProjet);
app.use('/parcours', routerParcours);
app.use('/search', routerSearch);
app.use('*', (req, res) => res.status(404).send('Retour arrière frérot'));
app.listen(process.env.SERVER_PORT, () => {
	console.log(`Le serveur est OK sur le port ${process.env.SERVER_PORT}`);
});
