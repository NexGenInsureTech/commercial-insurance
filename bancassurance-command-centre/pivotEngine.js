function populatePivotFields() {
  const headers = Object.keys(rawData[0]);

  headers.forEach((h) => {
    let d = document.createElement("option");
    d.value = h;
    d.text = h;

    dimension.appendChild(d);

    let m = document.createElement("option");
    m.value = h;
    m.text = h;

    measure.appendChild(m);
  });
}

function runPivot() {
  const dim = dimension.value;
  const meas = measure.value;

  const map = {};

  filteredData.forEach((r) => {
    const key = r[dim];

    let val = parseFloat(String(r[meas]).replace(/,/g, "")) || 0;

    map[key] = (map[key] || 0) + val;
  });

  drawChart("pivotChart", map);
}
