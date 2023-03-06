export default function gameFormat(games) {
	return games.map((game) => {
		const genres = game.genres.map((genre) => genre.name);
		const platforms = game.platforms.map((platform) => platform.platform.name);

		return {
			id: game.id,
			slug: game.slug,
			name: game.name,
			img: game.background_image,
			released: game.released,
			genres,
			platforms,
		};
	});
}
