export default function gameFormat(game) {
	const platforms = game.platforms.map((platform) => platform.platform.name);
	const genres = game.genres.map((genre) => genre.name);
	const tags = game.tags.map((tag) => tag.name);

	return {
		img: game.background_image,
		name: game.name,
		rating: game.rating,
		released: game.released,
		description: game.description,
		platforms,
		genres,
		tags,
	};
}
