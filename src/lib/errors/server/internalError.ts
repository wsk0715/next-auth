import { HttpResponseResult } from '@/lib/response/responseHandler';
import { HttpError } from '../errorHandler';

export class DatabaseError extends HttpError {
	constructor(
		error: unknown,
		result: HttpResponseResult = {
			message: 'Internal error on database',
			status: 500,
			code: 'INTERNAL_ERROR_ON_DATABASE',
		}
	) {
		super(error, result);
		this.name = 'Internal error on database';
	}
}

export class RepositoryError extends HttpError {
	constructor(
		error: unknown,
		result: HttpResponseResult = {
			message: 'Internal error on repository',
			status: 500,
			code: 'INTERNAL_ERROR_ON_REPOSITORY',
		}
	) {
		super(error, result);
		this.name = 'Internal error on repository';
	}
}

export class ServiceError extends HttpError {
	constructor(
		error: unknown,
		result: HttpResponseResult = {
			message: 'Internal error on service',
			status: 500,
			code: 'INTERNAL_ERROR_ON_SERVICE',
		}
	) {
		super(error, result);
		this.name = 'Internal error on service';
	}
}

export class RouteError extends HttpError {
	constructor(
		error: unknown,
		result: HttpResponseResult = {
			message: 'Internal error on route',
			status: 500,
			code: 'INTERNAL_ERROR_ON_ROUTE',
		}
	) {
		super(error, result);
		this.name = 'Internal error on route';
	}
}

export class APIError extends HttpError {
	constructor(
		error: unknown,
		result: HttpResponseResult = {
			message: 'Internal error on api',
			status: 500,
			code: 'INTERNAL_ERROR_ON_API',
		}
	) {
		super(error, result);
		this.name = 'Internal error on api';
	}
}
