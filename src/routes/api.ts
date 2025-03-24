import express, { Request, Response, NextFunction, Router } from 'express';

import AuthController from '../modules/controllers/auth.controller';

import aclMiddleware from '../middlewares/acl.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import mediaMiddleware from '../middlewares/media.middleware';

import { ROLES } from '../utils/constant';
import { IReqUser } from '../utils/interfaces';
import { MediaController } from '../modules/controllers/media.controller';
import CategoryController from '../modules/controllers/category.controller';
import JobController from '../modules/controllers/job.controller';

export class ApiRouter {
	private router: Router;
	private authController: AuthController;
	private categoryController: CategoryController;
	private jobController: JobController;
	private mediaController: MediaController;

	constructor(
		authController: AuthController,
		categoryController: CategoryController,
		jobController: JobController,
		mediaController: MediaController
	) {
		this.router = express.Router();
		this.authController = authController;
		this.categoryController = categoryController;
		this.jobController = jobController;
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

		// Category Route
		this.router.post(
			'/category',
			[authMiddleware, aclMiddleware([ROLES.ADMIN])],
			(req: IReqUser, res: Response, _next: NextFunction) =>
				this.categoryController.create(req, res)
			/*
          #swagger.tags = ['Category']
          #swagger.security = [{
            "bearerAuth": {}
          }]
          #swagger.requestBody = {
            required: true,
            schema: {
              $ref: '#/components/schemas/CreateCategoryRequest'
            }
          }
          */
		);
		this.router.get(
			'/category',
			(req: IReqUser, res: Response, _next: NextFunction) =>
				this.categoryController.findAll(req, res)
		);
		this.router.get(
			'/category/:id',
			(req: IReqUser, res: Response, _next: NextFunction) =>
				this.categoryController.findOne(req, res)
		);
		this.router.put(
			'/category/:id',
			[authMiddleware, aclMiddleware([ROLES.ADMIN])],
			(req: IReqUser, res: Response, _next: NextFunction) =>
				this.categoryController.update(req, res)
		);
		this.router.delete(
			'/category/:id',
			[authMiddleware, aclMiddleware([ROLES.ADMIN])],
			(req: IReqUser, res: Response, _next: NextFunction) =>
				this.categoryController.remove(req, res)
		);

		// Media Route
		this.router.post(
			'/media/upload-single',
			[authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.USER])],
			mediaMiddleware.single('file'),
			(req: IReqUser, res: Response, _next: NextFunction) =>
				this.mediaController.single(req, res)
		);

		this.router.post(
			'/media/upload-multiple',
			[authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.USER])],
			mediaMiddleware.single('files'),
			(req: IReqUser, res: Response, _next: NextFunction) =>
				this.mediaController.multiple(req, res)
		);

		this.router.delete(
			'/media/remove',
			[authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.USER])],
			(req: IReqUser, res: Response, _next: NextFunction) =>
				this.mediaController.remove(req, res)
		);

		this.router.post(
			'/job',
			[authMiddleware, aclMiddleware([ROLES.ADMIN])],
			(req: IReqUser, res: Response, _next: NextFunction) =>
				this.jobController.create(req, res)
		);
	}

	public getRouter(): Router {
		return this.router;
	}
}

export default (
	authController: AuthController,
	categoryController: CategoryController,
	jobController: JobController,
	mediaController: MediaController
): Router => {
	return new ApiRouter(
		authController,
		categoryController,
		jobController,
		mediaController
	).getRouter();
};
