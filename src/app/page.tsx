import DefaultLayout from '@/components/DefaultLayout';
import Header from '@/components/Header';
import Link from 'next/link';

export default function Home() {
	return (
		<DefaultLayout>
			<Header title="Next-auth"></Header>
			<div className="flex-1">
				<div className="flex justify-center gap-2 px-4 py-5">
					<Link href="/supabase" className="text-blue-500 hover:text-blue-700">
						Supabase 페이지로 이동
					</Link>
				</div>
			</div>
		</DefaultLayout>
	);
}
