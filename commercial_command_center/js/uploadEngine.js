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

  status.innerText = "File accepted. Validation passed. (Parsing simulated)";
}
