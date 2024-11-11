import { HttpError } from '../errorHandler';

export class InvalidAuthenticationError extends HttpError {
	constructor(error: unknown, message: string, status = 401, code: string = 'CLIENT_INVALID_AUTHENTICATION') {
		super(error, message, status, code);
		this.name = 'Invalid authentication';
	}
}
