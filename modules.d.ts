declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: string;
		HOST: string;
		DB_URL: string;
		DB_NAME?: string;
	}
}
