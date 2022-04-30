declare namespace NodeJS {
	export interface ProcessEnv {
		SERVER_PORT: string;
		MONGO_URI: string;
		JWT_SECRET: string;
		JWT_DURING: string;
		BCRYPT_SALT_ROUND: string;
		DEFAULT_NOM: string;
		DEFAULT_PRENOM: string;
		DEFAULT_EMAIL: string;
		DEFAULT_PASSWORD: string;
	}
}
