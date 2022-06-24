import request from 'supertest';
import createServer from '../server';
import mongoose from 'mongoose';
beforeEach((done) => {
	mongoose.connect(process.env.MONGO_TEST_URI, () => done());
});
afterEach((done) => {
	mongoose.connection.close(() => done());
});
const app = createServer();
describe('Get Endpoints as an anon', () => {
	it('[/] should respond OK', async () => {
		await request(app)
			.get('/')
			.expect(200)
			.then((res) => expect(res.text).toBe('OK'));
	});
	it('[/search/student] should respond unauthorized', async () => {
		await request(app).get('/search/student').expect(401);
	});
	it('[/user] should respond unauthorized', async () => {
		await request(app).get('/user').expect(401);
	});
});
