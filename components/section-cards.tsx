"use client";

import { useRef, useState } from "react";
import {
  Coffee,
  CookingPot,
  House,
  Info,
  KeyRound,
  Recycle,
  ShowerHead,
  Sparkles,
  Thermometer,
  Umbrella,
  Users,
  UtensilsCrossed,
  WashingMachine,
  Wifi,
  Zap,
} from "lucide-react";
import { AnimatedFeatureCard } from "@/components/ui/animated-feature-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLegacyEnhancers } from "@/components/use-legacy-enhancers";
import type { Lang } from "@/lib/i18n";

export type SectionCardData = {
  id: string;
  index: string;
  icon: string;
  image: string | null;
  tag: Record<Lang, string>;
  title: Record<Lang, string>;
  body: Record<Lang, string>;
};

const ICONS: Record<string, typeof KeyRound> = {
  KeyRound,
  Wifi,
  Recycle,
  Thermometer,
  Umbrella,
  Coffee,
  CookingPot,
  WashingMachine,
  ShowerHead,
  UtensilsCrossed,
  Info,
  Users,
  Sparkles,
  House,
  Zap,
};

const COLORS = ["green", "sand", "gold"] as const;

function CardOverlay({
  card,
  lang,
  onClose,
}: {
  card: SectionCardData | null;
  lang: Lang;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useLegacyEnhancers(ref, lang, card?.id);

  return (
    <Dialog open={card !== null} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[88vh] w-[min(94vw,680px)] overflow-y-auto bg-card text-card-foreground">
        {card ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl text-foreground sm:text-3xl">
                {card.title[lang]}
              </DialogTitle>
            </DialogHeader>
            <div ref={ref} className="legacy-content mt-2" dangerouslySetInnerHTML={{ __html: card.body[lang] }} />
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

/** Sezioni della guida come card selezionabili con overlay informativo. */
export function SectionCards({ cards, lang }: { cards: SectionCardData[]; lang: Lang }) {
  const [selected, setSelected] = useState<string | null>(null);
  const card = cards.find((c) => c.id === selected) || null;

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => {
          const Icon = ICONS[c.icon] ?? Info;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelected(c.id)}
              aria-haspopup="dialog"
              className="block w-full max-w-sm justify-self-center rounded-2xl text-left sm:justify-self-auto"
            >
              <AnimatedFeatureCard
                index={c.index}
                tag={c.tag[lang]}
                title={c.title[lang]}
                imageSrc={null}
                icon={<Icon className="h-24 w-24 sm:h-28 sm:w-28" aria-hidden />}
                color={COLORS[i % COLORS.length]}
                showIndex={false}
                className="h-[320px] sm:h-[380px]"
              />
            </button>
          );
        })}
      </div>
      <CardOverlay card={card} lang={lang} onClose={() => setSelected(null)} />
    </>
  );
}
