declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: string;
		HOST: string;
		DB_URL: string;
		DB_NAME?: string;
		AWS_SECRET?: string;
		AWS_ID?: string;
		AWS_BUCKET_NAME: string;
	}
}
