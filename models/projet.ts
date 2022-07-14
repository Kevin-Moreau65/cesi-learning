import mongoose, { Schema } from 'mongoose';

const projetSchema = new Schema({
	nom: {
		type: Schema.Types.String,
		required: [true, 'Le nom est requis']
	},
	objectif: {
		type: Schema.Types.String,
		required: [true, "L'objectif est requis"]
	},
	theme: {
		type: Schema.Types.String,
		required: [true, 'Le theme est requis']
	},
	cours: {
		type: Schema.Types.Array
	}
});

export const projet = mongoose.model('Projet', projetSchema);
