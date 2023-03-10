import prisma from '@/lib/prisma';

// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export default async function handle(req, res) {
	const platforms = req.body.platforms.map((platform) => {
		return { id: platform };
	});

	const genres = req.body.genres.map((genres) => {
		return { id: genres };
	});

	const { img, name, released, rating, description } = req.body;

	const game = await prisma.game.create({
		data: {
			img,
			name,
			released,
			rating,
			description,
			origin: 'database',
			platforms: { connect: platforms },
			genres: { connect: genres },
		},
	});

	res.json(game);
}
