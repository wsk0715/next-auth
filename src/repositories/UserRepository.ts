import { HttpError } from '@/lib/errors/errorHandler';
import { RepositoryError, DatabaseError } from '@/lib/errors/errors';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@/types/user';
import { AuthApiError } from '@supabase/supabase-js';

const TABLE_USER = 'tb_user';

export class UserRepository {
	private static instance: UserRepository;

	private constructor() {}

	public static getInstance(): UserRepository {
		if (!UserRepository.instance) {
			UserRepository.instance = new UserRepository();
		}
		return UserRepository.instance;
	}

	// id로 유저 찾기
	async findById(id: string): Promise<User | null> {
		try {
			const { data: user, error } = await supabase.from(TABLE_USER).select('*').eq('id', id).single();

			if (error instanceof AuthApiError) {
				throw new DatabaseError(error.message, error.status, error.code, error);
			}

			return user;
		} catch (error) {
			if (error instanceof HttpError) {
				throw error;
			}
			throw new RepositoryError('유저 조회 중 오류가 발생했습니다.', 500, undefined, error);
		}
	}

	// 유저 생성
	async create(user: User): Promise<void> {
		try {
			const { error } = await supabase.from(TABLE_USER).insert([user]);

			if (error instanceof AuthApiError) {
				throw new DatabaseError(error.message, error.status, error.code, error);
			}
		} catch (error) {
			if (error instanceof HttpError) {
				throw error;
			}
			throw new RepositoryError('유저 생성 중 오류가 발생했습니다.', 500, undefined, error);
		}
	}
}
