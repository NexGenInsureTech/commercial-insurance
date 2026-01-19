const list = document.getElementById("alertList");

function raiseAlert(title, severity, message, action) {
  const li = document.createElement("li");
  li.className =
    severity === "high"
      ? "border-l-4 border-red-600 p-4 bg-red-50"
      : "border-l-4 border-yellow-500 p-4 bg-yellow-50";

  li.innerHTML = `
    <strong>${title}</strong><br>
    ${message}<br>
    <em>Recommended action:</em> ${action}
  `;

  list.appendChild(li);
}

// 1. Loss Ratio Drift
if (
  alertSignals.portfolio.autoLossRatio > alertSignals.portfolio.appetiteLossCap
) {
  raiseAlert(
    "Auto Components Loss Drift",
    "high",
    `Loss ratio at ${alertSignals.portfolio.autoLossRatio}% exceeds appetite`,
    "Tighten underwriting & suspend recall extensions",
  );
}

// 2. Underwriting Overrides
if (
  alertSignals.underwriting.overridesLastMonth >
  alertSignals.underwriting.overrideThreshold
) {
  raiseAlert(
    "Underwriting Override Spike",
    "medium",
    `${alertSignals.underwriting.overridesLastMonth} overrides last month`,
    "Review referral discipline & sales pressure points",
  );
}

// 3. Innovation Guardrail Breach
if (
  alertSignals.innovation.textilePilotLoss > alertSignals.innovation.lossCap
) {
  raiseAlert(
    "Innovation Pilot Breach",
    "high",
    "Textile pilot exceeding loss cap",
    "Pause scale-up & reprice immediately",
  );
}

// 4. Concentration Risk
if (
  alertSignals.concentration.topClusterShare >
  alertSignals.concentration.maxAllowed
) {
  raiseAlert(
    "Cluster Concentration Risk",
    "medium",
    "Single cluster exceeds exposure threshold",
    "Cap new business & diversify inflow",
  );
}
