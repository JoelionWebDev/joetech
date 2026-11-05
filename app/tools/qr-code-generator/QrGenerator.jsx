"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import {
  AlertCircle,
  ArrowRight,
  Check,
  Copy,
  Download,
  Globe,
  Link2,
  Mail,
  MessageCircle,
  Phone,
  QrCode,
  Type,
} from "lucide-react";

const TABS = [
  {
    id: "url",
    label: "Website URL",
    icon: Globe,
    inputLabel: "Website link",
    placeholder: "https://www.yourbusiness.com",
    hint: "Paste the page you want people to land on.",
  },
  {
    id: "text",
    label: "Text",
    icon: Type,
    inputLabel: "Your text",
    placeholder: "Type any text — a message, an address, a promo code…",
    hint: "Whatever you type is stored in the code itself.",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
    inputLabel: "WhatsApp number",
    placeholder: "e.g. 0803 123 4567",
    hint: "Scanning the code opens a chat with this number.",
  },
  {
    id: "phone",
    label: "Phone",
    icon: Phone,
    inputLabel: "Phone number",
    placeholder: "+234 803 123 4567",
    hint: "Scanning the code dials this number.",
  },
  {
    id: "email",
    label: "Email",
    icon: Mail,
    inputLabel: "Email address",
    placeholder: "hello@yourbusiness.com",
    hint: "Scanning the code opens a new email to this address.",
  },
];

const COLOR_PRESETS = [
  { name: "Black", value: "#000000" },
  { name: "Joetech blue", value: "#2563eb" },
  { name: "Midnight navy", value: "#0f172a" },
  { name: "Green", value: "#15803d" },
];

const SIZES = [
  { value: 512, label: "512 px", note: "For screens & small print" },
  { value: 1024, label: "1024 px", note: "For flyers & large print" },
];

const STEPS = [
  {
    title: "Pick what the code should do",
    text: "Website, plain text, a WhatsApp chat, a phone call or an email.",
  },
  {
    title: "Type or paste your details",
    text: "A link, a number or a message — the code updates live as you type.",
  },
  {
    title: "Choose a size and colour",
    text: "Match your brand, then pick 512 px for screens or 1024 px for print.",
  },
  {
    title: "Download and use it",
    text: "Add the PNG or SVG to your flyer, business card, shop front or product pack.",
  },
];

const FAQS = [
  {
    q: "Do Joetech QR codes expire?",
    a: "No. The code holds your link, number or text directly — there is no short link or subscription behind it, so it keeps working as long as the link or number itself works.",
  },
  {
    q: "Can I print the QR code on a flyer, banner or product pack?",
    a: "Yes. Download the 1024 px PNG for everyday printing, or the SVG version for large formats — SVG stays sharp at any size, from a business card to a billboard.",
  },
  {
    q: "Why won't my QR code scan?",
    a: "It is usually contrast or size. Keep the dark squares on a light background, print at least 2 cm wide, and test it with your own phone before printing a full batch.",
  },
  {
    q: "Is it really free? Do I need an account?",
    a: "Yes, free — no sign-up and no watermark. The code is generated in your browser, so nothing you type is sent to us or stored anywhere.",
  },
];

function buildEncodedValue(tabId, raw) {
  const value = raw.trim();
  if (!value) return "";
  if (tabId === "whatsapp") {
    const digits = value.replace(/\D/g, "");
    return digits ? `https://wa.me/${digits}` : "";
  }
  if (tabId === "phone") {
    const cleaned = value.replace(/[^\d+]/g, "");
    return cleaned ? `tel:${cleaned}` : "";
  }
  if (tabId === "email") {
    return `mailto:${value}`;
  }
  if (tabId === "url") {
    if (/^https?:\/\//i.test(value)) return value;
    if (/^[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(value)) return `https://${value}`;
    return value;
  }
  return value;
}

function validationProblem(tabId, raw) {
  const value = raw.trim();
  if (!value) return "";
  if (tabId === "whatsapp" && !/\d/.test(value)) {
    return "Enter a WhatsApp number — digits only is fine, e.g. 0803 123 4567.";
  }
  if (tabId === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "That email address doesn't look complete — check it and try again.";
  }
  return "";
}

export default function QrGenerator() {
  const [activeTab, setActiveTab] = useState("url");
  const [input, setInput] = useState("");
  const [size, setSize] = useState(512);
  const [color, setColor] = useState("#000000");
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const active = TABS.find((t) => t.id === activeTab);
  const encoded = buildEncodedValue(activeTab, input);

  useEffect(() => {
    const problem = validationProblem(activeTab, input);
    setError(problem);
    if (problem || !encoded) {
      setQrDataUrl(null);
      return;
    }
    let cancelled = false;
    QRCode.toDataURL(encoded, {
      errorCorrectionLevel: "M",
      width: size,
      margin: 2,
      color: { dark: color, light: "#ffffff" },
    })
      .then((url) => {
        if (!cancelled) setQrDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) {
          setQrDataUrl(null);
          setError("Something went wrong generating the code — try shorter text.");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [activeTab, input, size, color, encoded]);

  const downloadSvg = async () => {
    if (!encoded) return;
    try {
      const svg = await QRCode.toString(encoded, {
        type: "svg",
        errorCorrectionLevel: "M",
        margin: 2,
        color: { dark: color, light: "#ffffff" },
      });
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "joetech-qr-code.svg";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("The SVG download failed — try the PNG instead.");
    }
  };

  const copyEncoded = async () => {
    if (!encoded) return;
    try {
      await navigator.clipboard.writeText(encoded);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = encoded;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const selectedColor = COLOR_PRESETS.find((c) => c.value === color);

  return (
    <div>
      {/* Tool card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="grid lg:grid-cols-5">
          {/* Controls */}
          <div className="lg:col-span-3 p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-1">
              Make your QR code
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Free — no sign-up, no watermark. The code is made in your
              browser, so nothing you type is sent or stored.
            </p>

            {/* Content-type tabs */}
            <div
              className="flex flex-wrap gap-2 mb-6"
              role="tablist"
              aria-label="What the QR code should do"
            >
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const selected = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                      selected
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Input */}
            <label
              htmlFor="qr-input"
              className="block text-sm font-semibold text-slate-900 mb-2"
            >
              {active.inputLabel}
            </label>
            {activeTab === "text" ? (
              <textarea
                id="qr-input"
                rows={3}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={active.placeholder}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 resize-none"
              />
            ) : (
              <input
                id="qr-input"
                type="text"
                inputMode={
                  activeTab === "email"
                    ? "email"
                    : activeTab === "url"
                      ? "url"
                      : "tel"
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={active.placeholder}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              />
            )}
            <p className="mt-2 text-sm text-slate-500">{active.hint}</p>

            {error && (
              <p className="mt-3 flex items-start gap-2 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                {error}
              </p>
            )}

            {encoded && !error && (
              <p className="mt-3 flex items-start gap-2 text-xs text-slate-500">
                <Link2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span className="break-all">
                  Encoded as:{" "}
                  <span className="font-mono text-slate-700">{encoded}</span>
                </span>
              </p>
            )}

            {/* Size selector */}
            <div className="mt-8">
              <p className="text-sm font-semibold text-slate-900 mb-2">
                Image size
              </p>
              <div className="grid grid-cols-2 gap-3">
                {SIZES.map((s) => {
                  const selected = s.value === size;
                  return (
                    <button
                      key={s.value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setSize(s.value)}
                      className={`rounded-xl border px-4 py-3 text-left transition-all ${
                        selected
                          ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <span className="block text-sm font-bold text-slate-900">
                        {s.label}
                      </span>
                      <span className="block text-xs text-slate-500 mt-0.5">
                        {s.note}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colour presets */}
            <div className="mt-8">
              <p className="text-sm font-semibold text-slate-900 mb-2">
                Code colour
                {selectedColor && (
                  <span className="font-normal text-slate-500">
                    {" "}
                    — {selectedColor.name}
                  </span>
                )}
              </p>
              <div className="flex items-center gap-3">
                {COLOR_PRESETS.map((preset) => {
                  const selected = preset.value === color;
                  return (
                    <button
                      key={preset.value}
                      type="button"
                      aria-label={`Use ${preset.name} for the QR code`}
                      aria-pressed={selected}
                      onClick={() => setColor(preset.value)}
                      style={{ backgroundColor: preset.value }}
                      className={`w-10 h-10 rounded-full border border-slate-200 transition-all ${
                        selected
                          ? "ring-2 ring-blue-600 ring-offset-2 scale-110"
                          : "hover:scale-105"
                      }`}
                    />
                  );
                })}
                <span className="text-xs text-slate-500">
                  Dark squares on a white background scan best.
                </span>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-2 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 p-6 sm:p-8 flex flex-col items-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4 self-start">
              Live preview
            </p>
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 w-full max-w-xs flex items-center justify-center aspect-square">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="QR code preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center px-4">
                  <QrCode className="w-14 h-14 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-medium text-slate-600">
                    Your QR code will appear here
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Type a link, number or message to start — it updates live
                    as you type.
                  </p>
                </div>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-3">
              {size} × {size} px · Error correction M
            </p>

            <div className="w-full max-w-xs mt-6 space-y-3">
              {qrDataUrl ? (
                <a
                  href={qrDataUrl}
                  download="joetech-qr-code.png"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
                >
                  <Download className="w-4 h-4" />
                  Download PNG
                </a>
              ) : (
                <span className="flex items-center justify-center gap-2 w-full bg-slate-200 text-slate-400 px-5 py-3 rounded-full font-semibold cursor-not-allowed">
                  <Download className="w-4 h-4" />
                  Download PNG
                </span>
              )}
              <button
                type="button"
                onClick={downloadSvg}
                disabled={!qrDataUrl}
                className="flex items-center justify-center gap-2 w-full bg-white border border-slate-300 text-slate-800 px-5 py-3 rounded-full font-semibold hover:border-blue-600 hover:text-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:text-slate-800"
              >
                <Download className="w-4 h-4" />
                Download SVG
              </button>
              <button
                type="button"
                onClick={copyEncoded}
                disabled={!encoded}
                className="flex items-center justify-center gap-2 w-full text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy link / text
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How to use */}
      <section className="mt-16">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          How to use the QR code generator
        </h2>
        <p className="text-slate-600 mb-8">
          Four steps, under a minute — no account, no design skills needed.
        </p>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
            >
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold mb-4">
                {i + 1}
              </span>
              <h3 className="font-semibold text-slate-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="mt-16">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
          Frequently asked questions
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq) => (
            <div
              key={faq.q}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
            >
              <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog link */}
      <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="shrink-0 w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
          <QrCode className="w-6 h-6" />
        </div>
        <div className="flex-grow">
          <h3 className="font-semibold text-slate-900">
            Want ideas for using QR codes in your business?
          </h3>
          <p className="text-sm text-slate-600">
            Read how small businesses in Nigeria use QR codes to get more
            customers — on menus, flyers, shop fronts and product packs.
          </p>
        </div>
        <a
          href="/blog/qr-codes-small-business-nigeria"
          className="inline-flex items-center gap-2 shrink-0 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          Read the guide
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
