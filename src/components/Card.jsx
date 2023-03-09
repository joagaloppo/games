import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment/moment';
import { IoIosHeartEmpty, IoIosCalendar } from 'react-icons/io';

export default function Card({ game }) {
	const link = game.origin === 'api' ? `/game/${game.id}` : `/game/I${game.id}`;

	return (
		<div className="group md:hover:-translate-y-1 transition duration-300">
			<Link href={link}>
				<img
					src={game.img}
					alt={game.name}
					// width="330"
					// height="220"
					className="bg-gray-100 w-[320px] h-[180px] object-cover mb-2 rounded-lg"
				/>
			</Link>

			<div className="flex justify-between items-center mb-1 text-gray-600/80">
				<Link
					href={link}
					className="flex-grow font-semibold max-w-[300px] truncate group-hover:underline underline-offset-4">
					{game.name}
				</Link>
				<IoIosHeartEmpty className="text-lg fill-gray-500/80 hover:fill-red-500 transition hover:cursor-pointer" />
			</div>

			<div className="mb-2 flex items-center text-gray-600/80 cursor-default">
				<IoIosCalendar />
				<span className="text-sm font-light max-w-[300px] truncate ml-2">
					{moment(game.released).format('MMMM DD, YYYY')}
				</span>
			</div>

			{/* <div className="flex space-x-2 max-w-[320px] overflow-hidden truncate">
				{game.genres.map((genre, index) => (
					<span
						key={index}
						className="px-3 py-0.5 bg-gray-500/80 text-white rounded-full text-xs cursor-default">
						{genre}
					</span>
				))}
			</div> */}
		</div>
	);
}
