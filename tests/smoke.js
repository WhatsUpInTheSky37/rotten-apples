// Headless smoke test for Rotten Apples.
//   npm install && npm test
// Loads index.html with a local copy of three.js, plays through the main paths and fails on any page error.
// Reports draw calls per spot so a change that blows up rendering cost is visible.
const path=require('path'),fs=require('fs');
const {chromium}=require('playwright');
const ROOT=path.join(__dirname,'..');
const THREE_LOCAL=path.join(ROOT,'node_modules/three/build/three.min.js');
const LIMITS={garden:450,treehouse:300,overpass:450,rooftop:800};// draw-call budgets (software renderer, 800x450)

function buildPage(){
  let html=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
  html=html.replace(/https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/three\.js\/r128\/three\.min\.js/,'file://'+THREE_LOCAL);
  // test hooks: fixed time step, scene stats, a direct windshield hit, showdown entry
  html=html.replace('const dt=Math.min(.05,raw)','const dt=window.__dt||Math.min(.05,raw)');
  html=html.replace('function placeCar(',`window.__t={
  info:()=>({calls:renderer.info.render.calls,tris:renderer.info.render.triangles,cars:world.cars.length,state}),
  go:(d,st)=>startRound(d,st),
  hit:(type)=>{const c=world.cars.filter(c=>!c.crashed&&!c.police&&!SPECIALS[c.kind]).sort((a,b)=>a.group.position.distanceTo(camera.position)-b.group.position.distanceTo(camera.position))[0];if(!c)return null;const T=c.T;const lp=new V3((T.cf+T.rf)/2,(T.belt+T.roof)/2,0);const pos=c.group.localToWorld(lp.clone());const s0=score;onHit(c,lp,{pos,type});return {gained:score-s0,crashed:c.crashed};},
  sd:(d)=>{dayIdx=d;DAY=DAYS[d];startShowdown();},
  sdState:()=>({state,phase:SD.phase,hp:SD.hp,route:SD.route,card:document.querySelector('#sdcard').hidden?'':document.querySelector('#sdTitle').textContent}),
  hitMan:()=>onManHit({pos:SD.man.position.clone().setY(1.2),type:'apple'}),
};
function placeCar(`);
  const out=path.join(__dirname,'.smoke.html');fs.writeFileSync(out,html);return out;
}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function waitFor(fn,cond,ms=240000){const t0=Date.now();let v;while(Date.now()-t0<ms){v=await fn();if(cond(v))return v;await sleep(500);}throw new Error('timeout waiting; last='+JSON.stringify(v));}

(async()=>{
  if(!fs.existsSync(THREE_LOCAL)){console.error('three.js not installed: run npm install');process.exit(2);}
  const page=buildPage();const fails=[];const ok=(c,msg)=>{console.log((c?'  ok   ':'  FAIL ')+msg);if(!c)fails.push(msg);};
  const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  const ctx=await browser.newContext({viewport:{width:800,height:450}});
  // the scoreboard is online; stub it so the test is offline and deterministic
  await ctx.route('**/rest/v1/rotten_scores*',r=>r.fulfill({status:200,contentType:'application/json',body:'[]'}));
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+page);await sleep(4000);
  await p.click('#startBtn',{force:true});await sleep(1200);await p.click('#spot-d1',{force:true});await sleep(3000);
  console.log('round');
  for(const t of ['apple','tomato','egg','corn','watermelon','pumpkin']){const r=await p.evaluate(t=>window.__t.hit(t),t);ok(r&&r.gained>0&&r.crashed,`${t} windshield hit scores and crashes (${r&&r.gained})`);}
  console.log('spots');
  for(const [name,st] of [['garden',0],['treehouse',1],['overpass',2],['rooftop',3]]){await p.evaluate(st=>window.__t.go(0,st),st);await waitFor(()=>p.evaluate(()=>window.__t.info()),i=>i.state==='play',30000);await sleep(3500);const i=await p.evaluate(()=>window.__t.info());ok(i.calls<=LIMITS[name],`${name}: ${i.calls} draw calls, ${i.tris} tris, ${i.cars} cars (budget ${LIMITS[name]})`);}
  console.log('showdown');
  for(const [route,day] of [['mom',0],['fight',0],['fight',6]]){await p.evaluate(d=>{window.__dt=.12;window.__t.sd(d);},day);
    await waitFor(()=>p.evaluate(()=>window.__t.sdState()),s=>s.phase===20);
    if(route==='mom'){await p.click('#sdMom');const s=await waitFor(()=>p.evaluate(()=>window.__t.sdState()),s=>!!s.card);ok(/cleared/.test(s.card),`day ${day+1} mom route: ${s.card}`);}
    else{await p.click('#sdFight');await sleep(2000);for(let i=0;i<3;i++){await p.evaluate(()=>window.__t.hitMan());await sleep(800);}
      const s=await waitFor(()=>p.evaluate(()=>window.__t.sdState()),s=>!!s.card||s.phase>=17);ok(day===6?s.phase>=17:/cleared/.test(s.card),`day ${day+1} fight route: ${s.card||('arrest phase '+s.phase)}`);}
    await p.evaluate(()=>{window.__dt=0;});}
  ok(errs.length===0,'no page errors'+(errs.length?': '+errs.slice(0,3).join(' | '):''));
  await browser.close();fs.unlinkSync(page);
  console.log(fails.length?`\n${fails.length} failure(s)`:'\nall good');process.exit(fails.length?1:0);
})().catch(e=>{console.error(e);process.exit(1);});
