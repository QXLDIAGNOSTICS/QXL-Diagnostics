"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { X, Mic, MicOff, Volume2, VolumeX, Phone, PhoneOff, Wifi, WifiOff } from "lucide-react";

interface VoiceConversationProps {
  onClose: () => void;
  onTranscript?: (text: string, isUser: boolean) => void;
}

type ConnectionStatus = "idle" | "connecting" | "connected" | "disconnected" | "error";

export default function VoiceConversation({ onClose, onTranscript }: VoiceConversationProps) {
  const [status, setStatus] = useState<ConnectionStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<{ role: "user" | "ai"; text: string; id: string }[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [sessionTime, setSessionTime] = useState(0);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  // Session timer
  useEffect(() => {
    if (status === "connected") {
      timerRef.current = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [status]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const addTranscript = useCallback((role: "user" | "ai", text: string) => {
    if (!text.trim()) return;
    const id = `${role}-${Date.now()}-${Math.random()}`;
    setTranscript(prev => [...prev, { role, text: text.trim(), id }]);
    onTranscript?.(text.trim(), role === "user");
  }, [onTranscript]);

  const disconnect = useCallback(() => {
    if (dcRef.current) {
      try { dcRef.current.close(); } catch {}
      dcRef.current = null;
    }
    if (pcRef.current) {
      try { pcRef.current.close(); } catch {}
      pcRef.current = null;
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(t => t.stop());
      localStreamRef.current = null;
    }
    setStatus("disconnected");
    setIsListening(false);
    setIsSpeaking(false);
  }, []);

  const connect = useCallback(async () => {
    setStatus("connecting");
    setErrorMsg("");
    setTranscript([]);
    setSessionTime(0);

    try {
      // Step 1: Request microphone permission
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      } catch (micErr: any) {
        setStatus("error");
        if (micErr?.name === "NotAllowedError" || micErr?.name === "PermissionDeniedError") {
          setErrorMsg("❌ Microphone permission denied. Please allow microphone access in your browser settings (🔒 address bar → Site settings → Microphone → Allow).");
        } else {
          setErrorMsg(`❌ Microphone error: ${micErr?.message || "Could not access microphone"}`);
        }
        return;
      }

      localStreamRef.current = stream;

      // Step 2: Get ephemeral client_secret from our backend
      let clientSecret: string;
      try {
        const sessionRes = await fetch("/api/v1/realtime-session", { method: "POST" });
        if (!sessionRes.ok) {
          const errData = await sessionRes.json().catch(() => ({}));
          throw new Error(errData?.detail || errData?.error || `Session error ${sessionRes.status}`);
        }
        const sessionData = await sessionRes.json();
        clientSecret = sessionData?.client_secret?.value || sessionData?.client_secret;
        if (!clientSecret) {
          throw new Error("No client_secret returned from session API. Check OpenAI API key and plan.");
        }
      } catch (sessionErr: any) {
        stream.getTracks().forEach(t => t.stop());
        setStatus("error");
        setErrorMsg(`❌ Session error: ${sessionErr?.message || "Could not create OpenAI Realtime session"}`);
        return;
      }

      // Step 3: Set up WebRTC peer connection
      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      // Receive remote (AI) audio and play it
      const audioEl = document.createElement("audio");
      audioEl.autoplay = true;
      (audioEl as any).playsInline = true;
      audioElRef.current = audioEl;
      pc.ontrack = (e) => {
        audioEl.srcObject = e.streams[0];
        setIsSpeaking(true);
        audioEl.onended = () => setIsSpeaking(false);
      };

      // Add local mic audio
      stream.getTracks().forEach(track => pc.addTrack(track, stream));

      // Step 4: Create data channel for text events (transcripts etc.)
      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;

      let currentUserTranscript = "";
      let currentAiTranscript = "";

      dc.onopen = () => {
        setStatus("connected");
        setIsListening(true);
        // Send initial greeting config
        try {
          dc.send(JSON.stringify({
            type: "session.update",
            session: {
              modalities: ["text", "audio"],
              turn_detection: {
                type: "server_vad",
                threshold: 0.5,
                prefix_padding_ms: 300,
                silence_duration_ms: 500,
              }
            }
          }));
          // Trigger AI to speak first
          dc.send(JSON.stringify({
            type: "conversation.item.create",
            item: {
              type: "message",
              role: "user",
              content: [{ type: "input_text", text: "Hello, please introduce yourself briefly as the QXL Diagnostics AI Assistant and ask how you can help." }]
            }
          }));
          dc.send(JSON.stringify({ type: "response.create" }));
        } catch {}
      };

      dc.onmessage = (e) => {
        try {
          const evt = JSON.parse(e.data);
          switch (evt.type) {
            case "input_audio_buffer.speech_started":
              setIsListening(true);
              setIsSpeaking(false);
              break;
            case "input_audio_buffer.speech_stopped":
              setIsListening(false);
              break;
            case "conversation.item.input_audio_transcription.completed":
              if (evt.transcript?.trim()) {
                addTranscript("user", evt.transcript);
              }
              break;
            case "response.audio_transcript.delta":
              currentAiTranscript += (evt.delta || "");
              break;
            case "response.audio_transcript.done":
              if (currentAiTranscript.trim()) {
                addTranscript("ai", currentAiTranscript);
                currentAiTranscript = "";
              }
              break;
            case "response.audio.started":
              setIsSpeaking(true);
              break;
            case "response.audio.done":
              setIsSpeaking(false);
              break;
            case "response.done":
              setIsSpeaking(false);
              break;
            case "error":
              console.error("Realtime API error:", evt);
              break;
          }
        } catch {}
      };

      dc.onclose = () => {
        setStatus("disconnected");
        setIsListening(false);
        setIsSpeaking(false);
      };

      // Step 5: Create SDP offer and connect to OpenAI
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Send offer to OpenAI Realtime API
      const sdpRes = await fetch(
        "https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${clientSecret}`,
            "Content-Type": "application/sdp",
          },
          body: offer.sdp,
        }
      );

      if (!sdpRes.ok) {
        const sdpErr = await sdpRes.text();
        throw new Error(`WebRTC SDP exchange failed: ${sdpRes.status} — ${sdpErr}`);
      }

      const answerSdp = await sdpRes.text();
      await pc.setRemoteDescription({ type: "answer", sdp: answerSdp });

    } catch (err: any) {
      console.error("Realtime connection error:", err);
      disconnect();
      setStatus("error");
      setErrorMsg(`❌ Connection error: ${err?.message || "Unknown error"}`);
    }
  }, [addTranscript, disconnect]);

  const toggleMute = useCallback(() => {
    if (!localStreamRef.current) return;
    localStreamRef.current.getAudioTracks().forEach(t => {
      t.enabled = isMuted;
    });
    setIsMuted(prev => !prev);
  }, [isMuted]);

  const sendTextMessage = useCallback((text: string) => {
    if (!dcRef.current || dcRef.current.readyState !== "open" || !text.trim()) return;
    try {
      dcRef.current.send(JSON.stringify({
        type: "conversation.item.create",
        item: {
          type: "message",
          role: "user",
          content: [{ type: "input_text", text }]
        }
      }));
      dcRef.current.send(JSON.stringify({ type: "response.create" }));
      addTranscript("user", text);
    } catch {}
  }, [addTranscript]);

  const [textInput, setTextInput] = useState("");

  return (
    <div className="fixed inset-0 z-[200000] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Voice Dialog */}
      <div className="relative w-full sm:w-[420px] max-h-[85vh] rounded-t-[28px] sm:rounded-[28px] bg-gradient-to-b from-[#050e24] to-[#0B2545] border border-blue-900/60 shadow-[0_25px_80px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-blue-900/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {/* Animated orb */}
            <div className={`relative w-10 h-10 rounded-full flex items-center justify-center ${status === "connected" ? "bg-emerald-500/20" : "bg-blue-900/40"}`}>
              {status === "connected" && (
                <>
                  <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping" style={{ animationDuration: "1.5s" }} />
                  <div className="absolute inset-[-4px] rounded-full border border-emerald-500/40 animate-ping" style={{ animationDuration: "2s" }} />
                </>
              )}
              {isSpeaking && (
                <div className="absolute inset-[-8px] rounded-full border-2 border-blue-400/30 animate-ping" style={{ animationDuration: "0.8s" }} />
              )}
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none" className="relative z-10">
                <path d="M5.5 8C5.5 5.515 7.515 3.5 10 3.5h12c2.485 0 4.5 2.015 4.5 4.5v8.5c0 2.485-2.015 4.5-4.5 4.5h-5.4L11.2 26.2a1 1 0 0 1-1.7-.72V20.5H10c-2.485 0-4.5-2.015-4.5-4.5V8Z" fill="white" />
                <circle cx="12" cy="12.2" r="1.55" fill="#0B2545" />
                <circle cx="16" cy="12.2" r="1.55" fill="#0B2545" />
                <circle cx="20" cy="12.2" r="1.55" fill="#0B2545" />
              </svg>
            </div>
            <div>
              <div className="text-white font-black text-sm">QXL AI Voice</div>
              <div className="text-blue-300 text-[11px] font-semibold flex items-center gap-1.5">
                {status === "connected" ? (
                  <><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" /> Live · {formatTime(sessionTime)}</>
                ) : status === "connecting" ? (
                  <><span className="w-1.5 h-1.5 bg-yellow-400 rounded-full inline-block animate-pulse" /> Connecting…</>
                ) : status === "error" ? (
                  <><span className="w-1.5 h-1.5 bg-red-400 rounded-full inline-block" /> Error</>
                ) : (
                  <>NABL Accredited MC-6849</>
                )}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Conversation transcript */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-[200px] max-h-[300px]">
          {transcript.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
              {status === "idle" && (
                <>
                  <div className="w-16 h-16 rounded-full bg-blue-800/50 border border-blue-600/40 flex items-center justify-center mb-4">
                    <Phone className="w-7 h-7 text-blue-300" />
                  </div>
                  <p className="text-white font-bold text-base mb-1">Talk to QXL AI</p>
                  <p className="text-blue-300 text-[12px] max-w-[260px] leading-relaxed">Real-time voice conversation powered by OpenAI. Ask about tests, packages, symptoms, or bookings.</p>
                </>
              )}
              {status === "connecting" && (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
                  <p className="text-blue-300 text-sm font-semibold">Connecting to QXL AI…</p>
                  <p className="text-blue-400/60 text-[11px]">Requesting microphone & starting session</p>
                </div>
              )}
              {status === "connected" && (
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" style={{ animationDuration: "1.5s" }} />
                    <div className="w-full h-full rounded-full bg-emerald-600/30 border border-emerald-500/50 flex items-center justify-center">
                      <Mic className="w-7 h-7 text-emerald-300" />
                    </div>
                  </div>
                  <p className="text-emerald-300 font-bold text-sm">Listening… Speak now!</p>
                </div>
              )}
              {status === "error" && (
                <div className="flex flex-col items-center gap-2 px-2">
                  <div className="w-12 h-12 rounded-full bg-red-900/40 border border-red-500/40 flex items-center justify-center">
                    <WifiOff className="w-6 h-6 text-red-400" />
                  </div>
                  <p className="text-red-400 font-bold text-sm">Connection Failed</p>
                  <p className="text-red-300/80 text-[11px] text-center leading-relaxed">{errorMsg}</p>
                </div>
              )}
            </div>
          )}

          {transcript.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[12.5px] leading-relaxed font-medium ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-tr-sm"
                  : "bg-white/10 text-blue-100 border border-white/15 rounded-tl-sm"
              }`}>
                {msg.role === "ai" && <span className="text-[9px] font-black text-blue-300 block mb-0.5 uppercase tracking-widest">QXL AI</span>}
                {msg.text}
              </div>
            </div>
          ))}

          {/* Live speaking indicators */}
          {status === "connected" && (isListening || isSpeaking) && (
            <div className={`flex ${isListening ? "justify-end" : "justify-start"}`}>
              <div className={`px-3.5 py-2.5 rounded-2xl flex items-center gap-2 ${
                isListening
                  ? "bg-blue-600/60 text-white rounded-tr-sm border border-blue-400/40"
                  : "bg-white/10 text-blue-200 rounded-tl-sm border border-white/15"
              }`}>
                {isListening && <><span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-ping" /><span className="text-[11px] font-bold">Listening…</span></>}
                {isSpeaking && !isListening && (
                  <>
                    <span className="text-[9px] font-black text-blue-300 uppercase tracking-widest">QXL AI</span>
                    <div className="flex gap-0.5 items-center">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-0.5 bg-blue-300 rounded-full animate-pulse" style={{ height: `${6 + i * 2}px`, animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          <div ref={transcriptEndRef} />
        </div>

        {/* Text input (works when connected) */}
        {status === "connected" && (
          <div className="px-3 pb-2 border-t border-white/10 pt-2 shrink-0">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={textInput}
                onChange={e => setTextInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && textInput.trim()) {
                    sendTextMessage(textInput.trim());
                    setTextInput("");
                  }
                }}
                placeholder="Or type a message…"
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-blue-400 rounded-full px-4 py-2 text-[12px] outline-none font-medium focus:border-blue-400 transition-colors"
              />
              <button
                onClick={() => { if (textInput.trim()) { sendTextMessage(textInput.trim()); setTextInput(""); }}}
                disabled={!textInput.trim()}
                className="w-8 h-8 rounded-full bg-blue-600 disabled:opacity-40 text-white flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer shrink-0"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="p-4 border-t border-white/10 flex items-center justify-center gap-4 shrink-0">
          {(status === "idle" || status === "disconnected" || status === "error") && (
            <button
              onClick={connect}
              className="flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-[13px] rounded-2xl shadow-lg shadow-emerald-900/40 transition-all active:scale-95 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              {status === "error" ? "Retry Connection" : "Start Voice Call"}
            </button>
          )}

          {status === "connecting" && (
            <button disabled className="flex items-center gap-2 px-6 py-3 bg-white/10 text-blue-300 font-bold text-[13px] rounded-2xl opacity-60">
              <div className="w-4 h-4 border-2 border-blue-300 border-t-transparent rounded-full animate-spin" />
              Connecting…
            </button>
          )}

          {status === "connected" && (
            <>
              {/* Mute toggle */}
              <button
                onClick={toggleMute}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-90 border ${
                  isMuted
                    ? "bg-red-600/30 border-red-500/50 text-red-300"
                    : "bg-white/15 border-white/25 text-white hover:bg-white/25"
                }`}
                title={isMuted ? "Unmute microphone" : "Mute microphone"}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              {/* AI speaking indicator */}
              <div className={`flex flex-col items-center gap-1 ${isSpeaking ? "opacity-100" : "opacity-40"}`}>
                <div className="flex gap-1 items-end h-6">
                  {[1,2,3,4,3,2,1].map((h, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all ${isSpeaking ? "bg-blue-400 animate-pulse" : "bg-white/40"}`}
                      style={{
                        height: isSpeaking ? `${6 + h * 3}px` : "4px",
                        animationDelay: `${i * 0.07}s`,
                        animationDuration: "0.6s",
                      }}
                    />
                  ))}
                </div>
                <span className="text-[9px] text-blue-300 font-bold uppercase tracking-wider">
                  {isSpeaking ? "AI Speaking" : "AI Ready"}
                </span>
              </div>

              {/* End call */}
              <button
                onClick={disconnect}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-red-600 hover:bg-red-500 text-white transition-all cursor-pointer active:scale-90 shadow-lg shadow-red-900/40 border border-red-400/30"
                title="End voice call"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Mic permission help hint */}
        {(status === "idle" || status === "error") && (
          <p className="text-[10px] text-blue-400/60 text-center pb-3 px-4 leading-relaxed">
            🔒 Tap <strong className="text-blue-300">Start Voice Call</strong> — your browser will ask for microphone access. Click <strong className="text-blue-300">Allow</strong> to begin.
          </p>
        )}
      </div>
    </div>
  );
}
