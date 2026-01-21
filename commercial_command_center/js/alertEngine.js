const data = getPortfolioData();

let totalGWP = 0;
let totalClaims = 0;

data.forEach((row) => {
  totalGWP += Number(row.GWP);
  totalClaims += Number(row.ClaimsPaid) + Number(row.ClaimsOutstanding);
});

const portfolioLossRatio = totalGWP > 0 ? (totalClaims / totalGWP) * 100 : 0;

document.getElementById("lossRatio").innerText =
  portfolioLossRatio.toFixed(1) + "%";

document.getElementById("gwpGrowth").innerText = "Derived from monthly trend"; // placeholder for Phase 16
