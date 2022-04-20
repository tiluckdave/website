import Link from 'next/link';
import cn from 'classnames';

export default function BlogPostCard({ title, slug, gradient }) {
  return (
    <Link href={`/blog/${slug}`}>
      <a
        className={cn(
          'transform transition-all',
          'rounded-xl w-full md:w-1/3 bg-gradient-to-r p-1 transition',
          gradient
        )}
      >
        <div className="flex flex-col justify-between h-full bg-slate-100 dark:bg-slate-900 rounded-lg p-4">
          <div className="flex flex-col md:flex-row justify-between">
            <h4 className="text-lg md:text-lg font-medium mb-6 sm:mb-10 w-full text-slate-900 dark:text-slate-100 tracking-tight">
              {title}
            </h4>
          </div>
        </div>
      </a>
    </Link>
  );
}
