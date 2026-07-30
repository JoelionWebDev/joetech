"use client";

export default function ClientButton({ children, href, scrollToTop, className = "", ariaLabel = "" }) {
  const handleClick = () => {
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (href) {
      window.open(href, "_blank");
    }
  };

  return (
    <button onClick={handleClick} className={className} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
