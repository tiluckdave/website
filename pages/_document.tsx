import { Html, Head, Main, NextScript } from 'next/document';

export default function Document(props) {
  return (
    <Html lang="en">
      <Head>
        <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
        <link rel="icon" type="image/png" href="/static/favicons/favicon.ico" />
        <link rel="apple-touch-icon" href="/static/favicons/favicon.ico" />
        <link href="/static/site.webmanifest" rel="manifest" />
        <meta content="#ffffff" name="theme-color" />
        <meta content="#ffffff" name="msapplication-TileColor" />
      </Head>
      <body className="bg-zinc-50 dark:bg-zinc-900 text-zinc-50 dark:text-zinc-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
