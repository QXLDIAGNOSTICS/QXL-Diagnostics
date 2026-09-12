"use client";

import React, { useState, useRef, useEffect } from 'react';
import { api, ApiError } from '@/lib/api';
import { useAuth } from '@/lib/useAuth';
import ChatPaymentCard, { type ChatPaymentOrder } from '@/components/ChatPaymentCard';
import { useSiteSettings } from '@/lib/useSiteSettings';
import ReactMarkdown from 'react-markdown';
import { ShoppingCart, Phone, CalendarCheck, X, ChevronLeft, ChevronDown, ChevronUp, Paperclip, Send, Globe, MessageSquareText, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getPhoneE164 } from '@/lib/businessInfo';
import { QXL_AI_KEY, OPENAI_API_KEY, getQxlSystemPrompt, getGroundedClinicalAiResponse, fetchOpenAiSpeech } from '@/lib/qxlAiSystemPrompt';

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

/** Rainbow Circular Dot Wheel Loading Spinner matching the user's reference image */
function RainbowSpinner({ className = "w-7 h-7" }: { className?: string }) {
  const dots = [
    { color: '#FFCC80', r: 4.2 }, // Top-center (soft gold/peach)
    { color: '#FFE082', r: 5.0 }, // Yellow
    { color: '#FFF59D', r: 5.8 }, // Light Yellow
    { color: '#E0F7FA', r: 6.5 }, // Lightest Blue
    { color: '#B3E5FC', r: 7.2 }, // Very Light Sky Blue
    { color: '#81D4FA', r: 8.0 }, // Soft Sky Blue
    { color: '#4FC3F7', r: 8.8 }, // Sky Blue
    { color: '#42A5F5', r: 9.5 }, // Deep Soft Blue (Bottom)
    { color: '#5C6BC0', r: 9.2 }, // Soft Indigo
    { color: '#7E57C2', r: 8.5 }, // Soft Purple
    { color: '#AB47BC', r: 7.8 }, // Soft Magenta
    { color: '#EC407A', r: 7.2 }, // Rose Pink
    { color: '#EF5350', r: 6.5 }, // Coral Pink
    { color: '#FF7043', r: 5.8 }, // Warm Coral
    { color: '#FF8A65', r: 5.0 }, // Soft Coral
    { color: '#FFB74D', r: 4.2 }, // Soft Gold
  ];

  return (
    <svg viewBox="0 0 100 100" className={`${className} animate-spin`} style={{ animationDuration: '3.5s' }}>
      {dots.map((dot, i) => {
        const angle = (i * 22.5 - 90) * (Math.PI / 180);
        const cx = 50 + 38 * Math.cos(angle);
        const cy = 50 + 38 * Math.sin(angle);
        return <circle key={i} cx={cx} cy={cy} r={dot.r} fill={dot.color} />;
      })}
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
  const messagesRef = useRef<typeof messages>([]);

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

  // Keep messagesRef in sync so voice handler can read latest messages
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);
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

  // Speech-to-Text & Text-to-Speech voice states
  const [isListening, setIsListening] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const [isAutoSpeakEnabled, setIsAutoSpeakEnabled] = useState(false);
  const recognitionRef = useRef<any>(null);
  // Inline voice panel
  const [voiceMode, setVoiceMode] = useState(false);
  const voiceModeRef = useRef(false); // tracks voiceMode without stale closure
  const [voiceStatus, setVoiceStatus] = useState<'idle'|'recording'|'thinking'|'speaking'|'error'>('idle');
  const [voiceError, setVoiceError] = useState('');
  const [voiceMuted, setVoiceMuted] = useState(false);
  const voiceMutedRef = useRef(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);

  const getIndianFemaleVoice = (): SpeechSynthesisVoice | null => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    const indianFemale = voices.find(v => {
      const name = v.name.toLowerCase();
      const lang = v.lang.toLowerCase();
      const isIndian = lang.includes('in') || name.includes('india');
      const isFemale = name.includes('female') || name.includes('heera') || name.includes('neerja') || name.includes('veena') || name.includes('sangeeta') || name.includes('google');
      return isIndian && isFemale;
    });
    if (indianFemale) return indianFemale;

    const anyIndian = voices.find(v => v.lang.toLowerCase().includes('en-in') || v.lang.toLowerCase().includes('hi-in'));
    if (anyIndian) return anyIndian;

    const femaleVoice = voices.find(v => {
      const name = v.name.toLowerCase();
      return name.includes('female') || name.includes('zira') || name.includes('samantha') || name.includes('victoria');
    });
    return femaleVoice || voices[0] || null;
  };

  const toggleListening = (onTranscript: (text: string) => void) => {
    if (isListening) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch {}
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      const langCode = selectedLanguage?.includes('Hindi') ? 'hi-IN'
        : selectedLanguage?.includes('Kannada') ? 'kn-IN'
        : selectedLanguage?.includes('Tamil') ? 'ta-IN'
        : selectedLanguage?.includes('Telugu') ? 'te-IN'
        : 'en-IN';
      recognition.lang = langCode;

      let capturedText = '';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        let transcriptStr = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcriptStr += event.results[i][0].transcript;
        }
        if (transcriptStr.trim()) {
          capturedText = transcriptStr.trim();
          setInput(capturedText);
        }
      };
      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };
      recognition.onend = () => {
        setIsListening(false);
        if (capturedText.trim()) {
          onTranscript(capturedText.trim());
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Speech recognition error:', err);
      setIsListening(false);
    }
  };

  const activeAudioRef = useRef<HTMLAudioElement | null>(null);

  const fallbackBrowserSpeech = (text: string, msgIdx?: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const cleanText = text
      .replace(/[*#_~🚨🩸🦋💇⚡🦴🩺]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/₹/g, 'Rupees ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voice = getIndianFemaleVoice();
    if (voice) utterance.voice = voice;
    utterance.lang = 'en-IN';
    utterance.pitch = 1.1;
    utterance.rate = 0.95;
    if (typeof msgIdx === 'number') {
      utterance.onend = () => setSpeakingIdx(null);
      utterance.onerror = () => setSpeakingIdx(null);
    }
    window.speechSynthesis.speak(utterance);
  };

  const speakMessage = async (text: string, msgIdx?: number) => {
    if (typeof window === 'undefined') return;

    if (speakingIdx === msgIdx) {
      if (activeAudioRef.current) {
        activeAudioRef.current.pause();
        activeAudioRef.current = null;
      }
      if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      setSpeakingIdx(null);
      return;
    }

    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    if (typeof msgIdx === 'number') {
      setSpeakingIdx(msgIdx);
    }

    const openAiAudioUrl = await fetchOpenAiSpeech(text);
    if (openAiAudioUrl) {
      const audio = new Audio(openAiAudioUrl);
      activeAudioRef.current = audio;
      audio.onended = () => setSpeakingIdx(null);
      audio.onerror = () => {
        setSpeakingIdx(null);
        fallbackBrowserSpeech(text, msgIdx);
      };
      audio.play().catch(() => {
        fallbackBrowserSpeech(text, msgIdx);
      });
      return;
    }

    fallbackBrowserSpeech(text, msgIdx);
  };

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
    if (file) {
      return `I've received your file: **${file.name}**. To get an instant AI breakdown of your prescription, you can also use our **Upload Prescription** page or send it to us on **WhatsApp at +91 9964 639 639**.`;
    }
    return getGroundedClinicalAiResponse(text);
  };

  const sendMockReply = (text: string, file: File | null) => {
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: getMockReply(text, file) }]);
      setIsLoading(false);
    }, 50);
  };

  const streamDirectGemini = async (question: string): Promise<boolean> => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || QXL_AI_KEY;
      if (!apiKey) return false;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const promptText = getQxlSystemPrompt(question, selectedLanguage);

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: promptText }]
            }
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 800,
          }
        })
      });

      clearTimeout(timeoutId);
      if (!res.ok || !res.body) return false;

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (!jsonStr) continue;
          try {
            const data = JSON.parse(jsonStr);
            const delta = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (delta) {
              assistantText += delta;
              setMessages(prev => {
                const next = [...prev];
                let idx = -1;
                for (let i = next.length - 1; i >= 0; i--) {
                  if (next[i].role === 'assistant' && next[i].type !== 'payment') {
                    idx = i;
                    break;
                  }
                }
                if (idx >= 0) {
                  next[idx] = { role: 'assistant', content: assistantText };
                } else {
                  next.push({ role: 'assistant', content: assistantText });
                }
                return next;
              });
            }
          } catch {
            // ignore JSON parse error
          }
        }
      }
      return assistantText.length > 0;
    } catch {
      return false;
    }
  };

  const fetchGeminiReply = async (question: string): Promise<string | null> => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || QXL_AI_KEY;
      if (!apiKey) return null;
      const promptText = getQxlSystemPrompt(question, selectedLanguage);
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: promptText }]
            }
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 800,
          }
        })
      });
      if (!res.ok) return null;
      const data = await res.json();
      const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (replyText) {
        setMessages(prev => [...prev, { role: 'assistant', content: replyText }]);
        return replyText;
      }
      return null;
    } catch {
      return null;
    }
  };

  const fetchOpenAiReply = async (question: string): Promise<string | null> => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || OPENAI_API_KEY;
      if (!apiKey) return null;
      const promptText = getQxlSystemPrompt(question, selectedLanguage);
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: promptText },
            { role: 'user', content: question }
          ],
          temperature: 0.3,
          max_tokens: 800
        })
      });
      if (!res.ok) return null;
      const data = await res.json();
      const replyText = data.choices?.[0]?.message?.content;
      if (replyText && replyText.trim()) {
        setMessages(prev => [...prev, { role: 'assistant', content: replyText }]);
        return replyText;
      }
      return null;
    } catch {
      return null;
    }
  };

  // Consume the FastAPI SSE stream from POST /api/v1/chat/stream and render
  // assistant tokens incrementally.
  const streamFromBackend = async (question: string): Promise<StreamResult> => {
    try {
      const guestId = getGuestChatId();
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);

      const res = await fetch(`/api/v1/chat/stream`, {
        method: 'POST',
        credentials: 'include',
        signal: controller.signal,
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

      clearTimeout(timeoutId);

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

    let spokenResponse = '';

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

    // Attempt streaming from backend (1.2s timeout for fast fallback)
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
    
    // Fast OpenAI API Fallback
    const openAiText = await fetchOpenAiReply(text);
    if (openAiText) {
      spokenResponse = openAiText;
    } else {
      // Direct Gemini SSE Streaming for ultra-fast instant responses
      const directGeminiSuccess = await streamDirectGemini(text);
      if (!directGeminiSuccess) {
        const geminiText = await fetchGeminiReply(text);
        if (geminiText) {
          spokenResponse = geminiText;
        } else {
          spokenResponse = getMockReply(text, file);
          setMessages(prev => [...prev, { role: 'assistant', content: spokenResponse }]);
        }
      }
    }

    setIsLoading(false);
    // Only auto-speak if NOT in voice mode (voice mode handles its own TTS)
    if (isAutoSpeakEnabled && spokenResponse && !voiceModeRef.current) {
      speakMessage(spokenResponse);
    }
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
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200/90 flex items-center justify-center shadow-md shrink-0 p-1">
                  <RainbowSpinner className="w-8 h-8" />
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
                    className="bg-white/15 border border-white/30 text-white cursor-pointer px-2.5 py-1 rounded-full text-[10.5px] font-bold flex items-center gap-1 hover:bg-white/25 transition-colors"
                    aria-label="Change Language"
                  >
                    <Globe className="w-3 h-3 text-blue-200" />
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
                  className="w-7 h-7 rounded-full bg-white/15 border border-white/30 text-white hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close chat"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Compact Location permission hint at TOP above greeting */}
          {locationStatus !== 'granted' && (
            <div className="px-3 py-1.5 bg-[#f0f7ff] border-b border-[#dbeafe] flex items-center justify-between gap-1 text-[10px] shrink-0 z-10">
              <span className="text-[#0B2545] font-bold flex items-center gap-1 truncate">
                📍 <span className="text-slate-600 font-semibold truncate">Enable GPS for nearest lab center</span>
              </span>
              <button
                type="button"
                onClick={requestLocation}
                disabled={locationStatus === 'locating'}
                className="bg-[#2563eb] text-white font-extrabold px-2.5 py-0.5 rounded-full text-[9.5px] whitespace-nowrap hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer shadow-2xs shrink-0"
              >
                {locationStatus === 'locating' ? 'Locating…' : 'Enable GPS'}
              </button>
            </div>
          )}

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
                        li: ({ children }) => <li className="text-[#0B2545] font-semibold">{children}</li>,
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
                    {msg.role === 'assistant' && msg.type !== 'payment' && (
                      <button
                        type="button"
                        onClick={() => speakMessage(msg.content, idx)}
                        className="mt-2 text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-full cursor-pointer transition-all"
                      >
                        {speakingIdx === idx ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                            <span className="text-red-600 font-extrabold">Stop Voice</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                            <span>Listen AI Voice</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            ))}
            {isLoading && (
              <div className="self-start bg-[#f8fafc] border border-slate-200 px-4 py-2.5 rounded-2xl rounded-tl-xs flex gap-3 items-center shadow-2xs">
                <RainbowSpinner className="w-6 h-6 shrink-0" />
                <span className="text-xs font-bold text-slate-700">QXL AI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prebuilt Questions — High-Contrast Clean White Chips */}
          {messages.length === 1 && (
            <div className="p-2.5 flex flex-wrap gap-1.5 bg-white border-t border-slate-100 max-h-32 overflow-y-auto">
              {prebuiltQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q, null)}
                  className="bg-[#f8fafc] border border-slate-200 hover:border-[#2563eb] hover:bg-[#eff6ff] text-[#0B2545] font-bold text-[11px] px-3 py-1.5 rounded-full transition-all cursor-pointer text-left shadow-2xs"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* ── INLINE VOICE PANEL ── */}
          {voiceMode && (
            <div className="bg-[#050e24] border-t border-blue-900/60 shrink-0 px-4 pt-3 pb-3">
              {/* Status row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    voiceStatus === 'recording' ? 'bg-red-400 animate-ping' :
                    voiceStatus === 'thinking'  ? 'bg-yellow-400 animate-pulse' :
                    voiceStatus === 'speaking'  ? 'bg-emerald-400 animate-pulse' :
                    voiceStatus === 'error'     ? 'bg-red-500' : 'bg-blue-500'
                  }`} />
                  <span className="text-[11px] font-bold text-blue-200 truncate">
                    {voiceStatus === 'recording' ? '🎙️ Listening… tap mic to stop' :
                     voiceStatus === 'thinking'  ? '🧠 AI thinking…' :
                     voiceStatus === 'speaking'  ? '🔊 AI speaking…' :
                     voiceStatus === 'error'     ? `❌ ${voiceError}` :
                     '🎙️ Tap mic — speak — tap again to stop'}
                  </span>
                </div>
                {/* Mute + Close row */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      const next = !voiceMuted;
                      setVoiceMuted(next);
                      voiceMutedRef.current = next;
                      if (next && voiceAudioRef.current) {
                        voiceAudioRef.current.pause();
                        setVoiceStatus('idle');
                      }
                    }}
                    className={`text-[10px] font-black cursor-pointer border rounded-full px-2 py-0.5 transition-colors ${
                      voiceMuted
                        ? 'bg-red-600/40 border-red-400 text-red-300'
                        : 'border-blue-700 text-blue-400 hover:border-blue-400 hover:text-white'
                    }`}
                    title={voiceMuted ? 'Unmute AI voice' : 'Mute AI voice'}
                  >
                    {voiceMuted ? '🔇 Muted' : '🔊 Mute'}
                  </button>
                  <button
                    onClick={() => {
                      voiceModeRef.current = false;
                      setVoiceMode(false);
                      setVoiceStatus('idle');
                      setVoiceError('');
                      if (mediaRecorderRef.current?.state === 'recording') {
                        try { mediaRecorderRef.current.stop(); } catch {}
                      }
                      if (voiceAudioRef.current) {
                        voiceAudioRef.current.pause();
                        voiceAudioRef.current = null;
                      }
                      if (window.speechSynthesis?.speaking) window.speechSynthesis.cancel();
                    }}
                    className="text-blue-400 hover:text-white text-[10px] font-black cursor-pointer border border-blue-800 rounded-full px-2 py-0.5 hover:border-blue-400 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Waveform + mic button row */}
              <div className="flex items-center justify-between gap-3">
                {/* Left waveform */}
                <div className="flex gap-0.5 items-end h-8 flex-1">
                  {[2,4,6,8,5,7,3,6,4,8,5,3,7,4,6].map((h, i) => (
                    <div key={i}
                      className={`flex-1 rounded-full transition-all ${
                        voiceStatus === 'recording' ? 'bg-red-400 animate-pulse' :
                        voiceStatus === 'speaking'  ? 'bg-emerald-400 animate-pulse' :
                        'bg-blue-900'
                      }`}
                      style={{
                        height: (voiceStatus === 'recording' || voiceStatus === 'speaking')
                          ? `${6 + h * 2}px` : '3px',
                        animationDelay: `${i * 0.04}s`,
                        animationDuration: '0.45s',
                      }}
                    />
                  ))}
                </div>

                {/* Big mic button — click to start/stop recording */}
                <button
                  type="button"
                  onClick={async () => {
                    // Stop AI speech if playing
                    if (voiceStatus === 'speaking') {
                      if (voiceAudioRef.current) {
                        voiceAudioRef.current.pause();
                        voiceAudioRef.current = null;
                      }
                      if (window.speechSynthesis?.speaking) window.speechSynthesis.cancel();
                      setVoiceStatus('idle');
                      return;
                    }
                    // Stop recording if already recording
                    if (voiceStatus === 'recording') {
                      if (mediaRecorderRef.current?.state === 'recording') {
                        mediaRecorderRef.current.stop();
                      }
                      return;
                    }
                    // Start recording
                    if (voiceStatus !== 'idle' && voiceStatus !== 'error') return;
                    setVoiceError('');
                    try {
                      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                      const mr = new MediaRecorder(stream, { mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : 'audio/webm' });
                      audioChunksRef.current = [];
                      mr.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
                      mr.onstop = async () => {
                        stream.getTracks().forEach(t => t.stop());
                        setVoiceStatus('thinking');
                        const blob = new Blob(audioChunksRef.current, { type: mr.mimeType || 'audio/webm' });
                        audioChunksRef.current = [];
                        try {
                          // Step 1: Whisper STT
                          const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || OPENAI_API_KEY;
                          const fd = new FormData();
                          fd.append('file', new File([blob], 'voice.webm', { type: blob.type }));
                          fd.append('model', 'whisper-1');
                          fd.append('language', 'en');
                          const sttRes = await fetch('https://api.openai.com/v1/audio/transcriptions', {
                            method: 'POST',
                            headers: { 'Authorization': `Bearer ${apiKey}` },
                            body: fd,
                          });
                          if (!sttRes.ok) throw new Error(`Whisper error ${sttRes.status}: ${await sttRes.text()}`);
                          const sttData = await sttRes.json();
                          const transcript = (sttData.text || '').trim();
                          if (!transcript) { setVoiceStatus('idle'); return; }
                          setInput(transcript);
                          // Step 2: AI reply
                          const countBefore = messagesRef.current.length;
                          await handleSend(transcript, null);
                          await new Promise(r => setTimeout(r, 400));
                          // Step 3: Find AI response
                          const newMsgs = messagesRef.current.slice(countBefore);
                          const aiMsg = [...newMsgs].reverse().find(m => m.role === 'assistant');
                          const replyText = (aiMsg?.content || '')
                            .replace(/\[Pay[^\]]*\]\([^)]*\)/gi, '')
                            .replace(/\bPay Now\b/gi, '')
                            .replace(/[*#_~]/g, '')
                            .trim();
                          // Step 4: TTS — only if not muted
                          if (!voiceMutedRef.current && replyText) {
                            setVoiceStatus('speaking');
                            // Cancel any existing speech
                            if (voiceAudioRef.current) { voiceAudioRef.current.pause(); voiceAudioRef.current = null; }
                            if (window.speechSynthesis?.speaking) window.speechSynthesis.cancel();
                            const ttsUrl = await fetchOpenAiSpeech(replyText);
                            if (ttsUrl && !voiceMutedRef.current) {
                              const audio = new Audio(ttsUrl);
                              voiceAudioRef.current = audio;
                              audio.onended = () => setVoiceStatus('idle');
                              audio.onerror = () => setVoiceStatus('idle');
                              audio.play().catch(() => setVoiceStatus('idle'));
                            } else {
                              setVoiceStatus('idle');
                            }
                          } else {
                            setVoiceStatus('idle');
                          }
                        } catch (e: any) {
                          setVoiceError(e?.message?.slice(0, 60) || 'Voice error');
                          setVoiceStatus('error');
                          setTimeout(() => setVoiceStatus('idle'), 4000);
                        }
                      };
                      mr.start();
                      mediaRecorderRef.current = mr;
                      setVoiceStatus('recording');
                    } catch (micErr: any) {
                      const msg = micErr?.name === 'NotAllowedError'
                        ? 'Mic blocked — go to browser settings → allow mic'
                        : micErr?.message || 'Mic error';
                      setVoiceError(msg);
                      setVoiceStatus('error');
                      setTimeout(() => setVoiceStatus('idle'), 5000);
                    }
                  }}
                  disabled={voiceStatus === 'thinking'}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 select-none shadow-xl ${
                    voiceStatus === 'recording'
                      ? 'bg-red-500 shadow-red-900/60 scale-110 ring-4 ring-red-400/40'
                      : voiceStatus === 'speaking'
                      ? 'bg-emerald-600 shadow-emerald-900/60 ring-4 ring-emerald-400/40'
                      : voiceStatus === 'thinking'
                      ? 'bg-yellow-600/70 cursor-not-allowed opacity-60'
                      : 'bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500'
                  }`}
                  aria-label={voiceStatus === 'recording' ? 'Tap to stop recording' : 'Tap to start speaking'}
                >
                  {voiceStatus === 'thinking' ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : voiceStatus === 'speaking' ? (
                    <VolumeX className="w-7 h-7 text-white" />
                  ) : voiceStatus === 'recording' ? (
                    <div className="w-5 h-5 bg-white rounded-sm" />
                  ) : (
                    <Mic className="w-7 h-7 text-white" />
                  )}
                </button>

                {/* Right waveform */}
                <div className="flex gap-0.5 items-end h-8 flex-1 justify-end">
                  {[6,3,7,4,8,5,3,6,4,7,5,8,3,6,4].map((h, i) => (
                    <div key={i}
                      className={`flex-1 rounded-full ${
                        voiceStatus === 'recording' ? 'bg-red-400 animate-pulse' :
                        voiceStatus === 'speaking'  ? 'bg-emerald-400 animate-pulse' :
                        'bg-blue-900'
                      }`}
                      style={{
                        height: (voiceStatus === 'recording' || voiceStatus === 'speaking')
                          ? `${6 + h * 2}px` : '3px',
                        animationDelay: `${i * 0.04}s`,
                        animationDuration: '0.45s',
                      }}
                    />
                  ))}
                </div>
              </div>

              <p className="text-center text-[10px] text-blue-500/60 mt-2 font-medium">
                {voiceStatus === 'recording' ? '⬛ Tap mic to stop & send' :
                 voiceStatus === 'speaking'  ? '🔇 Tap mic to stop AI' :
                 '🎙️ Tap mic → speak → tap again to send'}
              </p>
            </div>
          )}

          {/* Input Area — Clean White Base */}
          <div className="p-3 border-t border-slate-200 bg-white rounded-b-[28px] shrink-0">
            {/* Speak to AI toggle button */}
            <button
              type="button"
              onClick={() => {
                const next = !voiceMode;
                voiceModeRef.current = next;
                setVoiceMode(next);
                setVoiceStatus('idle');
                setVoiceError('');
                if (!next) {
                  if (mediaRecorderRef.current?.state === 'recording') {
                    try { mediaRecorderRef.current.stop(); } catch {}
                  }
                  if (voiceAudioRef.current) {
                    voiceAudioRef.current.pause();
                    voiceAudioRef.current = null;
                  }
                  if (window.speechSynthesis?.speaking) window.speechSynthesis.cancel();
                }
              }}
              className={`w-full mb-2 font-black text-[11.5px] py-2 px-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] ${
                voiceMode
                  ? 'bg-red-50 border border-red-200 text-red-700 hover:bg-red-100'
                  : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 hover:from-emerald-700 hover:to-blue-800 text-white shadow-xs'
              }`}
            >
              <Mic className={`w-4 h-4 ${ voiceMode ? 'text-red-500' : 'text-emerald-200' }`} />
              <span>{voiceMode ? '✕ Close Voice Mode' : '🎙️ Speak to AI — Live Voice'}</span>
            </button>

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
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder={selectedFile ? "Add a message..." : "Ask a health question..."}
                className="flex-1 bg-[#f8fafc] border border-slate-300 focus:border-[#0B2545] focus:bg-white text-[#0B2545] placeholder:text-slate-400 rounded-full px-4 py-2.5 text-xs outline-none font-medium transition-colors"
              />

              {/* Mic icon button — toggles voice panel */}
              <button
                type="button"
                onClick={() => {
                  const next = !voiceMode;
                  voiceModeRef.current = next;
                  setVoiceMode(next);
                  setVoiceStatus('idle');
                  setVoiceError('');
                  if (!next) {
                    if (mediaRecorderRef.current?.state === 'recording') {
                      try { mediaRecorderRef.current.stop(); } catch {}
                    }
                    if (voiceAudioRef.current) {
                      voiceAudioRef.current.pause();
                      voiceAudioRef.current = null;
                    }
                    if (window.speechSynthesis?.speaking) window.speechSynthesis.cancel();
                  }
                }}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 border ${
                  voiceMode
                    ? 'bg-red-500 text-white border-red-400 shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                    : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-emerald-400 shadow-md hover:from-emerald-600 hover:to-teal-700'
                } active:scale-90`}
                aria-label={voiceMode ? 'Close voice mode' : 'Open voice mode'}
              >
                {voiceMode ? <MicOff className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4 text-white" />}
              </button>

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
