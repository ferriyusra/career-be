import AuthRepository from './auth/repository';
import AuthService from './auth/service';
import AuthController from './controllers/auth.controller';

import { MediaController } from './controllers/media.controller';
import { MediaService } from './media/media.service';
import { CloudinaryUploader } from '../utils/uploader';
import { PrismaClient } from '@prisma/client';
import CategoryRepository from './category/repository';
import CategoryService from './category/service';
import CategoryController from './controllers/category.controller';
import JobRepository from './job/repository';
import JobService from './job/service';
import JobController from './controllers/job.controller';

function createAuthRepository(db: PrismaClient): AuthRepository {
	return new AuthRepository(db);
}

function createAuthService(repository: AuthRepository): AuthService {
	return new AuthService(repository);
}

function createAuthController(authService: AuthService): AuthController {
	return new AuthController(authService);
}

function createCategoryRepository(db: PrismaClient): CategoryRepository {
	return new CategoryRepository(db);
}

function createCategoryService(
	repository: CategoryRepository
): CategoryService {
	return new CategoryService(repository);
}

function createCategoryController(
	categoryService: CategoryService
): CategoryController {
	return new CategoryController(categoryService);
}

function createJobRepository(db: PrismaClient): JobRepository {
	return new JobRepository(db);
}

function createJobService(repository: JobRepository): JobService {
	return new JobService(repository);
}

function createJobController(jobService: JobService): JobController {
	return new JobController(jobService);
}

function createMediaService(cloudinary: CloudinaryUploader): MediaService {
	return new MediaService(cloudinary);
}

function createMediaController(mediaService: MediaService): MediaController {
	return new MediaController(mediaService);
}

export {
	createAuthRepository,
	createAuthService,
	createAuthController,
	createCategoryRepository,
	createCategoryService,
	createCategoryController,
	createJobRepository,
	createJobService,
	createJobController,
	createMediaService,
	createMediaController,
};
