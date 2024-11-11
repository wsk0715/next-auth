import DefaultLayout from '@/components/DefaultLayout';
import Header from '@/components/Header';

export default function MyPage() {
	return (
		<DefaultLayout>
			<Header title="마이페이지"></Header>
			<div className="flex-1">
				<div className="flex flex-col items-center justify-center gap-2 px-4 py-2">마이페이지</div>
			</div>
			<GoToMain />
		</DefaultLayout>
	);
}
