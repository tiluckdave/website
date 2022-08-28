import Link from 'next/link';
import cn from 'classnames';

export default function BlogPostCard({ title, slug }) {
  return (
    <Link href={`/blog/${slug}`}>
      <a
        className='w-full border rounded-md border-1 border-slate-200 dark:border-slate-800 transition-all text-slate-700 hover:text-slate-900 dark:text-slate-300 hover:dark:text-slate-100 group'
      >
        <div className="flex justify-between bg-slate-100 dark:bg-slate-900 rounded-lg p-4">
            <h4 className="text-lg md:text-lg font-medium group-hover:underline group-hover:decoration-slate-900 dark:group-hover:decoration-slate-100 group-hover:decoration-dashed group-hover:underline-offset-8">
              {title}
            </h4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 group-hover:translate-x-2 transition-all"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
              />
            </svg>
        </div>
      </a>
    </Link>
  );
}
