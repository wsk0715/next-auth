import { errorHandler } from '@/lib/errors/errorHandler';
import { AuthService } from '@/services/AuthService';
import { NextResponse } from 'next/server';

export async function POST() {
	try {
		const result = await AuthService.getInstance().logout();

		return NextResponse.json(result);
	} catch (error) {
		return errorHandler(error);
	}
}
