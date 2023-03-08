const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const genres = [
	{ name: 'Action' },
	{ name: 'Adventure' },
	{ name: 'RPG' },
	{ name: 'Simulation' },
	{ name: 'Sports' },
	{ name: 'Strategy' },
];

const platforms = [{ name: 'PC' }, { name: 'PlayStation 5' }, { name: 'Xbox Series X/S' }, { name: 'Nintendo Switch' }];

const games = [
	{
		img: 'https://example.com/game1.png',
		name: 'Game 1',
		rating: 4.5,
		released: '2022-01-01',
		description: 'This is a description of Game 1.',
		platforms: { connect: [{ id: 1 }] }, // connect to platform with id 1 (PC)
		genres: { connect: [{ id: 1 }, { id: 2 }] }, // connect to genres with ids 1 (Action) and 2 (Adventure)
	},
	{
		img: 'https://example.com/game2.png',
		name: 'Game 2',
		rating: 3.8,
		released: '2021-06-01',
		description: 'This is a description of Game 2.',
		platforms: { connect: [{ id: 2 }] }, // connect to platform with id 2 (PlayStation 5)
		genres: { connect: [{ id: 3 }, { id: 2 }] }, // connect to genres with ids 3 (RPG) and 2 (Adventure)
	},
	{
		img: 'https://example.com/game3.png',
		name: 'Game 3',
		rating: 4.2,
		released: '2020-11-01',
		description: 'This is a description of Game 3.',
		platforms: { connect: [{ id: 3 }, { id: 1 }] }, // connect to platforms with ids 3 (Xbox Series X/S) and 1 (PC)
		genres: { connect: [{ id: 4 }] }, // connect to genre with id 4 (Strategy)
	},
	{
		img: 'https://example.com/game4.png',
		name: 'Game 4',
		rating: 4.0,
		released: '2021-03-01',
		description: 'This is a description of Game 4.',
		platforms: { connect: [{ id: 4 }] }, // connect to platform with id 4 (Nintendo Switch)
		genres: { connect: [{ id: 5 }, { id: 6 }] }, // connect to genres with ids 5 (Simulation) and 6 (Sports)
	},
];

async function main() {
	console.log(`Start seeding ...`);
	for (const g of genres) {
		const genre = await prisma.genre.create({
			data: g,
		});
		console.log(`Created genre with id: ${genre.name}`);
	}
	for (const p of platforms) {
		const platform = await prisma.platform.create({
			data: p,
		});
		console.log(`Created platform with id: ${platform.name}`);
	}
	for (const g of games) {
		const game = await prisma.game.create({
			data: g,
		});
		console.log(`Created game with id: ${game.name}`);
	}

	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
