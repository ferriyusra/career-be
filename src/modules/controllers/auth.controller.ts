import { Request, Response } from 'express';
import AuthService from '../auth/service';
import response from '../../utils/response';
import { userDTO, userLoginDTO } from '../auth/models/user.model';
import { encrypt } from '../../utils/encryption';
import { generateToken } from '../../utils/jwt';
import { IReqUser } from '../../utils/interfaces';

class AuthController {
	constructor(private readonly authService: AuthService) {}

	async register(req: Request, res: Response) {
		try {
			const { fullName, email, password, confirmPassword } = req.body;
			await userDTO.validate({
				fullName,
				email,
				password,
				confirmPassword,
			});

			const result = await this.authService.register({
				fullName,
				email,
				password,
			});

			return response.success(res, result, 'User registered successfully');
		} catch (error) {
			return response.error(res, error, 'User registration failed');
		}
	}

	async login(req: Request, res: Response) {
		try {
			const { identifier, password } = req.body;
			await userLoginDTO.validate({
				identifier,
				password,
			});

			const userByIdentifier = await this.authService.userByIdentifier(
				identifier
			);

			if (!userByIdentifier) {
				return response.unauthorized(res, 'User not found');
			}

			const validatePassword: boolean =
				encrypt(password) === userByIdentifier.password;

			if (!validatePassword) {
				return response.unauthorized(res, 'User not found');
			}

			const token = generateToken({
				user_id: userByIdentifier.user_id,
				role: userByIdentifier.role,
			});
			return response.success(res, token, 'Login success');
		} catch (error) {
			return response.error(res, error, 'Login failed');
		}
	}

	async me(req: IReqUser, res: Response) {
		try {
			const user = req.user;
			const result = await this.authService.findById(`${user?.user_id}`);
			return response.success(res, result, 'Success get user profile');
		} catch (error) {
			return response.error(res, error, 'Failed get user profile');
		}
	}
}

export default AuthController;
