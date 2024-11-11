import { responseHandler } from '@/lib/response/responseHandler';
import { errorHandler } from '@/lib/errors/errorHandler';
import { AuthService } from '@/services/AuthService';

export async function POST() {
	try {
		const { result } = await AuthService.getInstance().logout();

		return responseHandler({ result });
	} catch (error) {
		return errorHandler(error);
	}
}
