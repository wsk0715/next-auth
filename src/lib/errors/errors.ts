import { HttpError } from './errorHandler';

export class DatabaseError extends HttpError {
	constructor(message: string, status = 500, code?: string, error?: unknown) {
		super(message, status, code ? code : 'INTERNAL_ERROR_ON_DATABASE', error);
		this.name = 'Internal error on database';
	}
}

export class RepositoryError extends HttpError {
	constructor(message: string, status = 500, code?: string, error?: unknown) {
		super(message, status, code ? code : 'INTERNAL_ERROR_ON_REPOSITORY', error);
		this.name = 'Internal error on repository';
	}
}

export class ServiceError extends HttpError {
	constructor(message: string, status = 500, code?: string, error?: unknown) {
		super(message, status, code ? code : 'INTERNAL_ERROR_ON_SERVICE', error);
		this.name = 'Internal error on service';
	}
}

export class RouteError extends HttpError {
	constructor(message: string, status = 500, code?: string, error?: unknown) {
		super(message, status, code ? code : 'INTERNAL_ERROR_ON_ROUTE', error);
		this.name = 'Internal error on route';
	}
}

export class APIError extends HttpError {
	constructor(message: string, status = 500, code?: string, error?: unknown) {
		super(message, status, code ? code : 'INTERNAL_ERROR_ON_API', error);
		this.name = 'Internal error on api';
	}
}
