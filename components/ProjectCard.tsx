import Link from 'next/link';

export default function ProjectCard({ title, url, github, desc }) {
  return (
    <div className="flex flex-col items-center bg-slate-200 dark:bg-slate-800 p-4 w-full rounded-md transition-all text-slate-700 dark:text-slate-300 hover:ring-1 hover:ring-slate-500 transition-all">
      <div className='flex justify-between items-center w-full'>

      
      <h4 className="text-lg md:text-lg font-medium">
        {title}
      </h4>
      <div className='flex gap-2'>
        {url && 
        <a href={url}
          type="button" target="_blank" rel="noopener noreferrer"
          className="bg-slate-100 rounded-lg dark:bg-slate-900 w-9 h-9 transition-all text-slate-800 dark:text-slate-50 flex items-center justify-center hover:scale-90">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5"><path fill='currentColor' d="M 40.960938 4.9804688 A 2.0002 2.0002 0 0 0 40.740234 5 L 28 5 A 2.0002 2.0002 0 1 0 28 9 L 36.171875 9 L 22.585938 22.585938 A 2.0002 2.0002 0 1 0 25.414062 25.414062 L 39 11.828125 L 39 20 A 2.0002 2.0002 0 1 0 43 20 L 43 7.2460938 A 2.0002 2.0002 0 0 0 40.960938 4.9804688 z M 12.5 8 C 8.3826878 8 5 11.382688 5 15.5 L 5 35.5 C 5 39.617312 8.3826878 43 12.5 43 L 32.5 43 C 36.617312 43 40 39.617312 40 35.5 L 40 26 A 2.0002 2.0002 0 1 0 36 26 L 36 35.5 C 36 37.446688 34.446688 39 32.5 39 L 12.5 39 C 10.553312 39 9 37.446688 9 35.5 L 9 15.5 C 9 13.553312 10.553312 12 12.5 12 L 22 12 A 2.0002 2.0002 0 1 0 22 8 L 12.5 8 z" /></svg>
        </a>}
        {github && <a href={github} target="_blank"
          type="button" rel="noopener noreferrer"
          className="bg-slate-100 rounded-lg dark:bg-slate-900 w-9 h-9 transition-all text-slate-800 dark:text-slate-50 flex items-center justify-center hover:scale-90">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            className="h-6 w-6 "
          >
            <path
              d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"
              fill="currentColor"
            />
          </svg>
        </a>}
      </div>
      </div>
      <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-4">{desc}</p>
    </div>

  );
}
