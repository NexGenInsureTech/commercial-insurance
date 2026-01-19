function evaluateRisk() {
  const risk = {
    sector: document.getElementById("sector").value,
    cluster: document.getElementById("cluster").value,
    fire: document.getElementById("fire").value,
    claims: document.getElementById("claims").value,
  };

  const result = document.getElementById("decisionResult");
  const rationale = document.getElementById("decisionRationale");
  rationale.innerHTML = "";

  for (const rule of underwritingRules.rules) {
    if (rule.condition(risk)) {
      result.innerText = rule.decision;
      const li = document.createElement("li");
      li.innerText = "• " + rule.reason;
      rationale.appendChild(li);
      return;
    }
  }

  result.innerText = "🟡 Refer";
}
