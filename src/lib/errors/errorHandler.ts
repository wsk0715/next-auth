import { NextResponse } from 'next/server';

export class HttpError extends Error {
	constructor(public message: string, public status: number = 500, public code?: string, public error?: unknown) {
		super(message);
		this.name = 'Unknown HTTP error';
	}
}

export const errorHandler = (error: unknown) => {
	console.error(`\n[Error] Code - ${error instanceof HttpError ? error.code : 'Unknown error code'}`);
	console.error(`[Error] Message - ${error instanceof HttpError ? error.message : 'Unknown error'}\n`);

	// console.log(error);

	if (error instanceof HttpError) {
		return NextResponse.json(
			{
				code: error.code,
				message: error.message,
			},
			{ status: error.status }
		);
	}

	return NextResponse.json(
		{
			code: 'INTERNAL_ERROR',
			message: '내부 오류가 발생했습니다.',
		},
		{ status: 500 }
	);
};
