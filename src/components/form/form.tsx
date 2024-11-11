import { ReactNode } from 'react';

interface FormProps {
	children: ReactNode;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Form({ children, onSubmit }: FormProps) {
	return (
		<form onSubmit={onSubmit} className="space-y-2" noValidate>
			{children}
		</form>
	);
}
