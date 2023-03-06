export default function Layout({ children }) {
	return (
		<div className="max-w-screen-lg mx-auto">
			<div>{children}</div>
		</div>
	);
}
