"use client";

import { useState, useCallback } from "react";
import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";

/**
 * ChatWidget — Root component that manages open/close state.
 * Drop this into your layout or any page to activate the assistant.
 */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      {/* Floating launcher button */}
      <ChatButton isOpen={isOpen} onClick={isOpen ? handleClose : handleOpen} />

      {/* Chat panel — rendered in DOM always, visibility controlled by CSS */}
      <ChatWindow isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
