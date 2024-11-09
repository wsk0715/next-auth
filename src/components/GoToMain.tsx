'use client';

import Link from 'next/link';

export function GoToMain() {
	return (
		<div className="flex justify-center mt-auto pb-6">
			<Link href="/" className="text-blue-500 hover:text-blue-700">
				메인화면
			</Link>
		</div>
	);
}
