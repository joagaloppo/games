import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Cards from '@/components/Cards';

import prisma from '@/lib/prisma';

export default function search({ games }) {
	return (
		<Layout>
			<Header />
			<Cards games={games} />
			<div id="separator" className="h-16" />
		</Layout>
	);
}

export const getServerSideProps = async (context) => {
	const input = context.params.input.toString();

	const games = await prisma.game.findMany({
		where: {
			name: {
				contains: input,
			},
		},
		select: {
			id: true,
			img: true,
			name: true,
			origin: true,
			released: true,
		},
		take: 12,
	});

	return {
		props: { games },
	};
};
