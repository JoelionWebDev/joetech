"use client";

import { useMemo, useState } from "react";
import {
  Briefcase,
  Check,
  Copy,
  FileText,
  GraduationCap,
  Plus,
  Printer,
  RotateCcw,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const THEMES = {
  blue: {
    label: "Joetech Blue",
    swatch: "bg-blue-600",
    accentText: "text-blue-600",
    accentBg: "bg-blue-600",
    chip: "bg-blue-50 text-blue-700 border border-blue-200",
    pickerActive: "border-blue-600 bg-blue-50 text-blue-700",
  },
  navy: {
    label: "Midnight Navy",
    swatch: "bg-slate-900",
    accentText: "text-slate-900",
    accentBg: "bg-slate-900",
    chip: "bg-slate-100 text-slate-800 border border-slate-300",
    pickerActive: "border-slate-900 bg-slate-100 text-slate-900",
  },
  gold: {
    label: "Gold",
    swatch: "bg-amber-500",
    accentText: "text-amber-700",
    accentBg: "bg-amber-500",
    chip: "bg-amber-50 text-amber-800 border border-amber-200",
    pickerActive: "border-amber-500 bg-amber-50 text-amber-800",
  },
};

const emptyPersonal = {
  fullName: "",
  jobTitle: "",
  phone: "",
  email: "",
  location: "",
  linkedin: "",
};

const emptyExperience = () => ({
  id: uid(),
  jobTitle: "",
  company: "",
  start: "",
  end: "",
  achievements: "",
});

const emptyEducation = () => ({
  id: uid(),
  qualification: "",
  school: "",
  year: "",
});

const SAMPLE = {
  personal: {
    fullName: "Adaeze Okafor",
    jobTitle: "Digital Marketing Executive",
    phone: "+234 803 000 0000",
    email: "adaeze.okafor@example.com",
    location: "Lekki, Lagos",
    linkedin: "linkedin.com/in/adaezeokafor-demo",
  },
  summary:
    "Results-driven digital marketer with 4 years of experience helping Nigerian small businesses grow online. Skilled in social media campaigns, paid ads and content that turns followers into customers.",
  experience: [
    {
      id: "sample-exp-1",
      jobTitle: "Digital Marketing Executive",
      company: "BrightPath Digital Ltd, Lagos",
      start: "Mar 2023",
      end: "Present",
      achievements:
        "Grew a client's Instagram following from 2,000 to 12,000 in 8 months\nRan Meta ad campaigns that brought in 300+ WhatsApp enquiries a month\nWrote weekly email newsletters with a steady 40% open rate",
    },
    {
      id: "sample-exp-2",
      jobTitle: "Marketing Assistant",
      company: "Sunrise Media, Ikeja",
      start: "Jun 2021",
      end: "Feb 2023",
      achievements:
        "Scheduled and published daily content across Instagram and Facebook\nHelped organise 6 client product launches and open days",
    },
  ],
  education: [
    {
      id: "sample-edu-1",
      qualification: "B.Sc. Mass Communication",
      school: "University of Lagos",
      year: "2019",
    },
  ],
  skills:
    "Social Media Marketing, Content Strategy, Google Ads, SEO, Email Marketing, Canva",
};

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none";
const labelCls =
  "mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500";
const cardCls = "rounded-3xl border border-slate-200 bg-white p-5 shadow-sm";
const btnPrimary =
  "inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors";
const btnSoft =
  "inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-700 transition-colors";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      {children}
    </label>
  );
}

export default function CvBuilder() {
  const [personal, setPersonal] = useState(emptyPersonal);
  const [summary, setSummary] = useState("");
  const [experience, setExperience] = useState([emptyExperience()]);
  const [education, setEducation] = useState([emptyEducation()]);
  const [skillsText, setSkillsText] = useState("");
  const [themeKey, setThemeKey] = useState("blue");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const theme = THEMES[themeKey];

  const skills = useMemo(
    () => skillsText.split(",").map((s) => s.trim()).filter(Boolean),
    [skillsText]
  );

  const contactParts = [
    personal.phone,
    personal.email,
    personal.location,
    personal.linkedin,
  ].filter(Boolean);

  const filledExperience = experience.filter(
    (e) => e.jobTitle.trim() || e.company.trim()
  );
  const filledEducation = education.filter(
    (e) => e.qualification.trim() || e.school.trim()
  );

  const plainText = () => {
    const lines = [];
    lines.push((personal.fullName || "Your Name").toUpperCase());
    if (personal.jobTitle.trim()) lines.push(personal.jobTitle);
    if (contactParts.length) lines.push(contactParts.join(" | "));
    lines.push("");
    if (summary.trim()) {
      lines.push("PROFESSIONAL SUMMARY");
      lines.push(summary.trim());
      lines.push("");
    }
    if (filledExperience.length) {
      lines.push("WORK EXPERIENCE");
      filledExperience.forEach((e) => {
        const dates = [e.start.trim(), e.end.trim()]
          .filter(Boolean)
          .join(" - ");
        lines.push(
          `${e.jobTitle || "Job title"} — ${e.company || "Company"}${dates ? ` (${dates})` : ""}`
        );
        e.achievements
          .split("\n")
          .map((a) => a.trim())
          .filter(Boolean)
          .forEach((a) => lines.push(`• ${a}`));
      });
      lines.push("");
    }
    if (filledEducation.length) {
      lines.push("EDUCATION");
      filledEducation.forEach((e) => {
        lines.push(
          `${e.qualification || "Qualification"} — ${e.school || "School"}${e.year.trim() ? ` (${e.year.trim()})` : ""}`
        );
      });
      lines.push("");
    }
    if (skills.length) {
      lines.push("SKILLS");
      lines.push(skills.join(", "));
    }
    return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  };

  const copyText = async () => {
    const text = plainText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setMessage("CV copied as plain text — paste it into an email, form or document.");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setCopied(true);
        setMessage("CV copied as plain text — paste it into an email, form or document.");
        setTimeout(() => setCopied(false), 2500);
      } catch {
        setMessage("Copy did not work in this browser — select the preview text and copy it manually.");
      }
    }
  };

  const loadSample = () => {
    setPersonal({ ...SAMPLE.personal });
    setSummary(SAMPLE.summary);
    setExperience(SAMPLE.experience.map((e) => ({ ...e })));
    setEducation(SAMPLE.education.map((e) => ({ ...e })));
    setSkillsText(SAMPLE.skills);
    setMessage(
      "Sample CV loaded — this is a fictional example person. Replace every detail with your own."
    );
  };

  const clearAll = () => {
    setPersonal(emptyPersonal);
    setSummary("");
    setExperience([emptyExperience()]);
    setEducation([emptyEducation()]);
    setSkillsText("");
    setMessage("Cleared — start with a blank CV.");
  };

  const setExp = (id, patch) =>
    setExperience((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...patch } : e))
    );
  const setEdu = (id, patch) =>
    setEducation((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...patch } : e))
    );

  const form = (
    <div className="space-y-5">
      {/* Personal details */}
      <section className={cardCls}>
        <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
          <User className="w-5 h-5 text-blue-600" /> Personal details
        </h2>
        <div className="mt-4 space-y-3">
          <Field label="Full name">
            <input
              className={inputCls}
              placeholder="e.g. Adaeze Okafor"
              value={personal.fullName}
              onChange={(e) =>
                setPersonal({ ...personal, fullName: e.target.value })
              }
            />
          </Field>
          <Field label="Job title / role you want">
            <input
              className={inputCls}
              placeholder="e.g. Digital Marketing Executive"
              value={personal.jobTitle}
              onChange={(e) =>
                setPersonal({ ...personal, jobTitle: e.target.value })
              }
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Phone">
              <input
                className={inputCls}
                placeholder="+234 ..."
                value={personal.phone}
                onChange={(e) =>
                  setPersonal({ ...personal, phone: e.target.value })
                }
              />
            </Field>
            <Field label="Email">
              <input
                className={inputCls}
                placeholder="you@email.com"
                value={personal.email}
                onChange={(e) =>
                  setPersonal({ ...personal, email: e.target.value })
                }
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Location">
              <input
                className={inputCls}
                placeholder="e.g. Lekki, Lagos"
                value={personal.location}
                onChange={(e) =>
                  setPersonal({ ...personal, location: e.target.value })
                }
              />
            </Field>
            <Field label="LinkedIn / website">
              <input
                className={inputCls}
                placeholder="linkedin.com/in/yourname"
                value={personal.linkedin}
                onChange={(e) =>
                  setPersonal({ ...personal, linkedin: e.target.value })
                }
              />
            </Field>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className={cardCls}>
        <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
          <FileText className="w-5 h-5 text-blue-600" /> Professional summary
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Two or three sentences about what you do and the results you bring.
        </p>
        <textarea
          className={`${inputCls} mt-3`}
          rows={4}
          placeholder="e.g. Results-driven digital marketer with 4 years of experience helping small businesses grow online..."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </section>

      {/* Work experience */}
      <section className={cardCls}>
        <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
          <Briefcase className="w-5 h-5 text-blue-600" /> Work experience
        </h2>
        <div className="mt-4 space-y-4">
          {experience.map((exp, idx) => (
            <div
              key={exp.id}
              className="rounded-2xl border border-slate-200 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Role {idx + 1}
                </span>
                {experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setExperience((prev) =>
                        prev.filter((e) => e.id !== exp.id)
                      )
                    }
                    className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Job title">
                  <input
                    className={inputCls}
                    placeholder="e.g. Sales Executive"
                    value={exp.jobTitle}
                    onChange={(e) =>
                      setExp(exp.id, { jobTitle: e.target.value })
                    }
                  />
                </Field>
                <Field label="Company">
                  <input
                    className={inputCls}
                    placeholder="e.g. BrightPath Digital, Lagos"
                    value={exp.company}
                    onChange={(e) =>
                      setExp(exp.id, { company: e.target.value })
                    }
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Start">
                  <input
                    className={inputCls}
                    placeholder="e.g. Jan 2023"
                    value={exp.start}
                    onChange={(e) =>
                      setExp(exp.id, { start: e.target.value })
                    }
                  />
                </Field>
                <Field label="End">
                  <input
                    className={inputCls}
                    placeholder="e.g. Dec 2024 or Present"
                    value={exp.end}
                    onChange={(e) => setExp(exp.id, { end: e.target.value })}
                  />
                </Field>
              </div>
              <Field label="Achievements — one per line">
                <textarea
                  className={inputCls}
                  rows={3}
                  placeholder="e.g. Grew Instagram following from 2,000 to 12,000 in 8 months"
                  value={exp.achievements}
                  onChange={(e) =>
                    setExp(exp.id, { achievements: e.target.value })
                  }
                />
              </Field>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setExperience((prev) => [...prev, emptyExperience()])}
            className={btnSoft}
          >
            <Plus className="w-4 h-4" /> Add another role
          </button>
        </div>
      </section>

      {/* Education */}
      <section className={cardCls}>
        <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
          <GraduationCap className="w-5 h-5 text-blue-600" /> Education
        </h2>
        <div className="mt-4 space-y-4">
          {education.map((edu, idx) => (
            <div
              key={edu.id}
              className="rounded-2xl border border-slate-200 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Education {idx + 1}
                </span>
                {education.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setEducation((prev) =>
                        prev.filter((e) => e.id !== edu.id)
                      )
                    }
                    className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                )}
              </div>
              <Field label="Qualification">
                <input
                  className={inputCls}
                  placeholder="e.g. B.Sc. Mass Communication"
                  value={edu.qualification}
                  onChange={(e) =>
                    setEdu(edu.id, { qualification: e.target.value })
                  }
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="School / institution">
                  <input
                    className={inputCls}
                    placeholder="e.g. University of Lagos"
                    value={edu.school}
                    onChange={(e) =>
                      setEdu(edu.id, { school: e.target.value })
                    }
                  />
                </Field>
                <Field label="Year">
                  <input
                    className={inputCls}
                    placeholder="e.g. 2019"
                    value={edu.year}
                    onChange={(e) => setEdu(edu.id, { year: e.target.value })}
                  />
                </Field>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setEducation((prev) => [...prev, emptyEducation()])}
            className={btnSoft}
          >
            <Plus className="w-4 h-4" /> Add another qualification
          </button>
        </div>
      </section>

      {/* Skills */}
      <section className={cardCls}>
        <h2 className="text-base font-bold text-slate-900">Skills</h2>
        <p className="mt-1 text-sm text-slate-500">
          Separate each skill with a comma — they will appear as chips on
          your CV.
        </p>
        <input
          className={`${inputCls} mt-3`}
          placeholder="e.g. Social Media Marketing, SEO, Google Ads, Canva"
          value={skillsText}
          onChange={(e) => setSkillsText(e.target.value)}
        />
        {skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${theme.chip}`}
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </section>
    </div>
  );

  const preview = (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm print:rounded-none print:border-0 print:shadow-none print:p-0">
      {/* Header */}
      <div className="text-center">
        <h2
          className={`font-display text-3xl font-extrabold tracking-tight ${personal.fullName ? "text-slate-900" : "text-slate-300"}`}
        >
          {personal.fullName || "Your Name"}
        </h2>
        <p
          className={`mt-1 text-base font-semibold ${theme.accentText} ${personal.jobTitle ? "" : "opacity-40"}`}
        >
          {personal.jobTitle || "Your Job Title"}
        </p>
        <p className="mt-2 text-xs text-slate-500">
          {contactParts.length
            ? contactParts.join("  ·  ")
            : "Phone  ·  Email  ·  Location  ·  LinkedIn / website"}
        </p>
      </div>
      <div className={`mt-5 h-1 w-full rounded-full ${theme.accentBg}`} />

      {/* Summary */}
      {summary.trim() && (
        <section className="mt-6">
          <h3
            className={`text-xs font-bold uppercase tracking-widest ${theme.accentText}`}
          >
            Professional Summary
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {summary.trim()}
          </p>
        </section>
      )}

      {/* Experience */}
      {filledExperience.length > 0 && (
        <section className="mt-6">
          <h3
            className={`text-xs font-bold uppercase tracking-widest ${theme.accentText}`}
          >
            Work Experience
          </h3>
          <div className="mt-3 space-y-4">
            {filledExperience.map((e) => (
              <div key={e.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-bold text-slate-900">
                    {e.jobTitle || "Job title"}
                    {e.company ? (
                      <span className="font-medium text-slate-600">
                        {" "}
                        — {e.company}
                      </span>
                    ) : null}
                  </p>
                  <p className="text-xs text-slate-500">
                    {[e.start.trim(), e.end.trim()]
                      .filter(Boolean)
                      .join(" – ")}
                  </p>
                </div>
                {e.achievements.trim() && (
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-700">
                    {e.achievements
                      .split("\n")
                      .map((a) => a.trim())
                      .filter(Boolean)
                      .map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {filledEducation.length > 0 && (
        <section className="mt-6">
          <h3
            className={`text-xs font-bold uppercase tracking-widest ${theme.accentText}`}
          >
            Education
          </h3>
          <div className="mt-3 space-y-2">
            {filledEducation.map((e) => (
              <div
                key={e.id}
                className="flex flex-wrap items-baseline justify-between gap-2"
              >
                <p className="text-sm font-bold text-slate-900">
                  {e.qualification || "Qualification"}
                  {e.school ? (
                    <span className="font-medium text-slate-600">
                      {" "}
                      — {e.school}
                    </span>
                  ) : null}
                </p>
                <p className="text-xs text-slate-500">{e.year.trim()}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mt-6">
          <h3
            className={`text-xs font-bold uppercase tracking-widest ${theme.accentText}`}
          >
            Skills
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${theme.chip}`}
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  return (
    <div>
      {/* Action bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3 print:hidden">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Theme
          </span>
          {Object.entries(THEMES).map(([key, t]) => (
            <button
              key={key}
              type="button"
              onClick={() => setThemeKey(key)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${
                themeKey === key
                  ? t.pickerActive
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <span className={`h-3 w-3 rounded-full ${t.swatch}`} />
              {t.label}
            </button>
          ))}
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <button type="button" onClick={loadSample} className={btnSoft}>
            <Sparkles className="w-4 h-4" /> Load sample
          </button>
          <button type="button" onClick={clearAll} className={btnSoft}>
            <RotateCcw className="w-4 h-4" /> Clear
          </button>
          <button type="button" onClick={copyText} className={btnSoft}>
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? "Copied!" : "Copy plain-text CV"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className={btnPrimary}
          >
            <Printer className="w-4 h-4" /> Print / Save as PDF
          </button>
        </div>
      </div>

      {message && (
        <p className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800 print:hidden">
          {message}
        </p>
      )}

      {/* Form + preview */}
      <div className="grid gap-8 lg:grid-cols-2 print:block">
        <div className="print:hidden">{form}</div>
        <div className="lg:sticky lg:top-24 lg:self-start print:static">{preview}</div>
      </div>

      {/* How to use */}
      <section className="mt-16 print:hidden">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900">
          How to use this CV builder
        </h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              step: "1",
              title: "Fill in your details",
              text: "Start with your name, role, phone, email and location.",
            },
            {
              step: "2",
              title: "Add experience & education",
              text: "List your roles with real achievements — what changed because of you.",
            },
            {
              step: "3",
              title: "Pick a theme",
              text: "Choose the accent colour that suits the job you are applying for.",
            },
            {
              step: "4",
              title: "Print or copy",
              text: "Save as a PDF for applications, or copy the plain-text version for online forms.",
            },
          ].map((s) => (
            <li
              key={s.step}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {s.step}
              </span>
              <h3 className="mt-3 font-bold text-slate-900">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="mt-16 print:hidden">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900">
          CV questions, answered
        </h2>
        <div className="mt-6 space-y-4">
          {[
            {
              q: "Should I tailor my CV for each job?",
              a: "Yes — this is the single biggest improvement you can make. Read the job advert, note the exact skills and words it uses, then mirror them in your summary, experience and skills. One tailored CV beats ten identical ones.",
            },
            {
              q: "How long should my CV be?",
              a: "One page is enough for most roles, especially if you are early in your career. Two pages is fine once you have several years of experience — but only if every line earns its place. Cut anything that does not help you get this specific job.",
            },
            {
              q: "Should I include a photo on my CV?",
              a: "It is not required for most jobs in Nigeria, and many recruiters prefer a CV without one. Your skills, results and contact details matter far more than a photo — leave it out unless the job advert specifically asks for one.",
            },
            {
              q: "What if I have no work experience yet?",
              a: "Lead with your education, then add projects, volunteer work, internships, freelance gigs or anything where you solved a real problem for someone. Recruiters care about proof you can do the work — a small project with a result beats a blank experience section.",
            },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="font-bold text-slate-900">{item.q}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {item.a}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-5">
          <p className="text-sm leading-relaxed text-slate-700">
            <span className="font-bold text-slate-900">Going further: </span>
            read{" "}
            <a
              href="/blog/secure-tech-job-age-of-ai"
              className="font-semibold text-blue-700 underline hover:text-blue-800"
            >
              How to Secure Your Tech Job in the Age of AI
            </a>{" "}
            on the Joetech blog — a practical strategy for staying
            indispensable as AI reshapes hiring.
          </p>
        </div>
      </section>
    </div>
  );
}
