import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-full p-6 pr-2 md:w-36 md:pr-0">
      <div className="flex flex-col gap-6">
        <div>
          <span className="block h-0.5 w-30 rounded-full bg-neutral-900 transition-colors dark:bg-white" />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-row gap-4 md:flex-col md:gap-2">
          <Link
            href="/"
            className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
          >
            Dev
          </Link>
          <Link
            href="/projects"
            className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
          >
            3Ds
          </Link>
          <Link
            href="/projects"
            className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
          >
            Arts
          </Link>
        </nav>

      </div>
    </aside>
  );
}