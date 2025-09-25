/* ================== TEMA ================== */
const themeToggle = document.getElementById('themeToggle');
(function initTheme(){
  const saved = localStorage.getItem('exordion_theme') || 'dark';
  document.documentElement.setAttribute('data-mdb-theme', saved);
  if(saved === 'light') themeToggle.checked = true;
})();
themeToggle.addEventListener('change', ()=>{
  const mode = themeToggle.checked ? 'light' : 'dark';
  document.documentElement.setAttribute('data-mdb-theme', mode);
  localStorage.setItem('exordion_theme', mode);
});

/* ================== CONSTANTES ================== */
const VOCATION_REGEN = {
  "Sorcerer":        { mpPer: 2, mpEverySec: 4 },
  "Druid":           { mpPer: 2, mpEverySec: 4 },
  "Paladin":         { mpPer: 2, mpEverySec: 6 },
  "Knight":          { mpPer: 2, mpEverySec: 8 },
  "Master Sorcerer": { mpPer: 2, mpEverySec: 3 },
  "Elder Druid":     { mpPer: 2, mpEverySec: 3 },
  "Royal Paladin":   { mpPer: 2, mpEverySec: 4 },
  "Elite Knight":    { mpPer: 2, mpEverySec: 6 },
};
const PROMOTED = new Set(["Master Sorcerer", "Elder Druid", "Royal Paladin", "Elite Knight"]);

const BLANK_TYPES = [
  { id:"gray",   name:"Gray Blank Rune",   defaultPrice:50,  icon:"assets/images/gray_blankrune.png"   },
  { id:"red",    name:"Red Blank Rune",    defaultPrice:30,  icon:"assets/images/red_blankrune.png"    },
  { id:"blue",   name:"Blue Blank Rune",   defaultPrice:30,  icon:"assets/images/blue_blankrune.png"   },
  { id:"purple", name:"Purple Blank Rune", defaultPrice:20,  icon:"assets/images/purple_blankrune.png" },
  { id:"green",  name:"Green Blank Rune",  defaultPrice:20,  icon:"assets/images/green_blankrune.png"  },
  { id:"yellow", name:"Yellow Blank Rune", defaultPrice:40,  icon:"assets/images/yellow_blankrune.png" },
  { id:"cyan",   name:"Cyan Blank Rune",   defaultPrice:30,  icon:"assets/images/cyan_blankrune.png"   },
];

/* Blanks corrigidos:
   HMM -> purple, MW -> yellow, Energy Bomb -> gray, SD -> gray */
const SPELLS = [
  { id:"animdead", name:"Animate Dead", mana:300, spirit:4, charges:2, blankType:"purple", vocs:["Sorcerer","Druid","Master Sorcerer","Elder Druid"] },
  { id:"antidote", name:"Antidote Rune", mana:50, spirit:2, charges:1,  blankType:"gray",  vocs:["Druid","Elder Druid"] },
  { id:"convince", name:"Convince Creature", mana:100, spirit:4, charges:1, blankType:"green", vocs:["Druid","Elder Druid"] },
  { id:"chameleon", name:"Chameleon", mana:150, spirit:4, charges:3, blankType:"green", vocs:["Druid","Elder Druid"] },

  { id:"df", name:"Destroy Field", mana:60, spirit:3, charges:3, blankType:"gray",
    vocs:["Sorcerer","Druid","Paladin","Master Sorcerer","Elder Druid","Royal Paladin"] },
  { id:"desintegrate", name:"Desintegrate", mana:100, spirit:3, charges:3, blankType:"purple",
    vocs:["Sorcerer","Druid","Paladin","Master Sorcerer","Elder Druid","Royal Paladin"] },

  { id:"firefield", name:"Fire Field", mana:60, spirit:2, charges:3, blankType:"red",
    vocs:["Sorcerer","Druid","Master Sorcerer","Elder Druid"] },
  { id:"firewall", name:"Fire Wall", mana:200, spirit:5, charges:4, blankType:"red",
    vocs:["Sorcerer","Druid","Master Sorcerer","Elder Druid"] },
  { id:"firebomb", name:"Fire Bomb", mana:150, spirit:5, charges:2, blankType:"red",
    vocs:["Sorcerer","Druid","Master Sorcerer","Elder Druid"] },

  { id:"poisonfield", name:"Poison Field", mana:50, spirit:2, charges:3, blankType:"green",
    vocs:["Sorcerer","Druid","Master Sorcerer","Elder Druid"] },
  { id:"poisonwall", name:"Poison Wall", mana:160, spirit:5, charges:4, blankType:"green",
    vocs:["Sorcerer","Druid","Master Sorcerer","Elder Druid"] },
  { id:"poisonbomb", name:"Poison Bomb", mana:130, spirit:5, charges:3, blankType:"green",
    vocs:["Druid","Elder Druid"] },

  { id:"energyfield", name:"Energy Field", mana:80, spirit:4, charges:3, blankType:"cyan",
    vocs:["Sorcerer","Druid","Master Sorcerer","Elder Druid"] },
  { id:"energywall", name:"Energy Wall", mana:250, spirit:5, charges:4, blankType:"cyan",
    vocs:["Sorcerer","Druid","Master Sorcerer","Elder Druid"] },
  { id:"energybomb", name:"Energy Bomb", mana:220, spirit:5, charges:2, blankType:"gray",
    vocs:["Sorcerer","Master Sorcerer"] },

  { id:"mw", name:"Magic Wall", mana:250, spirit:8, charges:3, blankType:"yellow",
    vocs:["Sorcerer","Master Sorcerer"] },

  { id:"lmm", name:"Light Magic Missile", mana:30, spirit:2, charges:10, blankType:null,
    vocs:["Sorcerer","Druid","Paladin","Master Sorcerer","Elder Druid","Royal Paladin"] },
  { id:"hmm", name:"Heavy Magic Missile", mana:70, spirit:4, charges:5, blankType:"purple",
    vocs:["Sorcerer","Druid","Paladin","Master Sorcerer","Elder Druid","Royal Paladin"] },

  { id:"fireball", name:"Fireball", mana:60, spirit:4, charges:6, blankType:"red",
    vocs:["Sorcerer","Druid","Paladin","Master Sorcerer","Elder Druid","Royal Paladin"] },
  { id:"gfb", name:"Great Fireball", mana:120, spirit:7, charges:2, blankType:"red",
    vocs:["Sorcerer","Master Sorcerer","Druid","Elder Druid"] },

  { id:"avalanche", name:"Avalanche", mana:140, spirit:7, charges:2, blankType:"blue",
    vocs:["Druid","Elder Druid"] },
  { id:"icicle", name:"Icicle Rune", mana:80, spirit:4, charges:5, blankType:"blue",
    vocs:["Druid","Elder Druid"] },

  { id:"explo", name:"Explosion", mana:180, spirit:7, charges:3, blankType:"purple",
    vocs:["Sorcerer","Druid","Master Sorcerer","Elder Druid"] },
  { id:"envenom", name:"Envenom Rune", mana:120, spirit:5, charges:2, blankType:"green",
    vocs:["Sorcerer","Master Sorcerer","Druid","Elder Druid"] },
  { id:"soulfire", name:"Soulfire", mana:150, spirit:6, charges:3, blankType:"red",
    vocs:["Sorcerer","Druid","Master Sorcerer","Elder Druid"] },

  { id:"sd", name:"Sudden Death", mana:220, spirit:10, charges:1, blankType:"gray",
    vocs:["Sorcerer","Master Sorcerer"] },

  { id:"uh", name:"Ultimate Healing Rune", mana:100, spirit:6, charges:1, blankType:"gray", vocs:["Druid","Elder Druid"] },
  { id:"ih", name:"Intense Healing Rune",  mana:60,  spirit:3, charges:2, blankType:"gray", vocs:["Druid","Elder Druid"] },

  /* munição – apenas Paladin/Royal Paladin */
  { id:"conj_arrow", name:"Conjure Arrow", mana:40,  spirit:2, charges:15, blankType:null, vocs:["Paladin","Royal Paladin"] },
  { id:"conj_bolt",  name:"Conjure Bolt",  mana:70,  spirit:3, charges:10, blankType:null, vocs:["Paladin","Royal Paladin"] },
  { id:"conj_poison_arrow", name:"Conjure Poison Arrow", mana:70, spirit:2, charges:5, blankType:null, vocs:["Paladin","Royal Paladin"] },
  { id:"conj_expl_arrow",   name:"Conjure Explosive Arrow", mana:120, spirit:5, charges:8, blankType:null, vocs:["Paladin","Royal Paladin"] },
  { id:"conj_sniper", name:"Conjure Sniper Arrow", mana:150, spirit:4, charges:8, blankType:null, vocs:["Paladin","Royal Paladin"] },
  { id:"conj_power_bolt", name:"Conjure Power Bolt", mana:200, spirit:8, charges:6, blankType:null, vocs:["Royal Paladin"] },
  { id:"conj_diamond", name:"Conjure Diamond Arrow", mana:500, spirit:10, charges:12, blankType:null, vocs:["Paladin","Royal Paladin"] },
];

/* Safezone tiers */
const SAFEZONE_TIERS = [
  { id: "30d", label: "30 dias — 900 points", points: 900, durationHours: 30*24 },
  { id: "7d",  label: "7 dias — 250 points",  points: 250, durationHours: 7*24 },
  { id: "3d",  label: "3 dias — 150 points",  points: 150, durationHours: 3*24 },
  { id: "24h", label: "24 horas — 90 points", points: 90,  durationHours: 24 },
  { id: "12h", label: "12 horas — 50 points", points: 50,  durationHours: 12 },
  { id: "6h",  label: "6 horas — 30 points",  points: 30,  durationHours: 6 },
];

const PRICE_KEY = "exordion_prices_by_charge_v7";
const BLANK_PRICE_KEY = "exordion_blank_prices_v1";

/* ================== DOM ================== */
const vocationEl = document.getElementById('vocation');
const spiritBadgeEl = document.getElementById('spiritBadge');
const spiritStartEl = document.getElementById('spiritStart');

const huntTimeEl = document.getElementById('huntTime');
const huntTimeUnitEl = document.getElementById('huntTimeUnit');
const compareBtn = document.getElementById('compareBtn');

const blanksWrap = document.getElementById('blankTypes');
const pricesWrap = document.getElementById('runesPriceList');

const tabsBlock = document.getElementById('tabsBlock');
const resultsList = document.getElementById('resultsList');
const bestBadge = document.getElementById('bestBadge');
const podiumWrap = document.getElementById('podium');

const coinPriceEl = document.getElementById('coinPrice');
const safeRuneSelEl = document.getElementById('safeRuneSelect');
const safeTierSelEl = document.getElementById('safeTierSelect');
const calcSafeBtn = document.getElementById('calcSafeBtn');
const safeResultEl = document.getElementById('safeResult');

const copyPixBtn = document.getElementById('copyPix');
const copyMsg = document.getElementById('copyMsg');

/* ====== DOM Itens ====== */
const itemsBody = document.getElementById('itemsBody');
const addItemBtn = document.getElementById('addItem');
const clearItemsBtn = document.getElementById('clearItems');

/* ================== ITENS (estado + UI) ================== */
let items = [
  { name:"Exordian Boots", qty:1, plusMp:1, perSec:3, durationMin:null, price:null },
  { name:"Exordian Ring",  qty:1, plusMp:1, perSec:4, durationMin:null, price:null },
];

function itemRow(idx, it){
  return `
    <tr data-idx="${idx}">
      <td><input class="form-control form-control-sm it-name" value="${it.name??''}" placeholder="Nome"/></td>
      <td><input type="number" class="form-control form-control-sm it-qty" min="0" value="${it.qty??1}"/></td>
      <td><input type="number" class="form-control form-control-sm it-plus" min="0" step="0.1" value="${it.plusMp??1}"/></td>
      <td><input type="number" class="form-control form-control-sm it-persec" min="1" step="0.1" value="${it.perSec??3}"/></td>
      <td><input type="number" class="form-control form-control-sm it-dur" min="0" step="1" value="${it.durationMin??''}" placeholder="—"/></td>
      <td><input type="number" class="form-control form-control-sm it-price" min="0" step="1" value="${it.price??''}" placeholder="—"/></td>
      <td class="text-end"><button class="btn btn-sm btn-outline-light it-del"><i class="fa fa-trash"></i></button></td>
    </tr>`;
}
function renderItems(){
  if(!itemsBody) return;
  itemsBody.innerHTML = items.length ? items.map((it,i)=>itemRow(i,it)).join('')
    : `<tr><td colspan="7" class="muted-sub">Nenhum item adicionado.</td></tr>`;
}
if (itemsBody){
  itemsBody.addEventListener('input', e=>{
    const tr=e.target.closest('tr[data-idx]'); if(!tr) return;
    const i=+tr.dataset.idx, it=items[i];
    if(e.target.classList.contains('it-name')) it.name=e.target.value;
    if(e.target.classList.contains('it-qty')) it.qty=+e.target.value;
    if(e.target.classList.contains('it-plus')) it.plusMp=+e.target.value;
    if(e.target.classList.contains('it-persec')) it.perSec=+e.target.value;
    if(e.target.classList.contains('it-dur')) it.durationMin = e.target.value===''?null:+e.target.value;
    if(e.target.classList.contains('it-price')) it.price = e.target.value===''?null:+e.target.value;
  });
  itemsBody.addEventListener('click', e=>{
    if(e.target.closest('.it-del')){
      const tr=e.target.closest('tr[data-idx]');
      items.splice(+tr.dataset.idx,1); renderItems();
    }
  });
}
addItemBtn?.addEventListener('click', ()=>{ items.push({name:"Item",qty:1,plusMp:1,perSec:3}); renderItems(); });
clearItemsBtn?.addEventListener('click', ()=>{ items=[]; renderItems(); });
renderItems();

/* ================== BLANKS ================== */
function loadBlankPrices(){ try{return JSON.parse(localStorage.getItem(BLANK_PRICE_KEY)||"{}");}catch{return{};} }
function saveBlankPrices(map){ localStorage.setItem(BLANK_PRICE_KEY, JSON.stringify(map)); }
function renderBlankTypeInputs(){
  const saved=loadBlankPrices();
  blanksWrap.innerHTML = BLANK_TYPES.map(bt=>{
    const key=`blank_${bt.id}`, val = saved[key] ?? bt.defaultPrice;
    return `
      <div class="col-12 col-md-6">
        <div class="d-flex align-items-center justify-content-between gap-2">
          <div class="blank-pill">
            <img src="${bt.icon}" alt="${bt.name}" onerror="this.style.display='none'"/>
            <span class="small">${bt.name}</span>
          </div>
          <div class="input-group input-group-sm blank-price">
            <input type="number" min="0" step="1" class="form-control blank-input" data-key="${key}" value="${val}">
            <span class="input-group-text">gps</span>
          </div>
        </div>
      </div>`;
  }).join('');
  blanksWrap.querySelectorAll('.blank-input').forEach(inp=>{
    inp.addEventListener('input', ()=>{
      const map=loadBlankPrices(); map[inp.dataset.key]=+inp.value||0; saveBlankPrices(map);
    });
  });
}

/* ================== RUNAS: preços por carga ================== */
const DEFAULT_RUNE_PRICES = { lmm:1, hmm:15, uh:100, sd:210, gfb:60, avalanche:65, explo:50, icicle:17 };
function loadPricesRaw(){ try{return JSON.parse(localStorage.getItem(PRICE_KEY)||"{}");}catch{return{};} }
function loadPricesMerged(){
  const saved = loadPricesRaw();
  const merged = {...saved};
  for (const [id, val] of Object.entries(DEFAULT_RUNE_PRICES)){
    const key = `price_${id}`;
    if (merged[key] == null) merged[key] = val;
  }
  return merged;
}
function savePrices(map){ localStorage.setItem(PRICE_KEY, JSON.stringify(map)); }
function spellsForVoc(voc){ return SPELLS.filter(s=>s.vocs.includes(voc)); }
function runeImg(name){ return `assets/images/${name.toLowerCase().replace(/\s+/g,'')}.gif`; }
function getPricePerCharge(spellId){
  const map = loadPricesMerged();
  const v = map[`price_${spellId}`];
  return (v==null?0:+v);
}
function renderPriceInputs(){
  const voc=vocationEl.value, list=spellsForVoc(voc), map=loadPricesMerged();
  pricesWrap.innerHTML = list.length ? list.map(spell=>{
    const key=`price_${spell.id}`;
    const val = (map[key] ?? '');
    return `
      <div class="col-12 col-md-6">
        <div class="price-row d-flex align-items-center justify-content-between gap-2">
          <div class="d-flex align-items-center gap-2">
            <img class="rune-icon" src="${runeImg(spell.name)}" onerror="this.style.display='none'">
            <span class="name">${spell.name}</span>
          </div>
          <div class="input-group input-group-sm">
            <input type="number" min="0" step="1" class="form-control price-input" data-key="${key}" placeholder="preço por carga" value="${val}">
            <span class="input-group-text">gps</span>
          </div>
        </div>
      </div>`;
  }).join('')
  : `<div class="placeholder-box">Sem runas para esta vocação.</div>`;
  pricesWrap.querySelectorAll('.price-input').forEach(inp=>{
    inp.addEventListener('input', ()=>{
      const m=loadPricesRaw();
      if(inp.value==='') delete m[inp.dataset.key]; else m[inp.dataset.key]=+inp.value;
      savePrices(m);
    });
  });
}

/* ================== SIMULAÇÃO ================== */
function spiritMaxForVoc(voc){ return PROMOTED.has(voc) ? 1000 : 500; }
function updateSpiritBadge(){
  const spMax = spiritMaxForVoc(vocationEl.value);
  spiritBadgeEl.textContent = `SP máx: ${spMax}`;
  if (spiritStartEl.value === '' || spiritStartEl.value == null) spiritStartEl.value = spMax;
}
updateSpiritBadge();

function baseMpPerSec(voc){ const {mpPer, mpEverySec}=VOCATION_REGEN[voc]; return mpPer/mpEverySec; }
function itemsMpPerSec(){
  // soma (qty * plusMp / perSec) de cada item
  return items.reduce((acc,it)=>{
    const qty=+it.qty||0, plus=+it.plusMp||0, per=+it.perSec||1;
    return acc + (qty * plus / Math.max(1,per));
  },0);
}
function itemsCostFor(minutes){
  // custo proporcional à duração usada (minutos / duraçãoMin), até 100%
  let total=0;
  for(const it of items){
    const qty=+it.qty||0; if(!qty) continue;
    const price=(it.price==null?null:+it.price);
    const dur=(it.durationMin==null?null:+it.durationMin);
    if(price!=null && dur!=null && dur>0){
      const frac=Math.min(1, Math.max(0, minutes)/dur);
      total += qty * price * frac;
    }
  }
  return total;
}
function getBlankPriceById(id){
  if(id==null) return 0;
  const map=loadBlankPrices(), key=`blank_${id}`;
  const fallback=BLANK_TYPES.find(b=>b.id===id)?.defaultPrice??0;
  return map[key] ?? fallback;
}

function simulateSpell(spell, minutes, voc, spiritStartOpt){
  const secs=Math.max(1,Math.round(minutes*60));
  const spMax=spiritMaxForVoc(voc);
  let start;
  if (spiritStartOpt === '' || spiritStartOpt == null || isNaN(+spiritStartOpt)) start = spMax;
  else start = Math.max(0, Math.min(spMax, +spiritStartOpt));
  let sp=start, mana=0, casts=0;
  const baseSec=baseMpPerSec(voc), itemSec=itemsMpPerSec();

  for(let t=0;t<secs;t++){
    const factor=0.5+0.5*(sp/spMax);
    mana += (baseSec+itemSec)*factor;
    let guard=0;
    while(mana>=spell.mana && guard<1000){
      mana-=spell.mana; sp=Math.max(0, sp - spell.spirit); casts++; guard++;
    }
  }
  const totalCharges=casts*spell.charges;
  const pricePerCharge=getPricePerCharge(spell.id);
  const revenue=totalCharges*pricePerCharge;
  const blanksCost=(spell.blankType? casts*getBlankPriceById(spell.blankType) : 0);
  const itemsCost=itemsCostFor(minutes);
  const profit=revenue - blanksCost - itemsCost;
  const profitPerHour=profit * (60/minutes);
  const chargesPerHour=(totalCharges/minutes)*60;

  return {casts,totalCharges,revenue,blanksCost,itemsCost,profit,profitPerHour,chargesPerHour,spFinal:Math.round(sp),spStart:start};
}

/* ================== RENDER ================== */
let lastRows=[];
const fmt = n => new Intl.NumberFormat('pt-BR',{maximumFractionDigits:0}).format(Math.round(n));
const fmtMoney = n => new Intl.NumberFormat('pt-BR').format(Math.round(n));
const blankName = id => (BLANK_TYPES.find(b=>b.id===id)?.name ?? '—');

function podiumCard(entry, pos){
  const {spell, calc} = entry;
  const baseColor = pos===1?'var(--gold)':(pos===2?'var(--silver)':'var(--bronze)');
  return `
    <div class="pedestal">
      <div class="topglow"></div>
      <div class="d-flex flex-column align-items-center text-center gap-2">
        <div class="rune-top"><img src="${runeImg(spell.name)}" alt="${spell.name}" onerror="this.style.display='none'"/></div>
        <div class="fw-bold">${pos}º • ${spell.name}</div>
        <div class="d-flex flex-wrap justify-content-center gap-2">
          <span class="pill"><i class="fa fa-coins"></i> ${fmt(calc.profitPerHour)} gps/h</span>
          <span class="pill"><i class="fa fa-bolt"></i> ${fmt(calc.chargesPerHour)} c/h</span>
          <span class="pill"><i class="fa fa-droplet"></i> SP ${calc.spStart}→${calc.spFinal}</span>
        </div>
      </div>
      <div style="height:10px;width:100%;border-radius:0 0 14px 14px;margin-top:.6rem;background:linear-gradient(90deg, ${baseColor}, transparent);opacity:.5;"></div>
    </div>`;
}
function renderPodium(rows){
  const top=rows.slice(0,3);
  const order=[1,0,2];
  let html='';
  for(let i=0;i<order.length;i++){ const idx=order[i]; if(top[idx]) html+=podiumCard(top[idx], idx+1); }
  podiumWrap.innerHTML = html;
}

function resultRow(row, idx){
  const c=row.calc, name=row.spell.name;
  const rankClass = idx===0?'rank-1':(idx===1?'rank-2':(idx===2?'rank-3':''));
  return `
    <div class="result-row">
      <div class="result-head">
        <div class="d-flex align-items-center gap-3">
          <div class="rank-number ${rankClass}">${idx+1}</div>
          <img src="${runeImg(name)}" class="rune-icon" style="width:40px;height:40px;border-radius:8px;image-rendering:pixelated" onerror="this.style.display='none'">
          <div>
            <div class="fw-bold">${name}</div>
            <div class="result-meta">
              <span class="tag">${row.spell.blankType ? blankName(row.spell.blankType) : 'sem blank'}</span>
            </div>
          </div>
        </div>
        <div class="text-end">
          <div class="fw-bold">${fmt(c.profitPerHour)} gps/h</div>
          <div class="small">Lucro: ${fmt(c.profit)}</div>
        </div>
      </div>

      <div class="result-grid">
        <div class="kv"><div class="k">Casts</div><div class="v">${fmt(c.casts)}</div></div>
        <div class="kv"><div class="k">Cargas</div><div class="v">${fmt(c.totalCharges)}</div></div>
        <div class="kv"><div class="k">Receita</div><div class="v">${fmt(c.revenue)}</div></div>
        <div class="kv"><div class="k">SP inicial → final</div><div class="v">${c.spStart} → ${c.spFinal}</div></div>
        <div class="kv"><div class="k">Custo blanks</div><div class="v">${fmt(c.blanksCost)}</div></div>
        <div class="kv"><div class="k">Custo itens</div><div class="v">${fmt(c.itemsCost)}</div></div>
      </div>
    </div>`;
}
function renderResults(rows){
  if(!rows.length){
    resultsList.innerHTML = `<div class="placeholder-box">Sem runas para esta vocação.</div>`;
    bestBadge.innerHTML=''; podiumWrap.innerHTML=''; lastRows=[]; refreshSafezoneRuneList(); return;
  }
  rows.sort((a,b)=>b.calc.profitPerHour - a.calc.profitPerHour);
  lastRows=rows;
  renderPodium(rows);
  resultsList.innerHTML = rows.map((r,i)=>resultRow(r,i)).join('');
  const best=rows[0];
  bestBadge.innerHTML = `
    <div class="alert alert-warning mb-0" style="border:1px solid rgba(211,163,123,.45); color:#fff; background:rgba(211,163,123,.15)">
      <i class="fa fa-trophy me-2"></i>
      Melhor por lucro/h: <strong>${best.spell.name}</strong> — <strong>${fmt(best.calc.profitPerHour)}</strong> por hora
    </div>`;
  refreshSafezoneRuneList();
}

/* ================== SAFEZONE (com seleção do plano) ================== */
function renderSafezoneTiers(){
  if(!safeTierSelEl) return;
  safeTierSelEl.innerHTML = SAFEZONE_TIERS
    .map(t => `<option value="${t.points}">${t.label}</option>`)
    .join('');
}
function safeCost(points, coinPrice){
  const p = (+points||0), c=(+coinPrice||0);
  return (p * c) / 10;
}
function makeSafezoneReport(row, coinPrice, points, label, durationHours){
  const cost = safeCost(points, coinPrice);
  const profitH = row.calc.profitPerHour;
  const chargesH = row.calc.chargesPerHour;

  const hoursToPay = profitH > 0 ? cost / profitH : Infinity;
  const totalProfit = isFinite(durationHours) ? profitH * durationHours : 0;
  const totalCharges = isFinite(durationHours) ? chargesH * durationHours : 0;

  const remainingHours = (isFinite(hoursToPay) ? Math.max(0, durationHours - hoursToPay) : 0);
  const profitAfterPay = totalProfit - cost;

  return {
    runeName: row.spell.name,
    cost,
    profitH,
    chargesH,
    hoursToPay,
    totalProfit,
    totalCharges,
    profitAfterPay,
    remainingHours,
    planLabel: label,
    points,
    durationHours
  };
}
function hhmm(hoursFloat){
  if(!isFinite(hoursFloat)) return '∞';
  const totalMin=Math.round(hoursFloat*60), h=Math.floor(totalMin/60), m=totalMin%60;
  return `${h}h ${m}m`;
}
function renderSafezoneOutput(rep, coinPrice){
  const fmtL = n => new Intl.NumberFormat('pt-BR',{maximumFractionDigits:0}).format(Math.round(n));
  const fmtM = n => new Intl.NumberFormat('pt-BR').format(Math.round(n));
  safeResultEl.innerHTML = `
    <div class="card result-card"><div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <div class="h6 mb-0">Resultado da Safezone</div>
      </div>

      <div class="small opacity-75">
        Plano: <strong>${rep.planLabel}</strong> • Points: <strong>${rep.points}</strong> • Duração: <strong>${fmtL(rep.durationHours)} h</strong>
      </div>

      <div class="mt-1">Cálculo do custo:
        <code>(points × market) / 10</code> ⇒
        <strong class="brand-accent">${rep.points} × ${fmtM(+coinPrice||0)} / 10 = ${fmtM(rep.cost)} gps</strong>
      </div>

      <hr class="my-2"/>

      <div class="row row-cols-1 row-cols-md-3 g-2">
        <div class="col"><div class="small opacity-75">Runa</div><div class="fw-semibold">${rep.runeName}</div></div>
        <div class="col"><div class="small opacity-75">Lucro/h</div><div class="fw-semibold">${fmtM(rep.profitH)} gps/h</div></div>
        <div class="col"><div class="small opacity-75">Tempo para pagar</div><div class="fw-semibold">${hhmm(rep.hoursToPay)}</div></div>
      </div>

      <hr class="my-2"/>

      <div class="row row-cols-1 row-cols-md-4 g-2">
        <div class="col">
          <div class="small opacity-75">Lucro total (plano)</div>
          <div class="fw-semibold">${fmtM(rep.totalProfit)} gps</div>
        </div>
        <div class="col">
          <div class="small opacity-75">Qtd. total de runas</div>
          <div class="fw-semibold">${fmtL(rep.totalCharges)} cargas</div>
        </div>
        <div class="col">
          <div class="small opacity-75">Lucro após pagar</div>
          <div class="fw-semibold">${fmtM(rep.profitAfterPay)} gps</div>
        </div>
        <div class="col">
          <div class="small opacity-75">Tempo restante do plano</div>
          <div class="fw-semibold">${hhmm(rep.remainingHours)}</div>
        </div>
      </div>
    </div></div>`;
}

/* ================== AÇÕES ================== */
function renderAll(){
  renderItems();
  renderBlankTypeInputs();
  renderPriceInputs();
  renderSafezoneTiers();
}

compareBtn.addEventListener('click', ()=>{
  const t = Math.max(1, +huntTimeEl.value||60);
  const minutes = (huntTimeUnitEl.value==='h') ? t*60 : t;
  const voc=vocationEl.value;
  const spStart=spiritStartEl.value;
  const list=spellsForVoc(voc);

  // vocações que não conjuram
  if(!list.length){
    tabsBlock.classList.remove('d-none');
    document.getElementById('pane-ranking').classList.add('show','active');
    document.getElementById('tab-ranking').classList.add('active');
    document.getElementById('pane-safezone').classList.remove('show','active');
    document.getElementById('tab-safezone').classList.remove('active');
    resultsList.innerHTML = `<div class="placeholder-box">Esta vocação não conjura runas/munições para ranking.</div>`;
    bestBadge.innerHTML=''; podiumWrap.innerHTML='';
    lastRows=[]; refreshSafezoneRuneList();
    showPixModal();
    return;
  }

  const rows=list.map(spell=>({spell, calc: simulateSpell(spell, minutes, voc, spStart)}));
  renderResults(rows);

  tabsBlock.classList.remove('d-none');
  ensureMdbTabs();
  showPixModal(); // Modal PIX obrigatório
});

vocationEl.addEventListener('change', ()=>{
  updateSpiritBadge();
  renderPriceInputs();

  tabsBlock.classList.add('d-none');
  resultsList.innerHTML = `<div class="placeholder-box">Selecione os preços e clique em <em>Comparar runas</em>.</div>`;
  bestBadge.innerHTML=''; podiumWrap.innerHTML='';
  lastRows=[]; refreshSafezoneRuneList();

  const spMax=spiritMaxForVoc(vocationEl.value);
  if(spiritStartEl.value==='' || spiritStartEl.value==null){
    spiritStartEl.value = spMax;
  }else{
    const v=Math.max(0, Math.min(spMax, +spiritStartEl.value));
    spiritStartEl.value = isNaN(v)?spMax:v;
  }
});

/* Safezone calc */
calcSafeBtn.addEventListener('click', ()=>{
  const coinPrice = +coinPriceEl.value || 0;
  if(!coinPrice){
    safeResultEl.innerHTML = `<div class="alert alert-danger mb-0">
      Informe o <strong>Preço da coin (market)</strong> para calcular.
    </div>`;
    showPixModal();
    return;
  }
  if(!lastRows.length){
    safeResultEl.innerHTML = `<div class="alert alert-info mb-0">
      Calcule o ranking em <strong>RANKING ▸ Comparar runas</strong> primeiro.
    </div>`;
    showPixModal();
    return;
  }

  const selRune = safeRuneSelEl.value;
  const row = (selRune==='best') ? lastRows[0] : (lastRows.find(r=>r.spell.id===selRune) || lastRows[0]);

  const points = +(safeTierSelEl?.value || 0);
  const tier   = SAFEZONE_TIERS.find(t => t.points === points);
  const label  = tier?.label || 'Plano personalizado';
  const durationHours = tier?.durationHours ?? 0;

  const rep = makeSafezoneReport(row, coinPrice, points, label, durationHours);
  renderSafezoneOutput(rep, coinPrice);
  showPixModal();
});

/* ====== TABS fallback ====== */
function ensureMdbTabs() {
  const tabButtons = document.querySelectorAll('#rankSafeTabs [data-mdb-toggle="tab"]');
  tabButtons.forEach((btn) => {
    if (btn.__mdbBound) return;
    btn.__mdbBound = true;
    btn.addEventListener('click', () => {
      const targetSel = btn.getAttribute('data-mdb-target');
      try {
        if (window.mdb && typeof window.mdb.Tab === 'function') {
          const instance = mdb.Tab.getInstance(btn) || new mdb.Tab(btn);
          instance.show();
        } else {
          document.querySelectorAll('#rankSafeTabs .nav-link').forEach(l => l.classList.remove('active'));
          btn.classList.add('active');
          document.querySelectorAll('#rankSafeTabsContent .tab-pane').forEach(p => p.classList.remove('show','active'));
          const pane = document.querySelector(targetSel);
          if (pane) pane.classList.add('active','show');
        }
      } catch {
        document.querySelectorAll('#rankSafeTabs .nav-link').forEach(l => l.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('#rankSafeTabsContent .tab-pane').forEach(p => p.classList.remove('show','active'));
        const pane = document.querySelector(targetSel);
        if (pane) pane.classList.add('active','show');
      }
    });
  });
}

/* ====== Modal PIX (MDB + fallback + copiar + scroll) ====== */
function showPixModal(){
  const modalEl = document.getElementById('pixModal');
  try{
    if (window.mdb && typeof window.mdb.Modal === 'function'){
      const modal = mdb.Modal.getInstance(modalEl) || new mdb.Modal(modalEl);
      modal.show();
    } else {
      modalEl.classList.add('show','d-block');
      createBackdrop();
      modalEl.querySelector('[data-mdb-dismiss="modal"]').onclick = hidePixModal;
    }
  }catch{
    modalEl.classList.add('show','d-block');
    createBackdrop();
    modalEl.querySelector('[data-mdb-dismiss="modal"]').onclick = hidePixModal;
  }
}
function createBackdrop(){
  let bd = document.getElementById('pixBackdrop');
  if(!bd){
    bd = document.createElement('div');
    bd.id = 'pixBackdrop';
    bd.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1040;';
    bd.onclick = hidePixModal;
    document.body.appendChild(bd);
  }
}
function scrollToRunes(){
  const target = document.getElementById('runesSection');
  if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
}
function hidePixModal(){
  const modalEl = document.getElementById('pixModal');
  modalEl.classList.remove('show','d-block');
  const bd = document.getElementById('pixBackdrop');
  if (bd) bd.remove();
  scrollToRunes();
}
document.getElementById('closePix')?.addEventListener('click', ()=> { scrollToRunes(); });
document.getElementById('pixModal')?.addEventListener('hidden.mdb.modal', scrollToRunes);

copyPixBtn?.addEventListener('click', async ()=>{
  try{
    await navigator.clipboard.writeText('63992131462');
    copyMsg.textContent = 'Chave PIX copiada! Obrigado pelo café ☕💛';
  }catch{
    copyMsg.textContent = 'Não foi possível copiar automaticamente. Copie: 63992131462';
  }
});

/* === Atualiza o select da Safezone com as runas do último ranking === */
function refreshSafezoneRuneList(){
  if (!safeRuneSelEl) return;
  const previous = safeRuneSelEl.value || 'best';
  const options =
    `<option value="best">Melhor por lucro/h</option>` +
    (lastRows && lastRows.length
      ? lastRows.map(r => `<option value="${r.spell.id}">${r.spell.name}</option>`).join('')
      : '');
  safeRuneSelEl.innerHTML = options;
  const hasPrev = Array.from(safeRuneSelEl.options).some(o => o.value === previous);
  safeRuneSelEl.value = hasPrev ? previous : 'best';
}

/* inicial */
renderAll();
refreshSafezoneRuneList();
