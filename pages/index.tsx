import Image from 'next/image';

import Container from '../components/Container';
import BlogPostCard from '../components/BlogPostCard';

export default function Home() {
  return (
    <Container
      title="Tilak Dave"
      description="Student, developer, and learner. I am trying to build some SaaS applications along with a bit of freelancing." >
      <div className="flex flex-col justify-center items-start max-w-2xl border-slate-200 dark:border-slate-700 mx-auto pb-8">
        <div className="flex flex-col-reverse sm:flex-row items-start">
          <div className="flex flex-col pr-8">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-slate-900 dark:text-slate-50">
              Tilak Dave
            </h1>
            <h2 className="text-slate-700 dark:text-slate-200 mb-4">
              Student, Web Developer, Looking for Internship
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-16">
              Learning to build SaaS applications. I use NextJs for web development. Wanna Support me? <a href="https://buymeacoffee.com/tiluckdave" className="font-semibold">Buy me a coffee</a>
            </p>
          </div>
          <div className="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto">
            <Image
              alt="Tilak Dave"
              height={176}
              width={176}
              src="/avatar.png"
              className="rounded-full filter"
            />
          </div>
        </div>
        <h3 className="font-bold text-lg md:text-xl tracking-tight mb-6 text-slate-900 dark:text-slate-50">
          Featured Posts
        </h3>
        <div className="flex gap-6 flex-col w-full">
          <BlogPostCard
            title="Why SWR is awesome?"
            slug="why-swr-is-awesome"
          />
          <BlogPostCard
            title="What are SSR, SSG and ISR in NextJs?"
            slug="ssr-ssg-isr"
          />
        </div>
      </div>
    </Container>
  );
}
