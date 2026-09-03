'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const { error } = await supabase.from('contact_messages').insert([
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      },
    ]);

    if (error) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
    } else {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <section className="flex flex-col items-center w-full px-4 py-4">
      <h2 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-neutral-200">
        Contact Me
      </h2>
        <form onSubmit={handleSubmit} className="max-w-lg w-full space-y-4">
        <div>
            <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
            Name
            </label>
            <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-500 rounded-xl px-3 py-2 text-sm text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-yellow-200 transition-colors"
            placeholder="Your name"
            />
        </div>

        <div>
            <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
            Email
            </label>
            <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-500 rounded-xl px-3 py-2 text-sm text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-yellow-200 transition-colors"
            placeholder="your.email@example.com"
            />
        </div>

        <div>
            <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
            Message
            </label>
            <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-500 rounded-xl px-3 py-2 text-sm text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-yellow-200 transition-colors resize-none"
            placeholder="Your message..."
            />
        </div>

        <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-700 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-900 font-medium text-sm rounded-xl transition-colors disabled:opacity-50"
        >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && (
            <p className="text-xs text-green-600 dark:text-green-400 text-center">
            Message sent successfully! Thanks for reaching out.
            </p>
        )}

        {status === 'error' && (
            <p className="text-xs text-red-600 dark:text-red-400 text-center">
            {errorMessage}
            </p>
        )}
        
        </form>

        {/* Engineering Highlights */}
        <div className="max-w-lg w-full flex flex-col gap-3 mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <h2 className="text-lg font-medium text-black dark:text-white">
            Engineering Highlights
            </h2>
            <ul className="flex flex-col gap-3 text-sm text-neutral-600 dark:text-neutral-400 list-disc pl-5">
            <li>
                <strong className="text-black dark:text-white font-medium">PostgreSQL & RLS:</strong> Secured via Row Level Security (RLS) policies and explicit table-level
                <code className="px-1 py-0.5 mx-1 bg-neutral-200 dark:bg-neutral-800 rounded text-[11px]">GRANT INSERT</code> 
                permissions for the 
                <code className="px-1 py-0.5 mx-1 bg-neutral-200 dark:bg-neutral-800 rounded text-[11px]">anon</code>
                role to ensure strict write-only public access.
            </li>
            <li>
                <strong className="text-black dark:text-white font-medium">Asynchronous Notifications & Rate Limiting:</strong> Created a PostgreSQL webhook pipeline using database triggers and 
                <code className="px-1 py-0.5 mx-1 bg-neutral-200 dark:bg-neutral-800 rounded text-[11px]">pg_net</code> 
                to route contact form submissions to my personal Discord. This utilizes an RLS-protected cooldown table to prevent notification spam.
            </li>
            </ul>
        </div>
    </section>
  );
}