import Link from 'next/link';
import SearchBar from './SearchBar';
import { BiGame } from 'react-icons/bi';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';

export default function Header() {
	return (
		<div className="flex flex-col items-center justify-center">
			<div className="flex space-x-16 py-6 items-center w-full">
				<Link href="/">
					<BiGame className="h-8 w-auto text-gray-300 hover:-rotate-45 hover:text-gray-400 transition duration-300 cursor-pointer	" />
				</Link>
				<SearchBar />
				<Link href="/">
					<IoMdAddCircleOutline className="h-8 w-auto text-gray-300 hover:text-gray-400 transition duration-300 cursor-pointer" />
				</Link>
			</div>
			<div className="flex space-x-4 pb-12">
				<span className="flex items-center text-sm text-gray-400 px-11 h-10 border rounded hover:bg-gray-100 hover:text-gray-500 hover:border-gray-300 transition cursor-pointer">
					Sort A - Z <IoIosArrowDown className="h-3 w-auto ml-2" />
				</span>
				<span className="flex items-center text-sm text-gray-400 px-11 h-10 border rounded hover:bg-gray-100 hover:text-gray-500 hover:border-gray-300 transition cursor-pointer">
					Sort by rating <IoIosArrowDown className="h-3 w-auto ml-2" />
				</span>
				<span className="flex items-center text-sm text-gray-400 px-11 h-10 border rounded hover:bg-gray-100 hover:text-gray-500 hover:border-gray-300 transition cursor-pointer">
					Filter by origin <IoIosArrowDown className="h-3 w-auto ml-2" />
				</span>
				<span className="flex items-center text-sm text-gray-400 px-11 h-10 border rounded hover:bg-gray-100 hover:text-gray-500 hover:border-gray-300 transition cursor-pointer">
					Filter by genre <IoIosArrowDown className="h-3 w-auto ml-2" />
				</span>
			</div>
		</div>
	);
}
