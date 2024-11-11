import { ReactNode } from 'react';

interface ColumnProps {
	children: ReactNode;
	minHeight?: string;
}

export default function Column({ children, minHeight = '' }: ColumnProps) {
	let className = 'flex flex-col items-center justify-center gap-2 px-4 py-4';
	className += minHeight ? ` min-h-[${minHeight}]` : '';

	return <div className={className}>{children}</div>;
}
