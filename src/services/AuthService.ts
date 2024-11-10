import { UserRepository } from '@/repositories/UserRepository';
import bcrypt from 'bcryptjs';
import { createUser, User } from '@/types/user';
import { supabase } from '@/lib/supabaseClient';

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
		const { data: authData, error } = await supabase.auth.signUp({
			email: user.email!,
			password: user.password!,
		});

		if (error) {
			console.error('Signup error:', error);
			throw error;
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
	}

	// 로그인
	async login(user: User) {
		const dbUser = await this.userRepository.findById(user.id);
		const isValidPassword = await bcrypt.compare(user.password!, dbUser!.password!);
		if (!dbUser || !isValidPassword) throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');

		const { data: authData, error } = await supabase.auth.signInWithPassword({
			email: dbUser.email!,
			password: user.password!,
		});

		if (error) {
			console.error('Login error:', error);
			throw error;
		}

		return {
			user: {
				id: dbUser.id,
				email: dbUser.email,
			},
			session: authData.session,
		};
	}

	// 로그아웃
	async logout() {
		await supabase.auth.signOut();
		return { message: '로그아웃 성공' };
	}
}
