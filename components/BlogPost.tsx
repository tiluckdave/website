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
        <div className="w-full mb-4 rounded-md border border-1 border-slate-200 dark:border-slate-800 p-4 text-slate-700 dark:text-slate-300 hover:text-slate-900 hover:dark:text-slate-100 transition-all group bg-slate-100 dark:bg-slate-900">
          <div className="flex flex-col justify-between md:flex-row ">
            <h4 className="w-full mb-2 text-lg font-medium md:text-xl group-hover:underline group-hover:decoration-slate-900 dark:group-hover:decoration-slate-100 group-hover:decoration-dashed group-hover:underline-offset-4">
              {title}
            </h4>
          </div>
          <p className="text-slate-600 dark:text-slate-400">{summary}</p>
        </div>
      </a>
    </Link>
  );
}
