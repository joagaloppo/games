import { useState } from 'react';
import clsx from 'clsx';

import { IoIosArrowDown } from 'react-icons/io';

export default function Select({ options }) {
	const [show, setShow] = useState(false);
	const [selected, setSelected] = useState(options[0].name);

	const handleClick = (e, option) => {
		e.preventDefault;
		setShow(!show);
		setSelected(option.name);
		console.log(option);
	};

	return (
		<div className="flex w-full flex-col">
			<button
				className="text-md inline-flex h-12 items-center justify-center border border-gray-300 text-center text-gray-500 transition duration-300 ease-in-out hover:border-gray-400 hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
				type="button"
				onClick={() => setShow(!show)}>
				{selected}
				<IoIosArrowDown className="ml-2 h-3 w-auto" />
			</button>

			<div className="relative w-full">
				<div className={clsx('absolute top-0 z-10 w-full bg-white shadow-xl', !show && 'hidden')}>
					<ul
						className="text-md border border-t-0 border-gray-300 bg-white py-2 text-gray-700"
						aria-labelledby="states-button">
						{options.map((option) => (
							<li
								key={option.id}
								type="button"
								onClick={(e) => handleClick(e, option)}
								className="inline-flex w-full cursor-pointer px-4 py-2 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
								{option.name}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
