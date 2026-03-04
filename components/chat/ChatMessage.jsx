"use client";

import styles from "./chat.module.css";

/**
 * ChatMessage — Renders a single message bubble.
 * Supports a small subset of Markdown: **bold**, *italic*, bullet lists,
 * and inline code — enough for a conversational assistant.
 */

/** Converts a plain-text assistant reply with basic Markdown into JSX */
function renderMarkdown(text) {
  const lines = text.split("\n");
  const output = [];
  let listBuffer = [];

  const flushList = () => {
    if (listBuffer.length) {
      output.push(
        <ul key={`ul-${output.length}`} className={styles.msgList}>
          {listBuffer.map((item, i) => (
            <li key={i}>{inlineFormat(item)}</li>
          ))}
        </ul>,
      );
      listBuffer = [];
    }
  };

  lines.forEach((line, idx) => {
    const bullet = line.match(/^[-*•]\s+(.+)/);
    if (bullet) {
      listBuffer.push(bullet[1]);
    } else {
      flushList();
      if (line.trim() === "") {
        output.push(<br key={`br-${idx}`} />);
      } else {
        output.push(
          <p key={`p-${idx}`} className={styles.msgPara}>
            {inlineFormat(line)}
          </p>,
        );
      }
    }
  });

  flushList();
  return output;
}

/** Handles **bold**, *italic*, and `code` inline */
function inlineFormat(text) {
  const parts = [];
  // Split on bold (**), italic (*), or inline code (`)
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let last = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));

    if (match[2]) parts.push(<strong key={match.index}>{match[2]}</strong>);
    else if (match[3]) parts.push(<em key={match.index}>{match[3]}</em>);
    else if (match[4])
      parts.push(
        <code key={match.index} className={styles.inlineCode}>
          {match[4]}
        </code>,
      );

    last = regex.lastIndex;
  }

  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? parts : text;
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={styles.messageRow} data-role={message.role}>
      {/* Avatar — only for assistant */}
      {!isUser && (
        <div className={styles.botAvatar} aria-hidden="true">
          J
        </div>
      )}

      <div className={styles.bubble} data-role={message.role}>
        <div className={styles.bubbleContent}>
          {isUser ? message.content : renderMarkdown(message.content)}
        </div>
        <time
          className={styles.timestamp}
          dateTime={new Date(message.timestamp).toISOString()}
        >
          {formatTime(message.timestamp)}
        </time>
      </div>
    </div>
  );
}
