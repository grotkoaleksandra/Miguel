"use client";

import { useEffect, useRef } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span" | "blockquote";
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export function TextReveal({
  children,
  className = "",
  tag: Tag = "p",
  delay = 0,
  stagger = 0.03,
  once = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLSpanElement>(".word-reveal");
    words.forEach((word, i) => {
      word.style.transition = `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * stagger}s, opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * stagger}s`;
      word.style.transform = "translateY(100%)";
      word.style.opacity = "0";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          words.forEach((word) => {
            word.style.transform = "translateY(0)";
            word.style.opacity = "1";
          });
          if (once) observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, stagger, once]);

  const wordSpans = children.split(" ").map((word, i) => (
    <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
      <span className="word-reveal inline-block">{word}</span>
    </span>
  ));

  return (
    <Tag ref={containerRef as React.Ref<never>} className={className}>
      {wordSpans}
    </Tag>
  );
}
