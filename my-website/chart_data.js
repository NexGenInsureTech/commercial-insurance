// --- ChartData Object: Contains all the data for charts across different pages ---
const ChartData = {
  insuringAP: {
    demographics: {
      labels: [
        "Rural Population",
        "Urban Population",
        "Rural Female Literacy",
        "Urban Female Literacy",
      ],
      datasets: [
        {
          label: "Value (%)",
          data: [70.5, 29.5, 59.9, 79.2],
          backgroundColor: ["#0d9488", "#0ea5e9", "#f59e0b", "#fde047"],
        },
      ],
    },
    livelihood: {
      labels: ["Agriculture & Allied", "Services", "Industry"],
      datasets: [
        {
          data: [35.3, 41.5, 23.2],
          backgroundColor: ["#14b8a6", "#38bdf8", "#fbbf24"],
          hoverOffset: 4,
        },
      ],
    },
    digitalDivide: {
      labels: ["Rural HH Smartphone", "Rural Women Internet Use"],
      datasets: [
        {
          label: "Penetration (%)",
          data: [89.9, 21],
          backgroundColor: ["#0d9488", "#f59e0b"],
        },
      ],
    },
    insuranceGap: {
      labels: ["Govt. Health Scheme Coverage", "Gen. Insurance Penetration"],
      datasets: [
        {
          label: "Coverage / Penetration (%)",
          data: [80, 1.0],
          backgroundColor: ["#14b8a6", "#fca5a5"],
        },
      ],
    },
  },

  msmeStrategy: {
    sectorData: {
      // Data for the sector details content
      manufacturing: {
        title: "Manufacturing MSMEs",
        risks:
          "Property damage (buildings, machinery, inventory), business interruption, equipment failure, product defects.",
        needs:
          "Property Insurance, Business Interruption, Machinery Breakdown (MBD)/Electronic Equipment Insurance (EEI), Commercial General Liability (CGL), Product Liability.",
        rationale:
          "Protects significant capital investment in physical assets and addresses liabilities from production processes and products.",
      },
      services: {
        title: "Services MSMEs",
        risks:
          "Public liability (third-party injury/damage), professional liability (errors/omissions), cyber risks, employee injuries.",
        needs:
          "Public Liability Insurance, Professional Indemnity (Errors & Omissions), Cyber Insurance, Employee Compensation Insurance.",
        rationale:
          "Addresses intangible risks, legal claims related to service delivery, data handling, and digital vulnerabilities.",
      },
      retail: {
        title: "Retail & Trading MSMEs",
        risks:
          "Theft, fire, natural calamities affecting inventory/premises, business interruption, public liability.",
        needs:
          "Shop Owners Insurance (package policy), Fire & Burglary Insurance, Money Insurance, Business Interruption.",
        rationale:
          "Safeguards inventory, cash transactions, physical premises, and covers liability from customer foot traffic.",
      },
      food: {
        title: "Food Processing MSMEs",
        risks:
          "Product contamination, spoilage, product recalls, stringent regulatory compliance (FSSAI), third-party liability from consumption.",
        needs:
          "Product Liability Insurance (critical), General Liability Insurance, Business Interruption Insurance.",
        rationale:
          "Mitigates highly specialized and potentially catastrophic risks related to food safety, product integrity, and consumer health.",
      },
      textile: {
        title: "Textile MSMEs",
        risks:
          "Fire hazards, machinery breakdown, loss of profit from operational disruptions, credit risk (exports), marine risk (goods in transit).",
        needs:
          "Fire Insurance, Loss of Profit Insurance, Boiler and Pressure Plant Insurance, EEI/MBD, Credit Insurance, Marine Insurance, Fidelity Guarantee, Public Liability.",
        rationale:
          "Covers capital-intensive operations, complex manufacturing processes, supply chain vulnerabilities, and export-related financial risks.",
      },
    },
    allSectorProducts: {
      // Product details for the 'Tailored Solutions' section
      manufacturing: [
        {
          id: "manufacturing-property-insurance",
          name: "Property Insurance",
          icon: "🏠",
          description:
            "Covers physical assets like buildings, machinery, and inventory against fire, natural disasters, and other perils.",
          customerInfoSheet: [
            "Business Name & Address",
            "Type of Construction (building)",
            "Year of Construction",
            "Total Sum Insured (Building)",
            "Total Sum Insured (Machinery/Equipment)",
            "Total Sum Insured (Stock)",
            "Nature of Business Activities",
            "Fire Protection Systems Available",
            "Claim History (last 3-5 years)",
          ],
          actuarialNote:
            "Pricing is based on sum insured, location (zone for natural disasters), construction type, nature of occupancy (risk class), and fire protection systems. Claims history is also a key factor. Data from industry bodies and historical loss ratios are used.",
          underwritingPhilosophy:
            "To provide comprehensive asset protection with flexible coverage options, assessing risks based on physical exposures and industry standards. Focus on loss prevention measures taken by the MSME.",
          operatingModel:
            "Direct digital sales or via agents. Policy issuance is automated post-payment. Claims initiated via portal/app, surveyor assigned for assessment, settlement within defined TAT (e.g., 7-15 days for simple claims).",
          pricingMethodology:
            "Risk-adjusted premium calculation based on actuarial tables. Base premium determined by Sum Insured, adjusted for industry risk factor, geographical zone, construction materials, and safety measures. Discounts for good claims history or enhanced safety features.",
          benefits: [
            "Covers loss/damage to buildings, machinery, and stock due to fire, lightning, explosion, implosion.",
            "Protection against natural calamities like storm, cyclone, flood, earthquake, landslide.",
            "Covers damage due to riots, strikes, malicious damage, and terrorism acts.",
            "Includes impact damage by rail/road vehicles and bursting/overflowing of water tanks/pipes.",
          ],
          exclusions: [
            "War and nuclear perils.",
            "Consequential loss (loss of profit).",
            "Loss/damage to electronic data.",
            "Theft without forced entry.",
            "Wear and tear, gradual deterioration.",
            "Damage due to faulty design/workmanship.",
          ],
          addons: [
            "Business Interruption (Loss of Profit)",
            "Machinery Breakdown",
            "Electronic Equipment Insurance",
            "Terrorism Cover",
            "Removal of Debris",
            "Architects, Surveyors and Consulting Engineers Fees",
          ],
          reinsurance:
            "Facultative or treaty reinsurance arrangements with global reinsurers to manage large property risks and catastrophic perils, ensuring financial stability for large claims.",
        },
        {
          id: "manufacturing-business-interruption",
          name: "Business Interruption Insurance",
          icon: "⏳",
          description:
            "Covers loss of gross profit and increased cost of working due to a business interruption caused by insured perils.",
          customerInfoSheet: [
            "Business Name & Address",
            "Historical Gross Profit Data (last 3 years)",
            "Fixed Operating Expenses",
            "Maximum Indemnity Period (e.g., 6, 12, 18 months)",
            "Dependent Business Processes (e.g., specific machinery, supplier)",
            "Interdependent sites",
          ],
          actuarialNote:
            "Based on projected gross profit and fixed expenses. Factors in indemnity period, industry recovery rates, and property insurance underlying perils. Data on industry-specific downtime costs is used.",
          underwritingPhilosophy:
            "To restore the MSME to its pre-loss financial position by covering lost income and necessary expenses during covered business disruptions, ensuring minimal financial impact.",
          operatingModel:
            "Closely linked with underlying property policy. Requires detailed financial documentation for claim assessment. Claims processed post-property damage claim settlement, often involving forensic accountants.",
          pricingMethodology:
            "Calculated as a percentage of the gross profit sum insured. Influenced by the maximum indemnity period, type of industry (recovery time), and nature of underlying property perils. Premiums are generally lower for shorter indemnity periods.",
          benefits: [
            "Covers loss of Gross Profit dueed to reduction in turnover or increase in cost of working resulting from a covered peril (e.g., fire, flood).",
            "Covers standing charges/fixed expenses (rent, salaries, taxes) during the interruption.",
            "Provides for additional expenses incurred to minimize the interruption (e.g., temporary relocation, hiring alternative machinery).",
          ],
          exclusions: [
            "Loss not caused by a covered property damage event.",
            "Loss due to market conditions or loss of customers unrelated to physical damage.",
            "Loss beyond the maximum indemnity period.",
            "Power failure from public supply (unless caused by insured peril).",
            "Willful negligence.",
          ],
          addons: [
            "Contingent Business Interruption (Supplier/Customer Dependence)",
            "Auditor's Fees",
            "Disease/Deterioration of Stock",
            "Loss of Utilities",
          ],
          reinsurance:
            "Often part of a property treaty, with specific layers dedicated to contingent business interruption exposures to manage large-scale supply chain or industry-wide disruption risks.",
        },
        {
          id: "manufacturing-cgl-insurance",
          name: "Commercial General Liability (CGL) Insurance",
          icon: "⚖️",
          description:
            "Protects the business against legal liabilities arising from third-party bodily injury or property damage due to business operations or products.",
          customerInfoSheet: [
            "Business Name & Address",
            "Nature of Operations/Products",
            "Annual Turnover",
            "Number of Employees",
            "Premises Details",
            "Territorial Scope (India/Worldwide)",
            "Claim History (last 5 years)",
            "Subcontractor Details",
          ],
          actuarialNote:
            "Based on industry risk class (e.g., manufacturing vs. services), annual turnover, number of employees, and past claims experience. Consideration of potential for large-scale incidents. Analysis of tort law trends in India.",
          underwritingPhilosophy:
            "To safeguard the MSME from unforeseen liabilities arising from everyday business operations and products, ensuring financial protection against costly legal claims while fostering responsible business conduct.",
          operatingModel:
            "Direct sales/brokers. Policy issuance streamlined. Claims require detailed incident reports, police/medical records (if bodily injury). Legal defense provided by insurer. Settlement via negotiation or court order.",
          pricingMethodology:
            "Premium is generally a percentage of annual turnover or a fixed rate per employee, adjusted by industry risk factor (higher for hazardous industries), geographical scope, chosen limits of indemnity, and deductibles. Loading for adverse claims history.",
          benefits: [
            "Covers legal liability for third-party bodily injury or property damage occurring on premises or arising from operations.",
            "Product Liability coverage for claims from defective products sold or supplied.",
            "Advertising Injury & Personal Injury coverage (e.g., libel, slander, copyright infringement in advertisements).",
            "Defense costs, even if the lawsuit is groundless or false.",
          ],
          exclusions: [
            "Professional liability (Errors & Omissions).",
            "Employee compensation/Workmen's Compensation.",
            "Pollution liability (unless sudden and accidental).",
            "Contractual liability.",
            "Damage to own property.",
            "Known incidents prior to policy inception.",
            "Intentional acts.",
          ],
          addons: [
            "Pollution Legal Liability (broader cover)",
            "Lift Liability",
            "Act of God perils (e.g., earthquake, flood extension)",
            "Vendor's Liability",
          ],
          reinsurance:
            "Excess of Loss (XOL) reinsurance treaties to protect against large, infrequent liability claims, especially for product liability exposures.",
        },
      ],
      services: [
        {
          id: "services-professional-indemnity",
          name: "Professional Indemnity Insurance",
          icon: "✍️",
          description:
            "Protects service-based MSMEs against financial losses arising from legal claims of professional negligence or errors in their services.",
          customerInfoSheet: [
            "Business Name",
            "Nature of Professional Services",
            "Annual Gross Revenue",
            "Number of Professionals/Employees",
            "Key Clients & Contracts",
            "Previous Claims/Complaints",
            "Professional Qualifications/Certifications",
          ],
          actuarialNote:
            "Pricing based on profession type (risk level, e.g., IT vs. marketing), annual revenue, number of professionals, and past claims. Market data on professional negligence lawsuits is analyzed.",
          underwritingPhilosophy:
            "To offer robust protection for service professionals against potential legal liabilities arising from their advice or services, enabling them to operate with confidence and uphold their professional standards.",
          operatingModel:
            "Primarily direct sales or through specialized brokers. Policy issuance post due diligence on professional background. Claims are complex, requiring legal assessment; insurer provides defense.",
          pricingMethodology:
            "Premium is calculated based on the Indemnity Limit chosen, revenue, and profession risk category. Factors include claims history, quality control measures, and contractual liabilities. Higher limits and riskier professions lead to higher premiums.",
          benefits: [
            "Covers legal defense costs for claims of professional negligence, errors, omissions, or breaches of duty.",
            "Pays compensation awarded to third parties if the MSME is found liable.",
            "Covers libel and slander arising from professional services.",
            "Includes costs of investigation and inquiry related to a claim.",
          ],
          exclusions: [
            "Fraudulent or dishonest acts.",
            "Known claims/circumstances before policy inception.",
            "Bodily injury or property damage claims (covered by CGL).",
            "Breach of contract (unless also a professional negligence claim).",
            "Fines and penalties.",
            "War & nuclear perils.",
          ],
          addons: [
            "Cyber Liability Extension (for data breaches related to professional services)",
            "Dishonesty of Employees",
            "Loss of Documents",
            "Extended Reporting Period",
          ],
          reinsurance:
            "Quota share or excess of loss treaties, especially for professions with high aggregate claim potential or emerging risk classes.",
        },
        {
          id: "services-cyber-insurance",
          name: "Cyber Insurance",
          icon: "🔒",
          description:
            "Protects businesses from financial losses and liabilities arising from cyberattacks, data breaches, and other digital risks.",
          customerInfoSheet: [
            "Business Name",
            "Annual Turnover",
            "Type of Data Stored (e.g., PII, financial, health)",
            "Number of Records",
            "IT Security Measures (firewalls, antivirus, MFA, backups)",
            "Website/E-commerce Presence",
            "Industry Sector",
            "Previous Cyber Incidents",
          ],
          actuarialNote:
            "Complex pricing based on data sensitivity, volume of records, industry, existing security posture (audits), and incident response plans. Threat landscape analysis and historical breach costs are key inputs.",
          underwritingPhilosophy:
            "To provide comprehensive financial protection against the evolving landscape of cyber threats, recognizing the critical role of digital infrastructure for modern MSMEs while encouraging robust cybersecurity practices.",
          operatingModel:
            "Digital-first sales often, with specialized risk assessment questionnaires. Claims require immediate notification, forensic investigation, and often involve incident response teams (legal, PR, IT forensics).",
          pricingMethodology:
            "Calculated based on chosen indemnity limits, number of records stored, revenue, and industry risk. Significant adjustments made for implemented security controls (e.g., MFA, encryption, employee training). Higher risk profile (e.g., healthcare data) leads to higher premiums.",
          benefits: [
            "Covers first-party costs like business interruption losses due to cyber incidents.",
            "Data recovery and restoration costs.",
            "Costs for forensic investigation, public relations, and customer notification.",
            "Third-party liability for privacy breaches or network security failures.",
            "Legal expenses, fines, and penalties related to cyber incidents.",
          ],
          exclusions: [
            "Bodily injury or property damage from cyber incidents.",
            "Future loss of profit unrelated to a direct cyber event.",
            "Known vulnerabilities not remediated.",
            "Costs to improve security beyond incident restoration.",
            "War & terrorism (cyber warfare exclusion).",
          ],
          addons: [
            "Ransomware Negotiation & Payment",
            "Cyber Extortion",
            "Social Engineering Fraud",
            "Reputational Damage",
          ],
          reinsurance:
            "Specialized cyber reinsurance programs due to the systemic and evolving nature of cyber risks, often involving sophisticated modeling of aggregated exposures.",
        },
      ],
      retail: [
        {
          id: "retail-shop-owners-package",
          name: "Shop Owners Package Policy",
          icon: "🛍️",
          description:
            "A comprehensive bundled policy for retail businesses covering property, stock, money, and public liability.",
          customerInfoSheet: [
            "Shop Name & Address",
            "Nature of Business/Goods Sold",
            "Sum Insured (Building, Stock, Furniture)",
            "Annual Turnover",
            "Security Measures (alarms, CCTV)",
            "Fire Extinguishers Available",
            "Daily Cash Handled",
            "Claim History",
          ],
          actuarialNote:
            "Based on location risk (e.g., crime rates, natural disaster zones), sum insured of assets, type of goods (perishable, high value), and security measures. Combines multiple perils into a single premium calculation.",
          underwritingPhilosophy:
            "To offer a simplified, all-in-one risk solution for small retail businesses, enabling them to protect their diverse assets and operations with ease and affordability.",
          operatingModel:
            "Simplified proposal forms, often single point of contact for all claims within the package. Digital policy issuance and renewal. Fast track claims for small losses (e.g., petty theft).",
          pricingMethodology:
            "Package premium based on total sum insured and risk profile of the shop (location, type of goods, security). Discounts for multiple coverages bundled or for robust security. Actuarial models combine individual peril premiums.",
          benefits: [
            "Covers building and contents against fire, explosion, lightning, natural calamities, riots, and terrorism.",
            "Burglary & Theft coverage for stock and contents.",
            "Money Insurance for cash in safe or in transit.",
            "Public Liability for third-party injury/property damage on premises.",
            "Optional: Personal Accident for owner/employees, Business Interruption.",
          ],
          exclusions: [
            "Consequential loss (unless Business Interruption added).",
            "War and nuclear perils.",
            "Wear and tear.",
            "Stock shortages not due to covered peril.",
            "Employee dishonesty (unless FGI added).",
          ],
          addons: [
            "Business Interruption",
            "Personal Accident (owner/employees)",
            "Fidelity Guarantee (employee dishonesty)",
            "Electronic Equipment Insurance",
            "Plate Glass Cover",
          ],
          reinsurance:
            "Combination of property and liability treaties covering the different components of the package policy.",
        },
      ],
      food: [
        {
          id: "food-product-liability",
          name: "Product Liability Insurance",
          icon: "🍴",
          description:
            "Essential for food processors, covering legal liability for bodily injury or property damage caused by their manufactured food products.",
          customerInfoSheet: [
            "Business Name",
            "Types of Food Products Manufactured",
            "Annual Sales Revenue",
            "Production Capacity",
            "Quality Control & Safety Certifications (e.g., FSSAI, ISO 22000)",
            "Distribution Channels",
            "Recall Procedures in Place",
            "Claim History",
          ],
          actuarialNote:
            "Highly sensitive to product type (e.g., dairy vs. packaged snacks), production volume, and quality control measures. History of product recalls and industry-specific litigation trends are crucial. FSSAI compliance is a key factor.",
          underwritingPhilosophy:
            "To protect food processing MSMEs from the severe financial repercussions of product-related claims, promoting rigorous quality standards and swift incident response, safeguarding consumer health and business reputation.",
          operatingModel:
            "Specialized underwriting and claims handling due to complex nature of product liability. Requires detailed incident reports, lab tests, and recall plans. Legal defense support is central to the offering.",
          pricingMethodology:
            "Premium is calculated based on annual turnover, product risk classification (e.g., high-risk like meat/dairy vs. lower risk like dry goods), limits of indemnity, and geographical scope of sales. Strong quality control and certifications may lead to discounts.",
          benefits: [
            "Covers legal costs and damages arising from bodily injury or property damage caused by a defective or contaminated product.",
            "Includes defense costs, even for groundless claims.",
            "Covers expenses related to product recall (e.g., notification, disposal, logistics) if specifically endorsed.",
            "Protects against liability for mislabeled products or failure to warn.",
          ],
          exclusions: [
            "Damage to the product itself.",
            "Contractual liability beyond product liability.",
            "Intentional adulteration.",
            "Recall costs (unless specifically added).",
            "Loss of market/reputation not directly linked to a covered bodily injury/property damage event.",
            "Fines and penalties.",
          ],
          addons: [
            "Product Recall Expenses",
            "Vendors Extension",
            "Supply Chain Liability",
            "Export Liability",
          ],
          reinsurance:
            "Essential for high-risk product lines, often involving structured facultative or treaty arrangements to cover catastrophic product liability exposures.",
        },
      ],
      textile: [
        {
          id: "textile-fire-loss-profit",
          name: "Fire & Loss of Profit Insurance",
          icon: "🔥", // Changed from � to a fire emoji as requested
          description:
            "Combines property protection against fire and allied perils with coverage for lost income due to business interruption in the textile sector.",
          customerInfoSheet: [
            "Factory Address",
            "Type of Fabric/Yarn Processed",
            "Building Sum Insured",
            "Machinery Sum Insured",
            "Stock Sum Insured",
            "Annual Gross Profit",
            "Fire Safety Measures (sprinklers, alarms)",
            "Claim History",
            "Maximum Indemnity Period",
          ],
          actuarialNote:
            "Based on high fire risk associated with textile materials and processes. Considers sum insured, fire protection systems, and susceptibility to business interruption. Data on textile industry fire incidents and recovery times is crucial.",
          underwritingPhilosophy:
            "To offer integrated protection for the textile industry, mitigating the severe impact of fire and operational disruptions on valuable assets and ongoing revenues, fostering business continuity.",
          operatingModel:
            "Standard property claims process with a specific focus on fire investigation. Business interruption claims require financial audits to quantify lost profit. Emphasizes risk engineering services for fire prevention.",
          pricingMethodology:
            "Combined premium. Fire portion based on sum insured, construction, and fire protection. Loss of Profit portion based on gross profit, indemnity period, and industry vulnerability to interruption. Discounts for advanced fire suppression systems and good safety records.",
          benefits: [
            "Covers physical damage to buildings, machinery, and stock due to fire, lightning, explosion.",
            "Protection against natural calamities like flood, storm, earthquake, and acts of terrorism.",
            "Covers loss of gross profit and increased cost of working during business interruption due to covered perils.",
            "Provides for standing charges (fixed expenses) even if turnover drops.",
          ],
          exclusions: [
            "Loss of market or customer base unrelated to direct physical damage.",
            "War and nuclear perils.",
            "Faulty design/workmanship causing fire.",
            "Theft without forced entry.",
            "Wear and tear.",
          ],
          addons: [
            "Machinery Breakdown",
            "Boiler and Pressure Plant Insurance",
            "Deterioration of Stock in cold storage (if applicable)",
            "Cyber Insurance",
          ],
          reinsurance:
            "Standard property and business interruption treaties, with specific consideration for the high concentration of values and fire hazards in textile clusters.",
        },
      ],
    },
  },

  projectAscend: {
    marketGrowth: {
      labels: ["2023", "2024 (e)", "2025 (f)"],
      datasets: [
        {
          label: "Non-Life Premium Growth (%)",
          data: [6.1, 5.7, 7.3],
          borderColor: "#2563eb",
          backgroundColor: "rgba(37, 99, 235, 0.1)",
          fill: true,
          tension: 0.3,
        },
      ],
    },
    smeSize: {
      labels: ["Medium Enterprises", "Micro & Small (Untapped)"],
      datasets: [
        {
          label: "Market Share by Enterprise Size",
          data: [47, 53],
          backgroundColor: ["#3b82f6", "#fbbf24"],
          borderColor: "#ffffff",
          borderWidth: 4,
        },
      ],
    },
    industry: {
      labels: [
        "Retail",
        "Manufacturing",
        "Hospitality",
        "Healthcare",
        "Construction",
      ],
      datasets: [
        {
          label: "Market Share by Industry",
          data: [35, 25, 18, 12, 10],
          backgroundColor: [
            "#60a5fa",
            "#93c5fd",
            "#bfdbfe",
            "#dbeafe",
            "#eff6ff",
          ],
          borderRadius: 4,
        },
      ],
    },
  },

  rusoSIP: {
    rusoComplianceData: [
      // Table data for RUSO Compliance Criteria
      {
        category: "Rural Sector",
        type: "Gram Panchayat Coverage (Collective)",
        criteria: "Minimum 25,000 Gram Panchayats across India",
        notes: "Councils allocate specific GPs to insurers to prevent overlap.",
      },
      {
        category: "Rural Sector",
        type: "Dwellings & Shops (Individual GP)",
        criteria:
          "Minimum 30% of dwellings and shops in each allocated Gram Panchayat",
        notes: "Applies to dwellings under fire insurance.",
      },
      {
        category: "Rural Sector",
        type: "Vehicles (Individual GP)",
        criteria: "Minimum 30% of vehicles in each allocated Gram Panchayat",
        notes:
          "Applies to vehicles under motor insurance (Comprehensive and TP).",
      },
      {
        category: "Social Sector",
        type: "Lives Covered",
        criteria: "Minimum 10% of total insured lives",
        notes:
          "Applies to all general insurers, regardless of age. Councils collate and share data.",
      },
      {
        category: "Social Sector",
        type: "Self-Certification",
        criteria:
          "Up to 20% of total social sector obligations can be fulfilled via self-certification with proofs.",
        notes:
          "Beyond 20%, government-backed identity cards or other formal proofs are required.",
      },
      {
        category: "Motor Third-Party",
        type: "Vehicle Segment Increase",
        criteria:
          "Increase in goods-carrying, passenger-carrying vehicles, and tractors based on previous FY market share.",
        notes: "New insurers have no exemption.",
      },
      {
        category: "Motor Third-Party",
        type: "Minimum Vehicle Thresholds",
        criteria:
          "5,000 goods-carrying vehicles, 5,000 passenger-carrying vehicles, 1,000 tractors (miscellaneous segment).",
        notes: "Applies to all general insurers.",
      },
      {
        category: "Overall",
        type: "Incentives",
        criteria:
          "Suitable rewards for exceeding minimum obligations and increasing spread of insurance.",
        notes: 'Encourages "complete saturation" of Gram Panchayats.',
      },
    ],
    rusoTargets: {
      // Chart data for RUSO Targets
      labels: [
        "Dwellings/Shops (Rural GP)",
        "Vehicles (Rural GP)",
        "Social Sector Lives",
      ],
      datasets: [
        {
          label: "Minimum Coverage Target (%)",
          data: [30, 30, 10],
          backgroundColor: ["#0D9488", "#0F766E", "#14B8A6"],
          borderColor: ["#047857", "#065F46", "#0D9488"],
          borderWidth: 1,
        },
      ],
    },
    roadmapInitiatives: [
      // Data for Roadmap Initiatives
      {
        category: "Needs Assessment",
        action: "Conduct village-level surveys and FGDs in all 904 Villages.",
        stakeholders: "Rural Sales Team, Market Research, Local Partners",
        outcome: "Detailed village risk profiles & socio-economic data.",
      },
      {
        category: "Needs Assessment",
        action:
          "Map existing community networks (SHGs, NGOs, CSCs) & government schemes.",
        stakeholders:
          "Rural Sales Team, Partnerships, Local Government Liaison",
        outcome:
          "Database of local partners & scheme integration opportunities.",
      },
      {
        category: "Product Development",
        action:
          "Design 3-5 new microinsurance/package policies for common rural risks (e.g., crop, livestock, dwelling, motor).",
        stakeholders: "Product Development, Actuarial, Underwriting",
        outcome: "Launch of tailored, affordable, and simple products.",
      },
      {
        category: "Product Development",
        action:
          "Integrate products with identified government social security schemes.",
        stakeholders: "Product Development, Legal, Partnerships",
        outcome:
          "Increased social sector lives covered via scheme beneficiaries.",
      },
      {
        category: "Distribution",
        action:
          "Onboard & train 500 Bima Vaahaks (50% from each village cluster).",
        stakeholders: "HR, Training, Rural Sales Team, Local Partners",
        outcome: "Active, women-centric field force with local trust.",
      },
      {
        category: "Distribution",
        action:
          "Establish partnerships with 200 Common Service Centres (CSCs) & their VLEs/RAPs.",
        stakeholders: "Partnerships, Rural Sales Team",
        outcome: "Expanded physical touchpoints for policy sales & service.",
      },
      {
        category: "Distribution",
        action:
          "Collaborate with 100 local SHGs/NGOs for outreach & distribution.",
        stakeholders: "Partnerships, Rural Sales Team",
        outcome: "Leveraging existing trusted community networks.",
      },
      {
        category: "Technology",
        action:
          "Deploy mobile-first application for policy issuance, premium collection & basic claims intimation.",
        stakeholders: "IT, Product Development, Rural Sales Team",
        outcome:
          "80% digital policy issuance & 50% digital premium collection.",
      },
      {
        category: "Technology",
        action:
          "Implement AI-driven chatbots for local language support & basic queries.",
        stakeholders: "IT, Customer Service",
        outcome: "Improved customer experience & reduced operational load.",
      },
      {
        category: "Technology",
        action:
          "Utilize satellite imagery/drones for crop damage assessment (where applicable).",
        stakeholders: "Claims, Underwriting, IT",
        outcome: "Faster & more accurate agricultural claim settlements.",
      },
      {
        category: "Awareness & Education",
        action:
          "Conduct 2 workshops per village annually on financial literacy & insurance benefits.",
        stakeholders: "Marketing, Rural Sales Team, Local Partners",
        outcome:
          "20% increase in insurance awareness scores in target villages.",
      },
      {
        category: "Awareness & Education",
        action:
          "Develop localized communication materials (brochures, short videos) in regional languages.",
        stakeholders: "Marketing",
        outcome: "Enhanced understanding & engagement with products.",
      },
      {
        category: "Operations & Monitoring",
        action: "Establish a dedicated rural business unit with clear targets.",
        stakeholders: "Senior Management, Operations",
        outcome: "Streamlined focus & accountability for rural penetration.",
      },
      {
        category: "Operations & Monitoring",
        action:
          "Implement flexible premium payment options (monthly/seasonal).",
        stakeholders: "Operations, Finance",
        outcome: "Improved affordability & reduced policy lapses.",
      },
      {
        category: "Operations & Monitoring",
        action:
          "Regular reporting & review meetings with Lead Insurers & Councils.",
        stakeholders: "Senior Management, Compliance",
        outcome: "Alignment with SIP & collective RUSO targets.",
      },
    ],
    kpiData: [
      // Table data for KPIs
      {
        area: "Rural Coverage",
        kpi: "Number of Gram Panchayats with active policies",
        target: "All 1000 allotted villages",
        frequency: "Quarterly",
      },
      {
        area: "Rural Coverage",
        kpi: "% of Dwellings Insured in allocated GPs",
        target: "30% of dwellings in each allocated GP",
        frequency: "Annually",
      },
      {
        area: "Rural Coverage",
        kpi: "% of Vehicles Insured in allocated GPs",
        target: "30% of vehicles in each allocated GP",
        frequency: "Annually",
      },
      {
        area: "Social Sector",
        kpi: "% of Social Sector Lives Covered (of total lives insured)",
        target: "10% of total lives covered",
        frequency: "Annually",
      },
      {
        area: "Social Sector",
        kpi: "% of Self-Certified Social Sector Policies",
        target: "Max 20% of total social sector obligations",
        frequency: "Annually",
      },
      {
        category: "Motor Third-Party",
        kpi: "Incremental Goods-Carrying Vehicles Insured",
        target: "X% increase based on market share, min. 5,000 vehicles",
        frequency: "Annually",
      },
      {
        category: "Motor Third-Party",
        kpi: "Incremental Passenger-Carrying Vehicles Insured",
        target: "Y% increase based on market share, min. 5,000 vehicles",
        frequency: "Annually",
      },
      {
        category: "Motor Third-Party",
        kpi: "Incremental Tractors (Misc.) Insured",
        target: "Z% increase based on market share, min. 1,000 vehicles",
        frequency: "Annually",
      },
      {
        area: "Distribution",
        kpi: "Number of Active Bima Vaahaks onboarded",
        target: "500",
        frequency: "Quarterly",
      },
      {
        area: "Distribution",
        kpi: "Number of Active CSC/VLE partnerships",
        target: "200",
        frequency: "Quarterly",
      },
      {
        area: "Distribution",
        kpi: "% of policies issued digitally",
        target: "80%",
        frequency: "Monthly",
      },
      {
        area: "Awareness & Trust",
        kpi: "% Increase in Financial Literacy Scores (pre/post workshops)",
        target: "20%",
        frequency: "Annually",
      },
      {
        area: "Awareness & Trust",
        kpi: "Average Claim Settlement Time (rural policies)",
        target: "< 7 days (for defined benefit/microinsurance)",
        frequency: "Quarterly",
      },
      {
        area: "Awareness & Trust",
        kpi: "Customer Satisfaction Score (rural segment)",
        target: "> 80%",
        frequency: "Biannually",
      },
      {
        area: "Operational Efficiency",
        kpi: "Cost of Acquisition per Rural Policy",
        target: "Reduction by 15%",
        frequency: "Annually",
      },
      {
        area: "Operational Efficiency",
        kpi: "Policy Renewal Rate (rural segment)",
        target: "> 70%",
        frequency: "Annually",
      },
    ],
    kpiRural: {
      // Chart data for KPI Rural Coverage
      labels: [
        "Dwellings Target Met (Illustrative)",
        "Dwellings Target Remaining",
        "Vehicles Target Met (Illustrative)",
        "Vehicles Target Remaining",
      ],
      datasets: [
        {
          label: "Rural Coverage %",
          data: [15, 15, 10, 20], // Illustrative actual vs remaining for 30% target
          backgroundColor: ["#0D9488", "#A7F3D0", "#0F766E", "#99F6E4"],
          hoverOffset: 4,
        },
      ],
    },
    kpiDistribution: {
      // Chart data for KPI Distribution Network
      labels: ["Bima Vaahaks Onboarded", "CSC/VLE Partnerships"],
      datasets: [
        {
          label: "Target Count",
          data: [500, 200],
          backgroundColor: ["#F59E0B", "#D97706"],
        },
        {
          label: "Achieved (Illustrative)",
          data: [250, 100], // Illustrative actual
          backgroundColor: ["#FEF3C7", "#FFECCB"],
        },
      ],
    },
  },

  strategicBlueprint: {
    propertyCAGR: {
      // Chart data for Commercial Property CAGR
      labels: ["Commercial Property"],
      datasets: [
        {
          label: "Projected CAGR (2025-2033)",
          data: [8.95],
          backgroundColor: ["#3b82f6"],
          borderColor: ["#2563eb"],
          borderWidth: 1,
        },
      ],
    },
    cyberRenewal: {
      // Chart data for Cyber Insurance Renewal Rate
      labels: ["Renewed", "Not Renewed"],
      datasets: [
        {
          label: "Policy Renewal Rate",
          data: [100, 0],
          backgroundColor: ["#10b981", "#e5e7eb"],
          hoverOffset: 4,
        },
      ],
    },
    gwpGrowth: {
      // Chart data for Non-Life GWP Growth
      labels: ["FY23-24 Actual", "FY25-26 Projected"],
      datasets: [
        {
          label: "Non-Life GWP Growth (%)",
          data: [12.76, 13.0],
          borderColor: "#f59e0b",
          backgroundColor: "rgba(245, 158, 11, 0.1)",
          fill: true,
          tension: 0.1,
        },
      ],
    },
    penetration: {
      // Chart data for Non-Life Insurance Penetration
      labels: ["India Non-Life Penetration (FY24)"],
      datasets: [
        {
          label: "Penetration Rate (%)",
          data: [1],
          backgroundColor: ["#ef4444"],
          borderColor: ["#dc2626"],
          borderWidth: 1,
        },
      ],
    },
  },
};

// --- ChartOptions Object: Contains common and specific options for Chart.js ---
const ChartOptions = {
  // Default options for most bar/line/doughnut charts, can be overridden by specific options
  default: (type) => {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display:
            type === "bar" || type === "line"
              ? true
              : type === "doughnut"
              ? { position: "top" }
              : false,
        },
        title: { display: false }, // Titles will be handled by HTML text for better control
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || context.label || "";
              if (label) {
                label += ": ";
              }
              let value =
                context.parsed.y !== undefined
                  ? context.parsed.y
                  : context.parsed;
              label +=
                value +
                (type === "doughnut"
                  ? "%"
                  : type === "bar" || type === "line"
                  ? "%"
                  : ""); // Add % for percentage charts
              return label;
            },
          },
        },
      },
      scales:
        type === "bar" || type === "line"
          ? {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => value + "%", // Add % to y-axis ticks
                },
              },
              x: {
                ticks: {
                  autoSkip: false, // Prevent skipping labels
                  maxRotation: 0, // Prevent rotation
                  minRotation: 0,
                  callback: function (value) {
                    // Shorten long labels if necessary
                    const label = this.getLabelForValue(value);
                    if (label.length > 16) {
                      // Arbitrary length for shortening
                      return label
                        .split(" ")
                        .map((word) =>
                          word.length > 8 ? word.substring(0, 6) + "..." : word
                        );
                    }
                    return label;
                  },
                },
              },
            }
          : {},
    };
    // Specific adjustments for doughnut charts, often legends are better at the bottom or top
    if (type === "doughnut") {
      options.plugins.legend.position = "bottom";
    }
    return options;
  },

  // Specific options for Insuring AP charts (if they deviate from default)
  insuringAP: (title, type) => {
    const commonOptions = ChartOptions.default(type);
    commonOptions.plugins.title = { display: false }; // Ensure no chart title is displayed from JS as HTML handles it
    if (type === "bar" || type === "line") {
      commonOptions.scales.y.max = 100; // Example max value for percentages
    }
    return commonOptions;
  },

  // Specific options for Project Ascend charts
  projectAscend: {
    default: (title, type) => {
      const commonOptions = ChartOptions.default(type);
      commonOptions.plugins.title = { display: false };
      return commonOptions;
    },
    marketGrowth: (title, type) => {
      const options = ChartOptions.projectAscend.default(title, type);
      options.scales.y.beginAtZero = false; // Override for specific chart
      return options;
    },
    smeSize: (title, type) => {
      const options = ChartOptions.projectAscend.default(title, type);
      options.plugins.legend = { position: "bottom" };
      return options;
    },
    industry: (title, type) => {
      const options = ChartOptions.projectAscend.default(title, type);
      options.indexAxis = "y"; // Horizontal bar chart
      options.scales.x = { ticks: { callback: (value) => value + "%" } }; // X-axis ticks for percentage
      return options;
    },
  },

  // Specific options for RUSO & AP SIP charts
  rusoSIP: {
    rusoTargets: (title, type) => {
      const options = ChartOptions.default(type);
      options.scales.y.max = 40;
      options.scales.y.title = { display: true, text: "Percentage (%)" };
      options.plugins.title = {
        display: true,
        text: "Key RUSO Percentage Targets (FY 2024-25)",
      };
      return options;
    },
    kpiRural: (title, type) => {
      const options = ChartOptions.default(type);
      options.plugins.legend = { position: "bottom" };
      return options;
    },
    kpiDistribution: (title, type) => {
      const options = ChartOptions.default(type);
      options.scales.y = {
        beginAtZero: true,
        title: { display: true, text: "Number" },
      };
      options.plugins.legend = { position: "bottom" };
      return options;
    },
  },

  // Specific options for Strategic Blueprint charts
  strategicBlueprint: {
    propertyCAGR: (title, type) => {
      const options = ChartOptions.default(type);
      options.scales.y = {
        beginAtZero: true,
        suggestedMax: 10,
        title: { display: true, text: "CAGR (%)" },
      };
      options.plugins.title = {
        display: true,
        text: "Comm. Property Insurance CAGR",
      };
      return options;
    },
    cyberRenewal: (title, type) => {
      const options = ChartOptions.default(type);
      options.plugins.legend = { position: "top" };
      options.plugins.title = {
        display: true,
        text: "Cyber Insurance Renewal Rate",
      };
      return options;
    },
    gwpGrowth: (title, type) => {
      const options = ChartOptions.default(type);
      options.scales.y = {
        beginAtZero: false,
        title: { display: true, text: "Growth Rate (%)" },
      };
      options.plugins.legend = { display: true, position: "bottom" };
      options.plugins.title = { display: true, text: "Non-Life GWP Growth" };
      return options;
    },
    penetration: (title, type) => {
      const options = ChartOptions.default(type);
      options.scales.y = {
        beginAtZero: true,
        suggestedMax: 5,
        title: { display: true, text: "Penetration Rate (%)" },
      };
      options.plugins.legend = { display: false };
      options.plugins.title = {
        display: true,
        text: "Non-Life Insurance Penetration",
      };
      return options;
    },
  },
};

// Set Chart.js defaults for consistent typography
Chart.defaults.font.family = "Inter, sans-serif";
Chart.defaults.color = "#334155"; // slate-700 for text color
