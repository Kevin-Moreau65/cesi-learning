import mongoose, { Schema } from 'mongoose';

const parcoursSchema = new Schema({
	nom: {
		type: Schema.Types.String,
		required: [true, 'Le nom est requis']
	},
	theme: {
		type: Schema.Types.String,
		required: [true, 'Le theme est requis']
	},
	projets: {
		type: Schema.Types.Array
	}
});

export const parcours = mongoose.model('Parcours', parcoursSchema);
