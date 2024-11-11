import { HttpError } from '../errorHandler';

export class DatabaseError extends HttpError {
	constructor(error: unknown, message: string, status = 500, code?: string) {
		super(error, message, status, code ? code : 'INTERNAL_ERROR_ON_DATABASE');
		this.name = 'Internal error on database';
	}
}

export class RepositoryError extends HttpError {
	constructor(error: unknown, message: string, status = 500, code?: string) {
		super(error, message, status, code ? code : 'INTERNAL_ERROR_ON_REPOSITORY');
		this.name = 'Internal error on repository';
	}
}

export class ServiceError extends HttpError {
	constructor(error: unknown, message: string, status = 500, code?: string) {
		super(error, message, status, code ? code : 'INTERNAL_ERROR_ON_SERVICE');
		this.name = 'Internal error on service';
	}
}

export class RouteError extends HttpError {
	constructor(error: unknown, message: string, status = 500, code?: string) {
		super(error, message, status, code ? code : 'INTERNAL_ERROR_ON_ROUTE');
		this.name = 'Internal error on route';
	}
}

export class APIError extends HttpError {
	constructor(error: unknown, message: string, status = 500, code?: string) {
		super(error, message, status, code ? code : 'INTERNAL_ERROR_ON_API');
		this.name = 'Internal error on api';
	}
}
