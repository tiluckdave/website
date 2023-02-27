import { useState } from 'react';

import Container from 'components/Container';
import BlogPost from 'components/BlogPost';
import { InferGetStaticPropsType } from 'next';
import { pick } from 'lib/utils';
import { allBlogs } from '.contentlayer/data';

export default function Blog({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Container
      title="Blog – Tilak Dave"
      description="Thoughts on development, my career, social and my personal life."
    >
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-0">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 md:text-5xl dark:text-zinc-50">
          Blog
        </h1>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          {`I wanted to write online from a long time, mostly about development and my life. I try to write one whenever I can.`}
        </p>
        <div className="relative w-full mb-4">
          <input
            aria-label="Search articles"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search articles"
            className="block w-full px-4 py-2 placeholder:text-zinc-400 text-zinc-900 bg-zinc-50 border border-zinc-200 rounded-md dark:border-zinc-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:text-zinc-100 outline-none"
          />
          <svg
            className="absolute w-5 h-5 text-zinc-400 right-3 top-3 dark:text-zinc-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="mt-8 mb-8 text-2xl font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-zinc-50">
          All Posts
        </h3>
        {!filteredBlogPosts.length && (
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            No posts found.
          </p>
        )}
        {filteredBlogPosts.map((post) => (
          <BlogPost key={post.title} {...post} />
        ))}
      </div>
    </Container>
  );
}

export function getStaticProps() {
  const posts = allBlogs
    .map((post) => pick(post, ['slug', 'title', 'summary', 'publishedAt']))
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    );

  return { props: { posts } };
}
