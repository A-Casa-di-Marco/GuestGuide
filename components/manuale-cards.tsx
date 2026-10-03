"use client";

import { useRef, useState } from "react";
import {
  Coffee,
  CookingPot,
  Info,
  KeyRound,
  LifeBuoy,
  Recycle,
  ShowerHead,
  Thermometer,
  Umbrella,
  UtensilsCrossed,
  WashingMachine,
  Wifi,
} from "lucide-react";
import { AnimatedFeatureCard } from "@/components/ui/animated-feature-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLegacyEnhancers } from "@/components/use-legacy-enhancers";
import { manualeCards } from "@/lib/legacy/manuale-cards.generated";
import type { Lang } from "@/lib/i18n";

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
  LifeBuoy,
  Info,
};

const COLORS = ["green", "sand", "gold"] as const;

function CardOverlay({ cardId, lang, onClose }: { cardId: string | null; lang: Lang; onClose: () => void }) {
  const card = manualeCards.find((c) => c.id === cardId) || null;
  const ref = useRef<HTMLDivElement>(null);
  useLegacyEnhancers(ref, lang);

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

/** Sezioni del manuale come card selezionabili con overlay informativo. */
export function ManualeCards({ lang }: { lang: Lang }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {manualeCards.map((card, i) => {
          const Icon = ICONS[card.icon] ?? Info;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => setSelected(card.id)}
              aria-haspopup="dialog"
              className="block w-full max-w-sm justify-self-center rounded-2xl text-left sm:justify-self-auto"
            >
              <AnimatedFeatureCard
                index={card.index}
                tag={card.tag[lang]}
                title={card.title[lang]}
                imageSrc={card.image ? `/${card.image}` : null}
                icon={<Icon className="h-24 w-24" aria-hidden />}
                color={COLORS[i % COLORS.length]}
                className="h-[320px] sm:h-[380px]"
              />
            </button>
          );
        })}
      </div>
      <CardOverlay cardId={selected} lang={lang} onClose={() => setSelected(null)} />
    </>
  );
}
