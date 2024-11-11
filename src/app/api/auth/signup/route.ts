import { responseHandler } from '@/lib/response/responseHandler';
import { errorHandler } from '@/lib/errors/errorHandler';
import { AuthService } from '@/services/AuthService';
import { User } from '@/types/user';

export async function POST(request: Request) {
	try {
		const user: User = await request.json();
		const { message } = await AuthService.getInstance().signup(user);

		return responseHandler({ message });
	} catch (error) {
		return errorHandler(error);
	}
}
