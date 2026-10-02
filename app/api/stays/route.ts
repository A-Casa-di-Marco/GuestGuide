import {database,isOwner,safeMutation,parseStay,readBody,reply,validId} from '../../../lib/stays';
export const dynamic='force-dynamic';
export async function GET(request:Request){
 if(!(await isOwner(request)))return reply({error:'Accesso riservato alla proprietaria.'},403);
 try{const result=await database().prepare('SELECT id,name,checkin,checkout,updated_at FROM guide_stays ORDER BY updated_at DESC').all();return reply({stays:result.results});}
 catch(e){console.error('stays read failed',e);return reply({error:'Non riesco a caricare le guide. Riprova.'},503);}
}
async function save(request:Request,update:boolean){
 const raw=await readBody(request);
 if(!(await isOwner(request)))return reply({error:'Accesso riservato alla proprietaria.'},403);
 if(!safeMutation(request))return reply({error:'Richiesta non consentita.'},403);
 let input;try{input=JSON.parse(raw);}catch{return reply({error:'Dati non validi.'},400);}
 let stay;try{stay=parseStay(input);}catch(e){return reply({error:(e as Error).message},400);}
 const id=update?(input as {id?:string}).id:crypto.randomUUID();if(!validId(id||''))return reply({error:'Guida non valida.'},400);
 try{
  let result;
  if(update)result=await database().prepare('UPDATE guide_stays SET name=?,checkin=?,checkout=?,updated_at=? WHERE id=?').bind(stay.name,stay.checkin,stay.checkout,new Date().toISOString(),id).run();
  else result=await database().prepare('INSERT INTO guide_stays (id,name,checkin,checkout,updated_at) VALUES (?,?,?,?,?)').bind(id,stay.name,stay.checkin,stay.checkout,new Date().toISOString()).run();
  if(update&&!result.meta.changes)return reply({error:'Guida non trovata.'},404);
  return reply({stay:{id,...stay}});
 }catch(e){console.error('stay save failed',e);return reply({error:'Salvataggio non riuscito. I dati nel modulo sono conservati: riprova.'},503);}
}
export async function POST(r:Request){return save(r,false);}
export async function PUT(r:Request){return save(r,true);}
export async function DELETE(request:Request){
 await readBody(request);
 if(!(await isOwner(request))||!safeMutation(request))return reply({error:'Accesso non consentito.'},403);
 const id=new URL(request.url).searchParams.get('id')||'';if(!validId(id))return reply({error:'Guida non valida.'},400);
 try{await database().prepare('DELETE FROM guide_stays WHERE id=?').bind(id).run();return reply({ok:true});}catch(e){console.error('stay delete failed',e);return reply({error:'Non riesco a rimuovere la guida. Riprova.'},503);}
}
