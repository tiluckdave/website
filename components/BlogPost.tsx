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
        <div className="w-full mb-10">
          <div className="flex flex-col justify-between md:flex-row">
            <h4 className="w-full mb-2 text-lg font-medium text-slate-900 md:text-xl dark:text-slate-100">
              {title}
            </h4>
          </div>
          <p className="text-slate-600 dark:text-slate-400">{summary}</p>
        </div>
      </a>
    </Link>
  );
}
