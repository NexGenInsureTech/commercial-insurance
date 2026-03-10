function runAllAnalytics() {
  premiumDashboard();
  distributionAnalysis();
  baLeaderboard();
  productMix();
  stateDistribution();
  renewalAnalysis();
  brokerAnalysis();
  opportunityEngine();
}

function premiumDashboard() {
  const map = {};

  filteredData.forEach((r) => {
    const month = r["Month"];

    const premium = parseFloat(r["USGI NET PREMIUM"] || 0);

    map[month] = (map[month] || 0) + premium;
  });

  drawChart("premiumChart", map);
}

function distributionAnalysis() {
  const map = {};

  filteredData.forEach((r) => {
    const broker = r["INTERMEDIARY"];

    const premium = parseFloat(r["USGI NET PREMIUM"] || 0);

    map[broker] = (map[broker] || 0) + premium;
  });

  drawChart("distributionChart", map);
}

function baLeaderboard() {
  const map = {};

  filteredData.forEach((r) => {
    const ba = r["BA NAME"];

    const premium = parseFloat(r["USGI NET PREMIUM"] || 0);

    map[ba] = (map[ba] || 0) + premium;
  });

  renderTable("baTable", map);
}

function productMix() {
  const map = {};

  filteredData.forEach((r) => {
    const lob = r["LINE OF BUSINESS"];

    const premium = parseFloat(r["USGI NET PREMIUM"] || 0);

    map[lob] = (map[lob] || 0) + premium;
  });

  drawChart("productChart", map);
}

function stateDistribution() {
  const map = {};

  filteredData.forEach((r) => {
    const state = r["STATE"];

    const premium = parseFloat(r["USGI NET PREMIUM"] || 0);

    map[state] = (map[state] || 0) + premium;
  });

  drawChart("stateChart", map);
}

function renewalAnalysis() {
  const map = {};

  filteredData.forEach((r) => {
    const type = r["Business Type Fresh Renewal"];

    const premium = parseFloat(r["USGI NET PREMIUM"] || 0);

    map[type] = (map[type] || 0) + premium;
  });

  drawChart("renewalChart", map);
}

function brokerAnalysis() {
  const map = {};

  filteredData.forEach((r) => {
    const broker = r["INTERMEDIARY"];

    const premium = parseFloat(r["USGI NET PREMIUM"] || 0);

    map[broker] = (map[broker] || 0) + premium;
  });

  renderTable("brokerTable", map);
}
