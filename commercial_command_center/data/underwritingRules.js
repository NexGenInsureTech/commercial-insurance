const underwritingRules = {
  preferredSectors: ["Textiles & Garments"],
  restrictedClusters: ["Pune Auto Components Cluster"],

  rules: [
    {
      condition: (r) => r.fire === "good" && r.claims === "clean",
      decision: "🟢 Bind",
      reason: "Strong risk fundamentals",
    },
    {
      condition: (r) => r.fire === "average" || r.claims === "moderate",
      decision: "🟡 Refer",
      reason: "Requires underwriting review",
    },
    {
      condition: (r) => r.fire === "poor" || r.claims === "poor",
      decision: "🔴 Decline",
      reason: "Risk outside appetite",
    },
  ],
};
