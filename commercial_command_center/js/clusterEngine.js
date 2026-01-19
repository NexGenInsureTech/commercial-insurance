function calculateScore(c) {
  return (
    (c.marketSize * 0.25 +
      c.growth * 0.25 +
      c.employment * 0.15 +
      c.digital * 0.15 +
      c.insuranceGap * 0.2) *
    20
  );
}

function priority(score) {
  if (score >= 80) return "Tier 1";
  if (score >= 65) return "Tier 2";
  return "Tier 3";
}

function renderTable() {
  const tbody = document.getElementById("clusterTable");
  tbody.innerHTML = "";

  const ranked = clusters
    .map((c) => ({ ...c, score: calculateScore(c) }))
    .sort((a, b) => b.score - a.score);

  ranked.forEach((c, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="p-2 text-center">${i + 1}</td>
      <td class="p-2 font-semibold">${c.name}</td>
      <td class="p-2">${c.state}</td>
      <td class="p-2">${c.sector}</td>
      <td class="p-2">${c.type}</td>
      <td class="p-2 text-center">${c.score.toFixed(1)}</td>
      <td class="p-2 text-center font-bold">${priority(c.score)}</td>
    `;
    tbody.appendChild(tr);
  });
}

renderTable();
