import mongoose, { Schema } from 'mongoose';

const coursSchema = new Schema({
	nom: {
		type: Schema.Types.String,
		required: [true, 'Le nom est requis']
	},
	description: {
		type: String,
		required: [true, 'Le contenu est requis'],
		maxLength: 30
	},
	contenu: {
		type: Schema.Types.String,
		required: [true, 'Le contenu est requis']
	},
	ressouces: {
		type: Schema.Types.Array
	},
	propriétaire: {
		type: Schema.Types.ObjectId,
		required: [true, "L'auteur est requis"]
	}
});

export const cours = mongoose.model('Cours', coursSchema);
