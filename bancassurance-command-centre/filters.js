function initFilters() {
  const fields = ["STATE", "LINE OF BUSINESS", "INTERMEDIARY", "BA NAME"];

  const container = document.getElementById("filters");

  fields.forEach((f) => {
    const select = document.createElement("select");

    select.id = "filter_" + f;

    const opt = document.createElement("option");

    opt.text = "All " + f;
    opt.value = "";

    select.appendChild(opt);

    const values = [...new Set(rawData.map((r) => r[f]))];

    values.forEach((v) => {
      const o = document.createElement("option");
      o.value = v;
      o.text = v;

      select.appendChild(o);
    });

    select.onchange = applyFilters;

    container.appendChild(select);
  });
}

function applyFilters() {
  filteredData = rawData.filter((r) => {
    for (let f of ["STATE", "LINE OF BUSINESS", "INTERMEDIARY", "BA NAME"]) {
      const val = document.getElementById("filter_" + f).value;

      if (val && r[f] != val) return false;
    }

    return true;
  });

  runAllAnalytics();
}
