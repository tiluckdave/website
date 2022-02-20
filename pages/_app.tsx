import 'styles/global.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
declare global { interface Window { gtag: any; } }

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const handleRouteChange = (url) => {
    window.gtag('config', 'G-LSP50DVBFS', { page_path: url });
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
  );
}
