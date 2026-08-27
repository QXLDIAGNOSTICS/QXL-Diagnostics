"use client";
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initChatGPTTracking } from '../lib/chatgptAnalytics';

export default function ChatGPTTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    initChatGPTTracking();
  }, [pathname, searchParams]);

  return null;
}
