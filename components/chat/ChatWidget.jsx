"use client";

import { useState, useCallback, useEffect } from "react";
import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";

/**
 * ChatWidget — Root component that manages open/close state.
 * Shows a notification dot on first page load to invite clicks.
 */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("joetech-chat-notified");
    if (!dismissed) {
      setShowNotification(true);
      const timer = setTimeout(() => setShowNotification(false), 15000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpen = useCallback(() => {
    setShowNotification(false);
    sessionStorage.setItem("joetech-chat-notified", "1");
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      {/* Floating launcher button */}
      <ChatButton
        isOpen={isOpen}
        onClick={isOpen ? handleClose : handleOpen}
        showNotification={showNotification}
      />

      {/* Chat panel — rendered in DOM always, visibility controlled by CSS */}
      <ChatWindow isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
