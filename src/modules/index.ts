import AuthRepository from './auth/repository';
import AuthService from './auth/service';
import AuthController from './controllers/auth.controller';

import { MediaController } from './controllers/media.controller';
import { MediaService } from './media/media.service';
import { CloudinaryUploader } from '../utils/uploader';
import { PrismaClient } from '@prisma/client';

function createAuthRepository(db: PrismaClient): AuthRepository {
	return new AuthRepository(db);
}

function createAuthService(repository: AuthRepository): AuthService {
	return new AuthService(repository);
}

function createAuthController(authService: AuthService): AuthController {
	return new AuthController(authService);
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
	createMediaService,
	createMediaController,
};
