import { HttpError } from '../errors/errorHandler';
import { NextResponse } from 'next/server';

interface HttpResponseParams<T> {
	data?: T;
	message?: string;
	status?: number;
	code?: string;
}

class HttpResponse<T> {
	public data: T | undefined;
	public message: string;
	public status: number;
	public code: string;

	constructor({ data, message, status, code }: HttpResponseParams<T>) {
		this.data = data ?? undefined;
		this.message = message ?? '요청 성공';
		this.status = status ?? 200;
		this.code = code ?? 'REQUEST_SUCCESS';
	}
}

export const responseHandler = <T>(params: HttpResponseParams<T>): NextResponse => {
	const { data, message, status, code } = params;

	// check if data: error
	if (data instanceof HttpError) {
		const { message, status, code } = data;
		const response = new HttpResponse<T>({ message, status, code });

		return NextResponse.json(response);
	}

	const response = new HttpResponse<T>({ data, message, status, code });

	return NextResponse.json(response);
};
