import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import SmallLayout from '@/components/SmallLayout';
import moment from 'moment';

import gameFormat from '@/lib/gameFormat';
import prisma from '@/lib/prisma';

import { IoIosStarOutline, IoIosCalendar, IoIosArrowRoundBack } from 'react-icons/io';

import { useEffect } from 'react';

export default function Game({ game }) {
	useEffect(() => {
		console.log(game);
	});

	return (
		<>
			<Head>
				<title>Next Games</title>
				<meta
					name="description"
					content="Discover and explore the world of gaming with my Next.js videogames app"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<SmallLayout>
					<div className="mb-4 flex flex-col-reverse md:flex-row md:items-center md:justify-between md:space-x-6 ">
						<div className="flex flex-col text-gray-800 md:flex-row md:items-center md:space-x-6">
							<h1 className="text-2xl font-extrabold">{game.name}</h1>
							<p className="flex items-center">
								<IoIosStarOutline className="mr-2 h-4 w-auto" /> {game.rating}
							</p>
							<p className="flex items-center">
								<IoIosCalendar className="mr-2 h-4 w-auto" />{' '}
								{moment(game.released).format('MMMM DD, YYYY')}
							</p>
						</div>
						<div>
							<Link href="/" className="text-blue-500 hover:text-blue-600">
								<p className="flex items-center">
									<IoIosArrowRoundBack className="mr-2 h-4 w-auto" /> Go back
								</p>
							</Link>
						</div>
					</div>
					{/* <img
						src={game.img}
						alt={game.name}
						// width="990"
						// height="660"
						className="mx-auto mb-4 w-full rounded-xl object-cover"
					/> */}

					{game.origin === 'database' ? (
						<img
							src={game.img}
							alt={game.name}
							width="768"
							height="432"
							className="mb-2 aspect-video h-auto w-full rounded-xl bg-gray-100 object-cover"
						/>
					) : (
						<Image
							src={game.img}
							alt={game.name}
							width="768"
							height="432"
							className="mb-2 aspect-video h-auto w-full rounded-xl bg-gray-100 object-cover"
						/>
					)}

					<article className="prose prose-orange sm:prose-xl">
						<h3>Description</h3>
						<div
							className="text-justify text-base leading-relaxed text-gray-600"
							dangerouslySetInnerHTML={{ __html: game.description }}
						/>
					</article>
				</SmallLayout>
			</main>
		</>
	);
}

export const getServerSideProps = async (context) => {
	const db = context.params.id.toString().startsWith('I');
	const id = db ? Number(context.params.id.slice(1)) : context.params.id;

	if (db) {
		const game = await prisma.game.findUnique({
			where: { id },
			select: {
				id: true,
				img: true,
				name: true,
				rating: true,
				released: true,
				description: true,
				origin: true,
				genres: true,
				platforms: true,
			},
		});
		return {
			props: { game },
		};
	} else {
		const key = process.env.API_KEY;
		const game = await fetch(`https://api.rawg.io/api/games/${id}?key=${key}`)
			.then((res) => res.json())
			.catch(() => null);

		return {
			props: { game: gameFormat(game) },
		};
	}
};
