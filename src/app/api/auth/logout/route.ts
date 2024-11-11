import { responseHandler } from '@/lib/response/responseHandler';
import { errorHandler } from '@/lib/errors/errorHandler';
import { AuthService } from '@/services/AuthService';

export async function POST() {
	try {
		const { message } = await AuthService.getInstance().logout();

		return responseHandler({ message });
	} catch (error) {
		return errorHandler(error);
	}
}
