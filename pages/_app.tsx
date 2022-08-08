import 'styles/global.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <ThemeProvider attribute="class">
        <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-LMLFTJKQSC"
      />

      <Script id="google-analytics-script" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-LMLFTJKQSC', {
          page_path: window.location.pathname,
          });
    `}
      </Script>
        <Component {...pageProps} />
      </ThemeProvider>
  );
}
