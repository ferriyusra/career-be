import dotenv from 'dotenv';

dotenv.config();

export const APP_NAME: string = process.env.APP_NAME || '';
export const APP_VERSION: string = process.env.APP_VERSION || '';
export const APP_ENV: string = process.env.APP_ENV || 'development';
export const CLIENT_HOST: string = process.env.CLIENT_HOST || 'localhost:3000';
export const DATABASE_URL: string = process.env.DATABASE_URL || '';
export const SECRET: string = process.env.SECRET || '';
export const QUERY_LIMIT_DEFAULT: number =
	Number(process.env.QUERY_LIMIT_DEFAULT) || 10;
export const QUERY_SORT_DEFAULT: string = process.env.QUERY_SORT_DEFAULT || '';

export const EMAIL_SMTP_SECURE: boolean =
	Boolean(process.env.EMAIL_SMTP_SECURE) || false;
export const EMAIL_SMTP_PASS: string = process.env.EMAIL_SMTP_PASS || '';
export const EMAIL_SMTP_USER: string = process.env.EMAIL_SMTP_USER || '';
export const EMAIL_SMTP_PORT: number =
	Number(process.env.EMAIL_SMTP_PORT) || 465;
export const EMAIL_SMTP_HOST: string = process.env.EMAIL_SMTP_HOST || '';
export const EMAIL_SMTP_SERVICE_NAME: string =
	process.env.EMAIL_SMTP_SERVICE_NAME || '';

export const CLOUDINARY_CLOUD_NAME: string =
	process.env.CLOUDINARY_CLOUD_NAME || '';
export const CLOUDINARY_API_KEY: string = process.env.CLOUDINARY_API_KEY || '';
export const CLOUDINARY_API_SECRET: string =
	process.env.CLOUDINARY_API_SECRET || '';

export const MIDTRANS_CLIENT_KEY: string =
	process.env.MIDTRANS_CLIENT_KEY || '';
export const MIDTRANS_SERVER_KEY: string =
	process.env.MIDTRANS_SERVER_KEY || '';
export const MIDTRANS_TRANSACTION_URL: string =
	process.env.MIDTRANS_TRANSACTION_URL || '';
