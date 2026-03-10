function drawChart(id, map) {
  const canvas = document.getElementById(id);

  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const entries = Object.entries(map);

  if (entries.length === 0) return;

  const max = Math.max(...entries.map((e) => e[1]));

  const barWidth = canvas.width / entries.length;

  entries.forEach((e, i) => {
    const height = (e[1] / max) * 350;

    ctx.fillStyle = "#1f3b5c";

    ctx.fillRect(
      i * barWidth + 20,
      canvas.height - height - 30,
      barWidth - 40,
      height,
    );

    ctx.fillStyle = "black";

    ctx.fillText(e[0], i * barWidth + 20, canvas.height - 10);
  });
}

function renderTable(id, map) {
  const table = document.getElementById(id);

  table.innerHTML = "";

  const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);

  sorted.slice(0, 20).forEach((r) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `<td>${r[0]}</td><td>${r[1].toLocaleString()}</td>`;

    table.appendChild(tr);
  });
}
