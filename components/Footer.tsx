import Link from 'next/link';

import NowPlaying from 'components/NowPlaying';

export const ExternalLink = ({ href, children }) => (
  <a
  className="text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
      <hr className="w-full border-1 border-slate-200 dark:border-slate-800 mb-8" />
      <NowPlaying />
      <div className="w-full max-w-3xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <a className="text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition">Home</a>
          </Link>
          <Link href="/blog">
            <a className="text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition">Blog</a>
          </Link>
          
        </div>
        <div className="flex flex-col space-y-4">
          <ExternalLink href="https://github.com/tiluckdave">GitHub</ExternalLink>
          <ExternalLink href="https://instagram.com/tiluckdave">
            Instagram
          </ExternalLink>
          <ExternalLink href="https://linkedin.com/in/tiluckdave">
            LinkedIn
          </ExternalLink>
        </div>
        <div className="flex flex-col space-y-4">
          <Link href="/resume.pdf">
            <a className="text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition">Resume</a>
          </Link>
        <Link href="/about">
            <a className="text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition">
              About
            </a>
          </Link>
          <Link href="/uses">
            <a className="text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition">Uses</a>
          </Link>
        </div>
      </div>
      <div className="">
      <p className="text-slate-500 dark:text-slate-500" >Domain sponsored by Zicroz. Website Design inspired by <a href="leerob.io">leerob.io</a> </p>
      </div>
    </footer>
  );
}
