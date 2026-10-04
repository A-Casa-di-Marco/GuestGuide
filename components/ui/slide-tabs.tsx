"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type SlideTabItem = {
  id: string;
  label: string;
  href: string;
};

type Props = {
  tabs: SlideTabItem[];
  value: string;
  onChange: (id: string) => void;
  ariaLabel: string;
  className?: string;
};

/**
 * Navigazione a pill con cursore framer-motion che segue la voce attiva + hover.
 * Usa link reali con aria-current (navigazione tra pagine, non tabpanel).
 */
export function SlideTabs({ tabs, value, onChange, ariaLabel, className }: Props) {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const selected = Math.max(
    0,
    tabs.findIndex((t) => t.id === value),
  );
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const labelsKey = tabs.map((t) => t.label).join("|");

  useEffect(() => {
    const sync = () => {
      const el = itemsRef.current[selected];
      if (!el) return;
      const { width } = el.getBoundingClientRect();
      setPosition({ left: el.offsetLeft, width, opacity: 1 });
    };
    sync();
    window.addEventListener("resize", sync);
    const fontsReady = document.fonts?.ready.then(sync).catch(() => undefined);
    void fontsReady;
    return () => window.removeEventListener("resize", sync);
  }, [selected, tabs.length, labelsKey]);

  return (
    <nav aria-label={ariaLabel} className={className}>
      <ul
        onMouseLeave={() => {
          const el = itemsRef.current[selected];
          if (!el) return;
          const { width } = el.getBoundingClientRect();
          setPosition({ left: el.offsetLeft, width, opacity: 1 });
        }}
        className="relative mx-auto flex w-fit rounded-full border border-border bg-secondary p-1"
      >
        {tabs.map((tab, i) => (
          <li
            key={tab.id}
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
            onMouseEnter={() => {
              const el = itemsRef.current[i];
              if (!el) return;
              const { width } = el.getBoundingClientRect();
              setPosition({ left: el.offsetLeft, width, opacity: 1 });
            }}
            className="relative z-10 block"
          >
            <a
              href={tab.href}
              aria-current={i === selected ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                onChange(tab.id);
              }}
              className={cn(
                "block cursor-pointer rounded-full px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wide no-underline sm:px-3 md:px-5 md:py-2.5 md:text-sm",
                i === selected ? "text-primary-foreground" : "text-secondary-foreground",
              )}
            >
              {tab.label}
            </a>
          </li>
        ))}
        <motion.li
          aria-hidden
          animate={{ ...position }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
          className="absolute inset-y-1 left-0 z-0 rounded-full bg-primary"
        />
      </ul>
    </nav>
  );
}
