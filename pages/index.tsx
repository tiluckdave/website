import Image from 'next/image';

import Container from '../components/Container';
import BlogPostCard from '../components/BlogPostCard';
import ProjectCard from 'components/ProjectCard';
import { useTheme } from 'next-themes';

export default function Home() {
  // access current theme in a state from ThemeProvider
  const { theme } = useTheme();

  return (
    <Container
      title="Tilak Dave"
      description="Student, developer, and learner. I am trying to build some dApps"
    >
      <div className="flex flex-col justify-center items-start max-w-2xl border-zinc-200 dark:border-zinc-700 mx-auto mb-8">
        <div className="flex flex-col-reverse sm:flex-row items-start">
          <div className="flex flex-col pr-8 mt-4 mb-8">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-2 text-zinc-900 dark:text-zinc-50">
              Tilak Dave
            </h1>
            <h2 className="text-zinc-800 dark:text-zinc-200 mb-4 font-medium">
              Student, dApp Developer, Looking for Internship
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-16">
              Learning blockchain development. I use NextJs for web development.
              Yep, I do sing occasionally. Wanna Support me?{' '}
              <a
                href="https://buymeacoffee.com/tiluckdave"
                className="font-semibold"
              >
                Buy me a coffee
              </a>
            </p>
          </div>
          <div className="w-[80px] sm:w-[256px] relative mt-3 mb-8 sm:mb-0 mr-auto rounded-full filter">
            
              <Image
                alt="Tilak Dave"
                height={256}
                width={256}
                src="/avtr.jpg"
                className="rounded-full filter"
              />
          </div>
        </div>
        <h3 className="font-bold text-xl md:text-2xl mb-6 text-zinc-900 dark:text-zinc-50">
          Featured Posts
        </h3>
        <div className="grid gap-4 md:grid-cols-3 w-full mb-6">
          <BlogPostCard title="Next.js vs Create React App: The Ultimate Showdown!" slug="react-vs-next" />
          <BlogPostCard
            title="What are SSR, SSG and ISR in NextJs?"
            slug="ssr-ssg-isr"
          />
          <BlogPostCard
            title="Free alternatives to Heroku"
            slug="top-heroku-alternatives"
          />
        </div>
        <h3 className="font-bold text-xl md:text-2xl my-6 text-zinc-900 dark:text-zinc-50">
          Projects
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 w-full">
          <ProjectCard
            title="💲 Concordium Transfer"
            url="https://ccd.tiluckdave.in"
            github="https://github.com/tiluckdave/ccd-shebuilds-hack"
            desc="A coin transfer application built on Concordium blockchain technology, with age verification to ensure users are over 18."
          />
          <ProjectCard
            title="💳 Social Credit System"
            url=""
            github="https://github.com/Team-Stealth-Mode"
            desc="A system that uses CCTV feeds and public records to detect user behavior and build a social credit score for individuals, giving insight into their trustworthiness and financial status."
          />
          <ProjectCard
            title="👩‍💻 Fast Feedback"
            url="https://fastfeedback.tiluckdave.in"
            github="https://github.com/tiluckdave/fastfeedback"
            desc="SaaS application that allows users to add comments and feedback to static websites"
          />
          <ProjectCard
            title="⚒ System Utility Tool"
            url=""
            github="https://github.com/tiluckdave/EDI"
            desc="A system utility tool that allows users to perform various difficult tasks on their Windows system."
          />
          <ProjectCard
            title="💻 Import Coding"
            url="https://importcoding.vercel.app"
            github="https://github.com/tiluckdave/importcoding"
            desc="Documentation site built using Docusaurus to easily navigate and understand project information."
          />
        </div>
      </div>
    </Container>
  );
}
