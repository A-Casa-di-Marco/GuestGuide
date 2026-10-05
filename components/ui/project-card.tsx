"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  /** Immagine di riserva se imgSrc non esiste (es. asset da aggiungere). */
  fallbackSrc?: string;
  title: string;
  description: string;
  link: string;
  linkText?: string;
  /** Se falso, il link si apre nella stessa scheda (rotte interne). */
  external?: boolean;
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ className, imgSrc, fallbackSrc, title, description, link, linkText = "View Project", external = true, ...props }, ref) => {
    const [src, setSrc] = React.useState(imgSrc);
    React.useEffect(() => setSrc(imgSrc), [imgSrc]);
    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl",
          className,
        )}
        {...props}
      >
        <div className="aspect-video overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={title}
            onError={() => {
              if (fallbackSrc && src !== fallbackSrc) setSrc(fallbackSrc);
            }}
            className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            loading="lazy"
          />
        </div>

        <div className="flex flex-1 flex-col p-6 text-center">
          <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-primary">
            {title}
          </h3>
          <p className="mt-3 flex-1 text-[15px] text-muted-foreground">{description}</p>

          <a
            href={link}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group/button mt-4 inline-flex items-center justify-center gap-2 text-sm font-medium text-primary transition-all duration-300 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {linkText}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" aria-hidden />
          </a>
        </div>
      </div>
    );
  },
);
ProjectCard.displayName = "ProjectCard";

export { ProjectCard };
