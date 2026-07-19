"use client";

import React, { useState, useRef, useEffect } from 'react';
import { api, ApiError } from '@/lib/api';
import { useAuth } from '@/lib/useAuth';
import ChatPaymentCard, { type ChatPaymentOrder } from '@/components/ChatPaymentCard';
import { useSiteSettings } from '@/lib/useSiteSettings';
import ReactMarkdown from 'react-markdown';

type StreamResult = 'streamed' | 'unauthorized' | 'failed';

/** Clean AI-agent mark: chat bubble + spark — matches WhatsApp FAB scale. */
function QxlAiIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.5 7.5C6.5 5.567 8.067 4 10 4h12c1.933 0 3.5 1.567 3.5 3.5v9c0 1.933-1.567 3.5-3.5 3.5h-5.2L12 24.2V20H10c-1.933 0-3.5-1.567-3.5-3.5v-9Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M23.2 3.2 24.35 6.1l2.9 1.15-2.9 1.15L23.2 11.3l-1.15-2.9-2.9-1.15 2.9-1.15 1.15-2.9Z"
        fill="currentColor"
      />
      <circle cx="12.2" cy="12.2" r="1.35" fill="#2563eb" />
      <circle cx="16" cy="12.2" r="1.35" fill="#2563eb" />
      <circle cx="19.8" cy="12.2" r="1.35" fill="#2563eb" />
    </svg>
  );
}

const FAB = {
  size: 56,
  right: 24,
  whatsappBottom: 24,
  gap: 14,
} as const;

export default function AiChat() {
  const { user, loading: authLoading, refresh } = useAuth();
  const siteSettings = useSiteSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string; type?: 'text' | 'file' | 'payment'; paymentOrder?: ChatPaymentOrder }[]>([]);

  useEffect(() => {
    const hour = new Date().getHours();
    let greeting = "Good evening!";
    if (hour < 12) greeting = "Good morning!";
    else if (hour < 18) greeting = "Good afternoon!";

    const signedInLine = user
      ? `\n\nYou're signed in as ${user.name || user.phone || 'a QXL patient'}, so I can help with your bookings and prescriptions.`
      : "\n\nYou can ask me questions or upload your medical report for a quick summary.";
    const greetingMessage = {
      role: 'assistant' as const,
      content: `${greeting} I am the QXL AI Assistant. How can I help you today?${signedInLine}`,
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

  // Try once on mount, and again every time the chat window is opened — the
  // first attempt can fail (slow GPS fix, prompt dismissed) even though the
  // user would grant it on a second try.
  useEffect(() => {
    requestLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpen && locationStatus !== 'granted' && locationStatus !== 'locating') {
      requestLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    let replyMessage = "Thank you for your query! For accurate information, please call us at +91 99646 39639 or WhatsApp us. Our team will be happy to assist you.";
    if ((text.toLowerCase().includes('booking') || text.toLowerCase().includes('bookings')) && text.toLowerCase().includes('my')) {
      replyMessage = user
        ? "I can see you're signed in, but I couldn't reach your account data right now. Please open Profile > Bookings, or try again in a moment."
        : "Please log in to your QXL account to view your bookings.";
    } else if (text.toLowerCase().includes('package') || text.toLowerCase().includes('checkup')) {
      replyMessage = "We offer a range of health packages starting from ₹1,899. Our popular ones include Full Body Checkup (86+ parameters), Senior Citizen Packages, and Women's Health Packages. Visit our Packages page or call +91 99646 39639 to book!";
    } else if (text.toLowerCase().includes('home') || text.toLowerCase().includes('collection')) {
      replyMessage = "Yes! We provide free home sample collection across Bengaluru. Our certified phlebotomists will visit at your preferred time. Book via WhatsApp or call +91 99646 39639.";
    } else if (text.toLowerCase().includes('location') || text.toLowerCase().includes('lab') || text.toLowerCase().includes('where')) {
      replyMessage = "We have two centers in Bengaluru:\n1. Main Lab: SLN Complex, Mysore Road, Kengeri – 560 060\n2. North Hub: L Square, opposite RMZ Galleria Mall, Yelahanka – 560064\nBoth are Open 24x7.";
    } else if (text.toLowerCase().includes('cbc') || text.toLowerCase().includes('blood')) {
      replyMessage = "CBC (Complete Blood Count) is a test that evaluates 24 parameters of your blood including RBC, WBC, Hemoglobin, Platelets, and more. It helps detect anemia, infections, and blood disorders. Price: ₹395 at QXL.";
    } else if (text.toLowerCase().includes('report') || text.toLowerCase().includes('how long')) {
      replyMessage = "Most routine tests (like CBC, Thyroid, Sugar) have same-day reporting. You will receive a WhatsApp message and email with the secure link to download your digital report once it's ready.";
    } else if (text.toLowerCase().includes('fast') || text.toLowerCase().includes('empty stomach')) {
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
              setMessages(prev => [
                ...prev,
                { role: 'assistant', content: '', type: 'payment', paymentOrder: evt.payment_order },
              ]);
            }
            if (evt.delta) {
              assistant = `${assistant}${evt.delta}`;
              setMessages(prev => {
                const next = [...prev];
                next[next.length - 1] = { role: 'assistant', content: assistant };
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

  // If the admin has disabled the AI chat widget, only render the WhatsApp
  // button (which is independent of the AI toggle).
  if (!siteSettings.ai_chat_enabled) {
    return (
      <a
        href="https://api.whatsapp.com/send?phone=919964639639&text=Hi%20QXL%20Diagnostics%2C%20I%20want%20to%20book%20a%20test"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        className="fab-whatsapp-btn"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    );
  }

  const aiBottom = FAB.whatsappBottom + FAB.size + FAB.gap;
  const scrollTopBottom = aiBottom + FAB.size + FAB.gap;

  return (
    <>
      {/* Floating WhatsApp — base of the FAB stack */}
      <a
        href="https://api.whatsapp.com/send?phone=919964639639&text=Hi%20QXL%20Diagnostics%2C%20I%20want%20to%20book%20a%20test"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        className="fab-whatsapp-btn"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

      {/* Scroll to top — above the AI button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Back to top"
          className="fab-scroll-top-btn"
          style={{ bottom: scrollTopBottom }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}

      {/* QXL AI assistant FAB — same size/right edge as WhatsApp */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fab-ai-chat-btn"
        style={{ bottom: aiBottom }}
        aria-label={isOpen ? "Close QXL AI chat" : "Open QXL AI assistant"}
        title="QXL AI Assistant"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <QxlAiIcon size={28} />
        )}
      </button>

      {/* Chat Window — mobile-safe positioning using dvh so it never clips off-screen */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: 'calc(var(--chat-bottom, 185px))',
          right: '12px',
          width: 'min(380px, calc(100vw - 24px))',
          height: 'min(580px, calc(100dvh - 200px))',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1001,
          overflow: 'hidden',
          border: '1px solid #dbeafe'
        }}>
          {/* Chat Header */}
          <div style={{
            background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 60%, #1d4ed8 100%)',
            color: 'white',
            padding: '14px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ position: 'relative', width: '40px', height: '40px', flexShrink: 0 }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.18)',
                  border: '2px solid rgba(255,255,255,0.45)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white',
                }}>
                  <QxlAiIcon size={22} />
                </div>
                <span style={{
                  position: 'absolute', bottom: '1px', right: '1px',
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: '#22c55e', border: '2px solid #1e40af'
                }} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, letterSpacing: '-0.01em' }}>QXL AI</h3>
                  <span style={{ fontSize: '10px', fontWeight: 700, background: 'rgba(255,255,255,0.2)', padding: '1px 6px', borderRadius: '20px', letterSpacing: '0.05em' }}>ASSISTANT</span>
                </div>
                <p style={{ margin: '1px 0 0 0', fontSize: '10.5px', opacity: 0.85, fontWeight: 500 }}>● Online · Healthcare agent</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Language Dropdown */}
              <div style={{ position: 'relative' }}>
                <button 
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', cursor: 'pointer', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}
                  aria-label="Change Language"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                  {selectedLanguage.split(' ')[0]}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                
                {showLanguageDropdown && (
                  <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', background: 'white', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', width: '150px', zIndex: 1002, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    {languages.map(lang => (
                      <div 
                        key={lang}
                        onClick={() => { setSelectedLanguage(lang); setShowLanguageDropdown(false); }}
                        style={{ padding: '8px 12px', fontSize: '12px', color: '#334155', cursor: 'pointer', borderBottom: '1px solid #f1f5f9', background: selectedLanguage === lang ? '#eff6ff' : 'white', fontWeight: selectedLanguage === lang ? 600 : 400 }}
                        onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'}
                        onMouseOut={(e) => e.currentTarget.style.background = selectedLanguage === lang ? '#eff6ff' : 'white'}
                      >
                        {lang}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', cursor: 'pointer', padding: '6px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Close chat"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#f0f9ff' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.type === 'payment' ? 'transparent' : msg.role === 'user' ? '#2563eb' : 'white',
                color: msg.role === 'user' ? 'white' : '#1e293b',
                padding: msg.type === 'payment' ? '0' : '11px 15px',
                borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                maxWidth: '85%',
                fontSize: '13.5px',
                lineHeight: 1.55,
                whiteSpace: msg.role === 'user' ? 'pre-wrap' : 'normal',
                boxShadow: msg.type === 'payment' ? 'none' : '0 1px 4px rgba(0,0,0,0.07)'
              }}>
                {msg.type === 'payment' && msg.paymentOrder ? (
                  <ChatPaymentCard
                    order={msg.paymentOrder}
                    patientName={user?.name || undefined}
                    patientPhone={user?.phone || undefined}
                  />
                ) : msg.role === 'assistant' ? (
                  <div className="chat-markdown">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p style={{ margin: '0 0 8px 0' }}>{children}</p>,
                        strong: ({ children }) => <strong style={{ fontWeight: 700 }}>{children}</strong>,
                        em: ({ children }) => <em>{children}</em>,
                        ul: ({ children }) => <ul style={{ margin: '4px 0 8px 0', paddingLeft: '18px', listStyleType: 'disc' }}>{children}</ul>,
                        ol: ({ children }) => <ol style={{ margin: '4px 0 8px 0', paddingLeft: '18px', listStyleType: 'decimal' }}>{children}</ol>,
                        li: ({ children }) => <li style={{ marginBottom: '2px' }}>{children}</li>,
                        a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>{children}</a>,
                        code: ({ children }) => <code style={{ background: '#e2e8f0', padding: '1px 4px', borderRadius: '4px', fontSize: '12px' }}>{children}</code>,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            ))}
            {isLoading && (
              <div style={{
                alignSelf: 'flex-start',
                backgroundColor: 'white',
                padding: '11px 16px',
                borderRadius: '16px 16px 16px 4px',
                fontSize: '13px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                display: 'flex',
                gap: '4px',
                alignItems: 'center'
              }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2563eb', animation: 'bounce 1.2s infinite', display: 'inline-block' }}></span>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2563eb', animation: 'bounce 1.2s 0.2s infinite', display: 'inline-block' }}></span>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2563eb', animation: 'bounce 1.2s 0.4s infinite', display: 'inline-block' }}></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Location permission hint — only shown when GPS isn't available yet,
              so the user can grant it with one tap instead of typing an address
              every time they ask for nearby centers. */}
          {locationStatus !== 'granted' && (
            <div style={{
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              backgroundColor: '#fffbeb',
              borderTop: '1px solid #fde68a',
              borderBottom: '1px solid #fde68a',
              fontSize: '11px',
              color: '#92400e',
              fontWeight: 600,
            }}>
              <span>
                {locationStatus === 'locating'
                  ? 'Detecting your location…'
                  : '📍 Share your location for accurate nearest-center results.'}
              </span>
              <button
                type="button"
                onClick={requestLocation}
                disabled={locationStatus === 'locating'}
                style={{
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '100px',
                  padding: '4px 10px',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  cursor: locationStatus === 'locating' ? 'default' : 'pointer',
                  opacity: locationStatus === 'locating' ? 0.6 : 1,
                  whiteSpace: 'nowrap',
                }}
              >
                {locationStatus === 'locating' ? 'Locating…' : 'Enable location'}
              </button>
            </div>
          )}

          {/* Prebuilt Questions */}
          {messages.length === 1 && (
            <div style={{ padding: '10px 16px', display: 'flex', flexWrap: 'wrap', gap: '7px', backgroundColor: '#f0f9ff', borderTop: '1px solid #dbeafe' }}>
              {prebuiltQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q, null)}
                  style={{
                    background: 'white',
                    border: '1px solid #bfdbfe',
                    borderRadius: '100px',
                    padding: '6px 12px',
                    fontSize: '11.5px',
                    color: '#2563eb',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = '#dbeafe'; e.currentTarget.style.borderColor = '#2563eb'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#bfdbfe'; }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid #dbeafe', backgroundColor: 'white' }}>
            {selectedFile && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 12px', backgroundColor: '#dbeafe', borderRadius: '8px', marginBottom: '10px' }}>
                <span style={{ fontSize: '12px', color: '#1d4ed8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '250px', fontWeight: 600 }}>
                  📄 {selectedFile.name}
                </span>
                <button onClick={() => setSelectedFile(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '14px' }}>✕</button>
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <label style={{ cursor: 'pointer', padding: '8px', color: '#94a3b8', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
                onMouseOver={(e) => e.currentTarget.style.color = '#2563eb'}
                onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
              >
                <input type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/png,image/jpeg,image/webp" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} style={{ display: 'none' }} />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
              </label>

              <button
                type="button"
                onClick={() => {
                  setInput("Listening...");
                  setTimeout(() => setInput("I have a fever, what test should I take?"), 1500);
                }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: '#94a3b8', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
                onMouseOver={(e) => e.currentTarget.style.color = '#2563eb'}
                onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                aria-label="Use voice input"
                title="Voice input"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={selectedFile ? "Add a message..." : "Ask a health question..."}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '100px',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  color: '#1e293b'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />

              <button
                onClick={() => handleSend()}
                disabled={isLoading || (!input.trim() && !selectedFile)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: (input.trim() || selectedFile) ? '#2563eb' : '#e2e8f0',
                  color: 'white',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: (input.trim() || selectedFile) ? 'pointer' : 'not-allowed',
                  transition: 'background-color 0.2s',
                  flexShrink: 0
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>

            {/* Daily quota indicator */}
            {chatQuota !== null && (
              <div style={{
                marginTop: '7px',
                fontSize: '10.5px',
                color: chatQuota.remaining <= 5 ? '#ef4444' : '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '6px',
              }}>
                <span>
                  {chatQuota.remaining <= 0
                    ? '⛔ Daily limit reached. Resets at midnight UTC.'
                    : `💬 ${chatQuota.remaining}/${chatQuota.limit} messages remaining today`
                  }
                </span>
                {chatQuota.kind === 'guest' && !user && (
                  <a href="/login" style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                    Log in for 2× limit →
                  </a>
                )}
              </div>
            )}
          </div>

        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}
