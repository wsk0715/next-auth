import Link from 'next/link';

interface SoftButtonProps {
	href?: string;
	text: string;
	onClick?: () => Promise<void>;
}

export function SoftButtonPrimary({ href = '', text, onClick }: SoftButtonProps) {
	return (
		<div className="text-center">
			<Link href={href} className="text-blue-500 hover:text-blue-700 text-sm" onClick={onClick}>
				{text}
			</Link>
		</div>
	);
}

export function SoftButtonWarning({ href = '', text, onClick }: SoftButtonProps) {
	return (
		<div className="text-center">
			<Link href={href} className="text-red-500 hover:text-red-700 text-sm" onClick={onClick}>
				{text}
			</Link>
		</div>
	);
}
