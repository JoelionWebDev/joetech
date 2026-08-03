"use client";
import { useState } from "react";
import { PHONE_NUMBER, PHONE_TEL, CONTACT_EMAIL } from "../../lib/site";

const CONTACT_INFO = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    value: PHONE_NUMBER,
    href: `tel:${PHONE_TEL}`,
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
    label: "WhatsApp",
    value: "Chat with us",
    href: "https://wa.me/message/RKDWPWCNYQKTG1",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Office",
    value: "Lagos, Nigeria",
    href: null,
    color: "from-purple-500 to-violet-600",
  },
];

const SOCIALS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100094879577107",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@joetechstudio",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/igono-joel-88b680185/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#060b18]">
      {/* Hero header */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400 text-xs font-medium tracking-wide uppercase">Get in touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Let's build something
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              amazing together
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
            Have a project in mind? Drop us a message and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact info sidebar */}
            <div className="lg:col-span-2 space-y-4">
              {CONTACT_INFO.map((item) => (
                <div
                  key={item.label}
                  className="group bg-white/5 backdrop-blur-md border border-white/5 hover:border-white/10 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}>
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-white font-medium hover:text-blue-400 transition-colors truncate block"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Socials */}
              <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-md border border-white/5 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-3">Follow us</h3>
                <div className="flex items-center gap-3">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={s.path} />
                      </svg>
                    </a>
                  ))}
                </div>
                <p className="mt-4 text-xs text-slate-500">Response time: Usually within 24 hours</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-white mb-6">Send us a message</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactForm() {
  const [data, setData] = useState({ fullName: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.fullName || !data.email || !data.message) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          message: data.message,
        }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Failed to send");

      setStatus("success");
      setData({ fullName: "", email: "", phone: "", service: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-[#0b1229] border border-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-1.5">Full Name <span className="text-red-400">*</span></label>
          <input type="text" id="fullName" name="fullName" value={data.fullName} onChange={handleChange} required className={inputClass} placeholder="Joelion" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">Email <span className="text-red-400">*</span></label>
          <input type="email" id="email" name="email" value={data.email} onChange={handleChange} required className={inputClass} placeholder="name@example.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1.5">Phone <span className="text-slate-500 text-xs">(Optional)</span></label>
          <input type="tel" id="phone" name="phone" value={data.phone} onChange={handleChange} className={inputClass} placeholder="+234 800 000 0000" />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-slate-300 mb-1.5">Service</label>
          <select id="service" name="service" value={data.service} onChange={handleChange} className={inputClass}>
            <option value="" className="bg-[#0b1229]">Select a service</option>
            <option value="web-development" className="bg-[#0b1229]">Web Development</option>
            <option value="mobile-app" className="bg-[#0b1229]">Mobile App Development</option>
            <option value="software-solutions" className="bg-[#0b1229]">Software Solutions</option>
            <option value="tech-consultation" className="bg-[#0b1229]">Tech Consultation</option>
            <option value="digital-services" className="bg-[#0b1229]">Digital Services</option>
            <option value="other" className="bg-[#0b1229]">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">Message <span className="text-red-400">*</span></label>
        <textarea id="message" name="message" value={data.message} onChange={handleChange} required rows={5} className={`${inputClass} resize-none`} placeholder="Tell us about your project..." />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 disabled:opacity-50 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Sending...</span>
          </>
        ) : (
          <>
            Send Message
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>

      {status === "success" && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
          <p className="text-emerald-300 text-sm font-medium">✓ Message sent! We'll be in touch soon.</p>
        </div>
      )}
      {status === "error" && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <p className="text-red-300 text-sm font-medium">✗ Please fill in all required fields.</p>
        </div>
      )}
    </form>
  );
}
