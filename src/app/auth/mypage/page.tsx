import DefaultLayout from '@/components/layouts/defaultLayout';
import { GoToMain } from '@/components/common/goToMain';
import Header from '@/components/common/header';
import Container from '@/components/layouts/container';
import Column from '@/components/layouts/column';

export default function MyPage() {
	return (
		<DefaultLayout>
			<Header title="마이페이지"></Header>
			<Container>
				<Column>마이페이지</Column>
			</Container>
			<GoToMain />
		</DefaultLayout>
	);
}
