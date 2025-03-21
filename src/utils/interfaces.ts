import { Request } from 'express';
import { User } from '../modules/auth/models/user.model';
import { $Enums } from '@prisma/client';

export interface IReqUser extends Request {
	user?: IUserToken;
}

export interface IUserToken
	extends Omit<User, 'password' | 'email' | 'fullName' | 'phone'> {
	user_id?: String;
}

export interface IPaginationQuery {
	page: number;
	limit: number;
	search: string;
}
