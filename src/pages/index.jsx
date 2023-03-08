import Head from 'next/head';

import Header from '@/components/Header';
import Layout from '@/components/Layout';
import Cards from '@/components/Cards';
import Footer from '@/components/Footer';

import gamesFormat from '@/lib/gamesFormat';
import prisma from '../lib/prisma';

import { useState } from 'react';

export default function Home({ games }) {
	const [page, setPage] = useState(1);

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
					<Header />
					<Cards games={games.slice(page * 12 - 12, page * 24 - page * 12)} />
					<Footer setPage={setPage} page={page} />
				</Layout>
				<div className="h-16"></div>
			</main>
		</>
	);
}

export const getServerSideProps = async () => {
	try {
		const dbGames = await prisma.game.findMany({
			select: {
				id: true,
				name: true,
				released: true,
			},
		});

		const pages = [1, 2, 3];
		const promises = pages.map((page) =>
			fetch(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&page_size=40&page=${page}`)
				.then((res) => res.json())
				.then((data) => gamesFormat(data.results))
		);
		const gameLists = await Promise.all(promises);
		const allGames = gameLists.flat();
		return {
			props: { games: [...dbGames, ...allGames] },
		};
	} catch (error) {
		console.error(error);
		return {
			props: { games: [] },
		};
	}
};
