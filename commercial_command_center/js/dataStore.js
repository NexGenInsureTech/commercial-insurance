function getPortfolioData() {
  return JSON.parse(localStorage.getItem("portfolioData")) || [];
}

function calculateLossRatio(row) {
  const gwp = Number(row.GWP);
  const claims = Number(row.ClaimsPaid) + Number(row.ClaimsOutstanding);

  if (!gwp || gwp === 0) return 0;
  return (claims / gwp) * 100;
}

function calculateNetExposure(row) {
  return {
    sector: row.Sector,
    cluster: row.Cluster,
    lossRatio: calculateLossRatio(row),
    capacityUsed: Number(row.CapacityUsed),
    gwp: Number(row.GWP),
  };
}
