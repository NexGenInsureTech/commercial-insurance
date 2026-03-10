let dataset = [];

document.getElementById("fileInput").addEventListener("change", loadFile);

function loadFile(e) {
  const file = e.target.files[0];

  const reader = new FileReader();

  reader.onload = function (evt) {
    const data = new Uint8Array(evt.target.result);

    const workbook = XLSX.read(data, { type: "array" });

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    dataset = XLSX.utils.sheet_to_json(sheet);

    populateDropdowns();

    buildBrokerLeaderboard(dataset);
    buildBALeaderboard(dataset);
    buildProductMix(dataset);
    buildStateDistribution(dataset);
    opportunityEngine(dataset);
  };

  reader.readAsArrayBuffer(file);
}

function populateDropdowns() {
  const headers = Object.keys(dataset[0]);

  const dimension = document.getElementById("dimension");
  const measure = document.getElementById("measure");

  dimension.innerHTML = "";
  measure.innerHTML = "";

  headers.forEach((h) => {
    const opt1 = document.createElement("option");
    opt1.value = h;
    opt1.text = h;

    dimension.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = h;
    opt2.text = h;

    measure.appendChild(opt2);
  });
}

function buildPivot() {
  const dimension = document.getElementById("dimension").value;
  const measure = document.getElementById("measure").value;

  const pivotMap = {};

  dataset.forEach((row) => {
    const key = row[dimension];

    let value = row[measure];

    if (typeof value === "string") {
      value = value.replace(/,/g, "");
    }

    value = parseFloat(value) || 0;

    pivotMap[key] = (pivotMap[key] || 0) + value;
  });

  drawChart("chart", pivotMap);
}

function drawChart(canvasId, dataMap) {
  const canvas = document.getElementById(canvasId);

  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const entries = Object.entries(dataMap);

  if (entries.length === 0) return;

  const max = Math.max(...entries.map((e) => e[1]));

  const barWidth = canvas.width / entries.length;

  entries.forEach((entry, i) => {
    const label = entry[0];
    const value = entry[1];

    const height = (value / max) * 350;

    ctx.fillStyle = "#1f3b5c";

    ctx.fillRect(
      i * barWidth + 20,
      canvas.height - height - 30,
      barWidth - 40,
      height,
    );

    ctx.fillStyle = "black";

    ctx.fillText(label, i * barWidth + 20, canvas.height - 10);
  });
}
