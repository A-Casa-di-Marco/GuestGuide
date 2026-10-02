// Copia .dev.vars accanto a wrangler.json (wrangler dev legge .dev.vars solo lì).
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';

const src = '.dev.vars';
const destDir = 'dist/server';
const dest = destDir + '/.dev.vars';

if (!existsSync(src)) process.exit(0);
mkdirSync(destDir, { recursive: true });
copyFileSync(src, dest);
