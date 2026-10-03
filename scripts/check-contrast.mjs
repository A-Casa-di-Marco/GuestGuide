// Verifica contrasto WCAG 2.1 per i token light/dark (soglia 4.5:1 testo normale).
const pairs = [
  ["light bg/fg", "#f6f4ec", "#2b3327"],
  ["light card/fg", "#ffffff", "#2b3327"],
  ["light primary/white", "#3a5a40", "#ffffff"],
  ["light secondary/fg", "#e7ede3", "#22331f"],
  ["light accent/fg", "#f7f2e2", "#2b3327"],
  ["dark bg/fg", "#121a11", "#f6f4ec"],
  ["dark card/fg", "#1c261b", "#f6f4ec"],
  ["dark primary/fg", "#9db89f", "#121a11"],
  ["dark secondary/fg", "#2a3629", "#f6f4ec"],
  ["dark muted/fg", "#2a3629", "#cfd8c9"],
];

function luminance(hex) {
  const c = hex.replace("#", "");
  const rgb = [0, 2, 4].map((i) => {
    const v = parseInt(c.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function ratio(a, b) {
  const l1 = luminance(a);
  const l2 = luminance(b);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

let failed = false;
for (const [name, bg, fg] of pairs) {
  const r = ratio(bg, fg);
  const ok = r >= 4.5;
  console.log(`${ok ? "PASS" : "FAIL"} ${name}: ${r.toFixed(2)}:1 (bg ${bg} / fg ${fg})`);
  if (!ok) failed = true;
}
if (failed) {
  console.error("Contrasto insufficiente: ogni coppia deve essere >= 4.5:1.");
  process.exit(1);
} else {
  console.log("Tutte le coppie rispettano il contrasto 4.5:1.");
}
