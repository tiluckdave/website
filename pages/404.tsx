import Link from 'next/link';

import Container from 'components/Container';

export default function NotFound() {
  return (
    <Container title="404 – Tilak Dave">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-slate-900 dark:text-slate-50">
          451 – Unavailable For Legal Reasons
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
        Your requested URL has been blocked as per the directions received from Government. Please contact administrator for more information
        </p>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Why show a generic 404 when I can make it sound mysterious? It seems
          you've found something that used to exist, or you spelled something
          wrong. I'm guessing you spelled something wrong. Can you double check
          that URL?
        </p>
        <Link href="/">
          <a className="p-1 sm:p-3 w-48 font-bold mx-auto bg-slate-200 dark:bg-slate-800 text-center rounded-md text-slate-900 dark:text-slate-50">
            Return Home
          </a>
        </Link>
      </div>
    </Container>
  );
}
