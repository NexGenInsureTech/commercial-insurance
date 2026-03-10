function opportunityEngine() {
  let total = 0;

  filteredData.forEach((r) => {
    total += parseFloat(r["USGI NET PREMIUM"] || 0);
  });

  const potential = total * 1.5;

  document.getElementById("opportunityResult").innerHTML = `
Current Premium: ₹${total.toLocaleString()} <br>
Potential Premium: ₹${potential.toLocaleString()}
`;
}
