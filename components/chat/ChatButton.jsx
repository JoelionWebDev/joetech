"use client";

import styles from "./chat.module.css";

/**
 * ChatButton — Floating action button that opens/closes the chat window.
 * Shows a pulse-ring animation and a notification dot on first load.
 */
export default function ChatButton({ isOpen, onClick, showNotification }) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Close chat" : "Open Joetech AI Assistant"}
      className={styles.chatButton}
      data-open={isOpen}
    >
      {/* Pulse ring — visible only when closed */}
      {!isOpen && <span className={styles.pulseRing} aria-hidden="true" />}

      {/* Notification dot — visible only when closed and on first visit */}
      {!isOpen && showNotification && (
        <span className={styles.notificationDot} aria-label="Chat with us" />
      )}

      {/* Icon toggles between chat bubble and X */}
      <span className={styles.chatButtonIcon} aria-hidden="true">
        {isOpen ?
          /* Close (X) icon */
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        : /* Chat bubble icon */
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
          </svg>
        }
      </span>
    </button>
  );
}
