const kpis = [

  {
    label: "Gross Written Premium",
    value: "₹412 Cr",
    target: "₹450 Cr",
    variance: "-8.4%"
  },

  {
    label: "Policies Issued",
    value: "2.84 L",
    target: "3.10 L",
    variance: "-6.1%"
  },

  {
    label: "Active Branches",
    value: "4,812",
    target: "5,100",
    variance: "-5.6%"
  },

  {
    label: "Active Sellers",
    value: "12,440",
    target: "13,000",
    variance: "-4.3%"
  },

  {
    label: "Attachment Rate",
    value: "17.8%",
    target: "19%",
    variance: "-1.2%"
  },

  {
    label: "Conversion Rate",
    value: "23.4%",
    target: "25%",
    variance: "-1.6%"
  },

  {
    label: "Renewal Rate",
    value: "76%",
    target: "80%",
    variance: "-4%"
  },

  {
    label: "Loss Ratio",
    value: "68%",
    target: "<65%",
    variance: "+3%"
  },

  {
    label: "Commission Income",
    value: "₹31 Cr",
    target: "₹34 Cr",
    variance: "-8.8%"
  },

  {
    label: "Cancellation Ratio",
    value: "11%",
    target: "<9%",
    variance: "+2%"
  }

];

const kpiGrid = document.getElementById("kpiGrid");

kpis.forEach((kpi) => {

  const card = document.createElement("div");
  card.className = "kpi-card";

  card.innerHTML = `
    <div class="kpi-top">
      <div class="kpi-label">${kpi.label}</div>
      <div class="kpi-label">MTD</div>
    </div>

    <div class="kpi-value">${kpi.value}</div>

    <svg class="sparkline" viewBox="0 0 100 40">
      <polyline
        fill="none"
        stroke="#0f766e"
        stroke-width="3"
        points="0,28 15,24 30,26 45,18 60,20 75,14 90,10"
      />
    </svg>

    <div class="kpi-meta">
      <span>Target: ${kpi.target}</span>
      <strong>${kpi.variance}</strong>
    </div>
  `;

  kpiGrid.appendChild(card);

});

const branchData = [

  {
    region:"South",
    bank:"SBI",
    branch:"Bengaluru MG Road",
    premium:4.8,
    policies:1820,
    achievement:122,
    sellers:18,
    conversion:28,
    renewal:82,
    loss:61,
    status:"On Track"
  },

  {
    region:"North",
    bank:"PNB",
    branch:"Delhi Connaught",
    premium:2.1,
    policies:920,
    achievement:71,
    sellers:9,
    conversion:17,
    renewal:61,
    loss:82,
    status:"Critical"
  },

  {
    region:"West",
    bank:"Canara",
    branch:"Mumbai Fort",
    premium:3.4,
    policies:1320,
    achievement:104,
    sellers:14,
    conversion:22,
    renewal:74,
    loss:66,
    status:"Watchlist"
  },

  {
    region:"East",
    bank:"Union",
    branch:"Kolkata Central",
    premium:1.8,
    policies:740,
    achievement:63,
    sellers:8,
    conversion:14,
    renewal:58,
    loss:79,
    status:"High Potential"
  }

];

const tableBody = document.getElementById("tableBody");

function renderTable(data){

  tableBody.innerHTML = "";

  data.forEach(row => {

    let statusClass = "info";

    if(row.status === "On Track") statusClass = "good";
    if(row.status === "Watchlist") statusClass = "warn";
    if(row.status === "Critical") statusClass = "danger";

    tableBody.innerHTML += `
      <tr>
        <td>${row.region}</td>
        <td>${row.bank}</td>
        <td>${row.branch}</td>
        <td>₹${row.premium} Cr</td>
        <td>${row.policies}</td>
        <td>${row.achievement}%</td>
        <td>${row.sellers}</td>
        <td>${row.conversion}%</td>
        <td>${row.renewal}%</td>
        <td>${row.loss}%</td>
        <td>
          <span class="status ${statusClass}">
            ${row.status}
          </span>
        </td>
      </tr>
    `;

  });

}

renderTable(branchData);

document.querySelectorAll("th[data-sort]").forEach(header => {

  header.addEventListener("click", () => {

    const key = header.dataset.sort;

    const sorted = [...branchData].sort((a,b) => {

      if(typeof a[key] === "string"){
        return a[key].localeCompare(b[key]);
      }

      return b[key] - a[key];

    });

    renderTable(sorted);

  });

});

const globalSearch = document.getElementById("globalSearch");

globalSearch.addEventListener("input", (e) => {

  const value = e.target.value.toLowerCase();

  const filtered = branchData.filter(item => {

    return (
      item.region.toLowerCase().includes(value) ||
      item.bank.toLowerCase().includes(value) ||
      item.branch.toLowerCase().includes(value)
    );

  });

  renderTable(filtered);

});

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("dark");

});