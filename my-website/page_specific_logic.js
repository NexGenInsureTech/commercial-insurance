// This file contains JavaScript logic specific to each page's content.
// These functions will be called by main.js after the content for that page is loaded.

/**
 * Initializes interactive elements and charts for the Insuring AP page.
 */
function initializeInsuringAPPage() {
  console.log("Initializing Insuring AP page logic...");

  // Chart initializations (no change here, assuming they work)
  if (document.getElementById("demographicsChart")) {
    new Chart(document.getElementById("demographicsChart"), {
      type: "bar",
      data: ChartData.insuringAP.demographics,
      options: ChartOptions.insuringAP("Demographics (%)", "bar"),
    });
  }
  if (document.getElementById("livelihoodChart")) {
    new Chart(document.getElementById("livelihoodChart"), {
      type: "doughnut",
      data: ChartData.insuringAP.livelihood,
      options: ChartOptions.insuringAP("Livelihood Mix (GVA %)", "doughnut"),
    });
  }
  if (document.getElementById("digitalDivideChart")) {
    new Chart(document.getElementById("digitalDivideChart"), {
      type: "bar",
      data: ChartData.insuringAP.digitalDivide,
      options: ChartOptions.insuringAP("Digital Divide (%)", "bar"),
    });
  }
  if (document.getElementById("insuranceGapChart")) {
    new Chart(document.getElementById("insuranceGapChart"), {
      type: "bar",
      data: ChartData.insuringAP.insuranceGap,
      options: ChartOptions.insuringAP("Insurance Gap (%)", "bar"),
    });
  }

  // Tab functionality for 'The Strategic Blueprint' section (no change here, assuming it works)
  const strategySection = document.getElementById("strategy");
  if (strategySection) {
    const tabs = strategySection.querySelectorAll(".tab-button");
    const tabContents = strategySection.querySelectorAll(".tab-content");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const tabId = tab.dataset.tab;

        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        tabContents.forEach((content) => {
          if (content.id === tabId) {
            content.classList.remove("hidden");
          } else {
            content.classList.add("hidden");
          }
        });
      });
    });
    // Click the first tab by default to show content
    if (tabs.length > 0) tabs[0].click();
  }

  // Phase map zones logic for 'Phased Rollout Plan' (no change here, assuming it works)
  const phaseZones = document.querySelectorAll(".phase-map-zone");
  const phaseDetailsContainer = document.getElementById("phase-details");
  const phaseDetailsData = {
    1: {
      title: "Phase 1: High Vulnerability & Readiness",
      details:
        "Focus on coastal districts with high disaster proneness (cyclones) and strong SHG networks. Test product-market fit and distribution model. High-need, high-readiness areas.",
    },
    2: {
      title: "Phase 2: Agricultural Heartland",
      details:
        "Expand to major agricultural belts. Prioritize areas with low crop insurance penetration but high farmer density. Refine modular add-ons for livestock and farm equipment.",
    },
    3: {
      title: "Phase 3: Remote & Tribal Areas",
      details:
        "Target designated backward and tribal areas (e.g., in Rayalaseema). Focus on overcoming connectivity challenges with offline tech and leveraging local NGOs and community leaders.",
    },
    4: {
      title: "Phase 4: Consolidation & Saturation",
      details:
        "Cover remaining GPs and focus on increasing penetration within already-entered clusters. Shift focus to renewals, servicing, and long-term sustainability.",
    },
  };

  phaseZones.forEach((zone) => {
    zone.addEventListener("click", () => {
      const phaseId = zone.dataset.phase;
      phaseZones.forEach((z) => z.classList.remove("active"));
      // Activate all zones with the same phaseId
      document
        .querySelectorAll(`.phase-map-zone[data-phase='${phaseId}']`)
        .forEach((z) => z.classList.add("active"));
      if (phaseDetailsContainer) {
        phaseDetailsContainer.innerHTML = `
                    <h4 class="font-bold text-lg text-stone-800 mb-2">${phaseDetailsData[phaseId].title}</h4>
                    <p class="text-stone-600">${phaseDetailsData[phaseId].details}</p>
                `;
      }
    });
  });
  // Click the first phase by default to show its details
  if (phaseZones.length > 0 && phaseDetailsContainer) phaseZones[0].click();

  // Risk cards logic for 'Risk Mitigation Strategy' (no change here, assuming it works)
  const riskCards = document.querySelectorAll(".risk-card");
  const riskDetailsContainer = document.getElementById("risk-details");
  const riskDetailsData = {
    "mis-selling": {
      title: "Mitigating Mis-selling",
      details:
        "Simplified products (Bima Vistaar), clear Telugu communication aids, rigorous ethics training for Bima Vahaks, and monitoring via mystery shopping and analysis of early claims.",
    },
    fraud: {
      title: "Combating Fraud",
      details:
        "Mandatory Aadhaar e-KYC, 100% digital premium collection (no cash), data analytics to detect suspicious patterns, and robust verification for claims using geo-tagged photos.",
    },
    operational: {
      title: "Ensuring Operational Resilience",
      details:
        "Offline-first mobile app, robust data security adhering to IRDAI guidelines, and a strong local support system (helpline, field managers) for Bima Vahaks to minimize attrition.",
    },
    claims: {
      title: "Streamlining Claim Delays",
      details:
        "Simplified claim forms and processes for low-value claims, local claim support desks at block/district levels, and defined internal TATs with proactive communication to claimants.",
    },
  };

  riskCards.forEach((card) => {
    card.addEventListener("click", () => {
      const riskId = card.dataset.risk;
      if (riskDetailsContainer) {
        riskDetailsContainer.innerHTML = `
                    <h4 class="font-bold text-lg text-stone-800 mb-2">${riskDetailsData[riskId].title}</h4>
                    <p class="text-stone-600">${riskDetailsData[riskId].details}</p>
                `;
      }
    });
  });

  // FIX: Accordion functionality for 'Annexures' - Ensure elements are queried AFTER they exist in DOM
  const annexuresSection = document.getElementById("annexures");
  if (annexuresSection) {
    // Check if the section exists on the page
    const accordionToggles =
      annexuresSection.querySelectorAll(".accordion-toggle");
    accordionToggles.forEach((toggle) => {
      // Remove any existing listeners before re-adding to prevent duplicates
      toggle.removeEventListener("click", handleAccordionToggle);
      toggle.addEventListener("click", handleAccordionToggle);
      // Ensure initial state is closed
      const content = toggle.nextElementSibling;
      if (content) {
        content.style.maxHeight = "0px";
        content.classList.remove("open");
        toggle.classList.remove("active");
      }
    });
  }

  // Helper function for accordions
  function handleAccordionToggle(event) {
    const toggle = event.currentTarget; // Use currentTarget to ensure it's the element with the listener
    const content = toggle.nextElementSibling;
    const currentlyActive = toggle.classList.contains("active");

    // Optional: Close all other accordions if you want only one open at a time
    // This makes sure only the clicked one is open
    const allTogglesInContext =
      toggle.closest(".space-y-4")?.querySelectorAll(".accordion-toggle") || [];
    allTogglesInContext.forEach((t) => {
      if (t !== toggle) {
        t.classList.remove("active");
        const otherContent = t.nextElementSibling;
        if (otherContent) {
          otherContent.style.maxHeight = "0px";
          otherContent.classList.remove("open");
        }
      }
    });

    toggle.classList.toggle("active");
    if (!currentlyActive) {
      // If it wasn't active, open it
      if (content) {
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.add("open");
      }
    } else {
      // If it was active, close it
      if (content) {
        content.style.maxHeight = "0px";
        content.classList.remove("open");
      }
    }
  }

  // Handle active state for internal navigation links (if any) (no change here, assuming it works)
  const pageNavLinks = document.querySelectorAll("header .nav-link"); // Note: This targets the main header nav, needs to be handled by main.js
  const mainSections = document.querySelectorAll("main > section");

  function updatePageActiveNavLink() {
    let current = "";
    mainSections.forEach((section) => {
      // Check if the section is visible in the viewport
      const sectionRect = section.getBoundingClientRect();
      if (sectionRect.top <= 150 && sectionRect.bottom >= 150) {
        // Adjust offset as needed
        current = section.getAttribute("id");
      }
    });

    pageNavLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  // Only add event listener if elements exist on the page
  // This scroll listener is generally better handled by main.js if it's for the main page scroll
  // If it's for internal section highlighting on a *long* loaded page, keep it here.
  // For now, removing the scroll listener here as main.js handles top-level nav highlighting
  // If you need secondary nav within a page, keep this but adjust `pageNavLinks` selector.
  // For now, let's keep it minimal here:
  // if (pageNavLinks.length > 0 && mainSections.length > 0) {
  //     window.removeEventListener('scroll', updatePageActiveNavLink); // Prevent multiple listeners
  //     window.addEventListener('scroll', updatePageActiveNavLink);
  //     updatePageActiveNavLink(); // Initial call
  // }
}

/**
 * Initializes interactive elements and charts for the MSME Strategy page.
 */
function initializeMsmeStrategyPage() {
  console.log("Initializing MSME Strategy page logic...");

  // Accordion functionality for 'Key Reasons for Underinsurance'
  const reasonsAccordion = document.getElementById("reasons-accordion");
  if (reasonsAccordion) {
    const accordionItems = reasonsAccordion.querySelectorAll(".accordion-item");
    accordionItems.forEach((item) => {
      const header = item.querySelector(".accordion-header");
      const icon = header.querySelector("span");
      const content = item.querySelector(".accordion-content");

      // Ensure initial state is closed
      if (content) {
        content.style.maxHeight = "0px";
        item.classList.remove("open");
        if (icon) icon.style.transform = "rotate(0deg)";
      }

      // Remove any existing listeners before re-adding to prevent duplicates
      header.removeEventListener("click", handleMsmeAccordionToggle);
      header.addEventListener("click", handleMsmeAccordionToggle);
    });
  }

  function handleMsmeAccordionToggle(event) {
    const header = event.currentTarget;
    const item = header.closest(".accordion-item");
    const icon = header.querySelector("span");
    const content = item.querySelector(".accordion-content");
    const isOpen = item.classList.contains("open");

    const allItemsInContext =
      header.closest(".space-y-3")?.querySelectorAll(".accordion-item") || [];
    allItemsInContext.forEach((i) => {
      if (i !== item) {
        i.classList.remove("open");
        const otherIcon = i.querySelector(".accordion-header span");
        const otherContent = i.querySelector(".accordion-content");
        if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
        if (otherContent) otherContent.style.maxHeight = "0px";
      }
    });

    if (!isOpen) {
      item.classList.add("open");
      if (icon) icon.style.transform = "rotate(180deg)";
      if (content) content.style.maxHeight = content.scrollHeight + "px";
    } else {
      item.classList.remove("open");
      if (icon) icon.style.transform = "rotate(0deg)";
      if (content) content.style.maxHeight = "0px";
    }
  }

  // Sector-specific insurance details logic
  const sectorButtons = document.querySelectorAll(".sector-button");
  const sectorDetailsContent = document.getElementById(
    "sector-details-content"
  );
  const productCardsContainer = document.getElementById(
    "product-cards-container"
  );

  const sectorData = ChartData.msmeStrategy.sectorData;
  const allSectorProducts = ChartData.msmeStrategy.allSectorProducts;

  function displayProductsForSector(sectorKey) {
    if (!productCardsContainer) return;
    productCardsContainer.innerHTML = "";
    const products = allSectorProducts[sectorKey];

    if (products) {
      products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className =
          "product-card p-4 rounded-lg shadow-md flex flex-col items-center text-center";
        productCard.innerHTML = `
                    <div class="text-5xl mb-3">${product.icon}</div>
                    <h4 class="text-xl font-semibold text-teal-700 mb-2">${product.name}</h4>
                    <p class="text-neutral-600 text-sm mb-4">${product.description}</p>
                    <button data-product-id="${product.id}" class="view-details-button bg-amber-200 hover:bg-teal-500 hover:text-white text-neutral-700 font-medium py-2 px-4 rounded-md mt-auto">View Details</button>
                `;
        productCardsContainer.appendChild(productCard);
      });

      document.querySelectorAll(".view-details-button").forEach((button) => {
        button.removeEventListener("click", handleViewDetailsClick);
        button.addEventListener("click", handleViewDetailsClick);
      });
    }
  }

  function handleViewDetailsClick(event) {
    const productId = event.target.dataset.productId;
    let productFound = null;
    for (const key in allSectorProducts) {
      productFound = allSectorProducts[key].find((p) => p.id === productId);
      if (productFound) break;
    }
    if (productFound) {
      openProductDetailModal(productFound);
    }
  }

  sectorButtons.forEach((button) => {
    button.removeEventListener("click", handleSectorButtonClick);
    button.addEventListener("click", handleSectorButtonClick);
  });

  function handleSectorButtonClick(event) {
    const button = event.currentTarget;
    const sector = button.dataset.sector;
    const data = sectorData[sector];

    sectorButtons.forEach((btn) =>
      btn.classList.remove("active", "bg-teal-600", "text-white")
    );
    button.classList.add("active", "bg-teal-600", "text-white");
    button.classList.remove("bg-amber-200", "text-neutral-700");

    if (data && sectorDetailsContent) {
      sectorDetailsContent.innerHTML = `
                <h4 class="text-lg font-semibold text-teal-700 mb-2">${data.title}</h4>
                <p class="mb-2"><strong class="text-neutral-700">Common Risks:</strong> ${data.risks}</p>
                <p class="mb-2"><strong class="text-neutral-700">Key Insurance Needs:</strong> ${data.needs}</p>
                <p><strong class="text-neutral-700">Rationale:</strong> ${data.rationale}</p>
            `;
    }
    displayProductsForSector(sector);
  }

  if (sectorButtons.length > 0) {
    // Ensure the first button is clicked only if not already active to avoid re-init loops
    if (!sectorButtons[0].classList.contains("active")) {
      sectorButtons[0].click();
    }
  }

  // --- Product Detail Modal Logic ---
  const productDetailModal = document.getElementById("product-detail-modal");
  const closeProductModalButton = document.getElementById(
    "close-product-modal"
  );
  const modalProductTitle = document.getElementById("modal-product-title");
  const modalCustomerInfo = document.getElementById("modal-customer-info");
  const modalActuarialNote = document.getElementById("modal-actuarial-note");
  const modalUnderwritingPhilosophy = document.getElementById(
    "modal-underwriting-philosophy"
  );
  const modalOperatingModel = document.getElementById("modal-operating-model");
  const modalPricingMethodology = document.getElementById(
    "modal-pricing-methodology"
  );
  const modalBenefits = document.getElementById("modal-benefits");
  const modalExclusions = document.getElementById("modal-exclusions");
  const modalAddons = document.getElementById("modal-addons");
  const modalReinsurance = document.getElementById("modal-reinsurance");
  const buyProductButton = document.getElementById("buy-product-button");
  const productSpecificFieldsContainer = document.getElementById(
    "product-specific-fields"
  );

  let currentSelectedProduct = null;
  let originalPremium = 0;
  let discountedPremium = 0;
  let isDiscountApplied = false;

  function populateList(element, items) {
    if (!element) return;
    element.innerHTML = "";
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      element.appendChild(li);
    });
  }

  function openProductDetailModal(product) {
    currentSelectedProduct = product;
    if (modalProductTitle) modalProductTitle.textContent = product.name;

    populateList(modalCustomerInfo, product.customerInfoSheet);
    if (modalActuarialNote)
      modalActuarialNote.textContent = product.actuarialNote;
    if (modalUnderwritingPhilosophy)
      modalUnderwritingPhilosophy.textContent = product.underwritingPhilosophy;
    if (modalOperatingModel)
      modalOperatingModel.textContent = product.operatingModel;
    if (modalPricingMethodology)
      modalPricingMethodology.textContent = product.pricingMethodology;
    populateList(modalBenefits, product.benefits);
    populateList(modalExclusions, product.exclusions);
    populateList(modalAddons, product.addons);
    if (modalReinsurance) modalReinsurance.textContent = product.reinsurance;

    if (productDetailModal) productDetailModal.style.display = "block";
  }

  if (closeProductModalButton) {
    closeProductModalButton.removeEventListener(
      "click",
      handleCloseProductModal
    );
    closeProductModalButton.addEventListener("click", handleCloseProductModal);
  }

  function handleCloseProductModal() {
    if (productDetailModal) productDetailModal.style.display = "none";
  }

  if (productDetailModal) {
    productDetailModal.removeEventListener(
      "click",
      handleProductModalOutsideClick
    );
    productDetailModal.addEventListener(
      "click",
      handleProductModalOutsideClick
    );
  }

  function handleProductModalOutsideClick(event) {
    if (event.target == productDetailModal) {
      productDetailModal.style.display = "none";
    }
  }

  // --- Buy Journey Modal Logic FIX: Ensure all elements are correctly queried ---
  const buyJourneyModal = document.getElementById("buy-journey-modal");
  const closeBuyJourneyModalButton = document.getElementById(
    "close-buy-journey-modal"
  );
  const closeBuyJourneyFinalButton = document.getElementById(
    "close-buy-journey-final"
  );
  const buyJourneyStepsContainer = document.getElementById("buy-journey-steps");
  const buySteps = document.querySelectorAll(".buy-step");

  // Forms for different steps - Ensure these exist
  const customerInfoFormQuote = document.getElementById(
    "customer-info-form-quote"
  );
  const customerInfoFormContact = document.getElementById(
    "customer-info-form-contact"
  );

  // Buttons for navigation - Ensure these exist
  const getQuoteButton = customerInfoFormQuote
    ? customerInfoFormQuote.querySelector('button[type="submit"]')
    : null;
  const proceedToContactDetailsButton = document.getElementById("next-step-2");
  const prevStep2Button = document.getElementById("prev-step-2");
  const proceedToPaymentButton = customerInfoFormContact
    ? customerInfoFormContact.querySelector('button[type="submit"]')
    : null;
  const prevStep3Button = document.getElementById("prev-step-3");
  const payNowButton = document.getElementById("next-step-4");
  const prevStep4Button = document.getElementById("prev-step-4");

  // Elements for dynamic content - Ensure these exist
  const currentProductNameSpan = document.getElementById(
    "current-product-name"
  );
  const industryInput = document.getElementById("industry");
  const quoteProductSpan = document.getElementById("quote-product");
  const quotePremiumSpan = document.getElementById("quote-premium");
  const quoteCoveragesList = document.getElementById("quote-coverages");
  const paymentProductSpan = document.getElementById("payment-product");
  const paymentPremiumSpan = document.getElementById("payment-premium");
  const confirmationNameSpan = document.getElementById("confirmation-name");
  const confirmationProductSpan = document.getElementById(
    "confirmation-product"
  );
  const confirmationEmailSpan = document.getElementById("confirmation-email");

  // Discount elements - Ensure these exist
  const discountSection = document.getElementById("discount-section");
  const discountOptionButtons = document.querySelectorAll(
    ".discount-option-button"
  );
  const discountOutput = document.getElementById("discount-output");
  const discountMessage = document.getElementById("discount-message");
  const whatYouMiss = document.getElementById("what-you-miss");
  const applyDiscountButton = document.getElementById("apply-discount-button");

  // FIX: Refined showBuyStep function

  function showBuyStep(stepNumber) {
    buySteps.forEach((stepDiv, index) => {
      stepDiv.classList.add("hidden");
      stepDiv.classList.remove("current-step");
      buyJourneyStepsContainer.children[index]
        .querySelector("div")
        .classList.remove("bg-teal-600", "text-white");
      buyJourneyStepsContainer.children[index]
        .querySelector("div")
        .classList.add("bg-amber-200", "text-neutral-700");
    });

    const targetStepDiv = document.getElementById(`buy-step-${stepNumber}`);
    if (targetStepDiv) {
      targetStepDiv.classList.remove("hidden");
      targetStepDiv.classList.add("current-step");
      buyJourneyStepsContainer.children[stepNumber - 1]
        .querySelector("div")
        .classList.remove("bg-amber-200", "text-neutral-700");
      buyJourneyStepsContainer.children[stepNumber - 1]
        .querySelector("div")
        .classList.add("bg-teal-600", "text-white");
    }
    currentBuyStep = stepNumber;
  }

  if (buyProductButton) {
    buyProductButton.removeEventListener("click", handleBuyProductClick);
    buyProductButton.addEventListener("click", handleBuyProductClick);
  }

  function handleBuyProductClick() {
    if (currentSelectedProduct) {
      if (productDetailModal) productDetailModal.style.display = "none";
      if (buyJourneyModal) buyJourneyModal.style.display = "block";
      if (currentProductNameSpan)
        currentProductNameSpan.textContent = currentSelectedProduct.name;

      // Reset forms and discount options
      if (customerInfoFormQuote) customerInfoFormQuote.reset();
      if (customerInfoFormContact) customerInfoFormContact.reset();
      if (industryInput && document.querySelector(".sector-button.active")) {
        industryInput.value = document.querySelector(
          ".sector-button.active"
        ).textContent;
      }
      if (productSpecificFieldsContainer)
        productSpecificFieldsContainer.innerHTML = "";
      if (discountSection) discountSection.classList.add("hidden");
      if (discountOutput) discountOutput.classList.add("hidden");
      if (applyDiscountButton) applyDiscountButton.classList.add("hidden");
      isDiscountApplied = false;

      // Dynamically load product-specific fields for Step 1
      let productSpecificFieldsHtml = "";
      if (
        currentSelectedProduct.id.includes("property") ||
        currentSelectedProduct.id.includes("shop-owners") ||
        currentSelectedProduct.id.includes("fire-loss-profit")
      ) {
        productSpecificFieldsHtml = `
                            <h5 class="text-lg font-medium text-neutral-800 border-b pb-2 mb-3 border-amber-200 mt-6">Property Details</h5>
                            <div><label for="sumInsuredBuilding" class="block text-sm font-medium text-neutral-700">Sum Insured - Building (₹)</label><input type="number" id="sumInsuredBuilding" class="mt-1 block w-full border border-amber-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" placeholder="e.g., 5000000" required></div>
                            <div><label for="sumInsuredMachinery" class="block text-sm font-medium text-neutral-700">Sum Insured - Machinery (₹)</label><input type="number" id="sumInsuredMachinery" class="mt-1 block w-full border border-amber-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" placeholder="e.g., 2000000" required></div>
                            <div><label for="sumInsuredStock" class="block text-sm font-medium text-neutral-700">Sum Insured - Stock (₹)</label><input type="number" id="sumInsuredStock" class="mt-1 block w-full border border-amber-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" placeholder="e.g., 1000000" required></div>
                            <div><label for="goodsNature" class="block text-sm font-medium text-neutral-700">Nature of Goods/Raw Materials</label><input type="text" id="goodsNature" class="mt-1 block w-full border border-amber-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" placeholder="e.g., Flammable chemicals, Cotton fabric" required></div>
                        `;
      } else if (currentSelectedProduct.id.includes("business-interruption")) {
        productSpecificFieldsHtml = `
                            <h5 class="text-lg font-medium text-neutral-800 border-b pb-2 mb-3 border-amber-200 mt-6">Business Interruption Details</h5>
                            <div><label for="estimatedGrossProfit" class="block text-sm font-medium text-neutral-700">Estimated Annual Gross Profit (₹)</label><input type="number" id="estimatedGrossProfit" class="mt-1 block w-full border border-amber-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" placeholder="e.g., 1500000" required></div>
                            <div><label for="indemnityPeriod" class="block text-sm font-medium text-neutral-700">Desired Indemnity Period (Months)</label><select id="indemnityPeriod" class="mt-1 block w-full border border-amber-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" required><option value="">Select</option><option value="6">6 Months</option><option value="12">12 Months</option><option value="18">18 Months</option><option value="24">24 Months</option></select></div>
                        `;
      } else if (currentSelectedProduct.id.includes("professional-indemnity")) {
        productSpecificFieldsHtml = `
                            <h5 class="text-lg font-medium text-neutral-800 border-b pb-2 mb-3 border-amber-200 mt-6">Professional Services Details</h5>
                            <div><label for="numProfessionals" class="block text-sm font-medium text-neutral-700">Number of Professionals/Consultants</label><input type="number" id="numProfessionals" class="mt-1 block w-full border border-amber-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" placeholder="e.g., 5" required></div>
                            <div><label for="certifications" class="block text-sm font-medium text-neutral-700">Relevant Professional Certifications (e.g., ISO, Bar Council No.)</label><input type="text" id="certifications" class="mt-1 block w-full border border-amber-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" placeholder="e.g., ISO 27001" required></div>
                        `;
      } else if (currentSelectedProduct.id.includes("cyber-insurance")) {
        productSpecificFieldsHtml = `
                            <h5 class="text-lg font-medium text-neutral-800 border-b pb-2 mb-3 border-amber-200 mt-6">Cyber Security Details</h5>
                            <div><label for="dataType" class="block text-sm font-medium text-neutral-700">Type of Data Stored/Processed</label><select id="dataType" class="mt-1 block w-full border border-amber-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" required><option value="">Select</option><option value="customer_pii">Customer PII (Personal Identifiable Info)</option><option value="financial">Financial Data</option><option value="health">Health Data</option><option value="operational">Operational/Business Data Only</option></select></div>
                            <div><label for="numRecords" class="block text-sm font-medium text-neutral-700">Approx. Number of Digital Records</label><input type="number" id="numRecords" class="mt-1 block w-full border border-amber-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" placeholder="e.g., 10000" required></div>
                            <div><label for="securityMeasures" class="block text-sm font-medium text-neutral-700">Key Security Measures in Place</label><select id="securityMeasures" class="mt-1 block w-full border border-amber-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" required><option value="">Select</option><option value="basic">Basic (Antivirus, Firewall)</option><option value="mfa">Advanced (MFA, Encryption, Regular Backups)</option><option value="comprehensive">Comprehensive (SOC, Incident Response Plan)</option></select></div>
                        `;
      } else if (currentSelectedProduct.id.includes("product-liability")) {
        productSpecificFieldsHtml = `
                            <h5 class="text-lg font-medium text-neutral-800 border-b pb-2 mb-3 border-amber-200 mt-6">Product Details (Food/Manufacturing)</h5>
                            <div><label for="productCategory" class="block text-sm font-medium text-neutral-700">Type of Product Manufactured</label><input type="text" id="productCategory" class="mt-1 block w-full border border-amber-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" placeholder="e.g., Packaged Snacks, Dairy Products" required></div>
                            <div><label for="certificationsQuality" class="block text-sm font-medium text-neutral-700">Quality Certifications (e.g., FSSAI, ISO)</label><input type="text" id="certificationsQuality" class="mt-1 block w-full border border-amber-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" placeholder="e.g., FSSAI License No." required></div>
                            <div><label for="recallPlan" class="block text-sm font-medium text-neutral-700">Do you have a Product Recall Plan?</label><select id="recallPlan" class="mt-1 block w-full border border-amber-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500" required><option value="">Select</option><option value="yes">Yes</option><option value="no">No</option></select></div>
                        `;
      } else {
        productSpecificFieldsHtml = ``;
      }
      if (productSpecificFieldsContainer)
        productSpecificFieldsContainer.innerHTML = productSpecificFieldsHtml;

      showBuyStep(1); // Ensure initial step is shown correctly
    }
  }

  if (closeBuyJourneyModalButton) {
    closeBuyJourneyModalButton.removeEventListener(
      "click",
      handleCloseBuyJourneyModal
    );
    closeBuyJourneyModalButton.addEventListener(
      "click",
      handleCloseBuyJourneyModal
    );
  }

  function handleCloseBuyJourneyModal() {
    if (buyJourneyModal) buyJourneyModal.style.display = "none";
  }

  if (closeBuyJourneyFinalButton) {
    closeBuyJourneyFinalButton.removeEventListener(
      "click",
      handleCloseBuyJourneyFinal
    );
    closeBuyJourneyFinalButton.addEventListener(
      "click",
      handleCloseBuyJourneyFinal
    );
  }

  function handleCloseBuyJourneyFinal() {
    if (buyJourneyModal) buyJourneyModal.style.display = "none";
  }

  if (buyJourneyModal) {
    buyJourneyModal.removeEventListener(
      "click",
      handleBuyJourneyModalOutsideClick
    );
    buyJourneyModal.addEventListener(
      "click",
      handleBuyJourneyModalOutsideClick
    );
  }

  function handleBuyJourneyModalOutsideClick(event) {
    if (event.target == buyJourneyModal) {
      buyJourneyModal.style.display = "none";
    }
  }

  // Step 1: Submit Business Info for Quote
  if (customerInfoFormQuote) {
    customerInfoFormQuote.removeEventListener(
      "submit",
      handleCustomerInfoFormQuoteSubmit
    );
    customerInfoFormQuote.addEventListener(
      "submit",
      handleCustomerInfoFormQuoteSubmit
    );
  }

  function handleCustomerInfoFormQuoteSubmit(e) {
    e.preventDefault();

    const requiredFields = [
      "businessName",
      "turnover",
      "location",
      "numEmployees",
      "buildingType",
      "fireSafety",
      "claimHistory",
      "impactConcern",
      "safetyNetImportance",
    ];
    let allFieldsFilled = true;
    for (const fieldId of requiredFields) {
      const field = document.getElementById(fieldId);
      if (field && field.closest("#buy-step-1") && !field.value) {
        allFieldsFilled = false;
        break;
      }
    }

    if (currentSelectedProduct) {
      if (
        currentSelectedProduct.id.includes("property") ||
        currentSelectedProduct.id.includes("shop-owners") ||
        currentSelectedProduct.id.includes("fire-loss-profit")
      ) {
        if (
          !document.getElementById("sumInsuredBuilding").value ||
          !document.getElementById("sumInsuredMachinery").value ||
          !document.getElementById("sumInsuredStock").value ||
          !document.getElementById("goodsNature").value
        ) {
          allFieldsFilled = false;
        }
      } else if (currentSelectedProduct.id.includes("business-interruption")) {
        if (
          !document.getElementById("estimatedGrossProfit").value ||
          !document.getElementById("indemnityPeriod").value
        ) {
          allFieldsFilled = false;
        }
      } else if (currentSelectedProduct.id.includes("professional-indemnity")) {
        if (
          !document.getElementById("numProfessionals").value ||
          !document.getElementById("certifications").value
        ) {
          allFieldsFilled = false;
        }
      } else if (currentSelectedProduct.id.includes("cyber-insurance")) {
        if (
          !document.getElementById("dataType").value ||
          !document.getElementById("numRecords").value ||
          !document.getElementById("securityMeasures").value
        ) {
          allFieldsFilled = false;
        }
      } else if (currentSelectedProduct.id.includes("product-liability")) {
        if (
          !document.getElementById("productCategory").value ||
          !document.getElementById("certificationsQuality").value ||
          !document.getElementById("recallPlan").value
        ) {
          allFieldsFilled = false;
        }
      }
    } else {
      allFieldsFilled = false;
    }

    if (!allFieldsFilled) {
      alert(
        "Please fill in all required business and product-specific details for your quote."
      );
      return;
    }

    const annualTurnover = parseFloat(
      document.getElementById("turnover").value
    );
    const numEmployees = parseInt(
      document.getElementById("numEmployees").value
    );
    const buildingType = document.getElementById("buildingType").value;
    const fireSafety = document.getElementById("fireSafety").value;
    const claimHistory = document.getElementById("claimHistory").value;
    const impactConcern = document.getElementById("impactConcern").value;
    const safetyNetImportance = document.getElementById(
      "safetyNetImportance"
    ).value;
    const selectedConcerns = Array.from(
      document.querySelectorAll('input[name="concern"]:checked')
    ).map((cb) => cb.value);

    let simulatedPremiumCalc = 0;
    let basePremium = 0;
    let turnoverFactor = 0;
    let employeeFactor = 0;
    let productSpecificRiskFactor = 1;

    if (
      currentSelectedProduct.id.includes("property") ||
      currentSelectedProduct.id.includes("shop-owners") ||
      currentSelectedProduct.id.includes("fire-loss-profit")
    ) {
      basePremium = 5000;
      turnoverFactor = 0.001;
      const sumInsuredBuilding = parseFloat(
        document.getElementById("sumInsuredBuilding").value || 0
      );
      const sumInsuredMachinery = parseFloat(
        document.getElementById("sumInsuredMachinery").value || 0
      );
      const sumInsuredStock = parseFloat(
        document.getElementById("sumInsuredStock").value || 0
      );
      const goodsNature = document
        .getElementById("goodsNature")
        .value.toLowerCase();

      simulatedPremiumCalc +=
        (sumInsuredBuilding + sumInsuredMachinery + sumInsuredStock) * 0.0001;

      if (buildingType === "kutcha") productSpecificRiskFactor += 0.2;
      else if (buildingType === "semi-pucca") productSpecificRiskFactor += 0.1;
      if (fireSafety === "none") productSpecificRiskFactor += 0.15;
      else if (fireSafety === "basic") productSpecificRiskFactor += 0.05;
      if (goodsNature.includes("flammable") || goodsNature.includes("chemical"))
        productSpecificRiskFactor += 0.15;
    } else if (currentSelectedProduct.id.includes("business-interruption")) {
      basePremium = 4000;
      turnoverFactor = 0.0008;
      const estimatedGrossProfit = parseFloat(
        document.getElementById("estimatedGrossProfit").value || 0
      );
      const indemnityPeriod = parseInt(
        document.getElementById("indemnityPeriod").value || 0
      );

      simulatedPremiumCalc +=
        estimatedGrossProfit * 0.0005 + indemnityPeriod * 1000;
    } else if (
      currentSelectedProduct.id.includes("liability") &&
      !currentSelectedProduct.id.includes("product-liability")
    ) {
      basePremium = 3000;
      turnoverFactor = 0.0005;
      employeeFactor = 500;
    } else if (currentSelectedProduct.id.includes("professional-indemnity")) {
      basePremium = 3500;
      turnoverFactor = 0.0007;
      const numProfessionals = parseInt(
        document.getElementById("numProfessionals").value || 0
      );
      const certifications = document
        .getElementById("certifications")
        .value.toLowerCase();

      employeeFactor = 600;
      simulatedPremiumCalc += numProfessionals * employeeFactor;
      if (certifications.includes("none") || certifications === "")
        productSpecificRiskFactor += 0.1;
    } else if (currentSelectedProduct.id.includes("cyber-insurance")) {
      basePremium = 6000;
      turnoverFactor = 0.0012;
      const dataType = document.getElementById("dataType").value;
      const numRecords = parseInt(
        document.getElementById("numRecords").value || 0
      );
      const securityMeasures =
        document.getElementById("securityMeasures").value;

      if (dataType === "health" || dataType === "financial")
        productSpecificRiskFactor += 0.2;
      else if (dataType === "customer_pii") productSpecificRiskFactor += 0.1;

      if (numRecords > 50000) productSpecificRiskFactor += 0.2;
      else if (numRecords > 10000) productSpecificRiskFactor += 0.1;

      if (securityMeasures === "none") productSpecificRiskFactor += 0.25;
      else if (securityMeasures === "basic") productSpecificRiskFactor += 0.1;
      else if (securityMeasures === "comprehensive")
        productSpecificRiskFactor -= 0.05;
    } else if (currentSelectedProduct.id.includes("product-liability")) {
      basePremium = 7000;
      turnoverFactor = 0.0015;
      const productCategory = document
        .getElementById("productCategory")
        .value.toLowerCase();
      const certificationsQuality = document
        .getElementById("certificationsQuality")
        .value.toLowerCase();
      const recallPlan = document.getElementById("recallPlan").value;

      if (
        productCategory.includes("dairy") ||
        productCategory.includes("meat") ||
        productCategory.includes("perishable")
      )
        productSpecificRiskFactor += 0.2;
      if (
        certificationsQuality.includes("none") ||
        certificationsQuality === ""
      )
        productSpecificRiskFactor += 0.15;
      if (recallPlan === "no") productSpecificRiskFactor += 0.1;
    }

    simulatedPremiumCalc += basePremium + turnoverFactor * annualTurnover;

    if (claimHistory === "one") productSpecificRiskFactor *= 1.1;
    else if (claimHistory === "multiple") productSpecificRiskFactor *= 1.25;

    if (impactConcern === "highly_concerned") productSpecificRiskFactor *= 1.03;
    else if (impactConcern === "moderately_concerned")
      productSpecificRiskFactor *= 1.01;

    if (
      selectedConcerns.includes("cyber_attacks") &&
      currentSelectedProduct.id.includes("cyber-insurance")
    ) {
      productSpecificRiskFactor *= 1.08;
    }
    if (
      selectedConcerns.includes("property_damage") &&
      (currentSelectedProduct.id.includes("property") ||
        currentSelectedProduct.id.includes("fire-loss-profit") ||
        currentSelectedProduct.id.includes("shop-owners"))
    ) {
      productSpecificRiskFactor *= 1.05;
    }
    if (
      selectedConcerns.includes("legal_liability") &&
      (currentSelectedProduct.id.includes("liability") ||
        currentSelectedProduct.id.includes("professional-indemnity") ||
        currentSelectedProduct.id.includes("product-liability"))
    ) {
      productSpecificRiskFactor *= 1.06;
    }

    simulatedPremiumCalc *= productSpecificRiskFactor;

    originalPremium = Math.round(simulatedPremiumCalc / 100) * 100;
    discountedPremium = originalPremium;
    isDiscountApplied = false;

    if (quoteProductSpan)
      quoteProductSpan.textContent = currentSelectedProduct.name;
    if (quotePremiumSpan)
      quotePremiumSpan.textContent = originalPremium.toLocaleString("en-IN");
    if (quoteCoveragesList) {
      quoteCoveragesList.innerHTML = "";
      currentSelectedProduct.benefits.slice(0, 3).forEach((benefit) => {
        const li = document.createElement("li");
        li.textContent = benefit;
        quoteCoveragesList.appendChild(li);
      });
    }

    const targetThresholdForDiscount = 8000;
    if (originalPremium > targetThresholdForDiscount) {
      if (discountSection) discountSection.classList.remove("hidden");
      discountOptionButtons.forEach((btn) =>
        btn.classList.remove("bg-teal-600", "text-white")
      );
      if (discountOutput) discountOutput.classList.add("hidden");
      if (applyDiscountButton) applyDiscountButton.classList.add("hidden");
    } else {
      if (discountSection) discountSection.classList.add("hidden");
    }

    showBuyStep(2);
  }

  discountOptionButtons.forEach((button) => {
    button.removeEventListener("click", handleDiscountOptionClick);
    button.addEventListener("click", handleDiscountOptionClick);
  });

  function handleDiscountOptionClick(event) {
    discountOptionButtons.forEach((btn) =>
      btn.classList.remove("bg-teal-600", "text-white")
    );
    event.target.classList.add("bg-teal-600", "text-white");

    const discountType = event.target.dataset.discountType;
    let discountPercentage = 0.1;
    let missMessage = "";

    if (discountType === "deductible") {
      discountPercentage = 0.12;
      missMessage = `By opting for this, your deductible will be increased, meaning you pay more out-of-pocket before coverage begins.`;
    } else if (discountType === "coverage") {
      missMessage = `By opting for this, your overall coverage limits for certain perils will be reduced by up to 20%.`;
    }

    discountedPremium = originalPremium * (1 - discountPercentage);
    discountedPremium = Math.round(discountedPremium / 100) * 100;

    if (discountMessage)
      discountMessage.textContent = `New Premium: ₹ ${discountedPremium.toLocaleString(
        "en-IN"
      )}`;
    if (whatYouMiss) whatYouMiss.textContent = missMessage;
    if (discountOutput) discountOutput.classList.remove("hidden");
    if (applyDiscountButton) applyDiscountButton.classList.remove("hidden");
    isDiscountApplied = true;
  }

  if (applyDiscountButton) {
    applyDiscountButton.removeEventListener("click", handleApplyDiscountClick);
    applyDiscountButton.addEventListener("click", handleApplyDiscountClick);
  }

  function handleApplyDiscountClick() {
    if (isDiscountApplied) {
      if (quotePremiumSpan)
        quotePremiumSpan.textContent =
          discountedPremium.toLocaleString("en-IN");
      alert(
        `Premium updated to ₹ ${discountedPremium.toLocaleString(
          "en-IN"
        )} with applied discount.`
      );
      if (discountSection) discountSection.classList.add("hidden");
    }
  }

  if (proceedToContactDetailsButton) {
    proceedToContactDetailsButton.removeEventListener("click", () =>
      showBuyStep(3)
    );
    proceedToContactDetailsButton.addEventListener("click", () =>
      showBuyStep(3)
    );
  }

  if (prevStep2Button) {
    prevStep2Button.removeEventListener("click", () => showBuyStep(1));
    prevStep2Button.addEventListener("click", () => showBuyStep(1));
  }

  if (customerInfoFormContact) {
    customerInfoFormContact.removeEventListener(
      "submit",
      handleCustomerInfoFormContactSubmit
    );
    customerInfoFormContact.addEventListener(
      "submit",
      handleCustomerInfoFormContactSubmit
    );
  }

  function handleCustomerInfoFormContactSubmit(e) {
    e.preventDefault();
    if (
      !document.getElementById("contactPersonFinal").value ||
      !document.getElementById("contactEmailFinal").value ||
      !document.getElementById("contactPhoneFinal").value
    ) {
      alert("Please provide your contact details.");
      return;
    }
    if (confirmationNameSpan)
      confirmationNameSpan.textContent =
        document.getElementById("contactPersonFinal").value;
    if (confirmationEmailSpan)
      confirmationEmailSpan.textContent =
        document.getElementById("contactEmailFinal").value;

    showBuyStep(4);
  }

  if (prevStep3Button) {
    prevStep3Button.removeEventListener("click", () => showBuyStep(2));
    prevStep3Button.addEventListener("click", () => showBuyStep(2));
  }

  if (payNowButton) {
    payNowButton.removeEventListener("click", handlePayNowClick);
    payNowButton.addEventListener("click", handlePayNowClick);
  }

  function handlePayNowClick() {
    if (
      !document.getElementById("cardNumber").value ||
      !document.getElementById("expiryDate").value ||
      !document.getElementById("cvv").value
    ) {
      alert("Please fill in payment details.");
      return;
    }
    if (paymentProductSpan)
      paymentProductSpan.textContent = quoteProductSpan.textContent;
    if (paymentPremiumSpan)
      paymentPremiumSpan.textContent = quotePremiumSpan.textContent;

    showBuyStep(5);
  }

  if (prevStep4Button) {
    prevStep4Button.removeEventListener("click", () => showBuyStep(3));
    prevStep4Button.addEventListener("click", () => showBuyStep(3));
  }
}

/**
 * Initializes interactive elements and charts for the Project Ascend page.
 */
function initializeProjectAscendPage() {
  console.log("Initializing Project Ascend page logic...");

  // Chart initializations (no change here, assuming they work)
  if (document.getElementById("marketGrowthChart")) {
    const marketGrowthChartCtx = document
      .getElementById("marketGrowthChart")
      .getContext("2d");
    new Chart(marketGrowthChartCtx, {
      type: "line",
      data: ChartData.projectAscend.marketGrowth,
      options: ChartOptions.projectAscend.marketGrowth(
        "Non-Life Premium Growth (%)",
        "line"
      ),
    });
  }
  if (document.getElementById("smeSizeChart")) {
    const smeSizeChartCtx = document
      .getElementById("smeSizeChart")
      .getContext("2d");
    new Chart(smeSizeChartCtx, {
      type: "doughnut",
      data: ChartData.projectAscend.smeSize,
      options: ChartOptions.projectAscend.smeSize(
        "SME Market: Untapped Potential by Size",
        "doughnut"
      ),
    });
  }
  if (document.getElementById("industryChart")) {
    const industryChartCtx = document
      .getElementById("industryChart")
      .getContext("2d");
    new Chart(industryChartCtx, {
      type: "bar",
      data: ChartData.projectAscend.industry,
      options: ChartOptions.projectAscend.industry(
        "Top SME Industry Verticals by Market Share",
        "bar"
      ),
    });
  }

  // Tab functionality for 'Strategic Pillars' (no change here, assuming it works)
  const strategySection = document.getElementById("strategy");
  if (strategySection) {
    const tabButtons = strategySection.querySelectorAll(".tab-btn");
    const tabContents = strategySection.querySelectorAll(".tab-content");
    tabButtons.forEach((button) => {
      button.removeEventListener("click", handleProjectAscendTabClick); // Prevent duplicates
      button.addEventListener("click", handleProjectAscendTabClick);
    });
    function handleProjectAscendTabClick(event) {
      const button = event.currentTarget;
      const tab = button.dataset.tab;
      tabButtons.forEach((btn) => {
        btn.classList.remove("tab-active");
        btn.classList.add("tab-inactive");
      });
      button.classList.add("tab-active");
      button.classList.remove("tab-inactive");
      tabContents.forEach((content) => {
        content.classList.add("hidden");
        if (content.id === `tab-content-${tab}`) {
          content.classList.remove("hidden");
        }
      });
    }
    if (tabButtons.length > 0) {
      // Only click if no tab is active or to reset to first
      const activeTab = strategySection.querySelector(".tab-btn.tab-active");
      if (!activeTab) {
        tabButtons[0].click();
      }
    }
  }

  // KPI Tracker Logic (no change here, assuming it works)
  const gwpGaugeFill = document.getElementById("gwp-gauge-fill");
  const gwpGaugeText = document.getElementById("gwp-gauge-text");
  const gwpInput = document.getElementById("gwp-input");
  const rfqConversionInput = document.getElementById("rfq-conversion-input");
  const rfqConversionDisplay = document.getElementById(
    "rfq-conversion-display"
  );
  const ebConversionInput = document.getElementById("eb-conversion-input");
  const ebConversionDisplay = document.getElementById("eb-conversion-display");
  const newAgentsInput = document.getElementById("new-agents-input");
  const newAgentsDisplay = document.getElementById("new-agents-display");
  const newClientsInput = document.getElementById("new-clients-input");
  const newClientsDisplay = document.getElementById("new-clients-display");
  const lossRatioInput = document.getElementById("loss-ratio-input");
  const lossRatioDisplay = document.getElementById("loss-ratio-display");
  const updateKpiButton = document.getElementById("update-kpi-button");

  function updateGwpGauge(currentValue, targetValue = 5) {
    if (!gwpGaugeFill || !gwpGaugeText) return;
    const percentage = Math.min(100, (currentValue / targetValue) * 100);
    gwpGaugeFill.style.background = `conic-gradient(#2563eb ${
      percentage * 1.8
    }deg, #dbeafe ${percentage * 1.8}deg)`;
    gwpGaugeText.textContent = `₹${currentValue} Cr`;
  }

  if (gwpInput) {
    updateGwpGauge(parseFloat(gwpInput.value));
  }

  if (updateKpiButton) {
    updateKpiButton.removeEventListener("click", handleUpdateKpiClick); // Prevent duplicates
    updateKpiButton.addEventListener("click", handleUpdateKpiClick);
  }
  function handleUpdateKpiClick() {
    const gwpValue = parseFloat(gwpInput.value) || 0;
    updateGwpGauge(gwpValue);

    const rfqConvValue = parseFloat(rfqConversionInput.value) || 0;
    if (rfqConversionDisplay)
      rfqConversionDisplay.textContent = `${rfqConvValue}%`;

    const ebConvValue = parseFloat(ebConversionInput.value) || 0;
    if (ebConversionDisplay) {
      if (ebConvValue < 5 && ebConvValue > 0) {
        ebConversionDisplay.textContent = `<${ebConvValue}%`;
      } else {
        ebConversionDisplay.textContent = `${ebConvValue}%`;
      }
    }

    const newAgentsValue = parseInt(newAgentsInput.value) || 0;
    if (newAgentsDisplay) newAgentsDisplay.textContent = newAgentsValue;

    const newClientsValue = parseInt(newClientsInput.value) || 0;
    if (newClientsDisplay) newClientsDisplay.textContent = newClientsValue;

    const lossRatioValue = parseFloat(lossRatioInput.value) || 0;
    if (lossRatioDisplay) {
      lossRatioDisplay.textContent = `${lossRatioValue}%`;
      lossRatioDisplay.className = `text-4xl font-bold my-2 ${
        lossRatioValue < 70 ? "text-green-600" : "text-red-600"
      }`;
    }
  }

  // Daily Activity Log (no change here, assuming it works)
  const goalsKpiActivityInput = document.getElementById("goals-kpi-activity");
  const goalsKpiLogDisplay = document.getElementById("goals-kpi-log-display");
  const skillDevActivityInput = document.getElementById("skill-dev-activity");
  const skillDevLogDisplay = document.getElementById("skill-dev-log-display");
  const digitalTransformActivityInput = document.getElementById(
    "digital-transform-activity"
  );
  const digitalTransformLogDisplay = document.getElementById(
    "digital-transform-log-display"
  );
  const logActivitiesButton = document.getElementById("log-activities-button");

  function logActivity(inputElement, displayElement, category, timestamp) {
    if (!inputElement || !displayElement) return;
    const activityText = inputElement.value.trim();
    if (activityText) {
      const entryDiv = document.createElement("div");
      entryDiv.className = "activity-log-entry";
      entryDiv.innerHTML = `
                <p class="text-xs text-slate-500">${timestamp} - ${category}</p>
                <p class="text-sm text-slate-700 mt-1">${activityText.replace(
                  /\n/g,
                  "<br>"
                )}</p>
            `;
      displayElement.prepend(entryDiv);
      inputElement.value = "";
    }
  }

  if (logActivitiesButton) {
    logActivitiesButton.removeEventListener("click", handleLogActivitiesClick); // Prevent duplicates
    logActivitiesButton.addEventListener("click", handleLogActivitiesClick);
  }
  function handleLogActivitiesClick() {
    const now = new Date();
    const timestamp = now.toLocaleString("en-IN", {
      dateStyle: "short",
      timeStyle: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    logActivity(
      goalsKpiActivityInput,
      goalsKpiLogDisplay,
      "Goals & KPIs",
      timestamp
    );
    logActivity(
      skillDevActivityInput,
      skillDevLogDisplay,
      "Skill Development",
      timestamp
    );
    logActivity(
      digitalTransformActivityInput,
      digitalTransformLogDisplay,
      "Digital Transformation",
      timestamp
    );

    if (logActivitiesButton)
      logActivitiesButton.textContent = "Activities Logged for Today!";
    setTimeout(() => {
      if (logActivitiesButton)
        logActivitiesButton.textContent = "Log Today's Activities";
    }, 3000);
  }

  // Funnel toggle logic (no change here, assuming it works)
  window.toggleDetails = function (id) {
    // This function is called from inline onclick, so must be global
    const element = document.getElementById(id);
    if (element) {
      element.classList.toggle("hidden");
    }
  };

  // Roadmap phase toggle logic (no change here, assuming it works)
  window.togglePhase = function (element) {
    // This function is called from inline onclick, so must be global
    const phase = element.closest(".phase");
    const icon = phase ? phase.querySelector(".absolute") : null;
    const allPhases = document.querySelectorAll(".phase");
    const allIcons = document.querySelectorAll(".phase .absolute");

    allIcons.forEach((ic) => {
      if (ic) {
        ic.classList.remove("border-blue-600", "border-4");
        ic.classList.add("border-slate-400", "border-2");
      }
    });

    if (phase) {
      if (phase.classList.contains("active")) {
        phase.classList.remove("active");
      } else {
        allPhases.forEach((p) => p.classList.remove("active"));
        phase.classList.add("active");
        if (icon) {
          icon.classList.add("border-blue-600", "border-4");
          icon.classList.remove("border-slate-400", "border-2");
        }
      }
    }
  };
}

/**
 * Initializes interactive elements and charts for the RUSO & AP SIP page.
 */
function initializeRusoSIPPage() {
  console.log("Initializing RUSO & AP SIP page logic...");

  // Tab button functionality for main sections (no change here, assuming it works)
  const mainTabButtons = document.querySelectorAll(".tab-button");
  const contentSections = document.querySelectorAll(".content-section");

  mainTabButtons.forEach((button) => {
    button.removeEventListener("click", handleRusoSIPTabClick); // Prevent duplicates
    button.addEventListener("click", handleRusoSIPTabClick);
  });
  function handleRusoSIPTabClick(event) {
    const button = event.currentTarget;
    mainTabButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    const tabName = button.getAttribute("data-tab");
    contentSections.forEach((section) => {
      section.classList.remove("active");
      if (section.id === tabName) {
        section.classList.add("active");
      }
    });
  }
  if (mainTabButtons.length > 0) {
    // Only click if no tab is active or to reset to first
    const activeTab = document.querySelector(".content-section.active"); // Check for active content section
    if (!activeTab || activeTab.id !== mainTabButtons[0].dataset.tab) {
      mainTabButtons[0].click();
    }
  }

  // FIX: RUSO Definition Cards toggle - Ensure elements are queried AFTER they exist in DOM
  const rusoDefCards = document.querySelectorAll(".card_ruso_def");
  rusoDefCards.forEach((card) => {
    card.removeEventListener("click", handleRusoDefCardClick); // Prevent duplicates
    card.addEventListener("click", handleRusoDefCardClick);
    // Ensure initial state is closed
    const detailElement = card.querySelector(".details-content");
    if (detailElement) {
      detailElement.classList.remove("open");
      detailElement.style.maxHeight = "0px";
    }
  });
  function handleRusoDefCardClick(event) {
    const card = event.currentTarget;
    const detailId = card.getAttribute("data-detail");
    const detailElement = document.getElementById(detailId);
    if (detailElement) {
      detailElement.classList.toggle("open");
      if (detailElement.classList.contains("open")) {
        detailElement.style.maxHeight = detailElement.scrollHeight + "px";
      } else {
        detailElement.style.maxHeight = "0px";
      }
    }
  }

  // Populate RUSO Compliance Table (no change here, assuming it works)
  const rusoTableBody = document.getElementById("rusoComplianceTable")
    ? document
        .getElementById("rusoComplianceTable")
        .getElementsByTagName("tbody")[0]
    : null;
  if (rusoTableBody) {
    rusoTableBody.innerHTML = "";
    ChartData.rusoSIP.rusoComplianceData.forEach((item) => {
      let row = rusoTableBody.insertRow();
      row.insertCell().textContent = item.category;
      row.insertCell().textContent = item.type;
      row.insertCell().textContent = item.criteria;
      row.insertCell().textContent = item.notes;
    });
  }

  // Chart: RUSO Targets (no change here, assuming it works)
  if (document.getElementById("rusoTargetsChart")) {
    const rusoTargetsCtx = document
      .getElementById("rusoTargetsChart")
      .getContext("2d");
    new Chart(rusoTargetsCtx, {
      type: "bar",
      data: ChartData.rusoSIP.rusoTargets,
      options: ChartOptions.rusoSIP.rusoTargets(
        "Key RUSO Percentage Targets (FY 2024-25)",
        "bar"
      ),
    });
  }

  // Roadmap Initiatives Filter (no change here, assuming it works)
  const roadmapGrid = document.getElementById("roadmapInitiativesGrid");
  const filterButtons = document.querySelectorAll(".filter-button");

  function displayInitiatives(filter = "all") {
    if (!roadmapGrid) return;
    roadmapGrid.innerHTML = "";
    const filteredInitiatives =
      filter === "all"
        ? ChartData.rusoSIP.roadmapInitiatives
        : ChartData.rusoSIP.roadmapInitiatives.filter(
            (item) => item.category === filter
          );

    if (filteredInitiatives.length === 0) {
      roadmapGrid.innerHTML = `<p class="col-span-full text-center text-slate-500">No initiatives found for this category.</p>`;
      return;
    }

    filteredInitiatives.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card roadmap-item";
      card.setAttribute("data-category", item.category);
      card.innerHTML = `
                <h4 class="font-semibold text-amber-700 mb-1">${item.action}</h4>
                <p class="text-xs text-teal-600 mb-2"><strong>Category:</strong> ${item.category}</p>
                <p class="text-sm mb-1"><strong>Stakeholders:</strong> ${item.stakeholders}</p>
                <p class="text-sm"><strong>Expected Outcome:</strong> ${item.outcome}</p>
            `;
      roadmapGrid.appendChild(card);
    });
  }

  filterButtons.forEach((button) => {
    button.removeEventListener("click", handleFilterButtonClick); // Prevent duplicates
    button.addEventListener("click", handleFilterButtonClick);
  });
  function handleFilterButtonClick(event) {
    const button = event.currentTarget;
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    displayInitiatives(button.getAttribute("data-filter"));
  }
  // Set initial filter state
  const currentActiveFilterButton = document.querySelector(
    ".filter-button.active"
  );
  if (currentActiveFilterButton) {
    displayInitiatives(currentActiveFilterButton.dataset.filter);
  } else if (filterButtons.length > 0) {
    filterButtons[0].click(); // Click the first filter button if none is active
  }

  // Populate KPI Table (no change here, assuming it works)
  const kpiTableBody = document.getElementById("kpiTable")
    ? document.getElementById("kpiTable").getElementsByTagName("tbody")[0]
    : null;
  if (kpiTableBody) {
    kpiTableBody.innerHTML = "";
    ChartData.rusoSIP.kpiData.forEach((item) => {
      let row = kpiTableBody.insertRow();
      row.insertCell().textContent = item.area;
      row.insertCell().textContent = item.kpi;
      row.insertCell().textContent = item.target;
      row.insertCell().textContent = item.frequency;
    });
  }

  // Chart: KPI Rural Coverage (no change here, assuming it works)
  if (document.getElementById("kpiRuralCoverageChart")) {
    const kpiRuralCtx = document
      .getElementById("kpiRuralCoverageChart")
      .getContext("2d");
    new Chart(kpiRuralCtx, {
      type: "doughnut",
      data: ChartData.rusoSIP.kpiRural,
      options: ChartOptions.rusoSIP.kpiRural(
        "Rural Coverage Targets (%)",
        "doughnut"
      ),
    });
  }

  // Chart: KPI Distribution Network (no change here, assuming it works)
  if (document.getElementById("kpiDistributionChart")) {
    const kpiDistCtx = document
      .getElementById("kpiDistributionChart")
      .getContext("2d");
    new Chart(kpiDistCtx, {
      type: "bar",
      data: ChartData.rusoSIP.kpiDistribution,
      options: ChartOptions.rusoSIP.kpiDistribution(
        "Distribution Network Growth",
        "bar"
      ),
    });
  }
}

/**
 * Initializes interactive elements and charts for the Strategic Blueprint page.
 */
function initializeStrategicBlueprintPage() {
  console.log("Initializing Strategic Blueprint page logic...");

  // FIX: Initialize all clickable-cards/roadmap-phases to closed state on load
  const allCollapsibles = document.querySelectorAll(
    ".clickable-card .details, .roadmap-phase .details"
  );
  allCollapsibles.forEach((detailsElement) => {
    detailsElement.classList.remove("open");
    detailsElement.style.maxHeight = "0px"; // Explicitly set to 0
    const h4Element = detailsElement
      .closest(".clickable-card, .roadmap-phase")
      ?.querySelector("h4");
    if (h4Element) {
      h4Element.innerHTML = h4Element.innerHTML.replace("➖", "➕"); // Ensure icon is '+'
    }
  });

  // Chart: Commercial Property CAGR (no change here, assuming it works)
  if (document.getElementById("propertyCAGRChart")) {
    const propertyCAGRChartCtx = document
      .getElementById("propertyCAGRChart")
      .getContext("2d");
    new Chart(propertyCAGRChartCtx, {
      type: "bar",
      data: ChartData.strategicBlueprint.propertyCAGR,
      options: ChartOptions.strategicBlueprint.propertyCAGR(
        "Comm. Property Insurance CAGR",
        "bar"
      ),
    });
  }

  // Chart: Cyber Insurance Renewal Rate (no change here, assuming it works)
  if (document.getElementById("cyberRenewalChart")) {
    const cyberRenewalChartCtx = document
      .getElementById("cyberRenewalChart")
      .getContext("2d");
    new Chart(cyberRenewalChartCtx, {
      type: "doughnut",
      data: ChartData.strategicBlueprint.cyberRenewal,
      options: ChartOptions.strategicBlueprint.cyberRenewal(
        "Cyber Insurance Renewal Rate",
        "doughnut"
      ),
    });
  }

  // Chart: Non-Life GWP Growth (no change here, assuming it works)
  if (document.getElementById("gwpGrowthChart")) {
    const gwpGrowthChartCtx = document
      .getElementById("gwpGrowthChart")
      .getContext("2d");
    new Chart(gwpGrowthChartCtx, {
      type: "line",
      data: ChartData.strategicBlueprint.gwpGrowth,
      options: ChartOptions.strategicBlueprint.gwpGrowth(
        "Non-Life GWP Growth",
        "line"
      ),
    });
  }

  // Chart: Non-Life Insurance Penetration (no change here, assuming it works)
  if (document.getElementById("penetrationChart")) {
    const penetrationChartCtx = document
      .getElementById("penetrationChart")
      .getContext("2d");
    new Chart(penetrationChartCtx, {
      type: "bar",
      data: ChartData.strategicBlueprint.penetration,
      options: ChartOptions.strategicBlueprint.penetration(
        "Non-Life Insurance Penetration",
        "bar"
      ),
    });
  }

  // Tab systems for Market, Strategy, Customer, Model sections (no change here, assuming it works)
  function setupPageSpecificTabSystem(buttonClassPrefix, contentClassPrefix) {
    const tabButtons = document.querySelectorAll(
      `.${buttonClassPrefix}-tab-button`
    );
    const contentSections = document.querySelectorAll(
      `.${contentClassPrefix}-content-section`
    );

    tabButtons.forEach((button) => {
      button.removeEventListener("click", handleStrategicBlueprintTabClick); // Prevent duplicates
      button.addEventListener("click", handleStrategicBlueprintTabClick);
    });
    function handleStrategicBlueprintTabClick(event) {
      const button = event.currentTarget;
      tabButtons.forEach((btn) => {
        btn.classList.remove("active", "text-sky-600", "border-sky-500");
        btn.classList.add(
          "text-slate-500",
          "border-transparent",
          "hover:border-slate-300"
        );
      });
      button.classList.add("active", "text-sky-600", "border-sky-500");
      button.classList.remove(
        "text-slate-500",
        "border-transparent",
        "hover:border-slate-300"
      );

      const targetId = button.dataset.target;
      contentSections.forEach((section) => {
        section.classList.remove("active");
        if (section.id === targetId) {
          section.classList.add("active");
        }
      });
    }
    if (tabButtons.length > 0) {
      // Click the first tab in each system by default to ensure it's active and content is shown
      const currentActiveTab = tabButtons[0]
        .closest("nav")
        ?.querySelector(".tab-button.active");
      if (!currentActiveTab || currentActiveTab !== tabButtons[0]) {
        tabButtons[0].click();
      }
    }
  }

  setupPageSpecificTabSystem("market", "market");
  setupPageSpecificTabSystem("strategy", "strategy");
  setupPageSpecificTabSystem("customer", "customer");
  setupPageSpecificTabSystem("model", "model");

  // FIX: Global function for toggling details (used by clickable-cards in various sections)
  // Ensure this function clears any open states on other cards if only one should be open,
  // and that it correctly toggles the icon.
  window.toggleDetails = function (elementOrContainer) {
    let detailsElement;
    if (
      elementOrContainer.classList &&
      elementOrContainer.classList.contains("details")
    ) {
      detailsElement = elementOrContainer;
    } else if (elementOrContainer) {
      detailsElement = elementOrContainer.querySelector(".details");
    }

    if (detailsElement) {
      const clickableCard = detailsElement.closest(
        ".clickable-card, .roadmap-phase"
      );
      const h4Element = clickableCard?.querySelector("h4");

      // Optional: Close all other open details in the same container to ensure only one is open
      const parentContainer = clickableCard?.parentElement;
      if (parentContainer) {
        parentContainer
          .querySelectorAll(".details.open")
          .forEach((openDetails) => {
            if (openDetails !== detailsElement) {
              openDetails.classList.remove("open");
              openDetails.style.maxHeight = "0px";
              const otherH4 = openDetails
                .closest(".clickable-card, .roadmap-phase")
                ?.querySelector("h4");
              if (otherH4) {
                otherH4.innerHTML = otherH4.innerHTML.replace("➖", "➕");
              }
            }
          });
      }

      detailsElement.classList.toggle("open");
      if (detailsElement.classList.contains("open")) {
        detailsElement.style.maxHeight = detailsElement.scrollHeight + "px";
        if (h4Element) {
          h4Element.innerHTML = h4Element.innerHTML.replace("➕", "➖");
        }
      } else {
        detailsElement.style.maxHeight = "0px";
        if (h4Element) {
          h4Element.innerHTML = h4Element.innerHTML.replace("➖", "➕");
        }
      }
    }
  };
}

/**
 * Global initializer function.
 * This function will be called by main.js after content is loaded into the DOM.
 * It will then call the appropriate page-specific initialization function.
 * @param {string} pageId The ID of the page content that was just loaded (e.g., 'insuring_ap').
 */
window.initializePageContent = function (pageId) {
  // Ensure Chart.js defaults are set for consistency, just in case.
  Chart.defaults.font.family = "Inter, sans-serif";
  Chart.defaults.color = "#334155"; // slate-700

  // Destroy existing Chart.js instances to prevent memory leaks and conflicts
  // when new content is loaded. Iterate over all Chart instances and destroy them.
  Chart.helpers.each(Chart.instances, function (instance) {
    if (instance) {
      instance.destroy();
    }
  });

  // Call the specific initialization function for the loaded page
  if (pageId === "insuring_ap") {
    initializeInsuringAPPage();
  } else if (pageId === "msme_strategy") {
    initializeMsmeStrategyPage();
  } else if (pageId === "project_ascend") {
    initializeProjectAscendPage();
  } else if (pageId === "ruso_sip") {
    initializeRusoSIPPage();
  } else if (pageId === "strategic_blueprint") {
    initializeStrategicBlueprintPage();
  }

  // Update current year for the footer (only if on a dynamically loaded page)
  const currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) {
    // Check if the element exists in the current content
    currentYearSpan.textContent = new Date().getFullYear().toString();
  }
};
