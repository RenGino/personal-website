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
    <div className="w-full">
      <div className="flex justify-center mb-3 md:mb-0 md:justify-start">
        <ThemeToggle />
      </div>

      <div className="flex flex-col gap-3 md:-translate-x-6">
        <span className="mx-auto md:mx-0 block h-0.5 w-32 rounded-full bg-neutral-900 transition-colors dark:bg-white" />
        <nav className="flex flex-row flex-wrap justify-center w-full gap-2 md:flex-col md:justify-start md:gap-0.5 items-center md:items-start font-mono">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <LinkComponent
                key={item.path}
                href={item.path}
                className={`relative px-2 py-1 text-base whitespace-nowrap transition-colors ${
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
        </nav>
      </div>
    </div>
  );
}