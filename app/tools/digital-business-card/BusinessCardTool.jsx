"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  MessageCircle,
  Download,
  Copy,
  Check,
  IdCard,
  QrCode,
  ArrowRight,
  ListChecks,
  HelpCircle,
} from "lucide-react";

const EMPTY_FIELDS = {
  fullName: "",
  jobTitle: "",
  businessName: "",
  phone: "",
  whatsapp: "",
  email: "",
  website: "",
  address: "",
  tagline: "",
};

const THEMES = {
  joetech: {
    id: "joetech",
    label: "Joetech Blue",
    swatch: "bg-gradient-to-br from-blue-600 to-indigo-700",
    previewClass:
      "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800",
    nameClass: "text-white",
    subClass: "text-blue-100",
    rowClass: "text-blue-50",
    qrDark: "#1d4ed8",
    canvas: { type: "gradient", from: "#2563eb", to: "#3730a3" },
    text: "#ffffff",
    muted: "#dbeafe",
    accent: "#93c5fd",
  },
  midnight: {
    id: "midnight",
    label: "Midnight Navy",
    swatch: "bg-[#060b18] ring-1 ring-amber-300/70",
    previewClass: "bg-[#060b18]",
    nameClass: "text-amber-300",
    subClass: "text-white",
    rowClass: "text-slate-300",
    qrDark: "#060b18",
    canvas: { type: "solid", color: "#060b18" },
    text: "#ffffff",
    muted: "#cbd5e1",
    accent: "#fcd34d",
  },
  gold: {
    id: "gold",
    label: "Gold on Dark",
    swatch: "bg-gradient-to-br from-neutral-900 to-amber-600",
    previewClass:
      "bg-gradient-to-br from-neutral-900 via-stone-900 to-amber-900",
    nameClass: "text-amber-400",
    subClass: "text-amber-100",
    rowClass: "text-stone-200",
    qrDark: "#92400e",
    canvas: { type: "gradient", from: "#1c1917", to: "#78350f" },
    text: "#ffffff",
    muted: "#e7e5e4",
    accent: "#fbbf24",
  },
  emerald: {
    id: "emerald",
    label: "Emerald",
    swatch: "bg-gradient-to-br from-emerald-600 to-teal-700",
    previewClass:
      "bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800",
    nameClass: "text-white",
    subClass: "text-emerald-100",
    rowClass: "text-emerald-50",
    qrDark: "#047857",
    canvas: { type: "gradient", from: "#059669", to: "#115e59" },
    text: "#ffffff",
    muted: "#d1fae5",
    accent: "#a7f3d0",
  },
};

function ensureUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function buildVCard(fields, newline) {
  const lines = ["BEGIN:VCARD", "VERSION:3.0"];
  if (fields.fullName.trim()) lines.push(`FN:${fields.fullName.trim()}`);
  if (fields.businessName.trim())
    lines.push(`ORG:${fields.businessName.trim()}`);
  if (fields.jobTitle.trim())
    lines.push(`TITLE:${fields.jobTitle.trim()}`);
  if (fields.phone.trim())
    lines.push(`TEL;TYPE=CELL:${fields.phone.trim()}`);
  if (fields.whatsapp.trim())
    lines.push(`TEL;TYPE=CELL:${fields.whatsapp.trim()}`);
  if (fields.email.trim())
    lines.push(`EMAIL;TYPE=WORK:${fields.email.trim()}`);
  if (fields.website.trim())
    lines.push(`URL:${ensureUrl(fields.website)}`);
  if (fields.address.trim())
    lines.push(`ADR;TYPE=WORK:;;${fields.address.trim()};;;;`);
  if (fields.tagline.trim())
    lines.push(`NOTE:${fields.tagline.trim()}`);
  lines.push("END:VCARD");
  return lines.join(newline);
}

function buildPlainText(fields) {
  const lines = [];
  if (fields.fullName.trim()) lines.push(fields.fullName.trim());
  if (fields.jobTitle.trim()) lines.push(fields.jobTitle.trim());
  if (fields.businessName.trim()) lines.push(fields.businessName.trim());
  if (fields.tagline.trim()) lines.push(fields.tagline.trim());
  if (fields.phone.trim()) lines.push(`Phone: ${fields.phone.trim()}`);
  if (fields.whatsapp.trim())
    lines.push(`WhatsApp: ${fields.whatsapp.trim()}`);
  if (fields.email.trim()) lines.push(`Email: ${fields.email.trim()}`);
  if (fields.website.trim())
    lines.push(`Website: ${ensureUrl(fields.website)}`);
  if (fields.address.trim()) lines.push(`Address: ${fields.address.trim()}`);
  return lines.join("\n");
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function fitFont(ctx, text, maxWidth, startSize, weight = 700) {
  let size = startSize;
  ctx.font = `${weight} ${size}px 'Space Grotesk', Arial, sans-serif`;
  while (size > 20 && ctx.measureText(text).width > maxWidth) {
    size -= 2;
    ctx.font = `${weight} ${size}px 'Space Grotesk', Arial, sans-serif`;
  }
  return size;
}

const FIELD_DEFS = [
  {
    key: "fullName",
    label: "Full name",
    placeholder: "e.g. Adaeze Okonkwo",
    type: "text",
  },
  {
    key: "jobTitle",
    label: "Job title",
    placeholder: "e.g. Founder & CEO",
    type: "text",
  },
  {
    key: "businessName",
    label: "Business name",
    placeholder: "e.g. Ada's Cakes & Events",
    type: "text",
  },
  {
    key: "phone",
    label: "Phone number",
    placeholder: "e.g. 0803 123 4567",
    type: "tel",
  },
  {
    key: "whatsapp",
    label: "WhatsApp number",
    placeholder: "e.g. 0803 123 4567",
    type: "tel",
  },
  {
    key: "email",
    label: "Email address",
    placeholder: "e.g. hello@yourbusiness.com",
    type: "email",
  },
  {
    key: "website",
    label: "Website",
    placeholder: "e.g. www.yourbusiness.com",
    type: "text",
  },
  {
    key: "address",
    label: "Business address",
    placeholder: "e.g. 12 Allen Avenue, Ikeja, Lagos",
    type: "text",
  },
  {
    key: "tagline",
    label: "Short tagline",
    placeholder: "e.g. Fresh cakes, baked to order in Lagos",
    type: "text",
  },
];

const STEPS = [
  {
    title: "Fill in your details",
    text: "Type your name, business and contact details in the form. The card preview updates as you type.",
  },
  {
    title: "Pick a theme",
    text: "Choose one of the four card styles — Joetech Blue, Midnight Navy, Gold on Dark or Emerald.",
  },
  {
    title: "Download your card",
    text: "Save the card as a high-resolution PNG image, download your contact as a vCard file, or copy your details as text.",
  },
  {
    title: "Share it everywhere",
    text: "Send the card on WhatsApp, add it to your Instagram bio link, your email signature or your website.",
  },
];

const FAQS = [
  {
    q: "Is this digital business card maker really free?",
    a: "Yes. It is completely free, with no sign-up and no watermark. Your details stay in your own browser — nothing you type is sent to our servers or stored anywhere.",
  },
  {
    q: "What does the QR code on the card do?",
    a: "If you add a website, the QR code links to it, so anyone who scans it opens your site. If you leave the website blank, the QR code stores your contact details instead, so scanning it saves you straight into the person's phone.",
  },
  {
    q: "How do I share my digital business card?",
    a: "Download the PNG and send it on WhatsApp, post it on Instagram or Facebook, or attach it to an email. You can also download the vCard (.vcf) file and share that — when someone opens it, your contact is saved to their phone.",
  },
  {
    q: "Can I print this card?",
    a: "Yes. The PNG download is 1050 by 600 pixels, which prints clearly at normal business-card size. Send the file to any printer, or print it yourself on card stock.",
  },
];

export default function BusinessCardTool() {
  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [themeId, setThemeId] = useState("joetech");
  const [qrUrl, setQrUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const theme = THEMES[themeId];
  const hasContent = useMemo(
    () => Object.values(fields).some((value) => value.trim() !== ""),
    [fields]
  );

  const qrText = useMemo(() => {
    if (fields.website.trim()) return ensureUrl(fields.website);
    if (hasContent) return buildVCard(fields, "\n");
    return "";
  }, [fields, hasContent]);

  useEffect(() => {
    let cancelled = false;
    async function generate() {
      if (!qrText) {
        setQrUrl("");
        return;
      }
      try {
        const url = await QRCode.toDataURL(qrText, {
          width: 220,
          margin: 1,
          color: { dark: theme.qrDark, light: "#ffffff" },
        });
        if (!cancelled) setQrUrl(url);
      } catch {
        if (!cancelled) setQrUrl("");
      }
    }
    generate();
    return () => {
      cancelled = true;
    };
  }, [qrText, theme]);

  function updateField(key, value) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  const contactRows = [
    fields.phone.trim() && {
      icon: <Phone className="w-4 h-4 shrink-0" />,
      text: fields.phone.trim(),
    },
    fields.whatsapp.trim() && {
      icon: <MessageCircle className="w-4 h-4 shrink-0" />,
      text: fields.whatsapp.trim(),
    },
    fields.email.trim() && {
      icon: <Mail className="w-4 h-4 shrink-0" />,
      text: fields.email.trim(),
    },
    fields.website.trim() && {
      icon: <Globe className="w-4 h-4 shrink-0" />,
      text: ensureUrl(fields.website),
    },
    fields.address.trim() && {
      icon: <MapPin className="w-4 h-4 shrink-0" />,
      text: fields.address.trim(),
    },
  ].filter(Boolean);

  async function downloadPng() {
    if (!hasContent || downloading) return;
    setDownloading(true);
    try {
      const W = 1050;
      const H = 600;
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setDownloading(false);
        return;
      }

      if (theme.canvas.type === "gradient") {
        const gradient = ctx.createLinearGradient(0, 0, W, H);
        gradient.addColorStop(0, theme.canvas.from);
        gradient.addColorStop(1, theme.canvas.to);
        ctx.fillStyle = gradient;
      } else {
        ctx.fillStyle = theme.canvas.color;
      }
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = theme.accent;
      ctx.globalAlpha = 0.12;
      ctx.beginPath();
      ctx.arc(W - 120, 40, 260, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      const leftX = 60;
      const textMax = qrText ? 660 : W - 120;

      const name = fields.fullName.trim() || "Your Name";
      fitFont(ctx, name, textMax, 54);
      ctx.fillStyle = theme.text;
      ctx.fillText(name, leftX, 116);

      ctx.fillStyle = theme.accent;
      ctx.fillRect(leftX, 140, 120, 6);

      let y = 196;
      if (fields.jobTitle.trim()) {
        fitFont(ctx, fields.jobTitle.trim(), textMax, 34, 600);
        ctx.fillStyle = theme.text;
        ctx.fillText(fields.jobTitle.trim(), leftX, y);
        y += 48;
      }
      if (fields.businessName.trim()) {
        fitFont(ctx, fields.businessName.trim(), textMax, 30, 600);
        ctx.fillStyle = theme.muted;
        ctx.fillText(fields.businessName.trim(), leftX, y);
        y += 44;
      }
      if (fields.tagline.trim()) {
        fitFont(ctx, fields.tagline.trim(), textMax, 26, 400);
        ctx.fillStyle = theme.muted;
        ctx.fillText(fields.tagline.trim(), leftX, y);
        y += 40;
      }

      const rows = [
        fields.phone.trim() && ["Phone", fields.phone.trim()],
        fields.whatsapp.trim() && ["WhatsApp", fields.whatsapp.trim()],
        fields.email.trim() && ["Email", fields.email.trim()],
        fields.website.trim() && ["Website", ensureUrl(fields.website)],
        fields.address.trim() && ["Address", fields.address.trim()],
      ].filter(Boolean);

      let rowY = Math.max(y + 16, H - rows.length * 42 - 56);
      rows.forEach(([label, value]) => {
        ctx.font = "600 24px Arial, sans-serif";
        ctx.fillStyle = theme.accent;
        ctx.fillText(label, leftX, rowY);
        const labelWidth = ctx.measureText(label).width;
        ctx.font = "400 24px Arial, sans-serif";
        ctx.fillStyle = theme.text;
        const valueText =
          ctx.measureText(value).width > textMax - labelWidth - 24
            ? value.slice(0, 42) + "…"
            : value;
        ctx.fillText(valueText, leftX + labelWidth + 24, rowY);
        rowY += 42;
      });

      ctx.font = "400 20px Arial, sans-serif";
      ctx.fillStyle = theme.muted;
      ctx.globalAlpha = 0.8;
      ctx.fillText("joetech.name.ng", leftX, H - 28);
      ctx.globalAlpha = 1;

      if (qrText) {
        const qrCanvas = document.createElement("canvas");
        await QRCode.toCanvas(qrCanvas, qrText, {
          width: 220,
          margin: 1,
          color: { dark: theme.qrDark, light: "#ffffff" },
        });
        const qrSize = 220;
        const qrX = W - qrSize - 60;
        const qrY = 60;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        if (typeof ctx.roundRect === "function") {
          ctx.roundRect(qrX - 12, qrY - 12, qrSize + 24, qrSize + 24, 16);
        } else {
          ctx.rect(qrX - 12, qrY - 12, qrSize + 24, qrSize + 24);
        }
        ctx.fill();
        ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);
        ctx.font = "600 22px Arial, sans-serif";
        ctx.fillStyle = theme.muted;
        ctx.textAlign = "center";
        ctx.fillText("Scan me", qrX + qrSize / 2, qrY + qrSize + 44);
        ctx.textAlign = "left";
      }

      canvas.toBlob((blob) => {
        if (blob) downloadBlob(blob, "joetech-digital-business-card.png");
        setDownloading(false);
      }, "image/png");
    } catch {
      setDownloading(false);
    }
  }

  function downloadVCard() {
    if (!hasContent) return;
    const vcf = buildVCard(fields, "\r\n");
    const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
    const slug = (fields.fullName.trim() || "contact")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    downloadBlob(blob, `${slug}.vcf`);
  }

  async function copyDetails() {
    if (!hasContent) return;
    const text = buildPlainText(fields);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      {/* Tool */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <IdCard className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-gray-900">
                    Your details
                  </h2>
                  <p className="text-sm text-gray-500">
                    Fill in what you want on the card.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {FIELD_DEFS.map((field) => (
                  <div key={field.key}>
                    <label
                      htmlFor={field.key}
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.key}
                      type={field.type}
                      value={fields[field.key]}
                      onChange={(e) => updateField(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    />
                  </div>
                ))}
              </div>

              <p className="mt-6 text-xs text-gray-500 leading-relaxed">
                Your details stay in your browser. Nothing you type here is
                sent to a server or stored.
              </p>
            </div>

            {/* Preview + actions */}
            <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-5">
                  Live preview
                </h2>

                {/* Card */}
                <div
                  className={`w-full max-w-xl mx-auto aspect-[7/4] rounded-2xl shadow-2xl p-5 sm:p-7 flex gap-4 overflow-hidden ${theme.previewClass}`}
                >
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div>
                      <p
                        className={`font-display text-2xl sm:text-3xl font-bold leading-tight truncate ${theme.nameClass}`}
                      >
                        {fields.fullName.trim() || "Your Name"}
                      </p>
                      <p
                        className={`text-sm sm:text-base font-medium mt-1 truncate ${theme.subClass}`}
                      >
                        {fields.jobTitle.trim() || "Your job title"}
                      </p>
                      <p
                        className={`text-sm font-semibold mt-0.5 truncate ${theme.subClass}`}
                      >
                        {fields.businessName.trim() || "Your business name"}
                      </p>
                      {fields.tagline.trim() && (
                        <p
                          className={`text-xs sm:text-sm mt-2 leading-snug ${theme.rowClass} opacity-90`}
                        >
                          {fields.tagline.trim()}
                        </p>
                      )}
                    </div>
                    <div className="mt-auto space-y-1.5 pt-3">
                      {contactRows.map((row, index) => (
                        <p
                          key={index}
                          className={`flex items-center gap-2 text-xs sm:text-sm truncate ${theme.rowClass}`}
                        >
                          <span className="opacity-80">{row.icon}</span>
                          <span className="truncate">{row.text}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0 flex flex-col items-center justify-center">
                    {qrUrl ? (
                      <>
                        <div className="bg-white rounded-xl p-2 shadow-md">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={qrUrl}
                            alt="QR code for your business card"
                            className="w-20 h-20 sm:w-28 sm:h-28"
                          />
                        </div>
                        <p
                          className={`text-[10px] sm:text-xs mt-2 font-medium ${theme.rowClass} opacity-80`}
                        >
                          Scan me
                        </p>
                      </>
                    ) : (
                      <div className="bg-white/15 rounded-xl p-3 w-20 h-20 sm:w-28 sm:h-28 flex flex-col items-center justify-center text-center">
                        <QrCode className="w-6 h-6 sm:w-8 sm:h-8 text-white/70" />
                        <p className="text-[10px] text-white/70 mt-1 leading-tight">
                          Add your website or details for a QR code
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-center text-xs text-gray-400 mt-4">
                  joetech.name.ng
                </p>

                {/* Theme picker */}
                <div className="mt-8">
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Card theme
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {Object.values(THEMES).map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setThemeId(option.id)}
                        className={`flex items-center gap-2 rounded-full border-2 px-3 py-2 text-sm font-medium transition-all ${
                          themeId === option.id
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                        }`}
                        aria-pressed={themeId === option.id}
                      >
                        <span
                          className={`w-6 h-6 rounded-full ${option.swatch}`}
                        />
                        {option.label}
                        {themeId === option.id && (
                          <Check className="w-4 h-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 grid sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={downloadPng}
                    disabled={!hasContent || downloading}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-3.5 rounded-full font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Download className="w-5 h-5" />
                    {downloading ? "Preparing…" : "Download PNG"}
                  </button>
                  <button
                    type="button"
                    onClick={downloadVCard}
                    disabled={!hasContent}
                    className="inline-flex items-center justify-center gap-2 bg-white border-2 border-blue-600 text-blue-600 px-5 py-3.5 rounded-full font-semibold hover:bg-blue-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Download className="w-5 h-5" />
                    Download vCard
                  </button>
                  <button
                    type="button"
                    onClick={copyDetails}
                    disabled={!hasContent}
                    className="inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-5 py-3.5 rounded-full font-semibold hover:border-gray-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                    {copied ? "Copied!" : "Copy details"}
                  </button>
                </div>

                {!hasContent && (
                  <p className="mt-4 text-sm text-gray-500 text-center">
                    Fill in at least your name or business name to download
                    or copy your card.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <ListChecks className="w-6 h-6" />
            </div>
            <h2 className="font-display text-3xl font-bold text-gray-900">
              How to use it
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-2xl p-6 border border-gray-100"
              >
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white font-bold mb-4">
                  {index + 1}
                </span>
                <h3 className="font-display text-lg font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h2 className="font-display text-3xl font-bold text-gray-900">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <h3 className="font-display text-lg font-bold text-gray-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-display text-lg font-bold text-gray-900">
                Keep reading: set up a professional business email
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                A business email with your own domain makes your card — and
                your business — look more serious to customers.
              </p>
            </div>
            <a
              href="/blog/set-up-business-email-nigeria"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all shrink-0"
            >
              Read the guide
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
