import { env } from 'cloudflare:workers';
export type Stay = {id:string;name:string;checkin:string;checkout:string;updated_at:string};
export function database(){if(!env.DB)throw new Error('Database unavailable');return env.DB;}

// --- Autenticazione proprietaria: sessione firmata HMAC in cookie HttpOnly.
// Nessun header di identità dal browser viene considerato affidabile.
const SESSION_COOKIE='acdm_session';
const SESSION_TTL_SECONDS=7*24*3600;
const enc=(s:string)=>new TextEncoder().encode(s);
function bytesEqual(a:Uint8Array,b:Uint8Array){if(a.length!==b.length)return false;let d=0;for(let i=0;i<a.length;i++)d|=a[i]^b[i];return d===0;}
async function sha256Bytes(s:string){return new Uint8Array(await crypto.subtle.digest('SHA-256',enc(s)));}
function ownerSecret(){const p=env.OWNER_PASSWORD;if(!p)throw new Error('OWNER_PASSWORD non impostata');return p;}
async function sign(exp:number){
 const key=await sha256Bytes(ownerSecret()+'|acdm-session-v1');
 const k=await crypto.subtle.importKey('raw',key,{name:'HMAC',hash:'SHA-256'},false,['sign']);
 const sig=new Uint8Array(await crypto.subtle.sign('HMAC',k,enc('v1:'+exp)));
 let hex='';for(const b of sig)hex+=b.toString(16).padStart(2,'0');
 return hex;
}
export async function createSessionToken(){
 const exp=Math.floor(Date.now()/1000)+SESSION_TTL_SECONDS;
 return exp+'.'+(await sign(exp));
}
export async function verifySessionToken(token:string){
 const dot=token.indexOf('.');if(dot<0)return false;
 const exp=Number(token.slice(0,dot));if(!Number.isFinite(exp)||exp<=Math.floor(Date.now()/1000))return false;
 const expected=await sign(exp);
 const given=token.slice(dot+1);
 if(given.length!==expected.length)return false;
 return bytesEqual(enc(given),enc(expected));
}
export function readSession(request:Request){
 const cookie=request.headers.get('cookie')||'';
 for(const part of cookie.split(';')){const kv=part.trim();if(kv.startsWith(SESSION_COOKIE+'='))return kv.slice(SESSION_COOKIE.length+1);}
 return null;
}
export async function isOwner(request:Request){const t=readSession(request);return !!t&&(await verifySessionToken(t));}
export function sessionSetHeaders(token:string,secure:boolean){
 return SESSION_COOKIE+'='+token+'; Path=/; HttpOnly; SameSite=Lax; Max-Age='+SESSION_TTL_SECONDS+(secure?'; Secure':'');
}
export function sessionClearHeaders(secure:boolean){
 return SESSION_COOKIE+'=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0'+(secure?'; Secure':'');
}
export async function passwordMatches(provided:string){
 // confronto su hash a lunghezza fissa, in tempo costante
 const [a,b]=await Promise.all([sha256Bytes(provided),sha256Bytes(ownerSecret())]);
 return bytesEqual(a,b);
}
// ponytail: contatore in memoria per isolate; sufficiente per un pannello a singolo utente,
// passare a Rate Limiting binding di Cloudflare se servisse una limitazione globale.
const attempts=new Map<string,{n:number;reset:number}>();
export function loginThrottled(ip:string){
 const now=Date.now();const rec=attempts.get(ip);
 if(!rec||rec.reset<now){attempts.set(ip,{n:1,reset:now+15*60_000});return false;}
 rec.n++;return rec.n>10;
}

export function safeMutation(request:Request){const origin=request.headers.get('origin');return !!origin&&origin===new URL(request.url).origin;}
// consuma SEMPRE il body prima di rispondere: workerd crasha l'isolate se una richiesta
// con body torna una risposta senza che lo stream sia stato letto ("Can't read from request stream")
export async function readBody(request:Request){try{return await request.text();}catch{return '';}}
export function validId(value:string){return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);}
export function parseStay(value:unknown){
 if(!value||typeof value!=='object')throw new Error('Inserisci il nome degli ospiti.');
 const v=value as Record<string,unknown>;const name=typeof v.name==='string'?v.name.trim():'';
 const checkin=typeof v.checkin==='string'?v.checkin:'';const checkout=typeof v.checkout==='string'?v.checkout:'';
 if(!name||name.length>100)throw new Error('Il nome deve contenere da 1 a 100 caratteri.');
 const date=(s:string)=>!s||(/^\d{4}-\d{2}-\d{2}$/.test(s)&&!isNaN(Date.parse(s))&&new Date(s).toISOString().slice(0,10)===s);
 if(!date(checkin)||!date(checkout)||(!!checkin!==!!checkout)||(checkin&&checkout<=checkin))throw new Error('Inserisci entrambe le date, con il check-out successivo al check-in, oppure lascia entrambe vuote.');
 return {name,checkin,checkout};
}
export function reply(data:unknown,status=200){return Response.json(data,{status,headers:{'Cache-Control':'no-store'}});}
