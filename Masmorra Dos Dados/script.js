const $=i=>document.getElementById(i),sl=ms=>new Promise(r=>setTimeout(r,ms)),d=n=>1+Math.floor(Math.random()*n),
dice=(n,s,b=0)=>{for(let i=0;i<n;i++)b+=d(s);return b},
pic=(f,g)=>`<img src="img/${f}.png" alt="" onerror="this.onerror=null;this.src=spr('${f}')">`;
const CL={
cavaleiro:{n:'Cavaleiro Decaído',f:'cavaleiro',g:'🛡️',hp:42,st:60,fp:2,ca:15,atk:5,dm:[1,8,3],pb:4,d:'Armadura pesada e escudo. Mestre em aparar.',sk:{n:'Golpe Brutal',fp:2,sta:25,dm:[3,8,3],atk:-1}},
feiticeiro:{n:'Feiticeiro de Cristal',f:'feiticeiro',g:'🔮',hp:26,st:45,fp:8,ca:12,atk:2,dm:[1,6,0],pb:0,d:'Frágil, mas com muito Foco para magias.',sk:{n:'Lança de Cristal',fp:2,sta:5,dm:[3,6,4],auto:1}},
ladino:{n:'Ladino das Sombras',f:'ladino',g:'🗡️',hp:30,st:60,fp:3,ca:14,atk:6,dm:[1,6,4],pb:2,d:'Ágil e letal. Faz o inimigo sangrar.',sk:{n:'Golpe nas Costas',fp:2,sta:20,dm:[3,6,4],adv:1,dot:['Sangramento',3,[1,4,0]]}},
piromante:{n:'Piromante',f:'piromante',g:'🔥',hp:32,st:50,fp:6,ca:13,atk:3,dm:[1,8,1],pb:1,d:'Chamas que queimam por vários turnos.',sk:{n:'Chama Purificadora',fp:2,sta:10,dm:[2,8,2],auto:1,dot:['Queimadura',3,[1,6,1]]}}};
const EN=[
{n:'Soldado Oco',f:'oco',g:'🧟',hp:16,ca:11,s:60,t:0,mv:[{n:'Golpe fraco',k:'l',a:2,dm:[1,6,0]},{n:'Golpe pesado',k:'h',a:0,dm:[2,6,0]}]},
{n:'Esqueleto Ressurgido',f:'esqueleto',g:'💀',hp:22,ca:12,s:90,t:0,mv:[{n:'Corte rápido',k:'l',a:3,dm:[1,8,0]},{n:'Machadada',k:'h',a:1,dm:[2,8,0]}]},
{n:'Cavaleiro Negro',f:'cavaleironegro',g:'♞',hp:36,ca:14,s:200,t:1,mv:[{n:'Estocada',k:'l',a:4,dm:[1,8,2]},{n:'Espadada longa',k:'h',a:2,dm:[2,10,2]}]},
{n:'Cultista Sombrio',f:'cultista',g:'🧙',hp:30,ca:13,s:150,t:1,mv:[{n:'Raio sombrio',k:'l',a:4,dm:[1,8,1]},{n:'Maldição',k:'h',a:2,dm:[2,8,2]}]},
{n:'Gárgula Vigilante',f:'gargula',g:'🦇',hp:42,ca:14,s:250,t:2,mv:[{n:'Garras',k:'l',a:5,dm:[1,10,1]},{n:'Mergulho',k:'h',a:3,dm:[2,10,2]}]},
{n:'Bispo Caído',f:'bispo',g:'⛪',hp:52,ca:15,s:350,t:2,mv:[{n:'Cajado',k:'l',a:5,dm:[1,10,2]},{n:'Martelo sagrado',k:'h',a:3,dm:[2,10,3]},{n:'Julgamento',k:'a',dm:[2,8,0]}]},
{n:'Golem de Magma',f:'golem',g:'🗿',hp:60,ca:16,s:400,t:3,mv:[{n:'Soco de pedra',k:'l',a:6,dm:[1,10,2]},{n:'Esmagar',k:'h',a:4,dm:[3,6,2]}]},
{n:'Cão do Inferno',f:'cao',g:'🐕',hp:48,ca:15,s:350,t:3,mv:[{n:'Mordida',k:'l',a:7,dm:[1,8,2]},{n:'Investida',k:'h',a:5,dm:[2,8,3]},{n:'Uivo flamejante',k:'a',dm:[2,6,2]}]},
{n:'Dragão Ancestral',f:'dragao',g:'🐉',hp:80,ca:16,s:1000,t:3,boss:1,mv:[{n:'Mordida',k:'l',a:6,dm:[2,6,3]},{n:'Caudada',k:'h',a:4,dm:[3,6,3]},{n:'Sopro de fogo',k:'a',dm:[3,6,0]}]}];
const KD={l:'ataque leve',h:'ataque pesado',a:'ataque em área'},
UP={vig:['Vigor','+6 PV máximos'],res:['Resistência','+10 Fôlego máximo'],for:['Força','+1 ataque e +1 dano'],men:['Mente','+1 Foco máximo e +1 dano de habilidade']};
/*ZONES*/
const ZONES=[
{n:'Ruínas de Aldrath',th:'ruinas',rows:8,seed:11,start:[0,2],intro:'Lápides tortas e portões partidos. Os mortos de Aldrath ainda guardam a estrada.',
road:[['h',2,0,8],['v',8,3,5],['h',6,1,8]],
nodes:[{x:4,y:2,type:'enc',idx:0,name:'Portão em Ruínas',fp:[3,0,2,2],kind:'gate'},
{x:7,y:2,type:'enc',idx:1,name:'Cripta Esquecida',fp:[6,0,2,2],kind:'crypt'},
{x:6,y:6,type:'fire',name:'Fogueira da Estrada'},
{x:3,y:6,type:'enc',idx:2,name:'Fortaleza Negra',fp:[2,4,2,2],kind:'fort'}]},
{n:'Catedral Silenciosa',th:'catedral',rows:12,seed:23,start:[1,0],intro:'Sinos sem badalo e vitrais partidos. A fé de Aldrath apodreceu aqui dentro.',
road:[['v',1,0,5],['h',5,1,8],['v',8,5,10],['h',10,3,8]],
nodes:[{x:1,y:3,type:'enc',idx:3,name:'Capela Profanada',fp:[2,2,2,2],kind:'chapel'},
{x:5,y:5,type:'enc',idx:4,name:'Torre dos Sinos',fp:[4,3,2,2],kind:'belltower'},
{x:8,y:8,type:'fire',name:'Fogueira do Claustro'},
{x:4,y:10,type:'enc',idx:5,name:'Grande Catedral',fp:[3,8,2,2],kind:'cath'}]},
{n:'Abismo de Cinzas',th:'abismo',rows:14,seed:37,start:[0,1],intro:'O chão sangra fogo. Algo gigantesco respira no fim do abismo.',
road:[['h',1,0,3],['v',3,1,4],['h',4,3,6],['v',6,4,7],['h',7,6,8],['v',8,7,13],['h',13,3,8]],
nodes:[{x:3,y:3,type:'enc',idx:6,name:'Forja de Magma',fp:[4,1,2,2],kind:'forge'},
{x:6,y:6,type:'enc',idx:7,name:'Covil Infernal',fp:[7,4,2,2],kind:'cave'},
{x:8,y:10,type:'fire',name:'Fogueira do Abismo'},
{x:3,y:13,type:'enc',idx:8,boss:1,name:'Cidadela do Dragão',fp:[2,10,3,3],kind:'citadel'}]}];
ZONES.forEach(z=>{z.rs=new Set();z.road.forEach(([t,a,b,c])=>{for(let i=b;i<=c;i++)z.rs.add(t=='h'?i+','+a:a+','+i)})});
/*FIM*/
const Z=()=>ZONES[G.zone],isFloor=(x,y)=>Z().rs.has(x+','+y),nodeAt=(x,y)=>Z().nodes.find(n=>n.x==x&&n.y==y);
let G,M,AC,mute=false,noCut=false,skipCut,clk,curNode=null;
$('cine').onclick=()=>{clk=1;skipCut&&skipCut()};
document.addEventListener('keydown',e=>{if(e.key==' '&&$('cine').classList.contains('on')){e.preventDefault();clk=1;skipCut&&skipCut()}});
const wt=ms=>new Promise(r=>{skipCut=r;setTimeout(r,ms)}),FX={feiticeiro:'magic',piromante:'fire'},
INTRO={cavaleiro:'Seu juramento morreu com o reino, mas a armadura ainda se lembra dele.',feiticeiro:'Os cristais sussurram o nome do dragão. Você decidiu ouvir.',ladino:'Ninguém guarda um tesouro tão bem quanto um dragão. Ninguém foge tão bem quanto você.',piromante:'Você domou o fogo que os outros temiam. Hoje ele encontrará um dragão.'};
function tg(){noCut=!noCut;document.querySelectorAll('.mc').forEach(b=>b.textContent=noCut?'Cenas: desligadas':'Cenas: ligadas')}
function stage(a,b,cls=''){$('cine').className='on '+cls;$('sa').innerHTML=a;$('sb').innerHTML=b;$('sa').className='sp l';$('sb').className='sp r';$('fx').className='fx';$('dmg').textContent=''}
async function story(a,b,lines,cls=''){if(noCut)return;stage(a,b,cls);
for(const t of lines){clk=0;for(let i=1;i<=t.length&&!clk;i++){$('cap').textContent=t.slice(0,i);await sl(24)}$('cap').textContent=t;clk=0;await wt(2800)}
$('cine').className=''}
async function cut(a,res,v,fx,nm){const h=a=='h',sn=res=='miss'||res=='dodge'?'miss':res=='heal'?'heal':res=='parry'?'parry':res=='crit'?'crit':h?'hit':'hurt';
if(noCut||!G){snd(sn);return}
const c=CL[G.k],A=h?'sa':'sb',T=h?'sb':'sa',R=h&&res!='heal',g=$('dmg');
stage(pic(c.f,c.g),pic(M.f,M.g));$('cap').textContent=`${h?c.n:M.n}: ${nm}`;
if(res=='heal')$('sa').classList.add('heal');
else{$(A).classList.add(h?'dL':'dR');if(res!='parry')$(T).classList.add(res=='miss'||res=='dodge'?'ev':'tk');
$('fx').className='fx on '+(res=='parry'?'spark':fx||'slash')}
g.style.left=R?'':'10%';g.style.right=R?'10%':'';
g.textContent={miss:'Errou',dodge:'Esquivou',parry:'Aparado!'}[res]||(res=='heal'?'+'+v:(res=='crit'?'CRÍTICO ':'')+v);g.className='dmg '+res;
setTimeout(()=>snd(sn),380);await wt(1200);$('cine').className=''}
const tone=(ty,f0,f1,v,du,dl=0)=>{const t=AC.currentTime+dl,o=AC.createOscillator(),g=AC.createGain();o.type=ty;o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+du);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+du);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+du)};
function amb(){if(amb.g)return;const f=AC.createBiquadFilter(),g=amb.g=AC.createGain();f.type='lowpass';f.frequency.value=170;g.gain.value=mute?0:.06;f.connect(g);g.connect(AC.destination);[55,55.6,82.4].forEach(x=>{const o=AC.createOscillator();o.type='sawtooth';o.frequency.value=x;o.connect(f);o.start()})}
function snd(n){if(mute)return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.resume();amb();({tick:()=>tone('square',700,500,.03,.04),
hit:()=>{tone('sawtooth',220,40,.25,.25);tone('square',90,30,.2,.2)},
crit:()=>{tone('sawtooth',320,40,.3,.4);tone('triangle',900,220,.2,.3)},
miss:()=>tone('sine',500,150,.1,.18),
hurt:()=>tone('sawtooth',140,35,.3,.35),
parry:()=>{tone('triangle',1500,1400,.25,.5);tone('square',2100,1900,.06,.3)},
heal:()=>[400,500,600,800].forEach((f,i)=>tone('sine',f,f*1.02,.15,.3,i*.1)),
win:()=>[330,392,494,659].forEach((f,i)=>tone('triangle',f,f*1.01,.2,.6,i*.18)),
dead:()=>{tone('sawtooth',110,30,.35,2);tone('sine',55,25,.4,2.4)},
fire:()=>[220,277,330].forEach((f,i)=>tone('sine',f,f*1.01,.12,1.2,i*.25)),
buy:()=>{tone('triangle',600,900,.15,.15);tone('triangle',900,1200,.12,.2,.1)}})[n]()}catch(e){}}
function mt(){mute=!mute;document.querySelectorAll('.mt').forEach(b=>b.textContent=mute?'Som: desligado':'Som: ligado');if(amb.g)amb.g.gain.value=mute?0:.06;if(!mute)snd('tick')}
const SL={w:'Arma',a:'Armadura',t:'Talismã'},ST={atk:'Ataque',dm:'Dano',ca:'CA',pb:'Aparar'};
const RAR=[
{id:'comum',n:'Comum',c:'#c9cdd2',w:45,m:1},
{id:'raro',n:'Raro',c:'#4f8fe0',w:27,m:1.2},
{id:'epico',n:'Épico',c:'#b36bef',w:15,m:1.4},
{id:'lendario',n:'Lendário',c:'#e0832d',w:8,m:1.7},
{id:'mitico',n:'Mítico',c:'#e23d3d',w:4.7,m:2.1},
{id:'secreto',n:'Secreto',c:'#ffe9a8',w:.3,m:0}];
const RARBY=Object.fromEntries(RAR.map(r=>[r.id,r]));
const SECRET={n:'Fragmento da Primeira Chama',s:'t',atk:5,dm:6,ca:4,pb:5,cr:3};
const LOOT=[
[{n:'Espada Enferrujada',s:'w',dm:1},{n:'Gibão Remendado',s:'a',ca:1},{n:'Anel de Ferro',s:'t',pb:1}],
[{n:'Lâmina do Cavaleiro Caído',s:'w',atk:1,dm:2},{n:'Cota de Malha',s:'a',ca:2},{n:'Talismã de Osso',s:'t',cr:1}],
[{n:'Espada Longa Sombria',s:'w',atk:2,dm:3},{n:'Armadura Negra',s:'a',ca:3},{n:'Talismã do Aparador',s:'t',pb:3}],
[{n:'Garras de Gárgula',s:'w',atk:3,dm:3,cr:1},{n:'Manto de Pedra',s:'a',ca:4,pb:1},{n:'Olho de Pedra',s:'t',atk:2,cr:1}]];
const E=k=>Object.values(G.eq).reduce((a,i)=>a+(i&&i[k]||0),0),
fmt=i=>['atk','dm','ca','pb','cr'].filter(k=>i[k]).map(k=>k=='cr'?`Crítico ${20-i.cr}-20`:`${ST[k]} +${i[k]}`).join(', '),
rarTag=it=>it.rar=='secreto'?`<b class="rar-secreto">${it.n}</b>`:`<b style="color:${RARBY[it.rar].c}">${it.n}</b>`,
eqTxt=()=>Object.keys(SL).map(k=>`${SL[k]}: ${G.eq[k]?rarTag(G.eq[k]):'—'}`).join(' · ');
function rollRar(){const pool=RAR.filter(r=>r.id!='secreto'||!G.gotSecret),tw=pool.reduce((a,r)=>a+r.w,0);let x=Math.random()*tw;
for(const r of pool){if(x<r.w)return r;x-=r.w}return pool[0]}
function scaleItem(base,rar){const it={n:base.n,s:base.s,rar:rar.id};
['atk','dm','ca','pb','cr'].forEach(k=>{if(base[k])it[k]=Math.max(1,Math.round(base[k]*rar.m))});return it}
async function loot(){const rar=rollRar();let it;
if(rar.id=='secreto'){it={...SECRET,rar:'secreto'};G.gotSecret=true;await ban('A masmorra estremece…','sec',1700)}
else{const t=LOOT[EN[G.i].t];it=scaleItem(t[d(t.length)-1],rar)}
const old=G.eq[it.s];
return new Promise(res=>{
$('lt').innerHTML=`${rarTag(it)} <span class="st">(${SL[it.s]} · <b style="color:${RARBY[it.rar].c}">${RARBY[it.rar].n}</b>)</span><br>${fmt(it)}${it.rar=='secreto'?'<br><i>Existe apenas uma unidade deste item em toda a masmorra.</i>':''}<br><small>Equipado: ${old?old.n+' — '+fmt(old):'nada'}</small>`;
$('lk').onclick=()=>{G.eq[it.s]=it;$('loot').close();lg(`Você equipa ${it.n} (${RARBY[it.rar].n}).`,it.rar=='secreto'?'y':'');snd(it.rar=='secreto'?'win':'buy');res()};
$('ld').onclick=()=>{$('loot').close();res()};$('loot').showModal()})}
const go=id=>document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('on',s.id==id));
$('cls').innerHTML=Object.entries(CL).map(([k,c])=>`<button class="p cc" onclick="start('${k}')"><div class="pf sm">${pic(c.f,c.g)}</div><h3>${c.n}</h3><p>${c.d}</p><small>PV ${c.hp} · Fôlego ${c.st} · Foco ${c.fp} · CA ${c.ca}<br>Habilidade: ${c.sk.n}</small></button>`).join('');
function lg(t,c=''){const p=document.createElement('p');p.className=c;p.textContent=t;$('log').prepend(p)}
async function ban(t,c,ms=1500){const b=$('ban');b.textContent=t;b.className='on '+c;await sl(ms);b.className=''}
async function rollDie(v){const e=$('die');e.className='die roll';for(let i=0;i<7;i++){e.textContent=d(20);snd('tick');await sl(55)}e.textContent=v;e.className='die'+(v==20?' crit':v==1?' fail':'')}
function hurt(id){const e=$(id);e.classList.remove('hit');void e.offsetWidth;e.classList.add('hit')}
async function start(k){const c=CL[k];G={k,mh:c.hp,hp:c.hp,ms:c.st,sta:c.st,mf:c.fp,fp:c.fp,atk:c.atk,db:0,mn:0,es:3,souls:0,tot:0,lv:0,i:0,st:null,busy:false,over:false,eq:{},gotSecret:false,px:0,py:0,zone:0};
ZONES.forEach(z=>z.nodes.forEach(n=>n.cleared=false));curNode=null;
$('log').innerHTML='';snd('fire');go('s-map');await story(pic(c.f,c.g),pic('dragao','🐉'),['As ruínas de Aldrath dormem sob cinzas, e a última chama do reino está quase apagada.',`${c.n}: ${INTRO[k]}`,'No fundo do corredor, um dragão espera. Use as setas, WASD ou os botões para avançar pelas salas.'],'sil');loadZone(0)}
function tryMove(dx,dy){if(!G||G.over||G.busy)return;const nx=G.px+dx,ny=G.py+dy;
if(!isFloor(nx,ny)){$('mapmsg').textContent='Uma parede bloqueia o caminho.';return}
G.px=nx;G.py=ny;$('mapmsg').textContent='';renderMap();
const node=nodeAt(nx,ny);if(node&&!node.cleared)enterNode(node)}
async function enterNode(node){curNode=node;G.busy=true;await ban(node.name,'win',1300);
if(node.type=='fire'){snd('fire');go('s-fire');renderFire()}
else{G.i=node.idx;go('s-game');await fight()}}
function renderMap(){const z=Z(),at=(x,y)=>`grid-area:${y+1}/${x+1}`;let h='';
for(const n of z.nodes){
if(n.cleared){if(n.fp)h+=`<div class="veil" style="grid-area:${n.fp[1]+1}/${n.fp[0]+1}/span ${n.fp[3]}/span ${n.fp[2]}">✓</div>`}
else h+=`<div class="mk${n.boss?' boss':''}${n.type=='fire'?' fire':''}" style="${at(n.x,n.y)}"></div>`}
h+=`<div class="hero" style="${at(G.px,G.py)}">${pic(CL[G.k].f,CL[G.k].g)}</div>`;
$('grid').innerHTML=h;$('msouls').textContent=G.souls;$('zname').textContent=`Fase ${G.zone+1}: ${z.n}`}
function loadZone(i){G.zone=i;const z=ZONES[i],gr=$('grid');G.px=z.start[0];G.py=z.start[1];
gr.style.setProperty('--rows',z.rows);z.img=z.img||drawZone(z);gr.style.backgroundImage=`url(${z.img})`;renderMap()}
async function nextZone(){const c=CL[G.k],z=ZONES[G.zone+1];G.hp=G.mh;G.fp=G.mf;G.es=3;G.busy=true;go('s-map');
await ban(`Fase ${G.zone+2}`,'boss',1500);
await story(pic(c.f,c.g),pic(EN[z.nodes.find(n=>n.type=='enc').idx].f,''),[`Fase ${G.zone+2}: ${z.n}`,z.intro,'Você recupera o fôlego: PV, Foco e Estus foram restaurados.'],'sil');
G.busy=false;loadZone(G.zone+1)}
function pick(){M.next=M.mv[d(M.mv.length)-1];if(M.ph&&M.mv.length>2&&d(2)==1)M.next=M.mv[2];
$('intent').textContent=`⚠ ${M.n} prepara: ${M.next.n} (${KD[M.next.k]})`}
async function fight(){const c=CL[G.k];M={...EN[G.i]};M.mx=M.hp;M.stun=0;M.dot=null;M.ph=0;G.busy=true;G.st=null;G.sta=G.ms;
$('hpic').innerHTML=pic(c.f,c.g);$('hn').textContent=c.n;$('mpic').innerHTML=pic(M.f,M.g);ui();
if(M.boss){snd('dead');await ban(M.n,'boss')}
lg(`${M.n} bloqueia seu caminho.`,'y');pick();$('msg').textContent='Rolando iniciativa...';
const a=d(20),b=d(20);await rollDie(a);const first=a+2>=b;lg(`Iniciativa: você ${a}+2 contra ${b}. ${first?'Você age primeiro.':M.n+' age primeiro.'}`);
if(!first&&await monTurn()=='l')return lose();
G.busy=false;$('msg').textContent='Seu turno.';ui()}
async function act(k){if(G.busy||G.over)return;const c=CL[G.k];G.busy=true;G.st=null;let reg=15;ui();
if(k=='e'){G.es--;const h=Math.min(dice(2,8,4),G.mh-G.hp);G.hp+=h;await cut('h','heal',h,'','Frasco de Estus');lg(`Você bebe do Frasco de Estus e recupera ${h} PV.`,'g')}
else if(k=='r'){G.sta=Math.min(G.ms,G.sta+35);reg=0;lg('Você respira fundo e recupera o fôlego.')}
else if(k=='d'){G.sta-=20;G.st='d';lg('Você se prepara para rolar.')}
else if(k=='p'){G.sta-=15;G.st='p';lg('Você ergue a guarda para aparar.')}
else await attack(k);
ui();await sl(500);
if(M.hp<=0)return win();
const r=await monTurn();if(r=='w')return win();if(r=='l')return lose();
G.sta=Math.min(G.ms,G.sta+reg);G.busy=false;$('msg').textContent='Seu turno.';ui()}
async function attack(k){const c=CL[G.k],s=c.sk;let atk=G.atk+E('atk'),dm=[...c.dm],auto=0,adv=0,dot=null;dm[2]+=G.db+E('dm');
if(k=='h'){G.sta-=30;dm[0]*=2;atk-=2}else if(k=='l')G.sta-=15;
else{G.sta-=s.sta;G.fp-=s.fp;dm=[...s.dm];dm[2]+=G.db+G.mn+E('dm');atk+=s.atk||0;auto=s.auto;adv=s.adv;dot=s.dot}
const a=d(20),b=adv?d(20):0,r=Math.max(a,b),rip=M.stun>0;await rollDie(r);
$('dinfo').textContent=adv?`${a} e ${b}: vale ${r}`:`${r}+${atk} = ${r+atk}`;
const cr=r>=20-E('cr');if(cr||auto||rip||r!=1&&r+atk>=M.ca){const crit=cr||rip,v=dice(dm[0]*(crit?2:1),dm[1],dm[2]);
M.stun=0;await cut('h',crit?'crit':'hit',v,k=='s'?FX[G.k]:'',rip?'Contragolpe':k=='l'?'Ataque leve':k=='h'?'Ataque pesado':s.n);M.hp=Math.max(0,M.hp-v);hurt('mc');lg(`${rip?'CONTRAGOLPE! ':crit?'CRÍTICO! ':''}Você causa ${v} de dano em ${M.n}.`,crit?'y':'g');
if(dot&&M.hp>0){M.dot={n:dot[0],t:dot[1],d:dot[2]};lg(`${M.n} sofre ${dot[0]}.`,'y')}}
else{await cut('h','miss',0,'',k=='l'?'Ataque leve':k=='h'?'Ataque pesado':s.n);lg(`Você erra (${r==1?'1 natural':r+atk+' contra CA '+M.ca}).`,'r')}}
async function monTurn(){const c=CL[G.k];$('msg').textContent=`${M.n} age...`;await sl(400);M.stun=0;
if(M.dot&&M.dot.t>0){const v=dice(...M.dot.d);M.hp=Math.max(0,M.hp-v);M.dot.t--;hurt('mc');snd('hit');lg(`${M.dot.n}: ${M.n} perde ${v} PV.`,'y');ui();await sl(500);if(M.hp<=0)return 'w'}
if(M.boss&&!M.ph&&M.hp<=M.mx/2){M.ph=1;snd('crit');await ban('O dragão se enfurece','boss');lg('O Dragão Ancestral se enfurece: golpes mais fortes e mais sopros.','r')}
const m=M.next,dm=[m.dm[0],m.dm[1],m.dm[2]+(M.ph?2:0)];let hit=0,v=0,crit=0;
if(m.k=='a'){v=dice(...dm);if(G.st=='d'){v=Math.ceil(v/2);lg('Você rola sob as chamas e reduz o dano.','g')}hit=1}
else{let ca=c.ca+E('ca');
if(G.st=='p'){const r=d(20),pb=c.pb+E('pb');await rollDie(r);$('dinfo').textContent=`Aparar: ${r}+${pb}`;
if(r==20||r!=1&&r+pb>=(m.k=='h'?14:11)){await cut('m','parry',0,'',m.n);M.stun=1;lg(`Aparado! ${M.n} perde o equilíbrio. Ataque agora para um contragolpe!`,'y');G.st=null;pick();return ''}
lg('Você falha ao aparar!','r');ca+=2}
let r=d(20);if(G.st=='d')r=Math.min(r,d(20));await rollDie(r);$('dinfo').textContent=`Inimigo: ${r+m.a} vs CA ${ca}`;
if(r==20||r!=1&&r+m.a>=ca){hit=1;crit=r==20;v=dice(dm[0]*(crit?2:1),dm[1],dm[2])}
else{await cut('m',G.st=='d'?'dodge':'miss',0,'',m.n);lg(G.st=='d'?'Você rola e evita o golpe.':`${M.n} erra o ataque.`,'g')}}
if(hit){await cut('m',crit?'crit':'hit',v,m.k=='a'?'fire':'slash',m.n);G.hp=Math.max(0,G.hp-v);hurt('hc');lg(`${crit?'CRÍTICO! ':''}${m.n} atinge você: ${v} de dano.`,'r')}
G.st=null;pick();ui();await sl(400);return G.hp<=0?'l':''}
async function win(){const e=EN[G.i];G.souls+=e.s;G.tot+=e.s;ui();snd('win');await ban('Inimigo abatido','win');lg(`${M.n} foi abatido. +${e.s} almas.`,'y');
if(curNode)curNode.cleared=true;
if(G.i==EN.length-1)return end(true);
await loot();ui();
if(Z().nodes.every(n=>n.cleared))return nextZone();
G.busy=false;go('s-map');renderMap()}
async function lose(){snd('dead');await ban('Você morreu','dead',2400);end(false)}
function renderFire(){const c=60+30*G.lv;$('fsoul').textContent=G.souls;$('fst').innerHTML=`PV ${G.mh} · Fôlego ${G.ms} · Foco ${G.mf} · Ataque +${G.atk+E('atk')} · Dano +${G.db+E('dm')} · CA ${CL[G.k].ca+E('ca')} · ${eqTxt()}`;
$('up').innerHTML=Object.entries(UP).map(([k,[n,t]])=>`<button ${G.souls<c?'disabled':''} onclick="upg('${k}')"><b>${n}</b><small>${t} · ${c} almas</small></button>`).join('')}
function upg(k){const c=60+30*G.lv;if(G.souls<c)return;G.souls-=c;G.lv++;snd('buy');
if(k=='vig')G.mh+=6;if(k=='res')G.ms+=10;if(k=='for'){G.atk++;G.db++}if(k=='men'){G.mf++;G.mn++}renderFire()}
function leave(){G.hp=G.mh;G.fp=G.mf;G.es=3;lg('Você descansa na fogueira.','g');if(curNode)curNode.cleared=true;G.busy=false;go('s-map');renderMap()}
async function end(v){G.over=true;const t=$('team').value.trim(),sc=G.tot+(v?G.hp*10:0),c=CL[G.k];
await story(pic(c.f,c.g),pic(M.f,M.g),v?['O dragão desaba e as cinzas de Aldrath voltam a arder.',`${t||'Sua lenda'} acendeu a última chama. Os dados se calam.`]:['Sua chama se apaga entre as ruínas de Aldrath.','Outro herói virá. Os dados aguardam.'],v?'win':'lose');go('s-end');
$('e-t').textContent=v?'Vitória Alcançada':'Você Morreu';$('e-t').style.color=v?'var(--gold)':'var(--bl)';
$('e-d').textContent=`${t?t+'. ':''}${v?'O dragão caiu.':'Você caiu diante de '+M.n+'.'} Inimigos abatidos: ${v?EN.length:G.i}. Melhorias: ${G.lv}. Pontuação: ${sc}.`}
function ui(){if(!G)return;const B=(i,v,m)=>{$(i+'t').style.width=$(i+'f').style.width=Math.max(0,v/m*100)+'%'};
B('hp',G.hp,G.mh);B('st',G.sta,G.ms);B('fp',G.fp,G.mf);B('mh',M?M.hp:0,M?M.mx:1);
$('hs').textContent=`PV ${G.hp}/${G.mh} · Fôlego ${G.sta}/${G.ms} · Foco ${G.fp}/${G.mf} · CA ${CL[G.k].ca+E('ca')}`;
$('souls').textContent=G.souls;$('es').textContent=G.es;$('eqs').innerHTML=eqTxt();
if(M){$('mn').textContent=M.n;$('mst').textContent=`PV ${M.hp}/${M.mx} · CA ${M.ca}`+(M.dot&&M.dot.t?` · ${M.dot.n}`:'')+(M.stun?' · Atordoado':'');$('room').textContent=`Encontro ${G.i+1} de ${EN.length}`}
const s=CL[G.k].sk,x=G.busy||G.over,
A=[['l','Ataque leve','Fôlego 15',G.sta>=15],['h','Ataque pesado','Fôlego 30',G.sta>=30],['s',s.n,`Foco ${s.fp} · Fôlego ${s.sta}`,G.fp>=s.fp&&G.sta>=s.sta],['d','Esquivar','Fôlego 20',G.sta>=20],['p','Aparar','Fôlego 15',G.sta>=15],['e',`Frasco de Estus (${G.es})`,'cura',G.es>0&&G.hp<G.mh],['r','Recuperar fôlego','+35',true]];
$('menu').innerHTML=A.map(([k,n,t,ok])=>`<button ${x||!ok?'disabled':''} onclick="act('${k}')"><b>${n}</b><small>${t}</small></button>`).join('')}
document.addEventListener('keydown',e=>{const b=$('menu').children[+e.key-1];if(b&&$('s-game').classList.contains('on')&&!document.querySelector('dialog[open]'))b.click()});
document.addEventListener('keydown',e=>{if(!$('s-map').classList.contains('on')||document.querySelector('dialog[open]')||$('cine').classList.contains('on'))return;
const m={ArrowUp:[0,-1],w:[0,-1],W:[0,-1],ArrowDown:[0,1],s:[0,1],S:[0,1],ArrowLeft:[-1,0],a:[-1,0],A:[-1,0],ArrowRight:[1,0],d:[1,0],D:[1,0]}[e.key];
if(m){e.preventDefault();tryMove(...m)}});
$('loot').addEventListener('cancel',e=>e.preventDefault());
