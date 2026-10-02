'use client';
import Link from 'next/link';
import {useState,type FormEvent} from 'react';
export default function Login(){
 const [password,setPassword]=useState(''),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 async function submit(e:FormEvent){
  e.preventDefault();setBusy(true);setError('');
  try{
   const r=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password})});
   const j=await r.json() as {error?:string};
   if(!r.ok)throw new Error(j.error||'Accesso non riuscito.');
   location.reload();
  }catch(err){setError((err as Error).message);}finally{setBusy(false);}
 }
 return <main className="manager">
   <header><Link href="/index.html">A Casa di Marco — Guida ospiti</Link><span>Area riservata</span></header>
  <h1>Accesso riservato</h1>
  <p>Inserisci la password per gestire le guide degli ospiti.</p>
  <form onSubmit={submit}>
   <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} autoFocus autoComplete="current-password" required/></label>
   <div className="actions"><button disabled={busy}>{busy?'Attendi…':'Accedi'}</button></div>
  </form>
  <p role="status" className="status">{error}</p>
 </main>;
}
