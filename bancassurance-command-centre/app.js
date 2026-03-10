function openTab(evt, name) {
  document
    .querySelectorAll(".tabcontent")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".tablink")
    .forEach((t) => t.classList.remove("active"));

  document.getElementById(name).classList.add("active");
  evt.currentTarget.classList.add("active");
}

document.getElementById("fileInput").addEventListener("change", handleFile);

function handleFile(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const rows = event.target.result.split("\n").map((r) => r.split(","));

    process(rows);
  };

  reader.readAsText(file);
}

function process(rows) {
  const headers = rows[0];

  const p = headers.indexOf("USGI Net Premium");
  const bank = headers.indexOf("Intermediary");
  const lob = headers.indexOf("Line of Business");
  const state = headers.indexOf("State");
  const ba = headers.indexOf("BA Name");
  const manager = headers.indexOf("Primary Sales Manager");
  const date = headers.indexOf("policy issue date");

  let totalPremium = 0;

  let banks = {};
  let lobs = {};
  let states = {};
  let bas = {};
  let managers = {};
  let months = {};

  let policies = rows.length - 1;

  rows.slice(1).forEach((r) => {
    const premium = parseFloat(r[p]) || 0;

    const bankName = r[bank] || "Unknown";
    const lobName = r[lob] || "Unknown";
    const stateName = r[state] || "Unknown";
    const baName = r[ba] || "Unknown";
    const managerName = r[manager] || "Unknown";

    const dateVal = r[date];

    totalPremium += premium;

    banks[bankName] = (banks[bankName] || 0) + premium;
    lobs[lobName] = (lobs[lobName] || 0) + premium;
    states[stateName] = (states[stateName] || 0) + premium;
    bas[baName] = (bas[baName] || 0) + premium;
    managers[managerName] = (managers[managerName] || 0) + premium;

    if (dateVal) {
      const month = dateVal.substring(0, 7);

      months[month] = (months[month] || 0) + premium;
    }
  });

  document.getElementById("totalPremium").innerText =
    totalPremium.toLocaleString();
  document.getElementById("totalPolicies").innerText = policies;

  document.getElementById("topBank").innerText = topKey(banks);
  document.getElementById("topLOB").innerText = topKey(lobs);

  draw("bankChart", banks);
  draw("lobChart", lobs);
  draw("stateChart", states);
  draw("baChart", bas);
  draw("managerChart", managers);
  draw("monthChart", months);
}

function topKey(map) {
  return Object.entries(map).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
}

function draw(canvasId, map) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const entries = Object.entries(map);

  if (entries.length === 0) return;

  const max = Math.max(...entries.map((e) => e[1]));

  const barWidth = canvas.width / entries.length;

  entries.forEach((e, i) => {
    const h = (e[1] / max) * 220;

    ctx.fillRect(i * barWidth + 20, canvas.height - h - 30, barWidth - 40, h);

    ctx.fillText(e[0], i * barWidth + 20, canvas.height - 10);
  });
}
