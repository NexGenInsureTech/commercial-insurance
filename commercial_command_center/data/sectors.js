const sectors = [
  {
    name: "Textiles & Garments",
    profile: {
      nature: "Labour-intensive, export-oriented",
      typicalSize: "Micro to Mid-size",
      concentration: "High cluster density",
    },
    risks: [
      "Fire & machinery breakdown",
      "Worker injury & health",
      "Export rejection & transit loss",
      "Power interruption",
    ],
    coverages: [
      "Standard Fire & Special Perils",
      "Machinery Breakdown",
      "Workmen Compensation",
      "Marine Export Transit",
      "Business Interruption",
    ],
    underwritingSignals: {
      positive: [
        "Sprinkler systems",
        "Export compliance history",
        "Formal payroll records",
      ],
      redFlags: [
        "Congested units",
        "High contractual labour",
        "Old electrical wiring",
      ],
    },
    strategy: {
      stance: "Core Growth Sector",
      approach: "Bundle-led, cluster pricing, long-term retention",
    },
  },

  {
    name: "Auto Components",
    profile: {
      nature: "Capital intensive, OEM-linked",
      typicalSize: "Small to Mid-size",
      concentration: "Tier-1/Tier-2 industrial belts",
    },
    risks: [
      "Precision machinery failure",
      "OEM contractual liability",
      "Product recall exposure",
      "Supply chain disruption",
    ],
    coverages: [
      "Industrial All Risk",
      "Product Liability",
      "Recall Insurance",
      "Marine Inbound Transit",
    ],
    underwritingSignals: {
      positive: [
        "OEM contracts",
        "ISO/TS certifications",
        "Preventive maintenance logs",
      ],
      redFlags: [
        "Single OEM dependence",
        "High tooling age",
        "Manual quality checks",
      ],
    },
    strategy: {
      stance: "Selective Growth",
      approach: "Risk-engineered underwriting, margin-led pricing",
    },
  },
];
