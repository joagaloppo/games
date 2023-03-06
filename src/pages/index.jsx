import Cards from '@/components/Cards';
import Layout from '@/components/Layout';
import Head from 'next/head';

import gamesFormat from '@/lib/gamesFormat';
import { useState } from 'react';

export default function Home({ games }) {
	// const [games, setGames] = useState(games);
	console.log(games);

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
					<Cards games={games} />
				</Layout>
			</main>
		</>
	);
}

export const getServerSideProps = async () => {
	const key = process.env.API_KEY;
	const games = await fetch('https://api.rawg.io/api/games?key=' + key + '&page_size=12')
		.then((res) => res.json())
		.then((res) => res.results)
		.then((res) => gamesFormat(res))
		.catch(() => null);

	return {
		props: { games },
	};
};
