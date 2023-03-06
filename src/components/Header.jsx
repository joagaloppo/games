export default function Header() {
	return (
		<div className="flex flex-col items-center justify-center">
			<div className="flex space-x-16 py-6">
				<h1>Games</h1>
				<div>Search bar</div>
				<span>Add one</span>
			</div>
			<div className="flex space-x-16 py-6">
				<span>Filter by </span>
				<span>Filter by </span>
				<span>Filter by </span>
				<span>Filter by </span>
			</div>
		</div>
	);
}
