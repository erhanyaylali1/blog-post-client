import Nprogress from 'nprogress';
import Router from 'next/router';
import 'antd/dist/antd.css';
import '../public/style.css';

Router.onRouteChangeStart = () => Nprogress.start();
Router.onRouteChangeComplete = () => Nprogress.done();
Router.onRouteChangeError = () => Nprogress.done();

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
