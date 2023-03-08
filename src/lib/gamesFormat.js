export default function gameFormat(games) {
	return games.map((game) => {
		const genres = game.genres.map((genre) => genre.name);

		return {
			id: game.id,
			name: game.name,
			img: game.background_image,
			released: game.released,
			rating: game.rating,
			genres,
		};
	});
}
