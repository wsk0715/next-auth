import DefaultLayout from '@/components/DefaultLayout';
import Header from '@/components/Header';

export default function Home() {
	return (
		<DefaultLayout>
			<Header title="Next-auth"></Header>
			<div className="flex-1 gap-2 px-4 py-5">Body</div>
		</DefaultLayout>
	);
}
