import { HttpError } from '@/lib/errors/errorHandler';
import { ServiceError, DatabaseError } from '@/lib/errors/server/internalError';
import { InvalidAuthenticationError } from '@/lib/errors/client/authError';
import { AuthApiError } from '@supabase/supabase-js';
import { UserRepository } from '@/repositories/UserRepository';
import { createUser, User } from '@/types/user';
import { Session } from '@/types/session';
import { supabase } from '@/lib/supabaseClient';
import bcrypt from 'bcryptjs';

export class AuthService {
	private static instance: AuthService;
	private userRepository: UserRepository;

	private constructor() {
		this.userRepository = UserRepository.getInstance();
	}

	public static getInstance(): AuthService {
		if (!AuthService.instance) {
			AuthService.instance = new AuthService();
		}
		return AuthService.instance;
	}

	// 회원가입
	async signup(user: User) {
		try {
			const { data: authData, error } = await supabase.auth.signUp({
				email: user.email!,
				password: user.password!,
			});

			if (error instanceof AuthApiError) {
				throw new DatabaseError(error, error.message, error.status, error.code);
			}

			const hashedPassword = await bcrypt.hash(user.password!, 10);
			const userData = createUser({
				id: user.id,
				email: user.email,
				password: hashedPassword,
				auth_uuid: authData.user!.id,
			});

			await this.userRepository.create(userData);
			return { message: '회원가입 성공' };
		} catch (error) {
			if (error instanceof HttpError) {
				throw error;
			}
			throw new ServiceError(error, '회원가입 중 오류가 발생했습니다.');
		}
	}

	// 로그인
	async login(user: User) {
		try {
			const dbUser = await this.userRepository.findById(user.id);

			const isValidPassword = await bcrypt.compare(user.password!, dbUser!.password!);

			if (!dbUser || !isValidPassword) {
				throw new InvalidAuthenticationError(null, '아이디 또는 비밀번호가 일치하지 않습니다.');
			}

			const { data: authData, error } = await supabase.auth.signInWithPassword({
				email: dbUser.email!,
				password: user.password!,
			});

			if (error instanceof AuthApiError) {
				throw new DatabaseError(error, error.message, error.status, error.code);
			}

			return {
				message: '로그인 성공',
				data: {
					session: {
						user: {
							id: user.id,
							email: dbUser.email,
						},
						access_token: authData.session!.access_token,
						refresh_token: authData.session!.refresh_token,
						token_type: authData.session!.token_type,
						expires_at: authData.session!.expires_at,
						expires_in: authData.session!.expires_in,
					} as Session,
				},
			};
		} catch (error) {
			if (error instanceof HttpError) {
				throw error;
			}
			throw new ServiceError(error, '로그인 중 오류가 발생했습니다.');
		}
	}

	// 로그아웃
	async logout() {
		try {
			const { error } = await supabase.auth.signOut();

			if (error instanceof AuthApiError) {
				throw new DatabaseError(error, error.message, error.status, error.code);
			}

			return { message: '로그아웃 성공' };
		} catch (error) {
			if (error instanceof HttpError) {
				throw error;
			}
			throw new ServiceError(error, '로그아웃 중 오류가 발생했습니다.');
		}
	}
}
