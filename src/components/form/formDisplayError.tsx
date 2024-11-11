interface FormDisplayErrorProps {
	error?: string;
}

export default function FormDisplayError({ error }: FormDisplayErrorProps) {
	return <div className="h-8 flex items-center justify-center">{error && <div className="text-red-500 text-sm">{error}</div>}</div>;
}
