import Card from './Card';

export default function Cards({ games }) {
	return (
		<div className="flex flex-wrap gap-8 justify-center">
			{games.map((game) => (
				<Card key={game.id} game={game} />
			))}
		</div>
	);
}
