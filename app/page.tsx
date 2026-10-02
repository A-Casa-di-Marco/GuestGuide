import {redirect} from 'next/navigation';
export const dynamic='force-dynamic';
export default async function Home({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){const p=await searchParams;const q=new URLSearchParams();for(const k of ['g','lang']){if(typeof p[k]==='string')q.set(k,p[k] as string);}redirect('/index.html'+(q.size?'?'+q.toString():''));}
