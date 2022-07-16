import { user } from 'models/user';
import { Roles } from 'utils/interface';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import createServer from 'server';
mongoose
	.connect(process.env.MONGO_URI)
	.then(async () => {
		const app = createServer();
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
