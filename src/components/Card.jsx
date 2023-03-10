import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment/moment';
import { IoIosHeartEmpty, IoIosCalendar } from 'react-icons/io';

export default function Card({ game }) {
	const link = game.origin === 'api' ? `/game/${game.id}` : `/game/I${game.id}`;

	return (
		<div className="group transition duration-300 lg:hover:-translate-y-1">
			<Link href={link}>
				{game.origin === 'database' ? (
					<img
						src={game.img}
						alt={game.name}
						width="640"
						height="360"
						className="mb-2 aspect-video h-auto bg-gray-100 object-cover"
					/>
				) : (
					<Image
						src={game.img}
						alt={game.name}
						width="640"
						height="360"
						className="mb-2 aspect-video h-auto bg-gray-100 object-cover"
					/>
				)}
			</Link>

			<div className="mb-1 flex items-center justify-between text-gray-600">
				<Link href={link} className="max-w-[300px] flex-grow truncate font-semibold">
					{game.name}
				</Link>
				<IoIosHeartEmpty className="fill-gray-500 text-lg transition hover:cursor-pointer hover:fill-red-500" />
			</div>

			<div className="flex w-full items-center gap-2 text-gray-600">
				<IoIosCalendar />
				<span className="cursor-default truncate text-sm">{moment(game.released).format('MMMM DD, YYYY')}</span>
			</div>
		</div>
	);
}
