'use client';

import LinkComponent from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', label: 'home' },
  { path: '/experience', label: 'experience' },
  { path: '/projects', label: 'projects' },
  { path: '/arts', label: 'arts' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full p-6 pr-2 md:w-36 md:pr-0">
      <div className="flex flex-col gap-6">
        <div>
          <span className="block h-0.5 w-30 rounded-full bg-neutral-900 transition-colors dark:bg-white" />
        </div>
        <nav className="flex flex-row gap-2 md:flex-col md:gap-0.5 items-start">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <LinkComponent
                key={item.path}
                href={item.path}
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
        </nav>
      </div>
    </aside>
  );
}