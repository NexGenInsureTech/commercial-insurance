function buildBrokerLeaderboard(data) {
  const brokerMap = {};

  data.forEach((r) => {
    const broker = r["INTERMEDIARY"];

    const premium = parseFloat(r["USGI NET PREMIUM"] || 0);

    brokerMap[broker] = (brokerMap[broker] || 0) + premium;
  });

  const sorted = Object.entries(brokerMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  const table = document.getElementById("brokerTable");

  table.innerHTML = "";

  sorted.forEach((r) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `<td>${r[0]}</td><td>${r[1].toLocaleString()}</td>`;

    table.appendChild(tr);
  });
}

function buildBALeaderboard(data) {
  const map = {};

  data.forEach((r) => {
    const ba = r["BA NAME"];

    const premium = parseFloat(r["USGI NET PREMIUM"] || 0);

    map[ba] = (map[ba] || 0) + premium;
  });

  const sorted = Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  const table = document.getElementById("baTable");

  table.innerHTML = "";

  sorted.forEach((r) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `<td>${r[0]}</td><td>${r[1].toLocaleString()}</td>`;

    table.appendChild(tr);
  });
}

function buildProductMix(data) {
  const map = {};

  data.forEach((r) => {
    const lob = r["LINE OF BUSINESS"];

    const premium = parseFloat(r["USGI NET PREMIUM"] || 0);

    map[lob] = (map[lob] || 0) + premium;
  });

  drawChart("productChart", map);
}

function buildStateDistribution(data) {
  const map = {};

  data.forEach((r) => {
    const state = r["STATE"];

    const premium = parseFloat(r["USGI NET PREMIUM"] || 0);

    map[state] = (map[state] || 0) + premium;
  });

  drawChart("stateChart", map);
}

function opportunityEngine(data) {
  let totalPremium = 0;

  data.forEach((r) => {
    totalPremium += parseFloat(r["USGI NET PREMIUM"] || 0);
  });

  const growth = totalPremium * 1.4;

  document.getElementById("opportunityResult").innerHTML = `
Current Premium: ₹${totalPremium.toLocaleString()} <br>
Potential Premium: ₹${growth.toLocaleString()}
`;
}
