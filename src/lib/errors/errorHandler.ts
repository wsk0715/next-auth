import { responseHandler } from '@/lib/response/responseHandler';

export class HttpError extends Error {
	constructor(public error: unknown, public message: string, public status: number = 500, public code: string = 'INTERNAL_ERROR') {
		super(message);
		this.error = error;
		this.status = status;
		this.code = code;
		this.name = 'Unknown HTTP error';
	}
}

export const errorHandler = (error: unknown) => {
	console.error(`\n[Error] Code - ${error instanceof HttpError ? error.code : 'Unknown error code'}`);
	console.error(`[Error] Message - ${error instanceof HttpError ? error.message : 'Unknown error'}\n`);

	// console.log(error);

	if (error instanceof HttpError) {
		const { message, status, code } = error;
		return responseHandler({ message, status, code });
	}

	return responseHandler({ message: '내부 오류가 발생했습니다.', status: 500, code: 'INTERNAL_ERROR' });
};
