function recommend() {
  const sector = document.getElementById("sector").value;
  const maturity = document.getElementById("maturity").value;

  const match = salesPlaybooks.find(
    (p) => p.sector === sector && p.maturity === maturity,
  );

  const out = document.getElementById("salesOutput");
  out.innerHTML = "";

  if (!match) {
    out.innerText = "No playbook found. Refer to underwriting.";
    return;
  }

  out.innerHTML = `
    <div>
      <strong>Recommended Bundle</strong>
      <ul class="list-disc ml-6">
        ${match.recommendedBundle.map((b) => `<li>${b}</li>`).join("")}
      </ul>
    </div>

    <div>
      <strong>Sales Pitch</strong>
      <p>${match.pitch}</p>
    </div>

    <div class="text-red-700">
      <strong>Avoid</strong>
      <ul class="list-disc ml-6">
        ${match.avoid.map((a) => `<li>${a}</li>`).join("")}
      </ul>
    </div>

    <div class="text-green-700">
      <strong>Cross-Sell Opportunities</strong>
      <ul class="list-disc ml-6">
        ${match.crossSell.map((c) => `<li>${c}</li>`).join("")}
      </ul>
    </div>
  `;
}
