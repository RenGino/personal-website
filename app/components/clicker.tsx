'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [clicks, setClicks] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCooldown, setIsCooldown] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState(false);
  const [catMessage, setCatMessage] = useState("Clicking this would make my day!");
  const messages = [
    "Ughhhh",
    "I can start to escape at one quattuorvigintillion clicks",
    "One quattuorvigintillion clicks...",
    "Clicking this helps me get out of here",
    "Please click this...\ndo it for me...",
    "C'monnnn keep clicking",
    "Click click click click click click click click click click",
    "One quattuorvigintillion clicks will push me out...",
    "Being in this box sucks, please click this",
  ];

  useEffect(() => {
    const fetchInitialCount = async () => {
      const { data } = await supabase
        .from('click_counter')
        .select('count')
        .eq('id', 1)
        .single();
      
      if (data) {
        setClicks(data.count);
      }
      setIsLoading(false);
    };

    fetchInitialCount();  // Fetch count from db when the page opens

    // Websocket channel from supabase
    const channel = supabase
      .channel('live_clicks')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'click_counter', filter: 'id=eq.1' },
        (payload: any) => {
          setClicks(payload.new.count); // Update the screen when ANY server update completes
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);  // Clean up websocket connection if user leaves
    };
  }, []);

  const handleClick = async () => {
    if (isCooldown) return;
    setIsCooldown(true);

    setIsShaking(true);
    const availableMessages = messages.filter(msg => msg !== catMessage);  
    const randomMsg = availableMessages[Math.floor(Math.random() * availableMessages.length)];
    setCatMessage(randomMsg);

    setClicks((prev) => prev + 1);  // Instantly update UI for 0ms perceived latency (Optimistic UI)

    const { error } = await supabase.rpc('increment_counter', { row_id: 1 });
    
    if (error) {
      console.error('Failed to increment counter:', error.message);
      setClicks((prev) => prev - 1);  // Roll back the optimistic update if the server request failed
    }

    setTimeout(() => setIsCooldown(false), 300);
  };

  return (
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-40 rounded-xl border border-yellow-200 p-8 bg-yellow-50 dark:border-yellow-400/50 dark:bg-yellow-200/95 w-full max-w-2xl shadow-sm">        
        {/*Counter & Button */}
        <div className="flex flex-col items-start gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-neutral-600">Total clicks worldwide</p>
            <span className="text-4xl font-bold tracking-tight text-black">
              {isLoading ? '...' : clicks}
            </span>
          </div>
          
          <button 
            onClick={handleClick}
            disabled={isCooldown}
            className={`w-32 py-2.5 font-medium rounded-lg flex items-center justify-center disabled:opacity-70 transition-colors cursor-pointer ${
              isCooldown 
                ? 'bg-neutral-200 text-neutral-400 dark:bg-neutral-400 dark:text-neutral-600' 
                : 'bg-black/90 text-white hover:bg-neutral-800 active:scale-95'
            }`}
          >
            {isCooldown ? '...' : 'Click Me'}
          </button>
        </div>

        {/* Cat */}
        <style jsx>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            20% { transform: translateX(-4px) rotate(-3deg); }
            40% { transform: translateX(4px) rotate(3deg); }
            60% { transform: translateX(-3px) rotate(-1deg); }
            80% { transform: translateX(3px) rotate(1deg); }
          }
          .animate-shake {
            animation: shake 0.4s ease-in-out;
          }
        `}</style>
        
        <div className="flex flex-col items-center relative">
          <div className="relative w-50 min-h-14 flex items-center justify-center bg-white dark:bg-neutral-700 border border-yellow-200 dark:border-yellow-400/50 px-3 py-2 rounded-xl shadow-sm text-xs font-medium text-neutral-700 dark:text-neutral-200 text-center mb-2 whitespace-pre-line">
            {isLoading ? "It's loading!" : catMessage}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-neutral-700 border-r border-b border-yellow-200 dark:border-yellow-400/50 rotate-45"></div>
          </div>

          <img 
            src="/cat_v4.png" 
            alt="Cat" 
            onAnimationEnd={() => setIsShaking(false)}
            className={`w-36 h-auto object-contain select-none transition-transform ${
              isShaking ? 'animate-shake' : ''
            }`}
          />
        </div>

      </div>
  );
}