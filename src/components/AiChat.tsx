"use client";

import React, { useState, useRef, useEffect } from 'react';
import { api, ApiError } from '@/lib/api';
import { useAuth } from '@/lib/useAuth';
import ChatPaymentCard, { type ChatPaymentOrder } from '@/components/ChatPaymentCard';
import { useSiteSettings } from '@/lib/useSiteSettings';
import ReactMarkdown from 'react-markdown';
import { ShoppingCart, Phone, CalendarCheck, X, ChevronLeft, ChevronDown, ChevronUp, Paperclip, Send, Globe, MessageSquareText } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getPhoneE164 } from '@/lib/businessInfo';

type StreamResult = 'streamed' | 'unauthorized' | 'failed';

/** Clean AI-agent mark: chat bubble + spark — high-contrast on blue FAB. */
function QxlAiIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5.5 8C5.5 5.515 7.515 3.5 10 3.5h12c2.485 0 4.5 2.015 4.5 4.5v8.5c0 2.485-2.015 4.5-4.5 4.5h-5.4L11.2 26.2a1 1 0 0 1-1.7-.72V20.5H10c-2.485 0-4.5-2.015-4.5-4.5V8Z"
        fill="currentColor"
      />
      <path
        d="M24.1 2.4 25.45 5.8l3.4 1.35-3.4 1.35L24.1 11.9l-1.35-3.4-3.4-1.35 3.4-1.35L24.1 2.4Z"
        fill="currentColor"
        opacity="0.95"
      />
      {/* Eyes — white so they stay visible on the blue FAB */}
      <circle cx="12" cy="12.2" r="1.55" fill="#fff" />
      <circle cx="16" cy="12.2" r="1.55" fill="#fff" />
      <circle cx="20" cy="12.2" r="1.55" fill="#fff" />
    </svg>
  );
}

const FAB = {
  size: 60,
  right: 24,
  whatsappBottom: 24,
  gap: 14,
} as const;

export default function AiChat() {
  const pathname = usePathname();
  const { user, loading: authLoading, refresh } = useAuth();
  const siteSettings = useSiteSettings();
  if (pathname === '/book') return null;
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isFABsHidden, setIsFABsHidden] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string; type?: 'text' | 'file' | 'payment'; paymentOrder?: ChatPaymentOrder }[]>([]);

  useEffect(() => {
    const hour = new Date().getHours();
    let greeting = "Good evening!";
    if (hour < 12) greeting = "Good morning!";
    else if (hour < 18) greeting = "Good afternoon!";

    const signedInLine = user
      ? `\n\nYou're signed in as **${user.name || user.phone || 'a QXL patient'}**, so I can help with your bookings and prescriptions.`
      : "\n\nYou can ask me questions about tests, symptoms, or packages, or upload your report!";
    const greetingMessage = {
      role: 'assistant' as const,
      content: `👋 **Hello! I am the QXL AI Assistant.**\n\n${greeting} How can I help you today?${signedInLine}`,
    };

    setMessages(prev => {
      if (prev.length > 1) return prev;
      return [greetingMessage];
    });
  }, [user?.name, user?.phone]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'locating' | 'granted' | 'denied' | 'unavailable'>('idle');
  const [chatQuota, setChatQuota] = useState<{ remaining: number; limit: number; kind: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Ensure a stable guest chat ID exists in localStorage so the backend
  // can fingerprint this anonymous browser session consistently across tabs.
  const getGuestChatId = (): string => {
    if (typeof window === 'undefined') return '';
    let id = localStorage.getItem('qxl_guest_chat_id');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('qxl_guest_chat_id', id);
    }
    return id;
  };

  // Request the user's GPS location so the assistant can find/rank the
  // nearest collection centers automatically — never ask the user to type
  // coordinates. The browser shows its own native permission prompt; we just
  // track whether it succeeded so we can offer a one-tap retry button
  // instead of silently falling back to "please tell me your city".
  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('unavailable');
      return;
    }
    setLocationStatus('locating');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocationStatus('granted');
      },
      () => setLocationStatus('denied'),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 5 * 60 * 1000 }
    );
  };

  // Only request GPS when the user opens chat — never on initial page load
  // (PageSpeed / Best Practices flags geolocation permission prompts on load).
  // Listen for global openAiChat events to toggle modal from anywhere
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openAiChat', handleOpen);
    return () => window.removeEventListener('openAiChat', handleOpen);
  }, []);

  // Only request GPS when the user opens chat — never on initial page load
  useEffect(() => {
    if (isOpen && locationStatus !== 'granted' && locationStatus !== 'locating') {
      requestLocation();
    }
  }, [isOpen]);

  const languages = ['English', 'ಕನ್ನಡ (Kannada)', 'हिंदी (Hindi)', 'தமிழ் (Tamil)', 'తెలుగు (Telugu)', 'മലയാളം (Malayalam)'];

  const prebuiltQuestions = [
    "What health packages do you offer?",
    "Do you provide home collection?",
    "Where is your lab located?",
    "Can you explain a CBC test?",
    "How long do reports take?",
    "Do I need to fast before a blood test?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Track scroll position to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getMockReply = (text: string, file: File | null): string => {
    const lower = text.toLowerCase();
    if (
      lower.includes('chest pain') ||
      lower.includes('shortness of breath') ||
      lower.includes('difficulty breathing') ||
      lower.includes('stroke') ||
      lower.includes('unconscious') ||
      lower.includes('fainting') ||
      lower.includes('severe bleeding') ||
      lower.includes('anaphylaxis')
    ) {
      return "🚨 **EMERGENCY MEDICAL CARE NOTICE**\n\nIf you or someone near you is experiencing critical or life-threatening symptoms (such as severe chest pain, acute shortness of breath, stroke symptoms, sudden numbness, or heavy bleeding), **please call local emergency services (108) or proceed immediately to the nearest hospital emergency department.**\n\n*QXL Diagnostics provides outpatient laboratory testing and does not provide emergency medical diagnosis or treatment.*";
    }
    let replyMessage = "Thank you for your query! For accurate information, please call us at +91 9964 639 639 or WhatsApp us. Our team will be happy to assist you.";
    if ((lower.includes('booking') || lower.includes('bookings')) && lower.includes('my')) {
      replyMessage = user
        ? "I can see you're signed in, but I couldn't reach your account data right now. Please open Profile > Bookings, or try again in a moment."
        : "Please log in to your QXL account to view your bookings.";
    } else if (lower.includes('package') || lower.includes('checkup')) {
      replyMessage = "We offer a range of health packages starting from ₹1,899. Our popular ones include Full Body Checkup (86+ parameters), Senior Citizen Packages, and Women's Health Packages. Visit our Packages page or call +91 9964 639 639 to book!";
    } else if (lower.includes('home') || lower.includes('collection')) {
      replyMessage = "Yes! We provide free home sample collection across Bengaluru. Our trained phlebotomy specialists will visit at your preferred time. Book via WhatsApp or call +91 9964 639 639.";
    } else if (lower.includes('location') || lower.includes('lab') || lower.includes('where')) {
      replyMessage = "We have two centers in Bengaluru:\n1. Main Lab: SLN Complex, Mysore Road, Kengeri – 560 060\n2. North Hub: L Square, opposite RMZ Galleria Mall, Yelahanka – 560064\nBoth are Open 24x7.";
    } else if (lower.includes('cbc') || lower.includes('blood')) {
      replyMessage = "CBC (Complete Blood Count) is a test that evaluates 24 parameters of your blood including RBC, WBC, Hemoglobin, Platelets, and more. It helps detect anemia, infections, and blood disorders. Price: ₹395 at QXL.";
    } else if (lower.includes('report') || lower.includes('how long')) {
      replyMessage = "Most routine tests (like CBC, Thyroid, Sugar) have same-day reporting. You will receive a WhatsApp message and email with the secure link to download your digital report once it's ready.";
    } else if (lower.includes('fast') || lower.includes('empty stomach')) {
      replyMessage = "Fasting requirements depend on the test. Tests like Fasting Blood Sugar (FBS) or Lipid Profile usually require 10-12 hours of fasting. Please drink only water during this time. CBC or Thyroid tests typically do not require fasting.";
    }
    if (file) {
      replyMessage = `I've received your file: ${file.name}. To get an AI analysis of a prescription, please use the "Upload Prescription" page — this chat window is for questions only.`;
    }
    return replyMessage;
  };

  const sendMockReply = (text: string, file: File | null) => {
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: getMockReply(text, file) }]);
      setIsLoading(false);
    }, 1000);
  };

  // Consume the FastAPI SSE stream from POST /api/v1/chat/stream and render
  // assistant tokens incrementally. The request is same-origin (proxied to the
  // backend by next.config.ts rewrites) so the httpOnly session cookie is sent
  // automatically — no token plumbing needed. Returns false if the backend is
  // unavailable or the user isn't logged in, so the caller can fall back to a
  // local mock reply instead of showing a broken chat.
  const streamFromBackend = async (question: string): Promise<StreamResult> => {
    try {
      const guestId = getGuestChatId();
      const res = await fetch(`/api/v1/chat/stream`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(guestId ? { 'X-Guest-Chat-Id': guestId } : {}),
        },
        body: JSON.stringify({
          question,
          conversation_id: conversationId,
          ...(location ? { lat: location.lat, lng: location.lng } : {}),
        }),
      });

      // Read rate-limit headers on every response
      const rlRemaining = res.headers.get('X-RateLimit-Remaining');
      const rlLimit = res.headers.get('X-RateLimit-Limit');
      const rlKind = res.headers.get('X-RateLimit-Kind');
      if (rlRemaining !== null && rlLimit !== null) {
        setChatQuota({
          remaining: parseInt(rlRemaining, 10),
          limit: parseInt(rlLimit, 10),
          kind: rlKind || 'guest',
        });
      }

      if (res.status === 429) {
        const data = await res.json().catch(() => ({}));
        const msg = data?.error?.message ||
          (user
            ? 'You\'ve reached your daily chat limit of 100 messages. Your quota resets at midnight UTC.'
            : 'You\'ve reached your daily chat limit of 50 messages. Log in to get 100 messages/day. Quota resets at midnight UTC.');
        setMessages(prev => [...prev, { role: 'assistant', content: msg }]);
        return 'streamed';
      }

      if (res.status === 401) return 'unauthorized';
      if (!res.ok || !res.body) return 'failed';

      // Add an empty assistant message we will progressively fill.
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistant = '';
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = line.slice(6).trim();
          if (payload === '[DONE]') continue;
          try {
            const evt = JSON.parse(payload);
            if (evt.conversation_id) setConversationId(evt.conversation_id);
            if (evt.payment_order) {
              // Append as its own bubble so later text deltas never overwrite it.
              setMessages(prev => [
                ...prev,
                { role: 'assistant', content: '', type: 'payment', paymentOrder: evt.payment_order },
              ]);
            }
            if (evt.delta) {
              assistant = `${assistant}${evt.delta}`;
              setMessages(prev => {
                const next = [...prev];
                // Always stream into the last *text* assistant bubble — never into a
                // payment card. (payment_order is emitted before deltas, so without
                // this guard the Pay button was briefly appended then immediately
                // replaced by the streaming confirmation text.)
                let idx = -1;
                for (let i = next.length - 1; i >= 0; i--) {
                  if (next[i].role === 'assistant' && next[i].type !== 'payment') {
                    idx = i;
                    break;
                  }
                }
                if (idx >= 0) {
                  next[idx] = { role: 'assistant', content: assistant };
                } else {
                  next.push({ role: 'assistant', content: assistant });
                }
                return next;
              });
            }
          } catch {
            // ignore malformed keep-alive lines
          }
        }
      }
      return 'streamed';
    } catch {
      return 'failed';
    }
  };

  const handleSend = async (text: string = input, file: File | null = selectedFile) => {
    if (!text.trim() && !file) return;

    const userMessage = file ? `Uploaded: ${file.name}\n${text}` : text;
    setMessages(prev => [...prev, { role: 'user', content: userMessage, type: file ? 'file' : 'text' }]);
    setInput('');
    setSelectedFile(null);
    setIsLoading(true);

    if (authLoading) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I am still checking your sign-in status. Please try again in a moment." }]);
      setIsLoading(false);
      return;
    }

    // A prescription file: upload it for real AI analysis, then ask the
    // assistant (which can read it back via get_my_prescriptions) to explain
    // it / suggest a booking — instead of just acknowledging receipt.
    if (file) {
      try {
        await api.prescriptions.upload(file);
        const followUp =
          text.trim() ||
          "I just uploaded a prescription. Please read it and tell me what tests it recommends, and help me book them.";
        const streamed = await streamFromBackend(followUp);
        if (streamed === 'streamed') {
          setIsLoading(false);
          return;
        }
      } catch (err) {
        const refreshedUser = err instanceof ApiError && err.status === 401 ? await refresh() : user;
        const message =
          err instanceof ApiError && err.status === 401 && !refreshedUser
            ? "Please log in first so I can securely analyze your prescription — you can sign in from the top of the site, then re-upload it here."
            : err instanceof ApiError && err.status === 401
            ? "Your sign-in is visible on the site, but the prescription service could not verify the session. Please refresh once and try the upload again."
            : "I couldn't process that file right now. Please try again, or use the Upload Prescription page.";
        setMessages(prev => [...prev, { role: 'assistant', content: message }]);
        setIsLoading(false);
        return;
      }
    }

    // Backend is now open to all users (guests get 50/day, logged-in 100/day).
    // Only fall back to mock if the backend is completely unreachable.
    const streamed = !file ? await streamFromBackend(text) : 'failed';
    if (streamed === 'streamed') {
      setIsLoading(false);
      return;
    }
    if (streamed === 'unauthorized') {
      const refreshedUser = await refresh();
      const message = refreshedUser
        ? "I can see you're signed in, but the assistant service could not verify the session. Please refresh once and try again."
        : "Please log in to your QXL account so I can access your bookings and prescriptions.";
      setMessages(prev => [...prev, { role: 'assistant', content: message }]);
      setIsLoading(false);
      return;
    }
    if (user) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I can see you're signed in, but I couldn't reach the assistant service right now. Please try again in a moment." }]);
      setIsLoading(false);
      return;
    }
    sendMockReply(text, file);
  };

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('qxl_cart') || '[]');
        setCartCount(cart.length);
      } catch {
        setCartCount(0);
      }
    };
    updateCartCount();
    window.addEventListener('cartChange', updateCartCount);
    return () => window.removeEventListener('cartChange', updateCartCount);
  }, []);

  const aiBottom = FAB.whatsappBottom + FAB.size + FAB.gap;
  const callBottom = aiBottom + FAB.size + FAB.gap;
  const hideBottom = callBottom + FAB.size + FAB.gap;
  const scrollTopBottom = hideBottom + FAB.size + FAB.gap;



  return (
    <>
      {/* Floating Horizontal Book Now Button (Desktop only / Hidden on mobile) */}
      <a
        href="/book"
        className="hidden"
        style={{
          position: 'fixed',
          bottom: '76px',
          left: '16px',
          right: '16px',
          background: 'linear-gradient(135deg, rgba(56,189,248,1) 0%, rgba(14,165,233,1) 100%)',
          color: 'white',
          padding: '13px 20px',
          borderRadius: '100px',
          fontWeight: 'bold',
          fontSize: '15px',
          boxShadow: '0 8px 24px rgba(14, 165, 233, 0.4)',
          border: '1px solid rgba(255,255,255,0.4)',
          zIndex: 999,
          textDecoration: 'none',
          gap: '8px',
          letterSpacing: '0.5px'
        }}
        aria-label="Book Now"
        title="Book Now"
      >
        <CalendarCheck className="w-5 h-5" />
        <span>Book Now</span>
      </a>


      {/* Floating Call Now Button (Hidden on mobile) */}
      <a
        href={`tel:${getPhoneE164()}`}
        style={{
          position: 'fixed',
          bottom: callBottom,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(56,189,248,0.92) 0%, rgba(14,165,233,0.95) 100%)',
          boxShadow: '0 4px 18px rgba(14,165,233,0.45)',
          border: '1px solid rgba(255,255,255,0.35)',
          color: 'white',
          zIndex: 1000,
          textDecoration: 'none'
        }}
        aria-label="Call Now"
        title="Call Now"
        className="fab-call-btn hidden"
      >
        <Phone className="w-5 h-5 flex-shrink-0" />
      </a>

      {/* Scroll to top — Desktop only */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Back to top"
          className="fab-scroll-top-btn hidden lg:flex"
          style={{ bottom: scrollTopBottom }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}


      {/* QXL AI assis      {/* QXL AI assistant FAB & Ask Me Bubble Container (Desktop Only — Hidden on mobile per user request) */}
      {siteSettings.ai_chat_enabled && !isFABsHidden && !isOpen && (
        <div 
          className="hidden sm:flex fixed sm:bottom-[164px] sm:right-4 lg:bottom-[100px] lg:right-6 z-[10000] items-center transition-all duration-300 pointer-events-auto"
        >
          {/* Floating Ask me bubble */}
          {!isOpen && (
            <div className="hidden sm:flex relative items-center mr-2.5 bg-gradient-to-r from-[#0b1b36] to-[#0f2d5e] text-white text-[11px] font-black px-3 py-1.5 rounded-xl shadow-xl border border-blue-400/40 whitespace-nowrap">
              Ask me
              <div 
                className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-0 h-0"
                style={{
                  borderTop: '5px solid transparent',
                  borderBottom: '5px solid transparent',
                  borderLeft: '7px solid #0f2d5e'
                }}
              />
            </div>
          )}

          {/* QXL AI assistant FAB button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex items-center justify-center w-14 h-14 rounded-full text-white shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0 border-2 border-blue-400/40 group"
            style={{ 
              background: 'linear-gradient(135deg, #0b1b36 0%, #0f2d5e 50%, #1e3a8a 100%)',
              boxShadow: '0 4px 25px rgba(15, 45, 94, 0.7)',
            }}
            aria-label={isOpen ? "Close QXL AI chat" : "Open QXL AI assistant"}
            title="QXL AI Assistant"
          >
            {isOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true" className="relative z-10">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <div className="relative z-10 flex items-center justify-center">
                <QxlAiIcon size={30} />
              </div>
            )}
          </button>
        </div>
      )}

      {/* Arrow Down Hide Button (Hidden) */}
      {!isFABsHidden && !isOpen && (
        <button
          type="button"
          onClick={() => setIsFABsHidden(true)}
          aria-label="Hide floating actions"
          title="Hide actions"
          className="fab-toggle-hide-btn hidden"
          style={{ bottom: hideBottom }}
        >
          <ChevronDown className="w-5 h-5 text-slate-600" />
        </button>
      )}

      {/* Restore Button when hidden */}
      {isFABsHidden && (
        <button
          type="button"
          onClick={() => setIsFABsHidden(false)}
          aria-label="Show floating actions"
          title="Show actions"
          className="hidden flex items-center justify-center rounded-full text-white shadow-lg active:scale-95 transition-transform"
          style={{
            position: 'fixed',
            right: '14px',
            bottom: '136px',
            width: '42px',
            height: '42px',
            background: 'linear-gradient(135deg, #0f2d5e 0%, #1e3a8a 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 16px rgba(15, 45, 94, 0.5)',
            zIndex: 1000,
          }}
        >
          <ChevronUp className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Backdrop overlay when chat is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[100001]"
        />
      )}

      {/* Chat Window — Deep Blue Top Header + Clean White Body Canvas */}
      {isOpen && (
        <div className="fixed left-2 right-2 bottom-[68px] top-14 sm:top-auto sm:left-auto sm:right-6 sm:bottom-22 sm:w-[420px] sm:h-[620px] sm:max-h-[85vh] z-[100002] rounded-[28px] bg-white border border-slate-200 shadow-[0_25px_60px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
          {/* Chat Header — Solid Deep Navy/Blue Header */}
          <div className="bg-[#0B2545] border-b border-[#134074] px-4 pt-3 pb-3 flex flex-col shrink-0 rounded-t-[28px]">
            {/* Mobile Drag Pill Handle */}
            <div className="w-10 h-1 bg-white/30 rounded-full mx-auto mb-2 sm:hidden shrink-0 cursor-pointer hover:bg-white/50" onClick={() => setIsOpen(false)} />

            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-900/60 border-2 border-blue-400/50 flex items-center justify-center text-white shadow-inner shrink-0">
                  <MessageSquareText className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <h3 className="m-0 text-base font-black !text-white tracking-tight whitespace-nowrap" style={{ color: '#ffffff' }}>
                      QXL AI
                    </h3>
                    <span className="text-[9.5px] font-black !text-white bg-[#1d4ed8] border border-blue-300/40 px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap" style={{ color: '#ffffff' }}>
                      ASSISTANT
                    </span>
                  </div>
                  <p className="m-0 text-[11px] !text-blue-100 font-semibold mt-0.5 whitespace-nowrap" style={{ color: '#dbeafe' }}>
                    Online · Healthcare Agent
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Language Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                    className="bg-white/15 border border-white/30 text-white cursor-pointer px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 hover:bg-white/25 transition-colors"
                    aria-label="Change Language"
                  >
                    <Globe className="w-3.5 h-3.5 text-blue-200" />
                    {selectedLanguage.split(' ')[0]}
                    <ChevronDown className="w-3 h-3 text-blue-100" />
                  </button>
                  
                  {showLanguageDropdown && (
                    <div className="absolute top-full right-0 mt-2 bg-[#0B2545] border border-blue-400/30 rounded-xl shadow-2xl w-40 z-[1003] overflow-hidden py-1">
                      {languages.map(lang => (
                        <div 
                          key={lang}
                          onClick={() => { setSelectedLanguage(lang); setShowLanguageDropdown(false); }}
                          className={`px-3.5 py-2 text-xs cursor-pointer border-b border-blue-900/50 last:border-b-0 ${selectedLanguage === lang ? 'bg-blue-600 text-white font-bold' : 'text-slate-100 hover:bg-blue-800'}`}
                        >
                          {lang}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/15 border border-white/30 text-white hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area — Clean White Canvas */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-white">
            {messages.map((msg, idx) => (
              <div key={msg.type === 'payment' && msg.paymentOrder ? `pay-${msg.paymentOrder.order_id}` : `msg-${idx}`} className={`
                ${msg.role === 'user' ? 'self-end bg-[#0B2545] text-white font-medium rounded-2xl rounded-tr-xs' : msg.type === 'payment' ? 'self-start bg-transparent' : 'self-start bg-[#f8fafc] text-[#0B2545] border border-slate-200 rounded-2xl rounded-tl-xs'}
                ${msg.type === 'payment' ? 'p-0 max-w-full' : 'px-4 py-3 max-w-[88%]'}
                text-[13.5px] leading-relaxed shadow-2xs
              `}>
                {msg.type === 'payment' && msg.paymentOrder ? (
                  <ChatPaymentCard
                    order={msg.paymentOrder}
                    patientName={user?.name || undefined}
                    patientPhone={user?.phone || undefined}
                  />
                ) : msg.role === 'assistant' ? (
                  <div className="chat-markdown text-slate-800">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="m-0 mb-2 last:mb-0 text-slate-800 leading-normal">{children}</p>,
                        strong: ({ children }) => <strong className="font-extrabold text-[#0B2545]">{children}</strong>,
                        em: ({ children }) => <em className="text-slate-600">{children}</em>,
                        ul: ({ children }) => <ul className="my-1 pl-4 list-disc text-slate-800 space-y-1">{children}</ul>,
                        ol: ({ children }) => <ol className="my-1 pl-4 list-decimal text-slate-800 space-y-1">{children}</ol>,
                        li: ({ children }) => <li className="text-slate-800">{children}</li>,
                        a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer" className="text-blue-600 underline font-bold hover:text-blue-800">{children}</a>,
                        code: ({ children }) => <code className="bg-slate-100 text-blue-800 px-1.5 py-0.5 rounded text-xs border border-slate-200 font-mono">{children}</code>,
                      }}
                    >
                      {msg.content
                        // Strip any stray markdown pay links the model may generate.
                        .replace(/\[Pay[^\]]*\]\([^)]*\)/gi, '')
                        .replace(/\bPay Now\b/gi, '')
                        .trim() || ' '}
                    </ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            ))}
            {isLoading && (
              <div className="self-start bg-[#f8fafc] border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-xs flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce delay-200"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Location permission hint */}
          {locationStatus !== 'granted' && (
            <div className="px-4 py-2.5 bg-[#f0f7ff] border-y border-[#dbeafe] flex items-center justify-between gap-2 text-[11.5px]">
              <span className="text-[#0B2545] font-bold flex items-center gap-1.5">
                📍 <span className="text-slate-700 font-semibold">Share location for accurate nearest-center results.</span>
              </span>
              <button
                type="button"
                onClick={requestLocation}
                disabled={locationStatus === 'locating'}
                className="bg-[#2563eb] text-white font-black px-3.5 py-1.5 rounded-full text-[11px] whitespace-nowrap hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
              >
                {locationStatus === 'locating' ? 'Locating…' : 'Enable location'}
              </button>
            </div>
          )}

          {/* Prebuilt Questions — High-Contrast Clean White Chips */}
          {messages.length === 1 && (
            <div className="p-3.5 flex flex-wrap gap-2 bg-white border-t border-slate-100">
              {prebuiltQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q, null)}
                  className="bg-[#f8fafc] border border-slate-200 hover:border-[#2563eb] hover:bg-[#eff6ff] text-[#0B2545] font-bold text-[11.5px] px-3.5 py-2 rounded-full transition-all cursor-pointer text-left shadow-2xs"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Area — Clean White Base */}
          <div className="p-3 border-t border-slate-200 bg-white rounded-b-[28px]">
            {selectedFile && (
              <div className="flex items-center justify-between p-2 mb-2 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 font-semibold">
                <span className="truncate max-w-[240px]">
                  📄 {selectedFile.name}
                </span>
                <button onClick={() => setSelectedFile(null)} className="text-red-500 font-bold px-1 hover:text-red-700">✕</button>
              </div>
            )}

            <div className="flex gap-2.5 items-center">
              <label className="p-2 text-slate-500 hover:text-[#0B2545] transition-colors cursor-pointer flex items-center justify-center shrink-0">
                <input type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/png,image/jpeg,image/webp" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="hidden" />
                <Paperclip className="w-5 h-5 text-slate-500 hover:text-[#0B2545]" />
              </label>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={selectedFile ? "Add a message..." : "Ask a health question..."}
                className="flex-1 bg-[#f8fafc] border border-slate-300 focus:border-[#0B2545] focus:bg-white text-[#0B2545] placeholder:text-slate-400 rounded-full px-4 py-2.5 text-xs outline-none font-medium transition-colors"
              />

              <button
                onClick={() => handleSend()}
                disabled={isLoading || (!input.trim() && !selectedFile)}
                className="w-9 h-9 rounded-full bg-[#0B2545] disabled:opacity-40 text-white flex items-center justify-center hover:bg-[#1e3a8a] transition-colors cursor-pointer shrink-0 shadow-xs"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Daily quota indicator */}
            {chatQuota !== null && (
              <div className="mt-2 text-[10.5px] text-slate-500 flex items-center justify-between gap-1.5 px-1 font-semibold">
                <span>
                  {chatQuota.remaining <= 0
                    ? '⛔ Daily limit reached. Resets at midnight UTC.'
                    : `💬 ${chatQuota.remaining}/${chatQuota.limit} messages remaining today`
                  }
                </span>
                {chatQuota.kind === 'guest' && !user && (
                  <a href="/login" className="text-blue-600 font-bold hover:underline whitespace-nowrap">
                    Log in for 2× limit →
                  </a>
                )}
              </div>
            )}
          </div>

        </div>
      )}

    </>
  );
}
