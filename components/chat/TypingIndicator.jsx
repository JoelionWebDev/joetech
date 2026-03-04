"use client";

import styles from "./chat.module.css";

/**
 * TypingIndicator — Three bouncing dots shown while the AI is generating a reply.
 * Pure CSS animation, no JS timers needed.
 */
export default function TypingIndicator() {
  return (
    <div
      className={styles.messageRow}
      data-role="assistant"
      aria-label="Joetech AI is typing"
    >
      <div className={styles.botAvatar} aria-hidden="true">
        J
      </div>
      <div className={styles.typingBubble}>
        <span
          className={styles.dot}
          style={{ animationDelay: "0ms" }}
          aria-hidden="true"
        />
        <span
          className={styles.dot}
          style={{ animationDelay: "150ms" }}
          aria-hidden="true"
        />
        <span
          className={styles.dot}
          style={{ animationDelay: "300ms" }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
