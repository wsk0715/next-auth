import DefaultLayout from '@/components/layouts/defaultLayout';
import Header from '@/components/common/header';
import Container from '@/components/layouts/container';
import Column from '@/components/layouts/column';
import { SoftButtonPrimary } from '@/components/common/buttons/softButton';

export default function Home() {
	return (
		<DefaultLayout>
			<Header title="Next-auth"></Header>
			<Container>
				<Column>
					<SoftButtonPrimary href="/supabase" text="Supabase 페이지로 이동" />
					<SoftButtonPrimary href="/auth" text="ID/PW 인증 페이지로 이동" />
				</Column>
			</Container>
		</DefaultLayout>
	);
}
