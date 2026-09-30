// Offline cache for the app shell. Bump VERSION on every deploy.
const VERSION="ironcoach-v12";
const BASE=self.registration.scope; // works at "/" (Netlify) and "/ironcoach/" (GitHub Pages)
const SHELL=["","style.css","app.js","config.js","vendor/supabase.js","manifest.webmanifest","icons/v2/icon-192.png","icons/v2/icon-512.png"].map(p=>new URL(p,BASE).href);
self.addEventListener("install",e=>{
  // cache each file on its own so one failure never blocks installing the app
  e.waitUntil(caches.open(VERSION).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const u=new URL(e.request.url);
  if(u.origin===location.origin){
    e.respondWith(fetch(e.request,{cache:"no-cache"}).then(r=>{if(r.ok&&!r.redirected){const c=r.clone();caches.open(VERSION).then(ca=>ca.put(e.request,c));}return r;})
      .catch(()=>caches.match(e.request).then(r=>r||(e.request.mode==="navigate"?caches.match(BASE):undefined)).then(r=>r||new Response("",{status:504}))));
  }else if(u.hostname.endsWith("fonts.googleapis.com")||u.hostname.endsWith("fonts.gstatic.com")){
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const c=res.clone();caches.open(VERSION).then(ca=>ca.put(e.request,c));return res;})));
  }
});
