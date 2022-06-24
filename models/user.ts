import mongoose, { Schema } from 'mongoose';
import { Roles } from 'utils/interface';
const userSchema = new Schema({
	email: {
		type: Schema.Types.String,
		trim: true,
		lowercase: true,
		unique: true,
		validate: {
			validator: function (email: string) {
				return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
			},
			message: 'Email non valide'
		},
		required: [true, 'Email requis']
	},
	password: {
		type: Schema.Types.String,
		minlength: 7,
		required: [true, 'Mot de passe requis']
	},
	nom: {
		type: Schema.Types.String,
		required: [true, 'Le nom est requis']
	},
	prenom: {
		type: Schema.Types.String,
		required: [true, 'Le prénom est requis']
	},
	role: {
		type: Schema.Types.String,
		default: Roles.Student,
		enum: Roles
	}
});

export const user = mongoose.model('User', userSchema);
