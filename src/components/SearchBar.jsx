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
					className="bg-white border border-gray-200 h-10 px-4 placeholder-gray-400 w-full text-sm text-gray-800 rounded-l focus:outline-none transition duration-300 focus:border-gray-300 focus:bg-gray-100/25 focus:placeholder-gray-500"
					type="text"
					placeholder="Search for a game..."
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button className="flex items-center justify-center h-10 w-12 border border-l-0 border-gray-200 rounded-r">
					<IoIosSearch className="h-5 w-auto text-gray-400" />
				</button>
			</form>
		</div>
	);
}
