import { supabase } from '@/lib/supabaseClient';
import { User } from '@/types/user';

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
		const { data: user, error } = await supabase.from(TABLE_USER).select('*').eq('id', id).single();

		if (error) {
			console.error('Find user error:', error);
			throw error;
		}

		return user;
	}

	// 유저 생성
	async create(user: User): Promise<void> {
		const { error } = await supabase.from(TABLE_USER).insert([user]);

		if (error) {
			console.error('Create user error:', error);
			throw error;
		}
	}
}