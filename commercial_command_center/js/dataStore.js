function toNumber(value) {
  if (value === null || value === undefined) return 0;

  return Number(String(value).replace(/,/g, "").replace(/₹/g, "").trim()) || 0;
}

function getPortfolioData() {
  return JSON.parse(localStorage.getItem("portfolioData")) || [];
}

function calculateLossRatio(row) {
  const gwp = toNumber(row.GWP);
  const claimsPaid = toNumber(row.ClaimsPaid);
  const claimsOS = toNumber(row.ClaimsOutstanding);

  if (gwp === 0) return 0;
  return ((claimsPaid + claimsOS) / gwp) * 100;
}
