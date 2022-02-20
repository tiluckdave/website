import { Html, Head, Main, NextScript } from 'next/document';

export default function Document(props) {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="preload"
          href="/fonts/ibm-plex-sans-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
        <link href="/static/favicons/site.webmanifest" rel="manifest" />
        <meta content="#ffffff" name="theme-color" />
        <meta content="#ffffff" name="msapplication-TileColor" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LSP50DVBFS"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LSP50DVBFS', { page_path: window.location.pathname });
            `,
          }}
        />
      </Head>
      <body className="bg-slate-50 dark:bg-slate-900 text-slate-50 dark:text-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
