"use client";

import { useRef, useState, useEffect, Children, cloneElement, isValidElement } from "react";

export default function StaggerGrid({ children, className = "", staggerDelay = 100, threshold = 0.1 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "50px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;
        const delay = `${index * staggerDelay}ms`;
        return cloneElement(child, {
          style: {
            ...(child.props.style || {}),
            transitionDelay: visible ? delay : "0ms",
          },
          className: `${child.props.className || ""} transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`,
        });
      })}
    </div>
  );
}
