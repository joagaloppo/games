import { useRouter } from 'next/router';
import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

export default function SearchBar() {
	const [input, setInput] = useState('');

	const router = useRouter();
	const handleSubmit = (e) => {
		e.preventDefault();
		router.push(`/search/${input}`);
	};

	return (
		<div className="flex-grow">
			<form className="group flex flex-row" onSubmit={(e) => handleSubmit(e)}>
				<input
					className="text-md h-12 w-full border border-gray-200 bg-white px-4 text-gray-600 placeholder-gray-500 transition duration-300 ease-in-out focus:border-gray-400 focus:placeholder-gray-500 focus:outline-none"
					type="text"
					placeholder="Search for a game..."
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button
					type="submit"
					className="flex h-12 w-14 items-center justify-center border border-gray-200 text-gray-400 transition duration-300 ease-in-out hover:border-gray-400 hover:bg-gray-50 hover:text-gray-600 sm:w-20">
					<IoIosSearch className="h-6 w-auto" />
				</button>
			</form>
		</div>
	);
}
