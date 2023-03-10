export default function Layout({ children }) {
	return (
		<div className="mx-auto box-content flex max-w-screen-xl px-2 md:px-4">
			<div>{children}</div>
		</div>
	);
}
