import request from 'supertest';
import createServer from '../server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { Roles } from 'utils/interface';
beforeEach((done) => {
	mongoose.connect(process.env.MONGO_TEST_URI, () => done());
});
afterAll(() => {
	mongoose.connection.dropCollection('users', () => {
		mongoose.connection.close();
	});
});
const app = createServer();
describe('Get Endpoints as an admin', () => {
	const token = jwt.sign(
		{ id: '626d9df3da41d6f715ae35z4', role: Roles.Admin },
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_DURING
		}
	);
	it('[/] should respond OK', async () => {
		await request(app)
			.get('/')
			.expect(200)
			.then((res) => expect(res.text).toBe('OK'));
	});
	let studentId: string;
	it('POST [/user] should create a student', async () => {
		const user = {
			nom: 'NomEleve',
			prenom: 'PrenomEleve',
			email: 'eleve@student.com',
			role: Roles.Student,
			password: '1234567'
		};
		await request(app)
			.post('/user')
			.set({ Authorization: 'Bearer ' + token })
			.send(user)
			.expect(201)
			.then((res) => (studentId = res.body.id));
	});
	it('GET [/user/id] return a student', async () => {
		await request(app)
			.get(`/user/${studentId}`)
			.set({ Authorization: 'Bearer ' + token })
			.expect(200)
			.then((res) => {
				expect(res.body.data).toBeInstanceOf(Object);
				expect(res.body.data.nom).toBe('NomEleve');
			});
	});
	it('PATCH [/user] should modify a student', async () => {
		const user = {
			nom: 'NomEleveModif',
			prenom: 'PrenomEleve',
			email: 'eleve@student.com',
			role: Roles.Student
		};
		await request(app)
			.patch(`/user/${studentId}`)
			.set({ Authorization: 'Bearer ' + token })
			.send(user)
			.expect(200)
			.then((res) => {
				expect(res.body.data).toBeInstanceOf(Object);
				expect(res.body.data.nom).toBe('NomEleveModif');
			});
	});
	it('DELETE [/user] should delete a student', async () => {
		await request(app)
			.delete(`/user/${studentId}`)
			.set({ Authorization: 'Bearer ' + token })
			.expect(201);
	});
	it('GET [/user/id] return a Not Found', async () => {
		await request(app)
			.get(`/user/${studentId}`)
			.set({ Authorization: 'Bearer ' + token })
			.expect(404);
	});
	it('[/search/student] should return an array of student', async () => {
		await request(app)
			.get('/search/student')
			.set({ Authorization: 'Bearer ' + token })
			.expect(200);
	});
	it('[/search/teacher] should return an array of teacher', async () => {
		await request(app)
			.get('/search/teacher')
			.set({ Authorization: 'Bearer ' + token })
			.expect(200);
	});
	it('[/search/admin] should return an array of admin', async () => {
		await request(app)
			.get('/search/admin')
			.set({ Authorization: 'Bearer ' + token })
			.expect(200);
	});
	it('[/user] should return an array of users', async () => {
		await request(app)
			.get('/user')
			.set({ Authorization: 'Bearer ' + token })
			.expect(200)
			.then((response) => {
				expect(response.body).toHaveProperty('data');
				expect(response.body.data).toBeInstanceOf(Array);
			});
	});
});
