"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, FilePlus2, Printer, Save, Share2, Sparkles } from "lucide-react";

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const today = () => new Date().toISOString().slice(0, 10);
const fmt = (n) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);

const emptyBusiness = { name: "", phone: "", email: "", address: "", logo: "" };
const emptyClient = { name: "", phone: "", email: "", address: "" };

const PAYMENT_METHODS = ["Bank transfer", "Cash", "POS", "Mobile transfer"];
const DOC_PREFIX = { Quote: "QT-", Invoice: "INV-", Receipt: "RCPT-" };
const stripPrefix = (n) => n.replace(/^(QT-|INV-|RCPT-)/, "");

const sample = () => ({
  docType: "Quote",
  docNumber: "QT-2026-001",
  business: {
    name: "Joetech",
    phone: "+234 816 709 9131",
    email: "info@joetech.name.ng",
    address: "Chevron Alternative Route, Lekki, Lagos, Nigeria",
    logo: "",
  },
  client: {
    name: "Sunrise Boutique, Lekki",
    phone: "+234 803 000 0000",
    email: "hello@sunriseboutique.example",
    address: "Admiralty Way, Lekki Phase 1, Lagos",
  },
  items: [
    { id: uid(), description: "Business website design and build (5 pages)", quantity: 1, unitPrice: 450000 },
    { id: uid(), description: "Logo and brand identity package", quantity: 1, unitPrice: 180000 },
    { id: uid(), description: "Social media launch graphics (10 designs)", quantity: 1, unitPrice: 120000 },
  ],
  discountKind: "amount",
  discountValue: 0,
  vatOn: false,
  payment: { bankName: "", accountNumber: "", accountName: "" },
  paymentMethod: "Bank transfer",
  notes:
    "Valid for 14 days from the date above. A 50% deposit confirms the booking; the balance is due on delivery. Prices cover design and build only — domain and hosting renewals, where needed, are billed separately.",
});

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15";
const labelCls = "mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500";
const cardCls = "rounded-3xl border border-slate-200 bg-white p-5 shadow-sm";
const btnPrimary =
  "inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700";
const btnSoft =
  "inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-700";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      {children}
    </label>
  );
}

export default function InvoiceTool() {
  const [docType, setDocType] = useState("Quote");
  const [docNumber, setDocNumber] = useState("QT-2026-001");
  const [docDate, setDocDate] = useState(today());
  const [business, setBusiness] = useState(emptyBusiness);
  const [client, setClient] = useState(emptyClient);
  const [items, setItems] = useState([
    { id: uid(), description: "", quantity: 1, unitPrice: 0 },
  ]);
  const [discountKind, setDiscountKind] = useState("amount");
  const [discountValue, setDiscountValue] = useState(0);
  const [vatOn, setVatOn] = useState(false);
  const [payment, setPayment] = useState({ bankName: "", accountNumber: "", accountName: "" });
  const [paymentMethod, setPaymentMethod] = useState("Bank transfer");
  const [notes, setNotes] = useState("");
  const [drafts, setDrafts] = useState([]);
  const [message, setMessage] = useState("");
  const [mobileTab, setMobileTab] = useState("edit");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("qit-drafts");
      if (raw) setDrafts(JSON.parse(raw));
    } catch {
      // No saved drafts — start blank.
    }
  }, []);

  const persistDrafts = (next) => {
    setDrafts(next);
    try {
      localStorage.setItem("qit-drafts", JSON.stringify(next));
    } catch {
      setMessage("Could not save that draft in this browser (storage unavailable).");
    }
  };

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + (Number(i.quantity) || 0) * (Number(i.unitPrice) || 0), 0),
    [items]
  );
  const discount =
    discountKind === "percent" ? (subtotal * (discountValue || 0)) / 100 : discountValue || 0;
  const afterDiscount = Math.max(0, subtotal - discount);
  const vat = vatOn ? afterDiscount * 0.075 : 0;
  const grandTotal = afterDiscount + vat;

  const summaryText = () => {
    const lines = items
      .filter((i) => i.description.trim())
      .map((i) => `• ${i.description} — ${i.quantity} × ${fmt(i.unitPrice)} = ${fmt(i.quantity * i.unitPrice)}`)
      .join("\n");
    return (
      `${docType} ${docNumber} — ${business.name || "Your Business"}\n` +
      `For: ${client.name || "Client"} | Date: ${docDate}\n` +
      `${lines}\n` +
      `Subtotal: ${fmt(subtotal)}\n` +
      (discount ? `Discount: -${fmt(discount)}\n` : "") +
      (vatOn ? `VAT (7.5%): ${fmt(vat)}\n` : "") +
      (docType === "Receipt" ? `Payment method: ${paymentMethod}\n` : "") +
      `Total: ${fmt(grandTotal)}`
    );
  };

  const switchDocType = (type) => {
    setDocType(type);
    setDocNumber((n) => `${DOC_PREFIX[type]}${stripPrefix(n)}`);
  };

  const loadSample = () => {
    const s = sample();
    setDocType(s.docType);
    setDocNumber(s.docNumber);
    setBusiness(s.business);
    setClient(s.client);
    setItems(s.items);
    setDiscountKind(s.discountKind);
    setDiscountValue(s.discountValue);
    setVatOn(s.vatOn);
    setPayment(s.payment);
    setPaymentMethod(s.paymentMethod);
    setNotes(s.notes);
    setDocDate(today());
    setMessage("Sample quote loaded — edit any field to make it yours.");
    setMobileTab("preview");
  };

  const clearAll = () => {
    const filled = (o) => Object.values(o).some((v) => String(v || "").trim() !== "");
    const hasContent =
      filled(business) ||
      filled(client) ||
      filled(payment) ||
      notes.trim() !== "" ||
      items.some(
        (i) => i.description.trim() !== "" || Number(i.quantity) !== 1 || Number(i.unitPrice) !== 0,
      ) ||
      discountValue !== 0 ||
      vatOn;
    if (
      hasContent &&
      !window.confirm("Start a new document? This clears everything on this page.")
    ) {
      return;
    }
    setDocType("Quote");
    setDocNumber("QT-2026-001");
    setDocDate(today());
    setBusiness(emptyBusiness);
    setClient(emptyClient);
    setItems([{ id: uid(), description: "", quantity: 1, unitPrice: 0 }]);
    setDiscountKind("amount");
    setDiscountValue(0);
    setVatOn(false);
    setPayment({ bankName: "", accountNumber: "", accountName: "" });
    setPaymentMethod("Bank transfer");
    setNotes("");
    setMessage("Cleared — ready for a new document.");
    setMobileTab("edit");
  };

  const saveDraft = () => {
    const draft = {
      id: uid(),
      savedAt: new Date().toLocaleString("en-NG"),
      docType,
      docNumber,
      business,
      client,
      items,
      discountKind,
      discountValue,
      vatOn,
      payment,
      paymentMethod,
      notes,
    };
    persistDrafts([draft, ...drafts]);
    setMessage(`Draft saved (${docType} ${docNumber}). Find it in Saved drafts below.`);
  };

  const loadDraft = (d) => {
    setDocType(d.docType);
    setDocNumber(d.docNumber);
    setBusiness(d.business);
    setClient(d.client);
    setItems(d.items);
    setDiscountKind(d.discountKind);
    setDiscountValue(d.discountValue);
    setVatOn(d.vatOn);
    setPayment(d.payment);
    setPaymentMethod(d.paymentMethod || "Bank transfer");
    setNotes(d.notes);
    setMessage(`Draft loaded (${d.docType} ${d.docNumber}).`);
    setMobileTab("preview");
  };

  const deleteDraft = (id) => persistDrafts(drafts.filter((d) => d.id !== id));

  const onLogo = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setBusiness((b) => ({ ...b, logo: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryText());
      setMessage("Summary copied — paste it into WhatsApp, email or anywhere else.");
    } catch {
      setMessage("Copy did not work in this browser — select the summary text and copy it manually.");
    }
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(summaryText())}`, "_blank", "noopener");
  };

  const printPdf = () => window.print();

  const setItem = (id, patch) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  const docTypeBtn = (type) => (
    <button
      type="button"
      onClick={() => switchDocType(type)}
      className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
        docType === type ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600"
      }`}
    >
      {type}
    </button>
  );

  const editor = (
    <div className="space-y-5">
      {/* Document type */}
      <section className={cardCls}>
        <h2 className="text-base font-bold">Document</h2>
        <p className="mt-1 text-sm text-slate-500">
          Create a quote, an invoice or a receipt — switch at any time. The number prefix updates
          with the document type.
        </p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {docTypeBtn("Quote")}
          {docTypeBtn("Invoice")}
          {docTypeBtn("Receipt")}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Field label="Document number">
            <input className={inputCls} value={docNumber} onChange={(e) => setDocNumber(e.target.value)} />
          </Field>
          <Field label="Date">
            <input type="date" className={inputCls} value={docDate} onChange={(e) => setDocDate(e.target.value)} />
          </Field>
        </div>
      </section>

      {/* Business */}
      <section className={cardCls}>
        <h2 className="text-base font-bold">Your business</h2>
        <div className="mt-4 space-y-3">
          <Field label="Business name">
            <input className={inputCls} placeholder="e.g. Joetech" value={business.name} onChange={(e) => setBusiness({ ...business, name: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Phone">
              <input className={inputCls} placeholder="+234 ..." value={business.phone} onChange={(e) => setBusiness({ ...business, phone: e.target.value })} />
            </Field>
            <Field label="Email">
              <input className={inputCls} placeholder="you@business.com" value={business.email} onChange={(e) => setBusiness({ ...business, email: e.target.value })} />
            </Field>
          </div>
          <Field label="Address">
            <textarea className={inputCls} rows={2} placeholder="Street, area, city" value={business.address} onChange={(e) => setBusiness({ ...business, address: e.target.value })} />
          </Field>
          <div>
            <span className={labelCls}>Logo (preview only, saved in your browser)</span>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                className="text-sm"
                onChange={(e) => onLogo(e.target.files?.[0])}
              />
              {business.logo && (
                <button type="button" className="text-sm font-semibold text-red-600" onClick={() => setBusiness({ ...business, logo: "" })}>
                  Remove
                </button>
              )}
            </div>
            {business.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={business.logo} alt="Business logo preview" className="mt-3 h-16 w-auto rounded-lg border border-slate-200 bg-white object-contain" />
            )}
          </div>
        </div>
      </section>

      {/* Client */}
      <section className={cardCls}>
        <h2 className="text-base font-bold">Client</h2>
        <div className="mt-4 space-y-3">
          <Field label="Client name">
            <input className={inputCls} placeholder="Client or company name" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Phone">
              <input className={inputCls} placeholder="+234 ..." value={client.phone} onChange={(e) => setClient({ ...client, phone: e.target.value })} />
            </Field>
            <Field label="Email">
              <input className={inputCls} placeholder="client@email.com" value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} />
            </Field>
          </div>
          <Field label="Address">
            <textarea className={inputCls} rows={2} placeholder="Client address (optional)" value={client.address} onChange={(e) => setClient({ ...client, address: e.target.value })} />
          </Field>
        </div>
      </section>

      {/* Items */}
      <section className={cardCls}>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">Items</h2>
          <button type="button" className={btnSoft} onClick={() => setItems([...items, { id: uid(), description: "", quantity: 1, unitPrice: 0 }])}>
            + Add item
          </button>
        </div>
        <div className="mt-4 space-y-4">
          {items.map((item, idx) => (
            <div key={item.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">ITEM {idx + 1}</span>
                {items.length > 1 && (
                  <button type="button" className="text-sm font-semibold text-red-600" onClick={() => setItems(items.filter((i) => i.id !== item.id))}>
                    Remove
                  </button>
                )}
              </div>
              <div className="mt-3 space-y-3">
                <Field label="Description">
                  <input className={inputCls} placeholder="e.g. Business website design and build" value={item.description} onChange={(e) => setItem(item.id, { description: e.target.value })} />
                </Field>
                <div className="grid grid-cols-3 gap-3">
                  <Field label="Qty">
                    <input type="number" min={0} step={1} className={inputCls} value={item.quantity} onChange={(e) => setItem(item.id, { quantity: Number(e.target.value) })} />
                  </Field>
                  <Field label="Unit price (₦)">
                    <input type="number" min={0} step={1000} className={inputCls} value={item.unitPrice} onChange={(e) => setItem(item.id, { unitPrice: Number(e.target.value) })} />
                  </Field>
                  <div>
                    <span className={labelCls}>Line total</span>
                    <p className="px-1 py-2.5 text-sm font-bold">{fmt(item.quantity * item.unitPrice)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Totals */}
      <section className={cardCls}>
        <h2 className="text-base font-bold">Discount &amp; VAT</h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Field label="Discount type">
            <select className={inputCls} value={discountKind} onChange={(e) => setDiscountKind(e.target.value)}>
              <option value="amount">Amount (₦)</option>
              <option value="percent">Percentage (%)</option>
            </select>
          </Field>
          <Field label={discountKind === "percent" ? "Discount (%)" : "Discount (₦)"}>
            <input type="number" min={0} className={inputCls} value={discountValue} onChange={(e) => setDiscountValue(Number(e.target.value))} />
          </Field>
        </div>
        <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
          <input type="checkbox" className="h-5 w-5 accent-blue-600" checked={vatOn} onChange={(e) => setVatOn(e.target.checked)} />
          <span className="text-sm font-semibold">Add 7.5% VAT</span>
          <span className="ml-auto text-sm font-bold">{fmt(vat)}</span>
        </label>
        <div className="mt-4 space-y-1 text-sm">
          <p className="flex justify-between"><span className="text-slate-500">Subtotal</span><b>{fmt(subtotal)}</b></p>
          <p className="flex justify-between"><span className="text-slate-500">Discount</span><b>-{fmt(discount)}</b></p>
          <p className="flex justify-between"><span className="text-slate-500">VAT (7.5%)</span><b>{fmt(vat)}</b></p>
          <p className="flex justify-between border-t border-slate-200 pt-2 text-base"><span>Grand total</span><b className="text-blue-700">{fmt(grandTotal)}</b></p>
        </div>
      </section>

      {/* Payment + notes */}
      <section className={cardCls}>
        <h2 className="text-base font-bold">Payment details <span className="font-normal text-slate-400">(shown on invoices and receipts)</span></h2>
        <div className="mt-4 space-y-3">
          {docType === "Receipt" && (
            <Field label="Payment method">
              <select className={inputCls} value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                {PAYMENT_METHODS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </Field>
          )}
          <Field label="Bank name">
            <input className={inputCls} placeholder="e.g. GTBank" value={payment.bankName} onChange={(e) => setPayment({ ...payment, bankName: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Account number">
              <input className={inputCls} placeholder="0123456789" value={payment.accountNumber} onChange={(e) => setPayment({ ...payment, accountNumber: e.target.value })} />
            </Field>
            <Field label="Account name">
              <input className={inputCls} placeholder="Account holder name" value={payment.accountName} onChange={(e) => setPayment({ ...payment, accountName: e.target.value })} />
            </Field>
          </div>
          <Field label="Notes / terms">
            <textarea className={inputCls} rows={3} placeholder="Validity, deposit, delivery terms…" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Field>
        </div>
      </section>

      {/* Drafts */}
      <section className={cardCls}>
        <h2 className="text-base font-bold">Saved drafts</h2>
        <p className="mt-1 text-sm text-slate-500">Drafts are saved in this browser only (localStorage) — not on a server.</p>
        {drafts.length === 0 ? (
          <p className="mt-3 text-sm text-slate-400">No drafts yet. Save this document to see it here.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {drafts.map((d) => (
              <li key={d.id} className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-100 px-3 py-2 text-sm">
                <span className="font-semibold">{d.docType} {d.docNumber}</span>
                <span className="text-slate-400">{d.savedAt}</span>
                <button type="button" className="ml-auto font-semibold text-blue-700" onClick={() => loadDraft(d)}>Load</button>
                <button type="button" className="font-semibold text-red-600" onClick={() => deleteDraft(d.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );

  const hasPaymentDetails = payment.bankName || payment.accountNumber || payment.accountName;

  const preview = (
    <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 print:rounded-none print:border-0 print:p-0 print:shadow-none">
      {docType === "Receipt" && (
        <div className="pointer-events-none absolute right-5 top-24 rotate-[-10deg] rounded-lg border-4 border-emerald-600 px-3 py-1 text-xl font-extrabold uppercase tracking-[0.2em] text-emerald-600/80">
          Paid
        </div>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          {business.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={business.logo} alt="Business logo" className="mb-3 h-14 w-auto object-contain" />
          ) : null}
          <h2 className="text-xl font-extrabold text-slate-900">{business.name || "Your Business Name"}</h2>
          <p className="mt-1 whitespace-pre-line text-sm text-slate-500">
            {[business.address, business.phone, business.email].filter(Boolean).join("\n") || "Your business address, phone and email"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-extrabold uppercase tracking-wide text-blue-700">{docType}</p>
          <p className="mt-1 text-sm text-slate-500">{docNumber}</p>
          <p className="text-sm text-slate-500">{docDate}</p>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-200 pt-4">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Billed to</p>
        <p className="mt-1 font-semibold">{client.name || "Client name"}</p>
        <p className="whitespace-pre-line text-sm text-slate-500">
          {[client.address, client.phone, client.email].filter(Boolean).join("\n") || "Client details"}
        </p>
        {docType === "Receipt" && (
          <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Received with thanks from <b>{client.name || "the client named above"}</b> — payment
            received by {paymentMethod.toLowerCase()}.
          </p>
        )}
      </div>

      <table className="mt-6 w-full text-sm">
        <thead>
          <tr className="border-b-2 border-slate-900 text-left">
            <th className="py-2 pr-2">Description</th>
            <th className="py-2 pr-2 text-right">Qty</th>
            <th className="py-2 pr-2 text-right">Unit price</th>
            <th className="py-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id} className="border-b border-slate-100">
              <td className="py-2 pr-2">{i.description || "—"}</td>
              <td className="py-2 pr-2 text-right">{i.quantity}</td>
              <td className="py-2 pr-2 text-right">{fmt(i.unitPrice)}</td>
              <td className="py-2 text-right font-semibold">{fmt(i.quantity * i.unitPrice)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="ml-auto mt-4 w-full max-w-xs space-y-1 text-sm">
        <p className="flex justify-between"><span className="text-slate-500">Subtotal</span><b>{fmt(subtotal)}</b></p>
        {discount > 0 && <p className="flex justify-between"><span className="text-slate-500">Discount</span><b>-{fmt(discount)}</b></p>}
        {vatOn && <p className="flex justify-between"><span className="text-slate-500">VAT (7.5%)</span><b>{fmt(vat)}</b></p>}
        <p className="flex justify-between border-t border-slate-900 pt-2 text-base">
          <span className="font-bold">{docType === "Receipt" ? "Amount received" : "Total"}</span>
          <b className="text-blue-700">{fmt(grandTotal)}</b>
        </p>
      </div>

      {(docType === "Invoice" || docType === "Receipt") && (hasPaymentDetails || docType === "Receipt") && (
        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm">
          <p className="font-bold">Payment details</p>
          {docType === "Receipt" && (
            <p className="mt-1 text-slate-600">Payment method: {paymentMethod}</p>
          )}
          {hasPaymentDetails && (
            <p className="mt-1 text-slate-600">
              {[payment.bankName, payment.accountNumber ? `Account: ${payment.accountNumber}` : "", payment.accountName].filter(Boolean).join(" • ")}
            </p>
          )}
        </div>
      )}

      {notes && (
        <div className="mt-6 text-sm">
          <p className="font-bold">Notes / terms</p>
          <p className="mt-1 whitespace-pre-line text-slate-600">{notes}</p>
        </div>
      )}

      <p className="mt-8 border-t border-slate-200 pt-4 text-center text-xs text-slate-400">
        Built by Joetech — joetech.name.ng
      </p>
    </div>
  );

  return (
    <div>
      {/* Action bar */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 print:hidden">
        <div className="flex flex-wrap items-center gap-2 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mr-auto">
            <h2 className="text-lg font-extrabold text-slate-900">Make your document</h2>
            <p className="text-sm text-slate-500">Fill in the details — the preview updates as you type.</p>
          </div>
          <button type="button" className={btnSoft} onClick={clearAll}><FilePlus2 className="h-4 w-4" /> New</button>
          <button type="button" className={btnSoft} onClick={loadSample}><Sparkles className="h-4 w-4" /> Load sample</button>
          <button type="button" className={btnSoft} onClick={saveDraft}><Save className="h-4 w-4" /> Save draft</button>
          <button type="button" className={btnSoft} onClick={copySummary}><Copy className="h-4 w-4" /> Copy summary</button>
          <button type="button" className={btnSoft} onClick={shareWhatsApp}><Share2 className="h-4 w-4" /> Share via WhatsApp</button>
          <button type="button" className={btnPrimary} onClick={printPdf}><Printer className="h-4 w-4" /> Print / Download PDF</button>
        </div>
        {message && (
          <p className="mt-3 rounded-2xl bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">{message}</p>
        )}
      </div>

      {/* Mobile tabs */}
      <div className="sticky top-0 z-10 mx-auto flex max-w-7xl gap-2 bg-slate-100 px-4 py-2 sm:px-6 lg:hidden print:hidden">
        <button type="button" onClick={() => setMobileTab("edit")} className={`flex-1 rounded-full py-2 text-sm font-bold ${mobileTab === "edit" ? "bg-blue-600 text-white" : "bg-white text-slate-600"}`}>Edit</button>
        <button type="button" onClick={() => setMobileTab("preview")} className={`flex-1 rounded-full py-2 text-sm font-bold ${mobileTab === "preview" ? "bg-blue-600 text-white" : "bg-white text-slate-600"}`}>Preview</button>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-2 print:grid-cols-1 print:px-0 print:py-0">
        <div className={`print:hidden ${mobileTab === "edit" ? "block" : "hidden lg:block"}`}>{editor}</div>
        <div className={`${mobileTab === "preview" ? "block" : "hidden lg:block"} print:block`}>
          <div className="mb-3 flex items-center justify-between print:hidden">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Live preview</h2>
            <span className="text-xs text-slate-400">Updates as you type • Print shows only this document</span>
          </div>
          {preview}
          <p className="mt-3 text-center text-xs text-slate-400 print:hidden">
            Tip: Print / Download PDF opens your browser&apos;s print dialog — choose &quot;Save as PDF&quot; to download.
          </p>
        </div>
      </div>
    </div>
  );
}
