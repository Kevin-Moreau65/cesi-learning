import fetch from 'node-fetch';
type urlParam = {
	method: string;
	path?: string;
	body?: object;
	token?: string;
};
export default class MicroService {
	url: string;
	constructor(url: string) {
		this.url = url.endsWith('/') ? url.slice(0, -1) : url;
	}
	private async callUrl({
		method,
		path = '',
		body = {},
		token = ''
	}: urlParam) {
		const part = () => {
			let result = '';
			if (path || path !== '')
				result += path.startsWith('/') ? path : '/' + path;
			return result;
		};
		let headers = {};
		if (token) headers = { Authorization: token };
		let init;
		if (method === 'GET') {
			init = {
				headers,
				method
			};
		} else {
			init = {
				headers,
				method,
				body
			};
		}
		const res = await fetch(`${this.url}${part()}`, {
			...init
		});
		const { status } = res;
		const data = (await res.json()) as object;
		return {
			status,
			data
		};
	}
	async get({ path = '', token = '' }) {
		const res = await this.callUrl({ method: 'GET', path, token });
		return res;
	}
	async post({ path = '', body = {}, token = '' }) {
		const res = await this.callUrl({ method: 'POST', path, body, token });
		return res;
	}
	async put({ path = '', body = {}, token = '' }) {
		const res = await this.callUrl({ method: 'PUT', path, body, token });
		return res;
	}
	async patch({ path = '', body = {}, token = '' }) {
		const res = await this.callUrl({ method: 'PATCH', path, body, token });
		return res;
	}
	async delete({ path = '', body = {}, token = '' }) {
		const res = await this.callUrl({ method: 'DELETE', path, body, token });
		return res;
	}
}
export const user = new MicroService(process.env.API_AUTH);
