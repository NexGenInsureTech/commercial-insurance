export function initEngine(config) {
  // const state = {
  //   variant: null,
  //   siMap: null,
  //   technical: false,
  //   loading: 0,
  // };
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
  const customContainer = document.getElementById("customContainer");
  const customToggle = document.getElementById("customToggle");

  // function calculatePremium() {
  //   if (!state.variant || !state.siMap) return 0;

  //   const rates = state.variant.rates;
  //   let net = 0;

  //   Object.keys(state.siMap).forEach((code) => {
  //     const rate = rates[code] || 0;
  //     net += (state.siMap[code] * rate) / 1000;
  //   });

  //   net += net * (state.loading / 100);

  //   const gst = net * 0.18;

  //   return net + gst;
  // }

  function calculatePremium() {
    if (!state.variant || !state.siMap) return 0;

    const rates = state.variant.rates;
    let net = 0;

    Object.keys(state.siMap).forEach((code) => {
      const rate = rates[code] || 0;
      net += (state.siMap[code] * rate) / 1000;
    });

    // Apply loading / discount
    const adjusted = net * (1 + state.loading / 100);

    // Apply GST
    const finalPremium = adjusted * 1.18;

    return finalPremium;
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
        // Reset quote state
        state.variant = v;
        state.siMap = null;
        state.technical = false;
        state.loading = 0;

        // Reset UI elements
        loadingInput.value = 0;
        techToggle.textContent = "View Technical Breakdown";

        renderSILadder();
        renderSummary();
      };
      variantContainer.appendChild(btn);
    });
  }

  // Custom Mode Toggle
  customToggle.onchange = () => {
    if (customToggle.checked) {
      state.mode = "CUSTOM";
      state.variant = null;
      state.siMap = null;
      state.technical = false;
      state.loading = 0;

      loadingInput.value = 0;
      techToggle.textContent = "View Technical Breakdown";

      variantContainer.style.display = "none";
      siContainer.style.display = "none";
      customContainer.style.display = "block";

      renderCustom();
      renderSummary();
    } else {
      state.mode = "OTC";

      customContainer.style.display = "none";
      variantContainer.style.display = "flex";
      siContainer.style.display = "flex";

      state.siMap = null;

      renderSummary();
    }
  };

  function renderSILadder() {
    siContainer.innerHTML = "";
    if (!state.variant) return;

    state.variant.siOptions.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "si-btn";
      btn.textContent = opt.label;

      btn.onclick = () => {
        document
          .querySelectorAll(".si-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        state.loading = 0;
        state.technical = false;
        loadingInput.value = 0;
        techToggle.textContent = "View Technical Breakdown";

        const building = opt.building;
        const contents = building * 0.2;

        state.siMap = {
          building: building,
          contents: contents,
          terrorism: building + contents,
          burglary: building * 0.2,
          mbd: building * 0.1,
          eeip: building * 0.05,
          allrisk: building * 0.05,
          baggage: building * 0.01,
          money: building * 0.01,
          pa: building * 0.2,
          tpl: building * 0.2,
        };

        renderSummary();
      };

      siContainer.appendChild(btn);
    });
  }

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
  function renderSummary() {
    summaryContainer.innerHTML = "";

    if (!state.siMap) {
      totalPremiumEl.textContent = "0";
      techToggle.style.display = state.mode === "OTC" ? "inline-block" : "none";
      return;
    }

    const total = calculatePremium();
    totalPremiumEl.textContent = total.toFixed(2);

    techToggle.style.display = state.mode === "OTC" ? "inline-block" : "none";

    const rates = state.variant ? state.variant.rates : {};

    config.coverageGroups.forEach((group) => {
      const h = document.createElement("h4");
      h.textContent = group.group;
      summaryContainer.appendChild(h);

      group.items.forEach((item) => {
        const si = state.siMap[item.code] || 0;
        const rate = rates[item.code] || 0;
        const prem = ((si * rate) / 1000).toFixed(2);

        const row = document.createElement("p");

        let text = item.label + ": ₹ " + si.toLocaleString("en-IN");

        if (state.mode === "CUSTOM" || state.technical) {
          text += " → Premium ₹ " + prem;
        }

        row.textContent = text;

        summaryContainer.appendChild(row);
      });
    });
  }

  techToggle.onclick = () => {
    state.technical = !state.technical;
    techToggle.textContent = state.technical
      ? "Hide Technical Breakdown"
      : "View Technical Breakdown";
    renderSummary();
  };

  loadingInput.oninput = () => {
    state.loading = parseFloat(loadingInput.value) || 0;
    renderSummary();
  };

  renderVariants();
}
