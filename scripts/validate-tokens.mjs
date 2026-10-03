// Vieta hex hardcoded fuori dal design system (app/globals.css, docs, legacy public/).
// Uso: node scripts/validate-tokens.mjs
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["app", "components", "lib", "hooks"];
const EXT = [".tsx", ".ts", ".css"];
const ALLOW_FILES = new Set(["app/globals.css"]);
const HEX = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g;
const RGBA = /rgba?\([^)]*\)/g;

let failed = false;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      if (name === "api" || name === "gestione") continue;
      walk(p);
    } else if (EXT.some((e) => p.endsWith(e)) && !ALLOW_FILES.has(relative(".", p).replace(/\\/g, "/"))) {
      const rel = relative(".", p).replace(/\\/g, "/");
      // componenti shadcn generati (boilerplate non toccato dal refactor, solo slide-tabs.tsx è nostro)
      if (rel.startsWith("components/ui/") && rel !== "components/ui/slide-tabs.tsx") return;
      const src = readFileSync(p, "utf8");
      const lines = src.split("\n");
      lines.forEach((line, i) => {
        if (line.includes("content.generated.ts")) return;
        if (line.includes("palette:legacy")) return;
        if (line.trim().startsWith("//") || line.trim().startsWith("*")) return;
        const hexes = line.match(HEX);
        if (hexes) {
          console.log(`HEX ${relative(".", p)}:${i + 1}: ${hexes.join(", ")}`);
          failed = true;
        }
        if ((p.endsWith(".tsx") || p.endsWith(".ts")) && !line.includes("0,0,0")) {
          const rgbas = line.match(RGBA);
          if (rgbas) {
            console.log(`RGBA ${relative(".", p)}:${i + 1}: ${rgbas.join(", ")}`);
            failed = true;
          }
        }
      });
    }
  }
}

for (const r of ROOTS) walk(r);

if (failed) {
  console.error("Valori colore hardcoded trovati: usare i token semantici (bg-card, text-foreground, ...).");
  process.exit(1);
}
console.log("Nessun colore hardcoded fuori dal design system.");
