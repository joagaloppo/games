import '@/styles/tailwind.css';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from 'next/router';

NProgress.configure({
	minimum: 0.5,
	easing: 'ease',
	speed: 300,
	showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}
