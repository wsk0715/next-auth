interface HeaderProps {
	title: string;
}

export default function Header({ title }: HeaderProps) {
	return <div className="flex justify-center items-center gap-2 px-4 py-5 text-3xl">{title}</div>;
}
