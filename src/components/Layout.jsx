import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
	return (
		<div className="max-w-screen-lg mx-auto">
			<Header />
			<div>{children}</div>
			<Footer />
			<div className="h-16"></div>
		</div>
	);
}
