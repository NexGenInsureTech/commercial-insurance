/* 100Cr Control Tower (Web)
   No-CDN, pure HTML/CSS/JS
   Requires local vendor/xlsx.full.min.js
*/

// ======== ELEMENTS ========
const el = {
  file: document.getElementById('xlsxFile'),
  includePromoter: document.getElementById('includePromoter'),
  includeNBFC: document.getElementById('includeNBFC'),
  includeRRB: document.getElementById('includeRRB'),
  nbfcGranularity: document.getElementById('nbfcGranularity'),
  targetTotal: document.getElementById('targetTotal'),
  targetPromoter: document.getElementById('targetPromoter'),
  targetNBFC: document.getElementById('targetNBFC'),
  targetRRB: document.getElementById('targetRRB'),
  applyTargets: document.getElementById('applyTargets'),

  // KPIs
  kpiTarget: document.getElementById('kpiTarget'),
  kpiBaseline: document.getElementById('kpiBaseline'),
  kpiMonths: document.getElementById('kpiMonths'),
  kpiGap: document.getElementById('kpiGap'),
  wfList: document.getElementById('waterfallList'),

  // Charts/Grids
  channelBars: document.getElementById('channelBars'),
  nbfcPartnerBars: document.getElementById('nbfcPartnerBars'),
  heatmapGrid: document.getElementById('heatmapGrid'),
  bubbleSvg: document.getElementById('bubbleSvg'),
  bubbleLegend: document.getElementById('bubbleLegend'),
  dailyTable: document.getElementById('dailyTable'),
  dailySvg: document.getElementById('dailySvg'),

  // Tabs
  tabLinks: document.querySelectorAll('.tab-link'),
  tabPanels: document.querySelectorAll('.tab-panel')
};

// ======== TABS ========
el.tabLinks.forEach(btn => {
  btn.addEventListener('click', () => {
    el.tabLinks.forEach(b => b.classList.remove('active'));
    el.tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// ======== CONSTANTS ========
const MONTHS = ['APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC','JAN','FEB'];
const DEFAULT_NBFC_PARTNERS = [
  { name: 'Direct Banca', target: 800 },
  { name: 'Choice Insurance Broking', target: 400 },
  { name: 'RiskIQ', target: 250 },
  { name: 'Emedlife', target: 200 },
  { name: 'Unity SFB', target: 100 },
  { name: 'Ambit', target: 50 }
];

// Waterfall dials (baseline -> 10,000)
function buildDefaultWaterfall(gap) {
  const fixed = [
    { key: 'Activation uplift', val: 2000 },
    { key: 'Cross-sell penetration', val: 1400 },
    { key: 'Ticket-size increase', val: 700 },
    { key: 'NBFC bundles surge', val: 800 },
  ];
  const used = fixed.reduce((a,b)=>a+b.val,0);
  const rest = Math.max(0, gap - used);
  fixed.push({ key: 'Area mix + RRB sachets', val: rest });
  return fixed;
}

// ======== STATE ========
let workbookData = null; // sheets as arrays of objects
let computed = {};       // all derived metrics

// ======== HELPERS ========
function sheetJSON(wb, name) {
  const ws = wb.Sheets[name];
  if (!ws) return [];
  return XLSX.utils.sheet_to_json(ws, { defval: null });
}
function toNum(v) { return (v==null || v==='') ? 0 : Number(v) || 0; }
function sumMonths(row) {
  return MONTHS.reduce((s, m) => s + toNum(row[m]), 0);
}
function endsWithTotal(v) {
  return (typeof v === 'string') && v.trim().toLowerCase().endsWith('total');
}
function isGrandTotal(v) {
  return (typeof v === 'string') && v.trim().toLowerCase() === 'grand total';
}
function ffillColumn(arr, key) {
  let last = null;
  for (const r of arr) {
    if (r[key] == null || r[key] === '') r[key] = last;
    else last = r[key];
  }
}
function numberFormat(n) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}
function numberFormat1(n) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 1 });
}
function numberFormat2(n) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

// ======== CORE COMPUTE ========
function computeAll() {
  if (!workbookData) return;
  const { promoter, rrb, nbfc, stateProm, stateRRB, stateNBFC, dist } = workbookData;

  // 1) Monthly totals by channel (using rows whose INTERMEDIARY endswith 'Total' excluding 'Grand Total')
  const mProm = monthlyTotals(promoter);
  const mRRB  = monthlyTotals(rrb);
  const mNBFC = monthlyTotals(nbfc);
  const mAll = {};
  MONTHS.forEach(m => mAll[m] = (mProm[m]||0) + (mRRB[m]||0) + (mNBFC[m]||0));

  const baseline = (toNum(mAll['DEC']) + toNum(mAll['JAN']) + toNum(mAll['FEB'])) / 3;

  // 2) Defaults from UI targets
  const targetTotal = toNum(el.targetTotal.value);
  const targetPromoter = toNum(el.targetPromoter.value);
  const targetNBFC = toNum(el.targetNBFC.value);
  const targetRRB = toNum(el.targetRRB.value);

  // 3) Waterfall dials
  const gap = Math.max(0, targetTotal - baseline);
  const wf = buildDefaultWaterfall(gap);

  // 4) Heatmap (Promoter: Area × LoB; Top 10 areas)
  const heat = computeHeatmap(stateProm);

  // 5) Bubble data: IB (Promoter state) + OGB/TNGB (RRB)
  const bubble = computeBubble(stateProm, stateRRB, dist);

  // 6) Daily tracker table for current month
  const daily = buildDailyTableData(targetTotal);

  // Save computed
  computed = { mAll, baseline, targetTotal, targetPromoter, targetNBFC, targetRRB, wf, heat, bubble, daily };

  // Refresh UI
  renderOverview();
  renderChannels();
  renderHeatmap();
  renderBubble();
  renderDaily();
}

// Monthly totals helper
function monthlyTotals(arr) {
  // find rows where INTERMEDIARY endswith 'Total' and not 'Grand Total'
  const res = {}; MONTHS.forEach(m => res[m]=0);
  (arr||[]).forEach(r => {
    if (endsWithTotal(r['INTERMEDIARY']) && !isGrandTotal(r['INTERMEDIARY'])) {
      MONTHS.forEach(m => res[m] += toNum(r[m]));
    }
  });
  return res;
}

// Heatmap compute: forward-fill INTERMEDIARY/AREA/LINE OF BUSINESS; filter non-total INTERMEDIARY; keep rows where AREA endswith ' Total'
function computeHeatmap(stateProm) {
  const rows = (stateProm||[]).map(r => ({...r}));
  ['INTERMEDIARY','AREA','LINE OF BUSINESS'].forEach(k => ffillColumn(rows,k));
  const clean = rows.filter(r => !endsWithTotal(r['INTERMEDIARY']));
  const areaTotalRows = clean.filter(r => typeof r['AREA']==='string' && r['AREA'].trim().endsWith(' Total'));
  // aggregate Area × LOB
  const key = (a,b) => `${a}__${b}`;
  const map = new Map();
  areaTotalRows.forEach(r => {
    const A = r['AREA'], L = r['LINE OF BUSINESS']; if (!A||!L) return;
    const k = key(A,L);
    map.set(k, (map.get(k)||0) + sumMonths(r));
  });
  // area totals to rank top 10
  const areaSum = {};
  map.forEach((v,kStr) => {
    const a = kStr.split('__')[0];
    areaSum[a] = (areaSum[a]||0) + v;
  });
  const topAreas = Object.entries(areaSum).sort((a,b)=>b[1]-a[1]).slice(0,10).map(d=>d[0]);
  // collect final grid
  const LOBS_ORDER = ['Personal Accident','Health','Fire','Motor','Miscellaneous','Rural','Engineering','Marine Cargo','Liability',"Workmen's Compensation"];
  const grid = topAreas.map(a => {
    const row = { area:a };
    LOBS_ORDER.forEach(l => {
      const v = map.get(key(a,l)) || 0;
      row[l] = v;
    });
    return row;
  });
  return { grid, lobs: LOBS_ORDER };
}

// Bubble compute: IB areas + OGB (Orissa) + TNGB (Chennai/Rest of TN)
function computeBubble(stateProm, stateRRB, dist) {
  // 1) Promoter area premiums (non-total INTERMEDIARY; AREA endswith ' Total')
  const rowsP = (stateProm||[]).map(r=>({...r}));
  ['INTERMEDIARY','AREA','LINE OF BUSINESS'].forEach(k => ffillColumn(rowsP,k));
  const pClean = rowsP.filter(r => !endsWithTotal(r['INTERMEDIARY']) && typeof r['AREA']==='string' && r['AREA'].trim().endsWith(' Total'));
  const pAreaPrem = {};
  pClean.forEach(r => {
    const a = r['AREA']; pAreaPrem[a] = (pAreaPrem[a]||0) + sumMonths(r);
  });

  // 2) RRB area premiums (same logic)
  const rowsR = (stateRRB||[]).map(r=>({...r}));
  ['INTERMEDIARY','AREA','LINE OF BUSINESS'].forEach(k => ffillColumn(rowsR,k));
  const rClean = rowsR.filter(r => !endsWithTotal(r['INTERMEDIARY']) && typeof r['AREA']==='string' && r['AREA'].trim().endsWith(' Total'));
  const rAreaPrem = {};
  rClean.forEach(r => {
    const a = r['AREA']; rAreaPrem[a] = (rAreaPrem[a]||0) + sumMonths(r);
  });

  // 3) Outlets from Bank_Distribution_Statewise (forward-fill Region/AREA MAPPED)
  const distRows = (dist||[]).map(r=>({...r}));
  ['Region','AREA MAPPED'].forEach(k => ffillColumn(distRows,k));
  // IB
  const ibOutlets = {};
  distRows.filter(r => r['Bank Name']==='INDIAN BANK').forEach(r => {
    const label = (r['AREA MAPPED']||'') + ' Total';
    ibOutlets[label] = toNum(r['Total']) || ibOutlets[label] || 0;
  });
  // OGB
  let ogbOut = 0; 
  distRows.filter(r => r['Bank Name']==='ODISHA GRAMYA BANK').forEach(r => { ogbOut += toNum(r['Total']); });
  // TNGB
  let tngbChn=0, tngbRest=0;
  distRows.filter(r => r['Bank Name']==='TAMIL NADU GRAMA BANK').forEach(r => {
    if (r['AREA MAPPED']==='CHENNAI') tngbChn += toNum(r['Total']);
    if (r['AREA MAPPED']==='REST OF TN') tngbRest += toNum(r['Total']);
  });

  // 4) Build bubbles
  const out = [];
  // IB areas: take top by premium
  Object.entries(pAreaPrem).sort((a,b)=>b[1]-a[1]).slice(0,10).forEach(([areaPremLabel, prem])=>{
    const outlets = ibOutlets[areaPremLabel] || 0;
    if (outlets>0) {
      out.push({ label: 'IB: ' + areaPremLabel.replace(' Total',''), outlets, perOutlet: prem/outlets, premium: prem });
    }
  });
  // OGB Orissa
  const ogbArea = Object.keys(rAreaPrem).find(a => a.toUpperCase().includes('ORISSA'));
  if (ogbArea && ogbOut>0) out.push({ label:'OGB: Orissa', outlets:ogbOut, perOutlet:rAreaPrem[ogbArea]/ogbOut, premium:rAreaPrem[ogbArea] });
  // TNGB Chennai/Rest of TN
  const tngbChnKey = Object.keys(rAreaPrem).find(a => a.toUpperCase().includes('CHENNAI'));
  const tngbRestKey = Object.keys(rAreaPrem).find(a => a.toUpperCase().includes('REST OF TN'));
  if (tngbChnKey && tngbChn>0) out.push({ label:'TNGB: Chennai', outlets:tngbChn, perOutlet:rAreaPrem[tngbChnKey]/tngbChn, premium:rAreaPrem[tngbChnKey] });
  if (tngbRestKey && tngbRest>0) out.push({ label:'TNGB: Rest of TN', outlets:tngbRest, perOutlet:rAreaPrem[tngbRestKey]/tngbRest, premium:rAreaPrem[tngbRestKey] });

  return out.sort((a,b)=>b.premium-a.premium).slice(0,12);
}

// Daily table data for current month (linear pace)
function buildDailyTableData(targetTotal) {
  const now = new Date();
  const year = now.getFullYear(), month = now.getMonth(); // 0..11
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const dailyTarget = targetTotal / daysInMonth;
  const rows = [];
  let cumTgt=0;
  for (let d=1; d<=daysInMonth; d++) {
    cumTgt += dailyTarget;
    rows.push({ day:d, promoter:null, nbfc:null, rrb:null, total:0, cum:0, tgt:dailyTarget, cumTgt });
  }
  return { rows, dailyTarget };
}

// ======== RENDERERS ========
function renderOverview() {
  const { targetTotal, baseline, wf, mAll } = computed;
  el.kpiTarget.textContent = numberFormat(targetTotal);
  el.kpiBaseline.textContent = numberFormat1(baseline);
  el.kpiMonths.textContent = `Dec ${numberFormat1(mAll.DEC || 0)} | Jan ${numberFormat1(mAll.JAN || 0)} | Feb ${numberFormat1(mAll.FEB || 0)}`;
  el.kpiGap.textContent = numberFormat1(Math.max(0, targetTotal - baseline));

  // Waterfall bars (as simple list bars)
  const maxVal = Math.max(...wf.map(d=>d.val), baseline, targetTotal);
  el.wfList.innerHTML = '';
  const start = document.createElement('li');
  start.innerHTML = `<div class="wf-key">Baseline</div>
    <div class="wf-bar"><span style="width:${(baseline/maxVal*100).toFixed(2)}%"></span></div>
    <div class="bar-amt">${numberFormat1(baseline)}</div>`;
  el.wfList.appendChild(start);
  wf.forEach(d => {
    const li = document.createElement('li');
    li.innerHTML = `<div class="wf-key">${d.key}</div>
      <div class="wf-bar"><span style="width:${(d.val/maxVal*100).toFixed(2)}%"></span></div>
      <div class="bar-amt">${numberFormat1(d.val)}</div>`;
    el.wfList.appendChild(li);
  });
  const end = document.createElement('li');
  end.innerHTML = `<div class="wf-key"><b>Target</b></div>
    <div class="wf-bar"><span style="width:${(targetTotal/maxVal*100).toFixed(2)}%;background:#7bd88f"></span></div>
    <div class="bar-amt"><b>${numberFormat(targetTotal)}</b></div>`;
  el.wfList.appendChild(end);
}

function renderChannels() {
  const includePromoter = el.includePromoter.value === 'Yes';
  const includeNBFC = el.includeNBFC.value === 'Yes';
  const includeRRB = el.includeRRB.value === 'Yes';
  const gran = el.nbfcGranularity.value; // 'Aggregate' | 'Partners'

  const tp = toNum(el.targetPromoter.value);
  const tn = toNum(el.targetNBFC.value);
  const tr = toNum(el.targetRRB.value);

  // Aggregate channel bars
  const rows = [];
  if (includePromoter) rows.push({ key: 'Promoter Banks', val: tp });
  if (includeNBFC && gran==='Aggregate') rows.push({ key: 'NBFC & Others (Aggregate)', val: tn });
  if (includeRRB) rows.push({ key: 'Regional Rural Banks', val: tr });

  const max = Math.max(1, ...rows.map(r=>r.val));
  el.channelBars.innerHTML = rows.map(r => `
    <div class="bar-row">
      <div class="bar-key">${r.key}</div>
      <div class="bar-amt">${numberFormat(r.val)}</div>
      <div class="bar-vis"><span style="width:${(r.val/max*100).toFixed(1)}%"></span></div>
    </div>`).join('');

  // NBFC partners (only if granularity = Partners AND Include NBFC)
  if (includeNBFC && gran==='Partners') {
    const partners = DEFAULT_NBFC_PARTNERS;
    const maxp = Math.max(1, ...partners.map(p=>p.target));
    el.nbfcPartnerBars.innerHTML = partners.map(p => `
      <div class="bar-row">
        <div class="bar-key">${p.name}</div>
        <div class="bar-amt">${numberFormat(p.target)}</div>
        <div class="bar-vis warn"><span style="width:${(p.target/maxp*100).toFixed(1)}%"></span></div>
      </div>`).join('');
  } else {
    el.nbfcPartnerBars.innerHTML = '<div class="note">Switch NBFC Granularity to “Partners” to see partner‑wise targets.</div>';
  }
}

function renderHeatmap() {
  const { heat } = computed;
  const lobs = heat.lobs;
  const grid = heat.grid;

  if (!grid.length) {
    el.heatmapGrid.innerHTML = '<div class="note">Upload Excel to populate the heatmap.</div>';
    return;
  }

  // Determine max cell for coloring
  let vmax = 0;
  grid.forEach(r => lobs.forEach(l => { if (r[l] > vmax) vmax = r[l]; }));
  const colorCell = v => {
    if (vmax<=0) return '#0f1520';
    const t = Math.min(1, v / vmax);
    // teal-ish gradient
    const c = Math.floor(230 - 160*t);
    return `rgb(${c}, ${255 - Math.floor(120*t)}, ${240 - Math.floor(200*t)})`;
  };

  let html = `<table class="hm-table"><thead><tr><th>Area</th>${lobs.map(l=>`<th>${l}</th>`).join('')}</tr></thead><tbody>`;
  grid.forEach(r => {
    html += `<tr><td><b>${r.area}</b></td>`;
    lobs.forEach(l => {
      const v = r[l]||0;
      html += `<td><div class="hm-cell" style="background:${colorCell(v)}">${numberFormat2(v)}</div></td>`;
    });
    html += `</tr>`;
  });
  html += `</tbody></table>`;
  el.heatmapGrid.innerHTML = html;
}

function renderBubble() {
  const data = computed.bubble || [];
  const svg = el.bubbleSvg;
  const W = 900, H = 500, pad = {l:60,b:40,t:20,r:20};
  svg.innerHTML = '';

  if (!data.length) {
    svg.innerHTML = `<text x="20" y="30" fill="#9aa3af">Upload Excel to populate the bubble chart.</text>`;
    return;
  }

  const maxX = Math.max(...data.map(d=>d.outlets));
  const maxY = Math.max(...data.map(d=>d.perOutlet));
  const maxZ = Math.max(...data.map(d=>d.premium));
  const sx = x => pad.l + (x/maxX)*(W-pad.l-pad.r);
  const sy = y => H-pad.b - (y/maxY)*(H-pad.t-pad.b);
  const sz = z => 6 + 30*(z/maxZ);

  // axes
  svg.innerHTML += `<line x1="${pad.l}" y1="${H-pad.b}" x2="${W-pad.r}" y2="${H-pad.b}" stroke="#2a3444" />
                    <line x1="${pad.l}" y1="${H-pad.b}" x2="${pad.l}" y2="${pad.t}" stroke="#2a3444" />
                    <text x="${W-80}" y="${H-10}" fill="#9aa3af">Outlets</text>
                    <text x="10" y="${pad.t+10}" fill="#9aa3af">Premium/Outlet</text>`;

  // bubbles
  data.forEach(d => {
    const cx = sx(d.outlets), cy = sy(d.perOutlet), r = sz(d.premium);
    svg.innerHTML += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#5aa9e6" opacity="0.7">
        <title>${d.label}\nOutlets: ${d.outlets}\nPremium/Outlet: ${numberFormat2(d.perOutlet)}\nPremium: ${numberFormat2(d.premium)}</title>
      </circle>
      <text x="${cx+r+4}" y="${cy}" fill="#cfd8e3" font-size="11">${d.label}</text>`;
  });

  el.bubbleLegend.innerHTML = `<div class="note">Hover a bubble to view values. Larger bubbles = higher premium.</div>`;
}

function renderDaily() {
  const { rows, dailyTarget } = computed.daily || { rows:[], dailyTarget:0 };
  if (!rows.length) { el.dailyTable.innerHTML = ''; el.dailySvg.innerHTML=''; return; }

  // table
  let html = `<thead><tr>
      <th>Day</th><th>Promoter</th><th>NBFC</th><th>RRB</th>
      <th>Total</th><th>Cumulative</th><th>Linear Target</th><th>Cum. Target</th></tr></thead><tbody>`;
  let cumA = 0, cumT = 0;
  rows.forEach(r => {
    const id = r.day;
    // compute totals live from inputs if any
    html += `<tr>
      <td>${id}</td>
      <td><input class="daily-in" data-day="${id}" data-col="promoter" type="number" step="1" /></td>
      <td><input class="daily-in" data-day="${id}" data-col="nbfc" type="number" step="1" /></td>
      <td><input class="daily-in" data-day="${id}" data-col="rrb" type="number" step="1" /></td>
      <td id="dTotal_${id}">0</td>
      <td id="dCumA_${id}">0</td>
      <td>${numberFormat2(dailyTarget)}</td>
      <td id="dCumT_${id}">${numberFormat2(r.cumTgt)}</td>
    </tr>`;
  });
  html += `</tbody>`;
  el.dailyTable.innerHTML = html;

  // Live recompute on input
  el.dailyTable.querySelectorAll('input.daily-in').forEach(inp => {
    inp.addEventListener('input', () => {
      // recompute row and cumulative
      const trs = Array.from(el.dailyTable.querySelectorAll('tbody tr'));
      let cum = 0;
      trs.forEach((tr, idx) => {
        const day = idx+1;
        const vals = ['promoter','nbfc','rrb'].map(col=>{
          const cell = tr.querySelector(`input[data-day="${day}"][data-col="${col}"]`);
          return toNum(cell && cell.value);
        });
        const tot = vals.reduce((a,b)=>a+b,0);
        cum += tot;
        tr.querySelector(`#dTotal_${day}`).textContent = numberFormat2(tot);
        tr.querySelector(`#dCumA_${day}`).textContent = numberFormat2(cum);
      });
      // redraw chart
      drawDailyChart();
    });
  });

  drawDailyChart();
}

function drawDailyChart() {
  const svg = el.dailySvg; svg.innerHTML = '';
  const trs = Array.from(el.dailyTable.querySelectorAll('tbody tr'));
  if (!trs.length) return;

  // extract cum actual and cum target
  const ptsA = [], ptsT = [];
  trs.forEach((tr, idx) => {
    const day = idx+1;
    const cumA = parseFloat((tr.querySelector(`#dCumA_${day}`).textContent || '0').replace(/,/g,'')) || 0;
    const cumT = parseFloat((tr.querySelector(`#dCumT_${day}`).textContent || '0').replace(/,/g,'')) || 0;
    ptsA.push({x:day, y:cumA});
    ptsT.push({x:day, y:cumT});
  });
  const W=900,H=300,pad={l:50,b:30,t:10,r:10};
  const maxX = ptsA.length;
  const maxY = Math.max(1, ...ptsA.map(p=>p.y), ...ptsT.map(p=>p.y));
  const sx = x => pad.l + (x-1)/(maxX-1) * (W-pad.l-pad.r);
  const sy = y => H-pad.b - (y/maxY)*(H-pad.t-pad.b);

  svg.innerHTML += `<line x1="${pad.l}" y1="${H-pad.b}" x2="${W-pad.r}" y2="${H-pad.b}" stroke="#2a3444"/>
                    <line x1="${pad.l}" y1="${H-pad.b}" x2="${pad.l}" y2="${pad.t}" stroke="#2a3444"/>`;

  function path(points){ return points.map((p,i)=> (i?'L':'M')+sx(p.x)+','+sy(p.y)).join(' '); }
  svg.innerHTML += `<path d="${path(ptsT)}" stroke="#8bd3dd" fill="none" stroke-width="2"/>`;
  svg.innerHTML += `<path d="${path(ptsA)}" stroke="#5aa9e6" fill="none" stroke-width="2"/>`;
  svg.innerHTML += `<text x="${W-120}" y="${pad.t+20}" fill="#8bd3dd">Cum. Target</text>`;
  svg.innerHTML += `<text x="${W-120}" y="${pad.t+40}" fill="#5aa9e6">Cum. Actual</text>`;
}

// ======== EVENTS ========
el.file.addEventListener('change', async (e) => {
  const f = e.target.files && e.target.files[0];
  if (!f) return;
  const buf = await f.arrayBuffer();
  const wb = XLSX.read(buf, { type: 'array' });

  // load required sheets
  const promoter = sheetJSON(wb, 'Promoter Banks');
  const rrb = sheetJSON(wb, 'Regional Rural Banks');
  const nbfc = sheetJSON(wb, 'NBFC_Others');
  const stateProm = sheetJSON(wb, 'Statewise_LOB_Promoter_Banks');
  const stateRRB  = sheetJSON(wb, 'Statewise_LOB_Regional Rural Ba');
  const stateNBFC = sheetJSON(wb, 'Statewise_LOB_NBFC_Others'); // reserved if needed later
  const dist      = sheetJSON(wb, 'Bank_Distribution_Statewise');

  workbookData = { promoter, rrb, nbfc, stateProm, stateRRB, stateNBFC, dist };
  computeAll();
});

el.applyTargets.addEventListener('click', () => {
  computeAll();
});

['change','input'].forEach(evt => {
  el.includePromoter.addEventListener(evt, renderChannels);
  el.includeNBFC.addEventListener(evt, renderChannels);
  el.includeRRB.addEventListener(evt, renderChannels);
  el.nbfcGranularity.addEventListener(evt, renderChannels);
});

// Initial render with blanks
computeAll();
