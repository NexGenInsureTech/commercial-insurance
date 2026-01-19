document.getElementById("gwpGrowth").innerText =
  executiveSignals.kpis.gwpGrowth + "%";

document.getElementById("lossRatio").innerText =
  executiveSignals.kpis.lossRatio + "%";

document.getElementById("capacityUse").innerText =
  executiveSignals.kpis.capacityUse + "%";

document.getElementById("experiments").innerText =
  executiveSignals.kpis.activeExperiments;

const signalList = document.getElementById("signals");
executiveSignals.signals.forEach((s) => {
  const li = document.createElement("li");
  li.innerText = "• " + s;
  signalList.appendChild(li);
});

const decisionList = document.getElementById("decisions");
executiveSignals.decisions.forEach((d) => {
  const li = document.createElement("li");
  li.innerText = "→ " + d;
  decisionList.appendChild(li);
});
