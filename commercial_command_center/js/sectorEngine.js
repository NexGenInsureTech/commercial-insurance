const sectorList = document.getElementById("sectorList");
const playbook = document.getElementById("playbookContent");

sectors.forEach((s, i) => {
  const li = document.createElement("li");
  li.className = "cursor-pointer p-2 rounded hover:bg-slate-200";
  li.innerText = s.name;
  li.onclick = () => renderPlaybook(i);
  sectorList.appendChild(li);
});

function renderPlaybook(i) {
  const s = sectors[i];

  playbook.innerHTML = `
    <h2 class="text-xl font-bold mb-4">${s.name}</h2>

    <section class="mb-6">
      <h3 class="font-semibold">Business Profile</h3>
      <ul class="list-disc ml-6 text-sm">
        <li>Nature: ${s.profile.nature}</li>
        <li>Typical Size: ${s.profile.typicalSize}</li>
        <li>Concentration: ${s.profile.concentration}</li>
      </ul>
    </section>

    <section class="mb-6">
      <h3 class="font-semibold">Risk Stack</h3>
      <ul class="list-disc ml-6 text-sm">
        ${s.risks.map((r) => `<li>${r}</li>`).join("")}
      </ul>
    </section>

    <section class="mb-6">
      <h3 class="font-semibold">Recommended Coverages</h3>
      <ul class="list-disc ml-6 text-sm">
        ${s.coverages.map((c) => `<li>${c}</li>`).join("")}
      </ul>
    </section>

    <section class="mb-6 grid grid-cols-2 gap-4">
      <div>
        <h3 class="font-semibold text-green-700">Positive Signals</h3>
        <ul class="list-disc ml-6 text-sm">
          ${s.underwritingSignals.positive.map((p) => `<li>${p}</li>`).join("")}
        </ul>
      </div>
      <div>
        <h3 class="font-semibold text-red-700">Red Flags</h3>
        <ul class="list-disc ml-6 text-sm">
          ${s.underwritingSignals.redFlags.map((r) => `<li>${r}</li>`).join("")}
        </ul>
      </div>
    </section>

    <section>
      <h3 class="font-semibold">Strategic Stance</h3>
      <p class="text-sm">
        <strong>${s.strategy.stance}:</strong> ${s.strategy.approach}
      </p>
    </section>
  `;
}
