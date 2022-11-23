import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import NextLink from 'next/link';
import cn from 'classnames';

import Footer from 'components/Footer';
import MobileMenu from 'components/MobileMenu';

function NavItem({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <a
        className={cn(
          isActive
            ? 'font-bold text-slate-900 dark:text-slate-100'
            : 'font-semibold text-slate-700 dark:text-slate-300',
          'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:text-slate-900 dark:hover:text-slate-100 transition-all'
        )}
      >
        <span className="capsize">{text}</span>
      </a>
    </NextLink>
  );
}

export default function Container(props) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: 'Tilak Dave – Developer',
    description: `Student, developer, and learner. I am trying to build some SaaS applications along with a bit of freelancing.`,
    image: 'https://www.tiluckdave.in/static/images/banner.png',
    type: 'website',
    ...customMeta
  };


  const browserShare = () => {
    const shareData = {
      title: meta.title,
      text: meta.description,
      url: `https://www.tiluckdave.in${router.asPath}`
    }
    navigator.share(shareData);
  }

  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://www.tiluckdave.in${router.asPath}`} />
        <link rel="canonical" href={`https://www.tiluckdave.in${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tiluckdave" />
        <meta name="twitter:creator" content="@tiluckdave" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <div className="flex flex-col justify-center w-full sticky top-0 z-50 mb-16 backdrop-blur-lg bg-slate-100/30  dark:bg-slate-900/30 border border-slate-100 dark:border-slate-900 border-b-slate-300 dark:border-b-slate-700">
        <nav className="flex items-center justify-between w-full relative md:max-w-2xl mx-auto pt-4 pb-4 text-slate-900 dark:text-slate-100">
          <a href="#skip" className="skip-nav"> 
            Skip to content
          </a>
          <div className="ml-[-0.60rem]">
            <MobileMenu />
            <NavItem href="/" text="Home" />
            <NavItem href="/about" text="About" />
            <NavItem href="/blog" text="Blog" />
            <NavItem href="/resume.pdf" text="Resume" />
          </div>
          <div className='flex gap-2 px-8 md:px-0'>

          <button 
            aria-label="Share Page"
            type="button" 
            className="w-9 h-9 transition-all text-slate-800 dark:text-slate-50 flex items-center justify-center" 
            onClick={() => 
              browserShare()
            }
          >
          <svg viewBox="0 0 24 24" stroke="currentColor" fill="currentColor" strokeWidth={0} className="w-5 h-5 text-slate-800 dark:text-slate-200" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M21,11 L21,20 C21,21.1045695 20.1045695,22 19,22 L5,22 C3.8954305,22 3,21.1045695 3,20 L3,11 L5,11 L5,20 L19,20 L19,11 L21,11 Z M13,5.41421356 L13,16 L11,16 L11,5.41421356 L7.70710678,8.70710678 L6.29289322,7.29289322 L12,1.58578644 L17.7071068,7.29289322 L16.2928932,8.70710678 L13,5.41421356 Z"/>
          </svg>
        </button>

          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="w-9 h-9 flex items-center justify-center transition-all"
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            {mounted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-5 h-5 text-slate-800 dark:text-slate-200"
              >
                {resolvedTheme === 'dark' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                )}
              </svg>
            )}
          </button>
          </div>
        </nav>
      </div>
      <main
        id="skip"
        className="flex flex-col justify-center px-8 bg-slate-100 dark:bg-slate-900"
      >
        {children}
        
        <Footer />
      </main>
    </div>
  );
}
