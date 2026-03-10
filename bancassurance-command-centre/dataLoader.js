let rawData = [];
let filteredData = [];

document.getElementById("fileInput").addEventListener("change", loadFile);

function loadFile(e) {
  const file = e.target.files[0];

  const reader = new FileReader();

  reader.onload = function (evt) {
    const data = new Uint8Array(evt.target.result);

    const workbook = XLSX.read(data, { type: "array" });

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    rawData = XLSX.utils.sheet_to_json(sheet);

    filteredData = [...rawData];

    initFilters();

    populatePivotFields();

    runAllAnalytics();
  };

  reader.readAsArrayBuffer(file);
}
