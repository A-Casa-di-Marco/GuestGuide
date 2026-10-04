"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Languages, Moon, Phone, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SlideTabs } from "@/components/ui/slide-tabs";
import { LANGS, LANG_LABEL, ui, type Lang } from "@/lib/i18n";
import { NAV_ROUTES, TEL_ASJA, TEL_AMBRA, WHATSAPP_ASJA, WHATSAPP_AMBRA, EMAIL_HREF, EMERGENCY_118, EMERGENCY_112 } from "@/lib/site";
import { withLang } from "@/lib/lang-server";
import { contacts, isHomeHtml, tHome } from "@/lib/content-home";
import { T } from "@/components/t";

type Props = { lang: Lang };

function ct(key: string, lang: Lang) {
  return <T text={tHome(key, lang)} html={isHomeHtml(key)} />;
}

export function SiteHeader({ lang }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  const activeId = pathname === "/" ? "home" : pathname.replace(/^\//, "").split("/")[0] || "home";

  const tabs = NAV_ROUTES.map((r) => ({
    id: r.id,
    href: withLang(r.href, lang),
    label: ui.nav[r.id as keyof typeof ui.nav][lang],
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-3 py-2 md:flex-nowrap md:gap-4 md:px-6">
        <Link
          href={withLang("/", lang)}
          className="mr-auto flex min-w-0 items-center gap-1.5 text-sm font-semibold text-foreground no-underline sm:gap-2 sm:text-base md:text-lg"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/icon-192.png"
            alt=""
            aria-hidden="true"
            width={28}
            height={28}
            className="h-6 w-6 shrink-0 rounded-full object-cover sm:h-7 sm:w-7"
          />
          <span className="truncate">{ui.brand[lang]}</span>
        </Link>

        <div className="order-3 w-full overflow-x-auto pb-1 md:order-2 md:w-auto md:pb-0">
          <SlideTabs
            tabs={tabs}
            value={activeId}
            ariaLabel={ui.brand[lang]}
            onChange={(id) => {
              const route = NAV_ROUTES.find((r) => r.id === id);
              if (route) router.push(withLang(route.href, lang));
            }}
          />
        </div>

        <div className="order-2 ml-auto flex items-center gap-2 md:order-3 md:ml-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                aria-label={ui.changeLanguage[lang]}
                className="min-h-[44px] min-w-[44px]"
              >
                <Languages className="h-5 w-5" aria-hidden />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {LANGS.map((l) => (
                <DropdownMenuItem
                  key={l}
                  aria-checked={l === lang}
                  onSelect={() => router.push(withLang(pathname, l))}
                >
                  {l === lang ? "✓ " : ""}
                  {LANG_LABEL[l]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                aria-label={ui.openContacts[lang]}
                className="min-h-[44px] min-w-[44px]"
              >
                <Phone className="h-5 w-5" aria-hidden />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] overflow-y-auto bg-card text-card-foreground">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">
                  {ct(contacts.title, lang)}
                </DialogTitle>
              </DialogHeader>
              <ContactsCard lang={lang} />
            </DialogContent>
          </Dialog>

          <Button
            variant="secondary"
            size="icon"
            aria-label={dark ? ui.lightTheme[lang] : ui.darkTheme[lang]}
            onClick={() => setTheme(dark ? "light" : "dark")}
            className="min-h-[44px] min-w-[44px]"
          >
            {dark ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
          </Button>
        </div>
      </div>
    </header>
  );
}

export function ContactsCard({ lang }: { lang: Lang }) {
  return (
    <div className="grid gap-3">
      <div className="rounded-xl bg-secondary p-4 text-secondary-foreground">
        <strong className="block text-base">Asja</strong>
        <p className="m-0 text-sm">{ct(contacts.asjaRole, lang)}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <a
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground no-underline"
            href={TEL_ASJA}
          >
            {ct(contacts.call, lang)}
          </a>
          <a
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-card-foreground no-underline"
            href={WHATSAPP_ASJA}
            target="_blank"
            rel="noreferrer"
          >
            {ct(contacts.whatsapp, lang)}
          </a>
        </div>
      </div>
      <div className="rounded-xl bg-secondary p-4 text-secondary-foreground">
        <strong className="block text-base">Ambra</strong>
        <p className="m-0 text-sm">{ct("index_082", lang)}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <a
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground no-underline"
            href={TEL_AMBRA}
          >
            {ct(contacts.call, lang)}
          </a>
          <a
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-card-foreground no-underline"
            href={WHATSAPP_AMBRA}
            target="_blank"
            rel="noreferrer"
          >
            {ct(contacts.whatsapp, lang)}
          </a>
        </div>
      </div>
      <div className="rounded-xl bg-secondary p-4 text-secondary-foreground">
        <strong className="block text-base">Email</strong>
        <p className="m-0 text-sm">{ct(contacts.emailRole, lang)}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <a
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground no-underline"
            href={EMAIL_HREF}
          >
            {ct(contacts.emailCta, lang)}
          </a>
        </div>
      </div>
      <div className="rounded-xl bg-accent p-4 text-accent-foreground">
        <strong className="block">{ct(contacts.emergencyTitle, lang)}</strong>
        <p className="m-0 text-sm">{ct(contacts.emergencyText, lang)}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <a
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground no-underline"
            href={EMERGENCY_118}
          >
            {ct(contacts.call118, lang)}
          </a>
          <a
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground no-underline"
            href={EMERGENCY_112}
          >
            {ct(contacts.call112, lang)}
          </a>
        </div>
      </div>
    </div>
  );
}
