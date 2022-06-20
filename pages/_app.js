import Nprogress from 'nprogress';
import Router, { useRouter } from 'next/router';
import 'antd/dist/antd.css';
import '../public/style.css';

Router.onRouteChangeStart = () => Nprogress.start();
Router.onRouteChangeComplete = () => Nprogress.done();
Router.onRouteChangeError = () => Nprogress.done();

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  if (router.asPath.includes('#reset/')) {
    router.replace(router.asPath.replace('#', ''));
  }
  return <Component {...pageProps} />;
}
