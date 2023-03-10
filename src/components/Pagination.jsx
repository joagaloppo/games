import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

export default function Pagination({ page, changePage, maxPage }) {
	return (
		<div className="mx-auto flex items-center justify-between py-12">
			<span
				onClick={() => changePage(page - 1)}
				className="text-md flex h-12 cursor-pointer items-center border border-gray-300 px-4 text-gray-500 transition duration-300 ease-in-out hover:border-gray-400 hover:bg-gray-50 hover:text-gray-600 sm:after:content-['Back'] ">
				<BsArrowLeft className="h-4 w-auto sm:mr-2" />
			</span>

			<div className="mx-4 flex max-w-full space-x-4">
				<span
					onClick={() => changePage(page)}
					className="inline-flex h-12 cursor-default items-center justify-center border border-gray-300 px-12 text-gray-500">
					{page} / {maxPage}
				</span>
			</div>

			<span
				onClick={() => changePage(page + 1)}
				className="text-md flex h-12 cursor-pointer items-center border border-gray-300 px-4 text-gray-500 transition duration-300 ease-in-out hover:border-gray-400 hover:bg-gray-50 hover:text-gray-600 sm:before:content-['Next'] ">
				<BsArrowRight className="h-4 w-auto sm:ml-2" />
			</span>
		</div>
	);
}
