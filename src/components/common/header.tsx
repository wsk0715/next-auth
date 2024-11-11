interface HeaderProps {
	title: string;
}

export default function Header({ title }: HeaderProps) {
	return <h1 className="text-3xl font-bold my-6 text-center">{title}</h1>;
}
