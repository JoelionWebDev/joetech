"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import styles from "./chat.module.css";

const SESSION_KEY = "joetech-chat-history";

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello 👋 Welcome to **Joetech**. How can we help you grow digitally today?",
  timestamp: new Date(),
};

function loadSession() {
  if (typeof window === "undefined") return null;
  try {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((m) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }));
      }
    }
  } catch {
    /* ignore corrupt session */
  }
  return null;
}

function saveSession(messages) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages));
  } catch {
    /* storage full — ignore */
  }
}

/** Simple client-side rate limiter: max N requests per window (ms) */
const RATE_LIMIT = { maxRequests: 8, windowMs: 60_000 };

function useRateLimit() {
  const timestamps = useRef([]);

  return useCallback(() => {
    const now = Date.now();
    timestamps.current = timestamps.current.filter(
      (t) => now - t < RATE_LIMIT.windowMs,
    );
    if (timestamps.current.length >= RATE_LIMIT.maxRequests) return false;
    timestamps.current.push(now);
    return true;
  }, []);
}

/**
 * ChatWindow — The main chat panel. Manages message history,
 * API calls with streaming, loading state, and auto-scroll behaviour.
 */
export default function ChatWindow({ isOpen, onClose }) {
  const [messages, setMessages] = useState(() => loadSession() || [WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const streamRef = useRef(null);
  const checkRateLimit = useRateLimit();

  /* Persist messages to sessionStorage on change */
  useEffect(() => {
    saveSession(messages);
  }, [messages]);

  /* Auto-scroll to bottom whenever messages update */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  /* Focus input when chat opens */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  /* Cleanup stream on unmount */
  useEffect(() => {
    return () => {
      streamRef.current?.abort();
    };
  }, []);

  const sendMessage = useCallback(async (textOverride) => {
    const text = (textOverride || inputValue).trim();
    if (!text || isLoading) return;

    if (!checkRateLimit()) {
      setError("You're sending messages too quickly. Please wait a moment.");
      return;
    }

    setError(null);

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    const assistantId = `ai-${Date.now()}`;
    const assistantMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const history = [
        ...messages.filter((m) => m.id !== "welcome"),
        userMessage,
      ].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server error ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: isDone } = await reader.read();
        done = isDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: (m.content || "") + chunk }
                : m,
            ),
          );
        }
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId && !m.content
            ? { ...m, content: "I'm sorry, I received an empty response. Please try again." }
            : m,
        ),
      );
    } catch (err) {
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, messages, checkRateLimit]);

  /* Send on Enter (Shift+Enter = newline) */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage],
  );

  return (
    <div
      className={styles.chatWindow}
      data-open={isOpen}
      role="dialog"
      aria-label="Joetech AI Assistant"
      aria-modal="true"
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className={styles.chatHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.agentAvatar} aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zm0 7a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0v-3a5 5 0 0 0-5-5zm-2 5.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm4 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
            </svg>
          </div>
          <div className={styles.agentInfo}>
            <span className={styles.agentName}>Joetech AI Assistant</span>
            <span className={styles.agentStatus}>
              <span className={styles.statusDot} aria-hidden="true" />
              Online · joetech.name.ng
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close chat"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </header>

      {/* ── Message List ───────────────────────────────────────── */}
      <div className={styles.messageList} role="log" aria-live="polite">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {isLoading && <TypingIndicator />}

        {error && (
          <div className={styles.errorBanner} role="alert">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ flexShrink: 0 }}
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Quick Reply Chips (click sends immediately) ─────────── */}
      <div className={styles.quickReplies} aria-label="Quick questions">
        {[
          { label: "💻 Website Dev", text: "Tell me about your website development services" },
          { label: "📱 Mobile App", text: "What do you offer for mobile app development?" },
          { label: "🎯 Paid Ads", text: "How can your paid ads service help my business?" },
          { label: "💰 Get a Quote", text: "I'd like to get a quote for a project" },
        ].map((chip) => (
          <button
            key={chip.label}
            className={styles.chip}
            onClick={() => sendMessage(chip.text)}
            disabled={isLoading}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* ── Input Bar ──────────────────────────────────────────── */}
      <div className={styles.inputBar}>
        <textarea
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about our services…"
          className={styles.textarea}
          rows={1}
          aria-label="Your message"
          disabled={isLoading}
        />
        <button
          onClick={() => sendMessage()}
          disabled={!inputValue.trim() || isLoading}
          className={styles.sendButton}
          aria-label="Send message"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <div className={styles.chatFooter}>
        Powered by{" "}
        <a
          href="https://www.joetech.name.ng"
          target="_blank"
          rel="noopener noreferrer"
        >
          Joetech
        </a>{" "}
        · AI may make mistakes
      </div>
    </div>
  );
}
