import { errorHandler } from '@/lib/errors/errorHandler';
import { AuthService } from '@/services/AuthService';
import { User } from '@/types/user';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const user: User = await request.json();
		const result = await AuthService.getInstance().login(user);

		return NextResponse.json(result);
	} catch (error) {
		return errorHandler(error);
	}
}
