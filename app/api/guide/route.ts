import {database,reply,validId} from '../../../lib/stays';
export const dynamic='force-dynamic';
export async function GET(request:Request){
 const id=new URL(request.url).searchParams.get('g')||'';
 if(!validId(id))return reply({stay:null});
 try{const stay=await database().prepare('SELECT id,name,checkin,checkout FROM guide_stays WHERE id=?').bind(id).first();return reply({stay});}
 catch(e){console.error('guest guide read failed',e);return reply({error:'La personalizzazione non è disponibile al momento.'},503);}
}
