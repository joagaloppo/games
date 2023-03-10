import Link from 'next/link';
import SearchBar from './SearchBar';
import Select from './Select';

import { IoIosAdd } from 'react-icons/io';

export default function Header({ genres }) {
	const origins = [
		{ id: 0, name: 'Filter by origin' },
		{ id: 1, name: 'From the API' },
		{ id: 2, name: 'User created' },
	];

	const rating = [
		{ id: 0, name: 'Sort by rating' },
		{ id: 1, name: 'Ascending (0 - 10)' },
		{ id: 2, name: 'Descending (10 - 0)' },
	];

	const alphabet = [
		{ id: 0, name: 'Sort by alphabet' },
		{ id: 1, name: 'Ascending (A - Z)' },
		{ id: 2, name: 'Descending (Z - A)' },
	];

	return (
		<div className="flex flex-col items-center justify-center pb-8">
			<div className="flex w-full items-center gap-2 py-6 sm:gap-4">
				<SearchBar />
				<Link href="/create">
					<button className="flex h-12 w-12 items-center justify-center border text-gray-400 transition duration-300 ease-in-out hover:border-gray-400 hover:bg-gray-50 hover:text-gray-500">
						<IoIosAdd className="h-6 w-auto" />
					</button>
				</Link>
			</div>
			<div className="flex w-full flex-col gap-4 md:flex-row">
				<Select options={[...alphabet]} />
				<Select options={[...rating]} />
				<Select options={[...origins]} />
				<Select options={[{ id: 0, name: 'Filter by genre' }, ...genres]} />
			</div>
		</div>
	);
}
