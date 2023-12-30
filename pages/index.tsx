import Image from 'next/image';

import Container from '../components/Container';
import BlogPostCard from '../components/BlogPostCard';
import ProjectCard from 'components/ProjectCard';

export default function Home() {
  return (
    <Container
      title="Tilak Dave"
      description="Student, developer, and learner. I am trying to build some dApps"
    >
      <div className="flex flex-col justify-center items-start max-w-2xl border-zinc-200 dark:border-zinc-700 mx-auto mb-8">
        <div className="flex flex-col-reverse sm:flex-row items-start my-8 md:mt-8 md:mb-16">
          <div className="flex flex-col pr-8 mt-4 mb-8">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-2 text-zinc-900 dark:text-zinc-50">
              Tilak Dave
            </h1>
            <h2 className="text-zinc-800 dark:text-zinc-200 mb-4 font-medium">
              Student, dApp Developer, Looking for Internship
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-16">
              Blockchain developer. I use NextJs for web development. Yep, I do
              sing occasionally. Wanna Support me?{' '}
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
        <h3 className="font-bold text-xl md:text-2xl mb-8 text-zinc-900 dark:text-zinc-50">
          Recent Posts
        </h3>
        <div className="grid gap-4 md:grid-cols-2 w-full mb-16">
          <BlogPostCard
            title="What are SSR, SSG and ISR in NextJs?"
            slug="ssr-ssg-isr"
          />
          <BlogPostCard
            title="Why useSWR with NextJs is awesome?"
            slug="why-swr-is-awesome"
          />
        </div>
        <h3 className="font-bold text-xl md:text-2xl my-8 text-zinc-900 dark:text-zinc-50">
          Projects
        </h3>
        <div className="grid gap-4 sm:grid-cols-1 w-full mb-16">
          <ProjectCard
            title="⚖️ Nyay Sathi"
            url="https://nyaysathi.vercel.app"
            github="https://github.com/tiluckdave/nyaysathi"
            desc="Our SIH solution for Ministry of Law and Justice helping marginalised communitties and illiterate people to get legal help."
          />
          <ProjectCard
            title="💲 Web3Lance"
            url="https://web3-lance.vercel.app"
            github="https://github.com/tiluckdave/Web3Lance"
            desc="Freelancing platform built on blockchain with escrow and dispute resolution. Made using Solidity, NextJs, TailwindCSS, and Hardhat."
          />
          <ProjectCard
            title="💳 Social Credit System"
            url=""
            github="https://github.com/Team-Stealth-Mode"
            desc="CCTV enabled system tracking user's social behaviour and giving them social credit score ensuring their trustworthiness."
          />
          <ProjectCard
            title="👩‍💻 Fast Feedback"
            url="https://fastfeedback.tiluckdave.in"
            github="https://github.com/tiluckdave/fastfeedback"
            desc="SaaS application that allows users to add comments and feedback to static websites. Made using NextJs, ChakraUI, and Firebase & Stripe"
          />
        </div>
      </div>
    </Container>
  );
}
