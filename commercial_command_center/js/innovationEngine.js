const list = document.getElementById("experimentList");
const detail = document.getElementById("experimentDetail");

experiments.forEach((e, i) => {
  const li = document.createElement("li");
  li.className = "cursor-pointer p-2 rounded hover:bg-slate-200";
  li.innerText = e.name;
  li.onclick = () => renderExperiment(i);
  list.appendChild(li);
});

function renderExperiment(i) {
  const e = experiments[i];

  detail.innerHTML = `
    <h2 class="text-xl font-bold mb-4">${e.name}</h2>

    <section class="mb-4">
      <h3 class="font-semibold">Hypothesis</h3>
      <p class="text-sm">${e.hypothesis}</p>
    </section>

    <section class="mb-4">
      <h3 class="font-semibold">Target</h3>
      <p class="text-sm">
        Sector: ${e.target.sector}<br>
        Cluster: ${e.target.cluster}
      </p>
    </section>

    <section class="mb-4">
      <h3 class="font-semibold">Product / Coverage Changes</h3>
      <ul class="list-disc ml-6 text-sm">
        ${e.productChange.map((p) => `<li>${p}</li>`).join("")}
      </ul>
    </section>

    <section class="mb-4">
      <h3 class="font-semibold">Pricing Logic</h3>
      <p class="text-sm">${e.pricing.logic}</p>
      <p class="text-xs text-slate-600">
        Expected: ${e.pricing.expectedImpact}
      </p>
    </section>

    <section class="mb-4">
      <h3 class="font-semibold text-red-700">Risk Guardrails</h3>
      <ul class="list-disc ml-6 text-sm">
        <li>Loss Ratio Cap: ${e.guardrails.lossRatioCap}%</li>
        <li>Capacity Limit: ${e.guardrails.capacityLimit}</li>
        ${e.guardrails.exclusions.map((x) => `<li>${x}</li>`).join("")}
      </ul>
    </section>

    <section>
      <h3 class="font-semibold">Success Metrics</h3>
      <ul class="list-disc ml-6 text-sm">
        ${e.successMetrics.map((m) => `<li>${m}</li>`).join("")}
      </ul>
    </section>
  `;
}
