import express, { Request, Response, NextFunction, Router } from 'express';

import AuthController from '../modules/controllers/auth.controller';

import aclMiddleware from '../middlewares/acl.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import mediaMiddleware from '../middlewares/media.middleware';

import { ROLES } from '../utils/constant';
import { IReqUser } from '../utils/interfaces';
import { MediaController } from '../modules/controllers/media.controller';

export class ApiRouter {
	private router: Router;
	private authController: AuthController;
	private mediaController: MediaController;

	constructor(
		authController: AuthController,
		mediaController: MediaController
	) {
		this.router = express.Router();
		this.authController = authController;
		this.mediaController = mediaController;
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		// Auth Route
		this.router.post(
			'/auth/register',
			(req: Request, res: Response, _next: NextFunction) =>
				this.authController.register(req, res)
			/*
			#swagger.tags = ['Auth']
			#swagger.requestBody = {
				required: true,
				schema: {$ref: '#/components/schemas/RegisterRequest'}
			}
			*/
		);
		this.router.post(
			'/auth/login',
			(req: Request, res: Response, _next: NextFunction) =>
				this.authController.login(req, res)
			/*
			#swagger.tags = ['Auth']
			#swagger.requestBody = {
				required: true,
				schema: {$ref: '#/components/schemas/LoginRequest'}
			}
			*/
		);
		this.router.get(
			'/auth/me',
			authMiddleware,
			(req: Request, res: Response, _next: NextFunction) =>
				this.authController.me(req, res)
		);
	}

	public getRouter(): Router {
		return this.router;
	}
}

export default (
	authController: AuthController,
	mediaController: MediaController
): Router => {
	return new ApiRouter(authController, mediaController).getRouter();
};
