import {cookies} from 'next/headers';
import {verifySessionToken} from '../../lib/stays';
import Manager from './manager';
import Login from './login';
export const dynamic='force-dynamic';
export default async function Page(){
 const jar=await cookies();
 const token=jar.get('acdm_session')?.value;
 let ok=false;
 if(token){try{ok=await verifySessionToken(token);}catch{ok=false;}}
 if(!ok)return <Login/>;
 return <Manager/>;
}
