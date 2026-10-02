import {sessionClearHeaders,safeMutation,readBody,reply} from '../../../lib/stays';
export const dynamic='force-dynamic';
export async function POST(request:Request){
 await readBody(request);
 if(!safeMutation(request))return reply({error:'Richiesta non consentita.'},403);
 const secure=new URL(request.url).protocol==='https:';
 return new Response(JSON.stringify({ok:true}),{status:200,headers:{'Content-Type':'application/json','Cache-Control':'no-store','Set-Cookie':sessionClearHeaders(secure)}});
}
