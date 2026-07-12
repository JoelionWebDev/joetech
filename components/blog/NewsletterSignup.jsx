"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 sm:p-10 my-12">
      <div className="max-w-lg mx-auto text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Get weekly tech insights
        </h3>
        <p className="text-gray-600 text-sm mb-6">
          Join our newsletter for practical guides on web dev, AI tools, and
          digital marketing — sent every Monday.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm whitespace-nowrap"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        {status === "success" && (
          <p className="text-green-600 text-sm mt-3">Thanks! You are subscribed.</p>
        )}
        {status === "error" && (
          <p className="text-red-500 text-sm mt-3">
            Something went wrong. Try again or email us directly.
          </p>
        )}
        <p className="text-gray-400 text-xs mt-3">No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  );
}
