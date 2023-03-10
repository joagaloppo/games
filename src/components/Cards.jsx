import Card from './Card';

export default function Cards({ games }) {
	return (
		<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{games.map((game) => (
				<Card key={game.id} game={game} />
			))}
		</div>
	);
}
