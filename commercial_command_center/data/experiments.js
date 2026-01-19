const experiments = [
  {
    name: "Textile Cluster Bundle Lite",
    hypothesis:
      "Simplified bundled cover will increase adoption among small exporters",
    target: {
      sector: "Textiles & Garments",
      cluster: "Tiruppur Textile Cluster",
    },
    productChange: ["Fire + BI", "WC", "Marine Export (Named Perils)"],
    pricing: {
      logic: "5% higher rate, lower documentation friction",
      expectedImpact: "Higher conversion, stable loss ratio",
    },
    guardrails: {
      lossRatioCap: 65,
      capacityLimit: "₹50 Cr",
      exclusions: [
        "High-value flammable chemicals",
        "Night shift operations without supervision",
      ],
    },
    successMetrics: [
      "Conversion rate",
      "3-month loss ratio",
      "Policy issuance TAT",
    ],
  },

  {
    name: "Auto Component Recall Pilot",
    hypothesis: "Selective recall cover will deepen OEM-linked relationships",
    target: {
      sector: "Auto Components",
      cluster: "Pune Auto Components Cluster",
    },
    productChange: ["Product Recall Extension", "Limited Product Liability"],
    pricing: {
      logic: "Exposure-based pricing with sub-limits",
      expectedImpact: "Higher margin, controlled volatility",
    },
    guardrails: {
      lossRatioCap: 70,
      capacityLimit: "₹30 Cr",
      exclusions: ["Single OEM dependency > 70%", "No quality audit history"],
    },
    successMetrics: [
      "Average premium per policy",
      "OEM retention rate",
      "Claims frequency",
    ],
  },
];
