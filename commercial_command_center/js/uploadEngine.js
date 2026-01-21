function uploadData() {
  const file = document.getElementById("fileInput").files[0];
  const status = document.getElementById("status");

  if (!file) {
    status.innerText = "Please select a file.";
    return;
  }

  if (!file.name.endsWith(".csv")) {
    status.innerText = "Only CSV files allowed.";
    return;
  }

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      if (!results.data || results.data.length === 0) {
        status.innerText = "CSV parsed but no data found.";
        return;
      }

      // Store parsed data centrally
      localStorage.setItem("portfolioData", JSON.stringify(results.data));

      // Audit log (if auditEngine.js is loaded)
      if (typeof audit === "function") {
        audit(
          "UPLOAD_OPERATIONAL_DATA",
          `Uploaded ${file.name} with ${results.data.length} rows`,
        );
      }

      status.innerText = `Upload successful. ${results.data.length} records ingested.`;
    },
    error: function () {
      status.innerText = "Error parsing CSV file.";
    },
  });
}
