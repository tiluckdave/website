import { surprises } from 'lib/surprise';
import { useRouter } from 'next/router';
import Container from 'components/Container';
import Head from 'next/head';
import Link from 'next/link';

import { useCallback, useEffect, useState } from 'react';

export default function Surprise() {
  // get uid from the url
  const { query } = useRouter();
  const { uid } = query;
  let surprise = surprises.find(surprise => surprise.uid === uid);

  const [redeemed, setRedeemed] = useState(false);

  if (surprise) {
  return (
    <Container title={surprise.title}>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="google" content="notranslate" />
      </Head>
        <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
          <h1 className="font-bold text-2xl md:text-4xl tracking-tight mb-2 text-zinc-900 dark:text-zinc-50">
            {surprise.title}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            {surprise.description}
          </p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Redeems - {surprise.quantity}
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Expiry - {surprise.expiry}
            </p>
          <a
            className="bg-zinc-200 rounded-lg py-2 px-8 dark:bg-zinc-800 transition-all text-zinc-900 dark:text-zinc-100 flex items-center justify-center hover:bg-zinc-300 hover:dark:bg-zinc-700 cursor-pointer font-bold"
            onClick={() => {
                setRedeemed(true);
                surprise.quantity = surprise.quantity - 1;
            }}
          >
            Redeem
          </a>
          {redeemed && (
              <p className="text-zinc-900 dark:text-zinc-100 my-4 font-bold">
                You have just redeemed {surprise.title}. Take a screenshot of this page and send it to me on WhatsApp to claim your surprise.
              </p>
          )}
        </div>
    </Container>
  );
  }
  return (<Container title="404 – Tilak Dave">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 text-zinc-900 dark:text-zinc-50">
        451 - Unavailable For Legal Reasons
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
        The page you have requested is unavailable, because the url is blocked by the government
        </p>
        <div className='prose'>
        <Link href="/">
            Return Home
        </Link>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
          Just Kidding... It{`'`}s a 404
        </p>
        </div>
      </div>
    </Container>);
}
