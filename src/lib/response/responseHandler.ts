import { HttpError } from '../errors/errorHandler';
import { NextResponse } from 'next/server';

export class HttpResponse<T> {
	public result: HttpResponseResult;
	public data?: T;

	constructor({ result, data }: HttpResponseParams<T>) {
		this.result = result;
		this.data = data ?? undefined;
	}
}

export interface HttpResponseResult {
	message: string;
	status: number;
	code: string;
}

interface HttpResponseParams<T> {
	result: HttpResponseResult;
	data?: T;
}

export const responseHandler = <T>(params: HttpResponseParams<T>): NextResponse => {
	const { result, data } = params;

	// check if data: error
	if (data instanceof HttpError) {
		const response = new HttpResponse<T>({ result });

		return NextResponse.json(response);
	}

	const response = new HttpResponse<T>({ data, result });

	return NextResponse.json(response);
};
