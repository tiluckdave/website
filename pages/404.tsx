import Link from 'next/link';

import Container from 'components/Container';
import Head from 'next/head';

export default function NotFound() {
  return (
    <Container title="404 – Tilak Dave">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 text-slate-900 dark:text-slate-50">
        451 - Unavailable For Legal Reasons
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
        The page you have requested is unavailable, because the url is blocked by the government
        </p>
        <div className='prose'>
        <Link href="/">
            Return Home
        </Link>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Just Kidding... It{`'`}s a 404
        </p>
        </div>
      </div>
    </Container>
  );
}
