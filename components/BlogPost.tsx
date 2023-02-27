import Link from 'next/link';
import type { Blog } from '.contentlayer/types';

export default function BlogPost({
  title,
  summary,
  slug
}: Pick<Blog, 'title' | 'summary' | 'slug'>) {
  return (
    <Link href={`/blog/${slug}`}>
      <a className="w-full">
        <div className="w-full mb-4 rounded-md border border-1 border-zinc-200 dark:border-zinc-800 p-4 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 hover:dark:text-zinc-100 transition-all group bg-zinc-100 dark:bg-zinc-900">
          <div className="flex flex-col justify-between md:flex-row ">
            <h4 className="w-full mb-2 text-lg font-medium md:text-xl group-hover:underline group-hover:decoration-zinc-900 dark:group-hover:decoration-zinc-100 group-hover:underline-offset-4">
              {title}
            </h4>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400">{summary}</p>
        </div>
      </a>
    </Link>
  );
}
