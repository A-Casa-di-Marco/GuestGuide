import {loginThrottled,passwordMatches,createSessionToken,sessionSetHeaders,safeMutation,readBody,reply} from '../../../lib/stays';
export const dynamic='force-dynamic';
export async function POST(request:Request){
 const raw=await readBody(request);
 const ip=request.headers.get('cf-connecting-ip')||request.headers.get('x-forwarded-for')||'local';
 if(loginThrottled(ip))return reply({error:'Troppi tentativi. Riprova tra qualche minuto.'},429);
 if(!safeMutation(request))return reply({error:'Richiesta non consentita.'},403);
 let body:unknown;try{body=JSON.parse(raw);}catch{return reply({error:'Dati non validi.'},400);}
 const password=body&&typeof body==='object'&&typeof (body as {password?:unknown}).password==='string'?(body as {password:string}).password:'';
 if(!password||!(await passwordMatches(password))){
  await new Promise(resolve=>setTimeout(resolve,300));
  return reply({error:'Password non corretta.'},401);
 }
 const token=await createSessionToken();
 const secure=new URL(request.url).protocol==='https:';
 return new Response(JSON.stringify({ok:true}),{status:200,headers:{'Content-Type':'application/json','Cache-Control':'no-store','Set-Cookie':sessionSetHeaders(token,secure)}});
}
