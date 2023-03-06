import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

export default function Footer({ setPage, page }) {
	const pagination = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	return (
		<div className="h-32 flex justify-between items-center">
			<span
				onClick={() => setPage(page - 1)}
				className="flex items-center text-gray-400 px-4 h-10 border rounded hover:bg-gray-100 hover:text-gray-500 hover:border-gray-300 transition cursor-pointer shadow">
				<BsArrowLeft className="h-4 w-auto mr-2" />
				Back
			</span>

			<div className="flex max-w-full space-x-4 mx-4">
				{pagination.map((page, index) => (
					<span
						key={index}
						onClick={() => setPage(page)}
						className="h-10 w-10 inline-flex justify-center items-center rounded border text-gray-400 hover:bg-gray-100 hover:text-gray-500 hover:border-gray-300 transition cursor-pointer shadow">
						{page}
					</span>
				))}
			</div>

			<span
				onClick={() => setPage(page + 1)}
				className="flex items-center text-gray-400 px-4 h-10 border rounded hover:bg-gray-100 hover:text-gray-500 hover:border-gray-300 transition cursor-pointer shadow">
				Next
				<BsArrowRight className="h-4 w-auto ml-2" />
			</span>
		</div>
	);
}
