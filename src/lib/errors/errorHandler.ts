import { responseHandler } from '@/lib/response/responseHandler';
import { HttpResponseResult } from '@/lib/response/responseHandler';

export class HttpError extends Error {
	constructor(
		public error: unknown,
		public result: HttpResponseResult = {
			message: 'Internal error',
			status: 500,
			code: 'INTERNAL_ERROR',
		}
	) {
		super(result.message);
		this.error = error;
		this.result = result;
		this.name = 'Internal error';
	}
}

export const errorHandler = (error: unknown) => {
	if (error instanceof HttpError) {
		const result = error.result;
		console.error(`\n[Error] Code - ${result.code}`);
		console.error(`[Error] Message - ${result.message}\n`);

		// console.log(error);

		return responseHandler({ result });
	}

	return responseHandler({ result: { message: '내부 오류가 발생했습니다.', status: 500, code: 'INTERNAL_ERROR' } });
};
