import { HttpError } from '../errorHandler';
import { HttpResponseResult } from '@/lib/response/responseHandler';

export class InvalidAuthenticationError extends HttpError {
	constructor(
		error: unknown,
		result: HttpResponseResult = {
			message: 'Invalid authentication',
			status: 401,
			code: 'INVALID_AUTHENTICATION',
		}
	) {
		super(error, result);
		this.name = 'Invalid authentication';
	}
}
