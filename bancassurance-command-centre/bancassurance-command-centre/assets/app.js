/* 100Cr Control Tower (Web) – No CDN
   Uses local vendor/xlsx.full.min.js (SheetJS)
   Adds ℹ︎ modal explanations; fixes load order issues.
*/
(() => {
  "use strict";

  // ======== GUARD: verify SheetJS loaded ========
  if (typeof XLSX === "undefined") {
    console.error("XLSX parser not found. Check vendor/xlsx.full.min.js path.");
    // Show a simple inline message so users see what to fix
    const warn = document.createElement('div');
    warn.style.cssText = 'background:#3a1f1f;color:#ffdede;padding:10px 14px;margin:12px;border:1px solid #5b2a2a;border-radius:8px';
    warn.innerHTML = '⚠️ <b>XLSX parser not found.</b> Please ensure <code>vendor/xlsx.full.min.js</code> exists and the path is correct.';
    document.body.prepend(warn);
    // We still wire UI so tabs and modals work, but file parsing will not.
  }

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

    // KPIs + waterfall
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
    tabPanels: document.querySelectorAll('.tab-panel'),

    // Modal
    modal: document.getElementById('modal'),
    modalTitle: document.getElementById('modalTitle'),
    modalBody: document.getElementById('modalBody')
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

  // ======== INFO MODAL CONTENT ========
  const EXPLAIN = {
    upload: `
      <p><b>Upload</b> <code>Working_for_Strategy.xlsx</code>. Parsing happens <em>locally</em>; nothing is sent to a server.</p>
      <ul>
        <li>Sheets needed: <i>Promoter Banks</i>, <i>Regional Rural Banks</i>, <i>NBFC_Others</i>, three <i>Statewise_*</i>, and <i>Bank_Distribution_Statewise</i>.</li>
        <li>All values treated as ₹ Lakhs.</li>
      </ul>
    `,
    toggles: `
      <p>Use these to <b>shape the view</b>:</p>
      <ul>
        <li><b>Include Promoter / NBFC / RRB</b> toggle channels (e.g., NBFC‑only).</li>
        <li><b>NBFC Granularity</b>: <i>Aggregate</i> (single bar) vs <i>Partners</i> (partner bars).</li>
      </ul>
    `,
    targets: `
      <p>Control the <b>monthly targets</b> used by charts and gap math:</p>
      <ul>
        <li><b>Monthly</b> default: 10,000 (₹ 100 Cr).</li>
        <li>Channel split defaults to 7,900 / 1,800 / 300 (Promoter/NBFC/RRB).</li>
      </ul>
    `,
    overview: `
      <p><b>KPIs</b> and baseline computed as Dec/Jan/Feb averages based on your uploaded data.</p>
    `,
    waterfall: `
      <p>Shows the bridge from baseline to target across five dials; the last dial auto‑balances to close the gap.</p>
    `,
    channels: `
      <p>Renders monthly split for enabled channels. Use toggles to show/hide, or switch NBFC granularity.</p>
    `,
    nbfcPartners: `
      <p>Shown when <i>NBFC Granularity = Partners</i>. Bars for Direct Banca, Choice, RiskIQ, Emedlife, Unity, Ambit.</p>
    `,
    heatmap: `
      <p>Top 10 Areas × LoB from Promoter statewise sheet. Darker = higher premium.</p>
    `,
    bubble: `
      <p>Outlets vs Premium/Outlet (size = Premium) using distribution and statewise sheets (IB + OGB + TNGB).</p>
    `,
    daily: `
      <p>Enter daily actuals; compares cumulative actual vs linear cumulative target for the month.</p>
    `,
    about: `
      <p>Local, no‑CDN, no‑server dashboard. Re‑upload Excel anytime to refresh all visuals.</p>
    `
  };

  // ======== INFO MODAL HANDLERS ========
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.info-btn');
    const closr = e.target.closest('[data-close="modal"]');
    if (btn) {
      openModal(btn.getAttribute('data-topic'));
    }
    if (closr || e.target.classList.contains('modal-backdrop')) closeModal();
  });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });

  function openModal(topic) {
    el.modalTitle.textContent = 'Info';
    el.modalBody.innerHTML = EXPLAIN[topic] || '<p>No description.</p>';
    el.modal.setAttribute('aria-hidden','false');
  }
  function closeModal() {
    el.modal.setAttribute('aria-hidden','true');
  }

  // ======== CONSTANTS & STATE ========
  const MONTHS = ['APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC','JAN','FEB'];
  const DEFAULT_NBFC_PARTNERS = [
    { name: 'Direct Banca', target: 800 },
    { name: 'Choice Insurance Broking', target: 400 },
    { name: 'RiskIQ', target: 250 },
    { name: 'Emedlife', target: 200 },
    { name: 'Unity SFB', target: 100 },
    { name: 'Ambit', target: 50 }
  ];
  let workbookData = null;
  let computed = {};

  // ======== HELPERS ========
  function sheetJSON(wb, name) {
    const ws = wb.Sheets[name];
    if (!ws) return [];
    return XLSX.utils.sheet_to_json(ws, { defval: null });
  }
  const toNum = v => (v==null || v==='') ? 0 : (Number(v) || 0);
  const sumMonths = row => MONTHS.reduce((s, m) => s + toNum(row[m]), 0);
  const endsWithTotal = v => (typeof v === 'string') && v.trim().toLowerCase().endsWith('total');
  const isGrandTotal = v => (typeof v === 'string') && v.trim().toLowerCase() === 'grand total';
  function ffillColumn(arr, key) {
    let last = null;
    for (const r of arr) { r[key] = (r[key]==null || r[key]==='') ? last : (last = r[key]); }
  }
  const numberFormat  = n => n.toLocaleString(undefined, { maximumFractionDigits: 0 });
  const numberFormat1 = n => n.toLocaleString(undefined, { maximumFractionDigits: 1 });
  const numberFormat2 = n => n.toLocaleString(undefined, { maximumFractionDigits: 2 });

  // ======== CORE COMPUTE ========
  function computeAll() {
    if (!workbookData) {
      // Render empty scaffolding so UI doesn't look broken
      renderOverview(true);
      renderChannels();
      renderHeatmap();
      renderBubble();
      renderDaily();
      return;
    }
    const { promoter, rrb, nbfc, stateProm, stateRRB, dist } = workbookData;

    const mProm = monthlyTotals(promoter);
    const mRRB  = monthlyTotals(rrb);
    const mNBFC = monthlyTotals(nbfc);
    const mAll = {}; MONTHS.forEach(m => mAll[m] = (mProm[m]||0) + (mRRB[m]||0) + (mNBFC[m]||0));
    const baseline = (toNum(mAll['DEC']) + toNum(mAll['JAN']) + toNum(mAll['FEB'])) / 3;

    const targetTotal = toNum(el.targetTotal.value);
    const targetPromoter = toNum(el.targetPromoter.value);
    const targetNBFC = toNum(el.targetNBFC.value);
    const targetRRB = toNum(el.targetRRB.value);

    const gap = Math.max(0, targetTotal - baseline);
    const wf = buildDefaultWaterfall(gap);

    const heat = computeHeatmap(stateProm);
    const bubble = computeBubble(stateProm, stateRRB, dist);
    const daily = buildDailyTableData(targetTotal);

    computed = { mAll, baseline, targetTotal, targetPromoter, targetNBFC, targetRRB, wf, heat, bubble, daily };
    renderOverview();
    renderChannels();
    renderHeatmap();
    renderBubble();
    renderDaily();
  }

  function monthlyTotals(arr) {
    const res = {}; MONTHS.forEach(m => res[m]=0);
    (arr||[]).forEach(r => {
      if (endsWithTotal(r['INTERMEDIARY']) && !isGrandTotal(r['INTERMEDIARY'])) {
        MONTHS.forEach(m => res[m] += toNum(r[m]));
      }
    });
    return res;
  }

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

  function computeHeatmap(stateProm) {
    const rows = (stateProm||[]).map(r => ({...r}));
    ['INTERMEDIARY','AREA','LINE OF BUSINESS'].forEach(k => ffillColumn(rows,k));
    const clean = rows.filter(r => !endsWithTotal(r['INTERMEDIARY']));
    const areaTotalRows = clean.filter(r => typeof r['AREA']==='string' && r['AREA'].trim().endsWith(' Total'));

    const key = (a,b) => `${a}__${b}`;
    const map = new Map();
    areaTotalRows.forEach(r => {
      const A = r['AREA'], L = r['LINE OF BUSINESS']; if (!A||!L) return;
      map.set(key(A,L), (map.get(key(A,L))||0) + sumMonths(r));
    });

    const areaSum = {};
    map.forEach((v,kStr) => { const a = kStr.split('__')[0]; areaSum[a] = (areaSum[a]||0) + v; });
    const topAreas = Object.entries(areaSum).sort((a,b)=>b[1]-a[1]).slice(0,10).map(d=>d[0]);

    const LOBS_ORDER = ['Personal Accident','Health','Fire','Motor','Miscellaneous','Rural','Engineering','Marine Cargo','Liability',"Workmen's Compensation"];
    const grid = topAreas.map(a => {
      const row = { area:a };
      LOBS_ORDER.forEach(l => row[l] = map.get(key(a,l)) || 0);
      return row;
    });

    return { grid, lobs: LOBS_ORDER };
  }

  function computeBubble(stateProm, stateRRB, dist) {
    const rowsP = (stateProm||[]).map(r=>({...r}));
    ['INTERMEDIARY','AREA','LINE OF BUSINESS'].forEach(k => ffillColumn(rowsP,k));
    const pClean = rowsP.filter(r => !endsWithTotal(r['INTERMEDIARY']) && typeof r['AREA']==='string' && r['AREA'].trim().endsWith(' Total'));
    const pAreaPrem = {}; pClean.forEach(r => { const a = r['AREA']; pAreaPrem[a] = (pAreaPrem[a]||0) + sumMonths(r); });

    const rowsR = (stateRRB||[]).map(r=>({...r}));
    ['INTERMEDIARY','AREA','LINE OF BUSINESS'].forEach(k => ffillColumn(rowsR,k));
    const rClean = rowsR.filter(r => !endsWithTotal(r['INTERMEDIARY']) && typeof r['AREA']==='string' && r['AREA'].trim().endsWith(' Total'));
    const rAreaPrem = {}; rClean.forEach(r => { const a = r['AREA']; rAreaPrem[a] = (rAreaPrem[a]||0) + sumMonths(r); });

    const distRows = (dist||[]).map(r=>({...r}));
    ['Region','AREA MAPPED'].forEach(k => ffillColumn(distRows,k));

    const ibOutlets = {};
    distRows.filter(r => r['Bank Name']==='INDIAN BANK').forEach(r => {
      const label = (r['AREA MAPPED']||'') + ' Total';
      ibOutlets[label] = toNum(r['Total']) || ibOutlets[label] || 0;
    });
    let ogbOut=0; distRows.filter(r => r['Bank Name']==='ODISHA GRAMYA BANK').forEach(r => ogbOut += toNum(r['Total']));
    let tngbChn=0, tngbRest=0;
    distRows.filter(r => r['Bank Name']==='TAMIL NADU GRAMA BANK').forEach(r => {
      const area = (r['AREA MAPPED']||'').toUpperCase();
      if (area==='CHENNAI') tngbChn += toNum(r['Total']);
      if (area==='REST OF TN') tngbRest += toNum(r['Total']);
    });

    const out = [];
    Object.entries(pAreaPrem).sort((a,b)=>b[1]-a[1]).slice(0,10).forEach(([label, prem])=>{
      const outlets = ibOutlets[label] || 0;
      if (outlets>0) out.push({ label: 'IB: ' + label.replace(' Total',''), outlets, perOutlet: prem/outlets, premium: prem });
    });

    const ogbArea = Object.keys(rAreaPrem).find(a => a.toUpperCase().includes('ORISSA'));
    if (ogbArea && ogbOut>0) out.push({ label:'OGB: Orissa', outlets:ogbOut, perOutlet:rAreaPrem[ogbArea]/ogbOut, premium:rAreaPrem[ogbArea] });

    const tngbChnKey = Object.keys(rAreaPrem).find(a => a.toUpperCase().includes('CHENNAI'));
    const tngbRestKey = Object.keys(rAreaPrem).find(a => a.toUpperCase().includes('REST OF TN'));
    if (tngbChnKey && tngbChn>0) out.push({ label:'TNGB: Chennai', outlets:tngbChn, perOutlet:rAreaPrem[tngbChnKey]/tngbChn, premium:rAreaPrem[tngbChnKey] });
    if (tngbRestKey && tngbRest>0) out.push({ label:'TNGB: Rest of TN', outlets:tngbRest, perOutlet:rAreaPrem[tngbRestKey]/tngbRest, premium:rAreaPrem[tngbRestKey] });

    return out.sort((a,b)=>b.premium-a.premium).slice(0,12);
  }

  function buildDailyTableData(targetTotal) {
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    const dailyTarget = targetTotal / daysInMonth;
    const rows = []; let cumTgt=0;
    for (let d=1; d<=daysInMonth; d++) { cumTgt += dailyTarget; rows.push({ day:d, cumTgt }); }
    return { rows, dailyTarget };
  }

  // ======== RENDERERS ========
  function renderOverview(empty=false) {
    const { targetTotal=toNum(el.targetTotal.value), baseline=0, wf=[], mAll={} } = computed || {};
    el.kpiTarget.textContent = numberFormat(targetTotal);
    el.kpiBaseline.textContent = numberFormat1(baseline);
    el.kpiMonths.textContent = `Dec ${numberFormat1(mAll.DEC || 0)} | Jan ${numberFormat1(mAll.JAN || 0)} | Feb ${numberFormat1(mAll.FEB || 0)}`;
    el.kpiGap.textContent = numberFormat1(Math.max(0, targetTotal - baseline));

    const maxVal = Math.max(
      targetTotal,
      baseline,
      ...(wf.length ? wf.map(d=>d.val) : [0])
    );
    el.wfList.innerHTML = '';
    const addRow = (label, val, color) => {
      const li = document.createElement('li');
      li.innerHTML = `<div class="wf-key">${label}</div>
        <div class="wf-bar"><span style="width:${maxVal? (val/maxVal*100).toFixed(2):0}%;${color?`background:${color}`:''}"></span></div>
        <div class="bar-amt">${numberFormat1(val)}</div>`;
      el.wfList.appendChild(li);
    };
    addRow('Baseline', baseline);
    (wf||[]).forEach(d => addRow(d.key, d.val));
    addRow('<b>Target</b>', targetTotal, '#7bd88f');
  }

  function renderChannels() {
    const includePromoter = el.includePromoter.value === 'Yes';
    const includeNBFC = el.includeNBFC.value === 'Yes';
    const includeRRB = el.includeRRB.value === 'Yes';
    const gran = el.nbfcGranularity.value;

    const tp = toNum(el.targetPromoter.value);
    const tn = toNum(el.targetNBFC.value);
    const tr = toNum(el.targetRRB.value);

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

    if (includeNBFC && gran==='Partners') {
      const partners = [
        { name: 'Direct Banca', target: 800 },
        { name: 'Choice Insurance Broking', target: 400 },
        { name: 'RiskIQ', target: 250 },
        { name: 'Emedlife', target: 200 },
        { name: 'Unity SFB', target: 100 },
        { name: 'Ambit', target: 50 }
      ];
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
    const { heat = {grid:[], lobs:[]} } = computed || {};
    const lobs = heat.lobs; const grid = heat.grid;
    if (!grid.length) { el.heatmapGrid.innerHTML = '<div class="note">Upload Excel to populate the heatmap.</div>'; return; }

    let vmax = 0; grid.forEach(r => lobs.forEach(l => { if (r[l] > vmax) vmax = r[l]; }));
    const colorCell = v => {
      if (vmax<=0) return '#0f1520';
      const t = Math.min(1, v / vmax);
      const c = Math.floor(230 - 160*t);
      return `rgb(${c}, ${255 - Math.floor(120*t)}, ${240 - Math.floor(200*t)})`;
    };

    let html = `<table class="hm-table"><thead><tr><th>Area</th>${lobs.map(l=>`<th>${l}</th>`).join('')}</tr></thead><tbody>`;
    grid.forEach(r => {
      html += `<tr><td><b>${r.area}</b></td>`;
      lobs.forEach(l => html += `<td><div class="hm-cell" style="background:${colorCell(r[l]||0)}">${numberFormat2(r[l]||0)}</div></td>`);
      html += `</tr>`;
    });
    html += `</tbody></table>`;
    el.heatmapGrid.innerHTML = html;
  }

  function renderBubble() {
    const data = (computed && computed.bubble) || [];
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

    svg.innerHTML += `<line x1="${pad.l}" y1="${H-pad.b}" x2="${W-pad.r}" y2="${H-pad.b}" stroke="#2a3444" />
                      <line x1="${pad.l}" y1="${H-pad.b}" x2="${pad.l}" y2="${pad.t}" stroke="#2a3444" />
                      <text x="${W-80}" y="${H-10}" fill="#9aa3af">Outlets</text>
                      <text x="10" y="${pad.t+10}" fill="#9aa3af">Premium/Outlet</text>`;

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
    const daily = (computed && computed.daily) || { rows:[], dailyTarget:0 };
    const rows = daily.rows; const dailyTarget = daily.dailyTarget;
    if (!rows.length) { el.dailyTable.innerHTML = ''; el.dailySvg.innerHTML=''; return; }

    let html = `<thead><tr>
        <th>Day</th><th>Promoter</th><th>NBFC</th><th>RRB</th>
        <th>Total</th><th>Cumulative</th><th>Linear Target</th><th>Cum. Target</th></tr></thead><tbody>`;
    let cum = 0;
    rows.forEach(r => {
      const id = r.day;
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

    el.dailyTable.querySelectorAll('input.daily-in').forEach(inp => {
      inp.addEventListener('input', () => {
        const trs = Array.from(el.dailyTable.querySelectorAll('tbody tr'));
        let cumA = 0;
        trs.forEach((tr, idx) => {
          const day = idx+1;
          const vals = ['promoter','nbfc','rrb'].map(col=>{
            const cell = tr.querySelector(`input[data-day="${day}"][data-col="${col}"]`);
            return toNum(cell && cell.value);
          });
          const tot = vals.reduce((a,b)=>a+b,0);
          cumA += tot;
          tr.querySelector(`#dTotal_${day}`).textContent = numberFormat2(tot);
          tr.querySelector(`#dCumA_${day}`).textContent = numberFormat2(cumA);
        });
        drawDailyChart();
      });
    });

    drawDailyChart();
  }

  function drawDailyChart() {
    const svg = el.dailySvg; svg.innerHTML = '';
    const trs = Array.from(el.dailyTable.querySelectorAll('tbody tr'));
    if (!trs.length) return;

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

    const path = points => points.map((p,i)=> (i?'L':'M')+sx(p.x)+','+sy(p.y)).join(' ');
    svg.innerHTML += `<path d="${path(ptsT)}" stroke="#8bd3dd" fill="none" stroke-width="2"/>`;
    svg.innerHTML += `<path d="${path(ptsA)}" stroke="#5aa9e6" fill="none" stroke-width="2"/>`;
    svg.innerHTML += `<text x="${W-120}" y="${pad.t+20}" fill="#8bd3dd">Cum. Target</text>`;
    svg.innerHTML += `<text x="${W-120}" y="${pad.t+40}" fill="#5aa9e6">Cum. Actual</text>`;
  }

  // ======== EVENTS ========
  if (el.file) {
    el.file.addEventListener('change', async (e) => {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      if (typeof XLSX === "undefined") {
        alert('XLSX parser is not available. Check vendor/xlsx.full.min.js');
        return;
      }
      const buf = await f.arrayBuffer();
      const wb = XLSX.read(buf, { type: 'array' });

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
  }

  if (el.applyTargets) el.applyTargets.addEventListener('click', computeAll);
  ['change','input'].forEach(evt => {
    el.includePromoter && el.includePromoter.addEventListener(evt, renderChannels);
    el.includeNBFC && el.includeNBFC.addEventListener(evt, renderChannels);
    el.includeRRB && el.includeRRB.addEventListener(evt, renderChannels);
    el.nbfcGranularity && el.nbfcGranularity.addEventListener(evt, renderChannels);
  });

  // Initial empty render (so UI skeleton is visible before upload)
  computeAll();
})();
