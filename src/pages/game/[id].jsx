import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/components/Layout';
import moment from 'moment';

import gameFormat from '@/lib/gameFormat';

import { IoIosStarOutline, IoIosCalendar, IoIosArrowRoundBack } from 'react-icons/io';
import Link from 'next/link';

export default function Game({ game }) {
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
				<Layout>
					<div className="py-8">
						<div className="flex justify-between items-center mb-4">
							<div className="flex space-x-6 items-center text-gray-600">
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
						<Image
							src={game.img}
							alt={game.name}
							width="990"
							height="660"
							className="w-[1024px] h-[600px] object-cover mb-4 mx-auto rounded"
						/>
						{/* <p className="text-gray-700 text-justify">{game.description}</p> */}
						<div
							className="text-justify text-gray-600"
							dangerouslySetInnerHTML={{ __html: game.description }}
						/>
						{/* <div>
							<div className="flex space-x-2">
								{game.genres.map((genre, index) => (
									<span key={index}>{genre}</span>
								))}
							</div>
							<div className="flex space-x-2">
								{game.platforms.map((platform, index) => (
									<span key={index}>{platform}</span>
								))}
							</div>
							<div className="flex space-x-2">
								{game.tags.map((tag, index) => (
									<span key={index}>{tag}</span>
								))}
							</div>
						</div> */}
					</div>
				</Layout>
			</main>
		</>
	);
}

export const getServerSideProps = async (context) => {
	const id = Number(context.params.id);
	const key = process.env.API_KEY;
	const game = await fetch(`https://api.rawg.io/api/games/${id}?key=${key}`)
		.then((res) => res.json())
		.then((res) => gameFormat(res))
		.catch(() => null);

	return {
		props: { game },
	};
};
