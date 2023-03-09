const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function format(obj) {
	return {
		id: obj.id,
		name: obj.name,
	};
}

function getGenres() {
	const genres = fetch('https://api.rawg.io/api/genres?key=846debc3c78144b580b277c43fcde092')
		.then((res) => res.json())
		.then((res) => res.results.map(format));
	return genres;
}

async function getPlatforms() {
	const pages = [1, 2];
	const promises = pages.map((page) =>
		fetch(`https://api.rawg.io/api/platforms?key=846debc3c78144b580b277c43fcde092&page=${page}`)
			.then((res) => res.json())
			.then((res) => res.results.map(format))
	);
	const platformsLists = await Promise.all(promises);
	const allPlatforms = platformsLists.flat();
	return allPlatforms;
}

function gameFormat(game) {
	const platforms = game.platforms.map((platform) => {
		return { id: platform.platform.id };
	});
	const genres = game.genres.map((genre) => {
		return { id: genre.id };
	});

	return {
		id: game.id,
		img: game.background_image,
		name: game.name,
		rating: game.rating,
		released: game.released,
		origin: 'api',
		description: '',
		platforms: { connect: platforms },
		genres: { connect: genres },
	};
}

async function getAPIGames() {
	const pages = [1, 2, 3];
	const promises = pages.map((page) =>
		fetch(`https://api.rawg.io/api/games?key=846debc3c78144b580b277c43fcde092&page_size=40&page=${page}`)
			.then((res) => res.json())
			.then((data) => data.results)
			.then((games) => games.map(gameFormat))
	);
	const gameLists = await Promise.all(promises);
	const allGames = gameLists.flat();
	return allGames;
}

const games = [
	{
		img: 'https://i.ytimg.com/vi/cWOkHQXw0JQ/maxresdefault.jpg',
		name: 'Super Mario Bros',
		rating: 4.6,
		released: '1985-09-13',
		origin: 'database',
		description:
			"Super Mario Bros. is a platform video game developed and published by Nintendo. The successor to the 1983 arcade game, Mario Bros., it was released in Japan in 1985 for the Famicom, and in North America and Europe for the Nintendo Entertainment System (NES) in 1985 and 1987, respectively. It shifted away from the single-screen arcade format of its predecessor, Mario Bros., and instead featured side-scrolling platform gameplay across six worlds with multiple levels and areas. The game introduced many of the series's iconic power-ups, including the Super Mushroom, Fire Flower, and the Super Star, as well as the Koopa Troopa, a turtle-like enemy that became one of the series's most common foes. The game was a critical and commercial success, selling over 40 million copies worldwide, and has since been re-released on numerous platforms.",
		platforms: { connect: [{ id: 11 }] },
		genres: { connect: [{ id: 10 }, { id: 83 }] },
	},
	{
		img: 'https://phantom-marca.unidadeditorial.es/8e36679ef7eec2d7d0b690bb27ca9eb8/crop/4x0/878x491/resize/1320/f/jpg/assets/multimedia/imagenes/2021/04/14/16183861210531.jpg',
		name: 'The Legend of Zelda: Ocarina of Time',
		rating: 4.7,
		released: '1998-11-21',
		description:
			"The Legend of Zelda: Ocarina of Time is an action-adventure game developed and published by Nintendo for the Nintendo 64 video game console. It is the fifth main installment in The Legend of Zelda series and was released in Japan and North America in November 1998, and in Europe and Australia the following month. The game was directed by Shigeru Miyamoto and produced by Takashi Tezuka. It was written by Akira Himekawa, with additional writing by Hiroshi Takai. The game's soundtrack was composed by Koji Kondo and arranged by Toru Minegishi. The game's art direction was handled by Satoru Takizawa, with character designs by Takashi Tezuka and Shigeru Miyamoto. The game's development team was composed of members from Nintendo's Entertainment Analysis and Development division, including the team that developed The Legend of Zelda: A Link to the Past.",
		platforms: { connect: [{ id: 25 }] },
		genres: { connect: [{ id: 51 }, { id: 7 }] },
		origin: 'database',
	},
	{
		img: 'https://c4.wallpaperflare.com/wallpaper/343/591/728/sonic-sonic-the-hedgehog-hd-wallpaper-preview.jpg',
		name: 'Sonic the Hedgehog 2',
		rating: 4.5,
		released: '1992-06-23',
		description: `Sonic the Hedgehog 2 is a platform game developed and published by Sega for the Sega Genesis console. It was released worldwide in November 1992 and is the direct sequel to Sonic the Hedgehog. The game was developed by a team led by Yuji Naka and Naoto Ohshima, and directed by Hirokazu Yasuhara. It was the first Sonic game to feature Sonic's sidekick Miles "Tails" Prower, who would become a recurring character in the series. The game was also the first to feature Sonic's new spin dash move, which would become a staple of the series. Sonic the Hedgehog 2 was a critical and commercial success, selling over 6 million copies worldwide. It is considered by many to be one of the greatest video games of all time.`,
		platforms: { connect: [{ id: 74 }, { id: 117 }, { id: 119 }] },
		genres: { connect: [{ id: 3 }, { id: 4 }] },
		origin: 'database',
	},
];

async function main() {
	console.log(`Start seeding ...`);

	const genres = await getGenres();
	const platforms = await getPlatforms();
	const apiGames = await getAPIGames();

	for (const g of genres) {
		console.log(g);
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

	for (const a of apiGames) {
		const game = await prisma.game.create({
			data: a,
		});
		console.log(`Created API game with id: ${game.name}`);
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
