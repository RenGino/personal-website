'use client';

import LinkComponent from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ThemeToggle } from './themeToggle';

const navItems = [
  { path: '/', label: 'home' },
  { path: '/experience', label: 'experience' },
  // { path: '/projects', label: 'projects' },
  { path: '/clicker-demo', label: 'clicker demo' },
  { path: '/arts', label: 'art showcase' },
  { path: '/contact', label: 'contact' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full p-6 pr-2 md:w-36 md:pr-0">
      <div className="flex flex-col gap-3">
        <div className="flex justify-center md:justify-start">
          <span className="block h-0.5 w-30 rounded-full bg-neutral-900 transition-colors dark:bg-white" />
        </div>
        <ThemeToggle />
        <nav className="flex flex-row flex-wrap justify-center md:flex-col md:flex-nowrap md:justify-start w-full gap-2 md:gap-0.5 items-center md:items-start pb-2 md:pb-0">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <LinkComponent
                key={item.path}
                href={item.path}
                // `...` lets you treat block as a string and also evaluate code inside
                // ${...} treats block as JavaScript
                className={`relative px-2 py-1 text-base transition-colors ${
                  isActive
                    ? 'text-black dark:text-white font-medium'
                    : 'text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 rounded-md bg-neutral-200 dark:bg-neutral-800 z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </LinkComponent>
            );
          })}
          <div className="mt-8">
          </div>
        </nav>
      </div>
    </aside>
  );
}