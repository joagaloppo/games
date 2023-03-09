export default function gameFormat(game) {
	const platforms = game.platforms.map((platform) => {
		return {
			id: platform.platform.id,
			name: platform.platform.name,
		};
	});

	const genres = game.genres.map((genre) => {
		return {
			id: genre.id,
			name: genre.name,
		};
	});

	return {
		id: game.id,
		img: game.background_image,
		name: game.name,
		rating: game.rating,
		released: game.released,
		description: game.description,
		platforms,
		genres,
	};
}
