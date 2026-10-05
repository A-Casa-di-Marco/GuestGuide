"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Send, X } from "lucide-react";
import { MARCO_UI } from "@/lib/marco-kb";
import { isLang, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Msg = { id: string; sender: "user" | "assistant"; content: string };

function resolveLang(): Lang {
  try {
    const qp = new URLSearchParams(window.location.search).get("lang");
    if (isLang(qp)) return qp;
    const saved = window.localStorage.getItem("guestGuideLang");
    if (isLang(saved)) return saved;
    if (isLang(document.documentElement.lang)) return document.documentElement.lang;
  } catch {
    /* ignora */
  }
  return "it";
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="inline-flex items-center gap-1 rounded-2xl rounded-tl-md border border-border bg-secondary px-4 py-3"
      aria-label="…"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-muted-foreground"
          animate={{ opacity: [0.4, 1, 0.4], y: [0, -4, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );
}

function MessageBubble({ message }: { message: Msg }) {
  const isUser = message.sender === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96, x: isUser ? 20 : -20 }}
      animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
    >
      <div className={cn("flex max-w-[85%] items-end gap-2", isUser && "flex-row-reverse")}>
        {!isUser && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/assets/robin-mascot.png"
            alt=""
            aria-hidden="true"
            className="h-8 w-8 shrink-0 object-contain"
          />
        )}
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
            isUser
              ? "rounded-tr-md bg-primary text-primary-foreground"
              : "rounded-tl-md border border-border bg-secondary text-secondary-foreground",
          )}
        >
          {message.content}
        </div>
      </div>
    </motion.div>
  );
}

function ChatPanel({ lang, onClose }: { lang: Lang; onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([
    { id: "greet", sender: "assistant", content: MARCO_UI.greeting[lang] },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollDown = useCallback(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollDown();
  }, [messages, busy, scrollDown]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || busy) return;
    const userMsg: Msg = { id: `u-${Date.now()}`, sender: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/marco-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          lang,
          history: next.slice(-7, -1).map((m) => ({ role: m.sender, content: m.content })),
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: "assistant",
          content: data.reply || data.error || MARCO_UI.offline[lang],
        },
      ]);
    } catch {
      setMessages((prev) => [...prev, { id: `a-${Date.now()}`, sender: "assistant", content: MARCO_UI.offline[lang] }]);
    } finally {
      setBusy(false);
    }
  }, [input, busy, messages, lang]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.96 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      role="dialog"
      aria-modal="true"
      aria-label={MARCO_UI.title[lang]}
      className="fixed bottom-4 right-4 z-[90] flex h-[min(70vh,560px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl"
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/robin-mascot.png"
            alt=""
            aria-hidden="true"
            className="h-8 w-8 shrink-0 object-contain"
          />
          <div>
            <h3 className="font-serif text-base leading-tight text-foreground">{MARCO_UI.title[lang]}</h3>
            <p className="m-0 text-xs text-muted-foreground">{MARCO_UI.tagline[lang]}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={MARCO_UI.close[lang]}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-muted-foreground"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
      </div>

      <div ref={scrollRef} role="log" aria-label="Chat" aria-live="polite" className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        <AnimatePresence>{busy && <TypingIndicator />}</AnimatePresence>
      </div>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 focus-within:border-primary">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder={MARCO_UI.placeholder[lang]}
            aria-label={MARCO_UI.placeholder[lang]}
            maxLength={1000}
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={send}
            disabled={busy || !input.trim()}
            aria-label={MARCO_UI.send[lang]}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg",
              busy || !input.trim() ? "bg-secondary text-muted-foreground" : "bg-primary text-primary-foreground",
            )}
          >
            <Send className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function MarcoChat() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("it");
  const [pose, setPose] = useState<"peck" | "flap">("peck");
  const [bubble, setBubble] = useState(false);
  const [peckPeriod] = useState(() => `${(3.8 + Math.random() * 1.2).toFixed(2)}s`);
  const reduceMotion = useReducedMotion();

  // Ciclo di pose: becco a terra -> qualche battito d'ali -> di nuovo becco...
  useEffect(() => {
    if (open || reduceMotion) return;
    const timers: number[] = [];
    const cycle = () => {
      timers.push(
        window.setTimeout(() => {
          setPose("flap");
          timers.push(
            window.setTimeout(() => {
              setPose("peck");
              cycle();
            }, 1500),
          );
        }, 4200 + Math.random() * 3200),
      );
    };
    cycle();
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [open, reduceMotion]);

  // Ogni tanto spunta la nuvoletta "serve aiuto?" (cliccando si apre la chat)
  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => setBubble(false), 0);
      return () => window.clearTimeout(t);
    }
    let alive = true;
    const timers: number[] = [];
    const loop = (delay: number) => {
      timers.push(
        window.setTimeout(() => {
          if (!alive) return;
          setLang(resolveLang());
          setBubble(true);
          timers.push(
            window.setTimeout(() => {
              if (!alive) return;
              setBubble(false);
              loop(30000 + Math.random() * 20000);
            }, 5500),
          );
        }, delay),
      );
    };
    loop(12000);
    return () => {
      alive = false;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {!open && bubble && (
          <motion.button
            key="help-bubble"
            type="button"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => {
              setLang(resolveLang());
              setOpen(true);
            }}
            className="fixed bottom-[96px] right-4 z-[90] max-w-[210px] cursor-pointer rounded-2xl rounded-br-sm border border-border bg-card px-3.5 py-2.5 text-left text-sm font-medium leading-snug text-card-foreground shadow-lg"
          >
            {MARCO_UI.helpBubble[lang]}
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!open && (
          <motion.button
            key="robin"
            type="button"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 90, rotate: 8 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: [0, -6, 0], rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={
              reduceMotion
                ? { duration: 0.2 }
                : { x: { duration: 0.6, ease: "easeOut" }, opacity: { duration: 0.4 }, rotate: { duration: 0.6 } }
            }
            onClick={() => {
              setLang(resolveLang());
              setOpen(true);
            }}
            aria-label={MARCO_UI.openChat[lang]}
            className="fixed bottom-4 right-4 z-[90] block h-16 w-16 bg-transparent p-0"
          >
            <motion.span
              className="block h-full w-full drop-shadow-[0_6px_12px_rgba(0,0,0,0.35)]"
              animate={reduceMotion ? {} : { y: [0, -3, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              {reduceMotion ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/assets/robin-perched.png" alt="" aria-hidden="true" className="h-full w-full object-contain" />
              ) : (
                <span
                  aria-hidden="true"
                  className={cn("robin-sprite", pose === "flap" ? "robin-sprite--flap" : "robin-sprite--peck")}
                  style={{ "--robin-peck-period": peckPeriod } as CSSProperties}
                />
              )}
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>{open && <ChatPanel lang={lang} onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}
