import Container from 'components/Container';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

export default function NotFound() {
  const [redeems, setRedeems] = useState(1);

  const handleSetRedeems = useCallback(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('redeems', (redeems - 1).toString());
    }
    setRedeems(redeems - 1);
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (localStorage.getItem('redeems')) {
        setRedeems(parseInt(localStorage.getItem('redeems')));
      } else {
        localStorage.setItem('redeems', '1');
      }
      if (redeems == 0) {
        setTimeout(() => {
          handleSetRedeems();
          window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        }, 10000);
      }
      if (redeems < 0) {
        setTimeout(() => {
          window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        }, 2000);
      }
    }
  }, [handleSetRedeems, redeems]);

  return (
    <Container title="Reveals 3rd Surprise">
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="google" content="notranslate" />
      </Head>
      {redeems >= 0 ? (
        <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
          <h1 className="font-bold text-2xl md:text-4xl tracking-tight mb-2 text-zinc-900 dark:text-zinc-50">
            Reveals 3rd Surprise
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Take screenshot, do whatever you want this page won't be visible
            again once you redeem.
          </p>
          <a
            className="bg-zinc-200 rounded-lg py-2 px-8 dark:bg-zinc-800 transition-all text-zinc-900 dark:text-zinc-100 flex items-center justify-center hover:bg-zinc-300 hover:dark:bg-zinc-700 cursor-pointer font-bold"
            onClick={() => handleSetRedeems()}
          >
            Redeem
          </a>
          {redeems === 0 && (
            <div>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                10 seconds left!
              </p>
              <p className="text-zinc-900 dark:text-zinc-100 mb-4 font-bold">
                Upon a link of a journey's trace,
                <br />
                A map unfolds with careful grace.
                <br />
                My travels' tale, in lines displayed,
                <br />A route of memories, vividly laid.
                <br />
                On Saturday, 19th of August, 2023.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Gonna get rickrolled!
          </p>
        </div>
      )}
    </Container>
  );
}
