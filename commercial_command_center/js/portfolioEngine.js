<script src="js/dataStore.js"></script>;

const portfolio = getPortfolioData();

portfolio.forEach((row) => {
  const exposure = calculateNetExposure(row);

  // Use exposure.lossRatio
  // Use exposure.capacityUsed
  // Use exposure.gwp
});

function decideAction(p) {
  if (p.gwpGrowth > 15 && p.lossRatio < 65 && p.capacityUse < 85)
    return "🟢 Double Down";

  if (p.lossRatio >= 65 && p.lossRatio <= 80) return "🟡 Hold & Optimise";

  return "🔴 Exit / Restructure";
}

function renderPortfolio() {
  const tbody = document.getElementById("portfolioTable");
  tbody.innerHTML = "";

  portfolio.forEach((p) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="p-2 font-semibold">${p.sector}</td>
      <td class="p-2">${p.cluster}</td>
      <td class="p-2 text-center">${p.gwpGrowth}%</td>
      <td class="p-2 text-center">${p.lossRatio}%</td>
      <td class="p-2 text-center">${p.uwFriction}/5</td>
      <td class="p-2 text-center">${p.capacityUse}%</td>
      <td class="p-2 text-center font-bold">
        ${decideAction(p)}
      </td>
    `;

    tbody.appendChild(tr);
  });
}

renderPortfolio();
