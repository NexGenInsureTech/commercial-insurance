export function initEngine(config) {
  const state = {
    mode: "OTC",
    variant: null,
    siMap: null,
    technical: false,
    loading: 0,
  };

  const variantContainer = document.getElementById("variantContainer");
  const siContainer = document.getElementById("siContainer");
  const summaryContainer = document.getElementById("summaryContainer");
  const totalPremiumEl = document.getElementById("totalPremium");
  const techToggle = document.getElementById("techToggle");
  const loadingInput = document.getElementById("loadingInput");
  const customToggle = document.getElementById("customToggle");
  const customContainer = document.getElementById("customContainer");

  function getRate(bands, si) {
    for (let band of bands) {
      if (si <= band.maxSI) return band.rate;
    }
    return bands[bands.length - 1].rate;
  }

  function calculatePremium(siMap) {
    let total = 0;
    config.coverageGroups.forEach((group) => {
      group.items.forEach((item) => {
        const si = siMap[item.code] || 0;
        const rate = getRate(item.bands, si);
        total += (si * rate) / 1000;
      });
    });
    total += total * (state.loading / 100);
    return total;
  }

  function renderVariants() {
    variantContainer.innerHTML = "";
    config.variants.forEach((v) => {
      const btn = document.createElement("button");
      btn.className = "variant-btn";
      btn.textContent = v.name;
      btn.onclick = () => {
        document
          .querySelectorAll(".variant-btn")
          .forEach((b) => b.classList.remove("active"));

        btn.classList.add("active");

        state.variant = v;
        state.siMap = null;

        renderSILadder();
        renderSummary();
      };
      variantContainer.appendChild(btn);
    });
  }

  function renderSILadder() {
    siContainer.innerHTML = "";
    if (!state.variant) return;
    state.variant.siOptions.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "si-btn";
      btn.textContent = opt.label;
      btn.onclick = () => {
        // Remove active from all SI buttons
        document
          .querySelectorAll(".si-btn")
          .forEach((b) => b.classList.remove("active"));

        // Add active to clicked button
        btn.classList.add("active");

        const baseSI = opt.presetSI.building;

        state.siMap = {
          building: baseSI,
          contents: opt.presetSI.contents,
          terrorism: opt.presetSI.terrorism,
          burglary: opt.presetSI.burglary,

          mbd: baseSI * 0.1,
          eeip: baseSI * 0.05,
          allrisk: baseSI * 0.05,
          baggage: baseSI * 0.01,
          money: baseSI * 0.01,
          pa: baseSI * 0.2,
          tpl: baseSI * 0.2,
        };

        renderSummary();
      };
      siContainer.appendChild(btn);
    });
  }

  function renderSummary() {
    summaryContainer.innerHTML = "";
    if (!state.siMap) {
      totalPremiumEl.textContent = "0";
      techToggle.style.display = "none";
      return;
    }

    const total = calculatePremium(state.siMap);
    totalPremiumEl.textContent = total.toFixed(2);
    techToggle.style.display = state.mode === "OTC" ? "inline-block" : "none";

    config.coverageGroups.forEach((group) => {
      const h = document.createElement("h4");
      h.textContent = group.group;
      summaryContainer.appendChild(h);

      group.items.forEach((item) => {
        const si = state.siMap[item.code] || 0;
        const rate = state.variant.rates[item.code] || 0;
        const prem = ((si * rate) / 1000).toFixed(2);
        const row = document.createElement("p");
        row.textContent = item.label + ": ₹ " + si.toLocaleString("en-IN");

        if (state.mode === "CUSTOM" || state.technical) {
          row.textContent += " → Premium ₹ " + prem;
        }

        summaryContainer.appendChild(row);
      });
    });
  }

  techToggle.onclick = () => {
    state.technical = !state.technical;
    renderSummary();
  };

  loadingInput.oninput = () => {
    state.loading = parseFloat(loadingInput.value) || 0;
    renderSummary();
  };

  customToggle.onchange = () => {
    if (customToggle.checked) {
      state.mode = "CUSTOM";
      state.variant = null;
      state.siMap = null;
      state.technical = false;
      variantContainer.style.display = "none";
      siContainer.innerHTML = "";
      summaryContainer.innerHTML = "";
      totalPremiumEl.textContent = "0";
      customContainer.style.display = "block";
      renderCustom();
    } else {
      state.mode = "OTC";
      state.siMap = null;
      state.technical = false;
      customContainer.style.display = "none";
      variantContainer.style.display = "block";
      renderVariants();
      renderSummary();
    }
  };

  function renderCustom() {
    customContainer.innerHTML = "";
    config.coverageGroups.forEach((group) => {
      const h = document.createElement("h4");
      h.textContent = group.group;
      customContainer.appendChild(h);

      group.items.forEach((item) => {
        const div = document.createElement("div");
        div.className = "coverage-row";

        const label = document.createElement("span");
        label.textContent = item.label;

        const input = document.createElement("input");
        input.type = "number";
        input.placeholder = "Enter SI";

        input.oninput = () => {
          if (!state.siMap) state.siMap = {};
          state.siMap[item.code] = parseFloat(input.value) || 0;
          renderSummary();
        };

        div.appendChild(label);
        div.appendChild(input);
        customContainer.appendChild(div);
      });
    });
  }

  renderVariants();
}
