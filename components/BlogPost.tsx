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
        <div className="w-full mb-6 rounded-md border border-1 border-slate-400 dark:border-slate-600 hover:border-slate-500 hover:dark:border-slate-500 p-4 text-slate-700 dark:text-slate-300 hover:text-slate-900 hover:dark:text-slate-100 transition-all">
          <div className="flex flex-col justify-between md:flex-row ">
            <h4 className="w-full mb-2 text-lg font-medium md:text-xl">
              {title}
            </h4>
          </div>
          <p className="text-slate-600 dark:text-slate-400">{summary}</p>
        </div>
      </a>
    </Link>
  );
}
