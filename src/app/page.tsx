import Image from 'next/image';

export default function Home() {
	return (
		<main className="flex flex-col min-h-screen p-4 bg-[#bfbfbf]">
			<div className="w-full max-w-[440px] min-h-[calc(100vh-2rem)] mx-auto p-4 bg-white rounded-lg shadow-md flex flex-col">
				<div className="flex justify-center items-center gap-2 px-4 py-5 text-3xl">Head</div>
				<div className="flex-1 gap-2 px-4 py-5">Body</div>
				<div className="flex justify-center items-center gap-2 px-4 py-5">
					Running on <Image src="/next.svg" alt="Next.js Logo" width={100} height={24} priority />
				</div>
			</div>
		</main>
	);
}
