"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedFeatureCardProps {
  className?: string;
  /** Numero indice, es. "001" */
  index: string;
  /** Etichetta di categoria */
  tag: string;
  /** Titolo principale */
  title: React.ReactNode;
  /** URL immagine centrale (se assente, mostra l'icona in grande) */
  imageSrc?: string | null;
  /** Icona pertinente quando non c'è immagine */
  icon?: React.ReactNode;
  /** Variante cromatica (token del sito, light+dark) */
  color?: "green" | "sand" | "gold";
  /** Mostra il numero indice in alto a sinistra */
  showIndex?: boolean;
}

const colorVariants = {
  green: {
    "--feature-wash": "var(--secondary)",
  },
  sand: {
    "--feature-wash": "var(--accent)",
  },
  gold: {
    "--feature-wash": "var(--secondary)",
  },
} as const;

const AnimatedFeatureCard = React.forwardRef<HTMLDivElement, AnimatedFeatureCardProps>(
  ({ className, index, tag, title, imageSrc, icon, color = "green", showIndex = true }, ref) => {
    const cardStyle = colorVariants[color] as React.CSSProperties;

    return (
      <motion.div
        ref={ref}
        style={cardStyle}
        className={cn(
          "relative flex h-[380px] w-full max-w-sm flex-col justify-end overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm",
          className,
        )}
        whileHover="hover"
        initial="initial"
        variants={{
          initial: { y: 0 },
          hover: { y: -10 },
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <div
          aria-hidden
          className="absolute inset-0 z-0 opacity-60 dark:opacity-30"
          style={{
            background: "radial-gradient(circle at 50% 30%, var(--feature-wash) 0%, transparent 70%)",
          }}
        />

        {showIndex ? (
          <div className="absolute left-6 top-6 font-mono text-lg font-bold text-muted-foreground">
            {index}
          </div>
        ) : null}

        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center"
          variants={{
            initial: { scale: 1, y: 0 },
            hover: { scale: 1.3, y: -20 },
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageSrc} alt={tag} className="h-40 w-40 object-contain" loading="lazy" />
          ) : (
            <span aria-hidden className="text-primary dark:text-secondary-foreground">
              {icon}
            </span>
          )}
        </motion.div>

        <div className="relative z-20 rounded-lg border border-border bg-background/80 p-4 backdrop-blur-sm">
          <span className="mb-2 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
            {tag}
          </span>
          <p className="text-base text-card-foreground">{title}</p>
        </div>
      </motion.div>
    );
  },
);
AnimatedFeatureCard.displayName = "AnimatedFeatureCard";

export { AnimatedFeatureCard };
