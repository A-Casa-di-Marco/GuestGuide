// Completta dist/server/wrangler.json dopo la build: database D1 reale + migrazioni.
// In locale senza D1_DATABASE_ID lascia il placeholder (il D1 locale usa .wrangler/state).
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'dist/server/wrangler.json';
const D1_NAME = 'a-casa-di-maro';

const config = JSON.parse(readFileSync(FILE, 'utf8'));
const db = config.d1_databases?.[0];
if (!db) {
  console.error('wrangler.json: nessun d1_databases[0]');
  process.exit(1);
}
db.database_name = D1_NAME;
db.migrations_dir = '../../drizzle';

const id = process.env.D1_DATABASE_ID;
if (id) {
  db.database_id = id;
} else {
  console.warn('D1_DATABASE_ID assente: database_id resta il placeholder (ok solo in locale).');
}

writeFileSync(FILE, JSON.stringify(config, null, 2) + '\n');
console.log(`wrangler.json aggiornato: name=${config.name} d1=${db.database_name} id=${db.database_id} migrations=${db.migrations_dir}`);
