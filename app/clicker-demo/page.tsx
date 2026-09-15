import Clicker from '../components/clicker';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Clicker Demo',
};

export default function ClickerDemo() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium tracking-tight text-black dark:text-white">
          Global Real-Time Event Sync Tracker
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          An interactive serverless feature demonstrating real-time state synchronization.
        </p>
      </div>

      <Clicker />

      {/* Engineering Highlights */}
      <div className="flex flex-col gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
        <h2 className="text-lg font-medium text-black dark:text-white">
          Engineering Highlights
        </h2>
        <ul className="flex flex-col gap-3 text-sm text-neutral-600 dark:text-neutral-400 list-disc pl-5">
          <li>
            <strong className="text-black dark:text-white font-medium">Full-Stack Architecture:</strong> Built a serverless architecture utilizing Next.js and Supabase to synchronize user interactions globally.
          </li>
          <li>
            <strong className="text-black dark:text-white font-medium">Real-Time Sync:</strong> Integrated Supabase Realtime (WebSockets) to broadcast server-side database state updates globally, achieving real-time synchronization with an average latency of ~150ms.
          </li>
          <li>
            <strong className="text-black dark:text-white font-medium">Concurrency Control:</strong> Authored custom PostgreSQL procedural functions (PL/pgSQL) to eliminate transactional race conditions during high-concurrency client updates.
          </li>
        </ul>
      </div>
    </div>
  );
}