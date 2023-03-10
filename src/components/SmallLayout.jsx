export default function SmallLayout({ children }) {
	return (
		<div className="mx-auto box-content flex max-w-screen-md bg-white px-2 pt-6 md:px-4">
			<div>{children}</div>
		</div>
	);
}
