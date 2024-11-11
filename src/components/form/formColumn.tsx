interface FormColumnProps {
	id: string;
	label: string;
	type?: string;
	value: string;
	onChange: (value: string) => void;
}

export default function FormInputColumn({ id, label, type = 'text', value, onChange }: FormColumnProps) {
	return (
		<div>
			<label htmlFor={id} className="block mb-2">
				{label}
			</label>
			<input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full p-2 border rounded" />
		</div>
	);
}
