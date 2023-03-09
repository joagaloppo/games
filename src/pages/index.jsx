import Head from 'next/head';

import Header from '@/components/Header';
import Layout from '@/components/Layout';
import Cards from '@/components/Cards';
import Footer from '@/components/Footer';

import prisma from '../lib/prisma';

import { useState } from 'react';

export default function Home({ games }) {
	const [page, setPage] = useState(1);
	const maxPage = Math.ceil(games.length / 12);
	const changePage = (page) => {
		const maxPage = Math.ceil(games.length / 12);
		if (page < 1) page = 1;
		if (page > maxPage) page = maxPage;
		return setPage(page);
	};

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
					<Footer page={page} changePage={changePage} maxPage={maxPage} />
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
				img: true,
				name: true,
				origin: true,
				released: true,
			},
		});

		return {
			props: { games: [...dbGames] },
		};
	} catch (error) {
		console.error(error);
		return {
			props: { games: [] },
		};
	}
};
