document.addEventListener("DOMContentLoaded", function () {
  const contentArea = document.getElementById("content-area");
  const navLinks = document.querySelectorAll(
    "header nav a, #mobile-menu a, .catalog a[data-page-id]"
  ); // Include catalog links
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  // Function to load content dynamically into the main area
  async function loadPageContent(pageId) {
    // Scroll to top when loading new content
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (pageId === "homepage") {
      // If navigating to the homepage, directly load its static content
      // This is the content that was originally in your index.html
      contentArea.innerHTML = `
                <section id="homepage-intro" class="text-center py-6 bg-gray-100 text-gray-800">
                    <h1 class="text-3xl font-bold">Welcome to SME & Insurance Inclusion</h1>
                    <p class="text-lg">Feel free to explore!</p>
                </section>

                <div class="catalog grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
                    <div class="card bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <h3 class="text-xl font-semibold mb-2">Digital Strategy</h3>
                        <p class="text-gray-600 mb-4">Commercial Insurance</p>
                        <a href="#strategic_blueprint" class="text-blue-500 font-bold hover:underline" data-page-id="strategic_blueprint">Go to Digital Strategy</a>
                    </div>
                    <div class="card bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <h3 class="text-xl font-semibold mb-2">Project Ascend</h3>
                        <p class="text-gray-600 mb-4">SME Channel Growth Plan.</p>
                        <a href="#project_ascend" class="text-blue-500 font-bold hover:underline" data-page-id="project_ascend">Go to Project Ascend</a>
                    </div>
                    <div class="card bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <h3 class="text-xl font-semibold mb-2">MSME Insurance Strategy</h3>
                        <p class="text-gray-600 mb-4">Strategic Blueprint for MSME Commercial Insurance.</p>
                        <a href="#msme_strategy" class="text-blue-500 font-bold hover:underline" data-page-id="msme_strategy">Go to MSME Strategy</a>
                    </div>
                    <div class="card bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <h3 class="text-xl font-semibold mb-2">RUSO & AP SIP</h3>
                        <p class="text-gray-600 mb-4">Navigating IRDAI RUSO Obligations and Andhra Pradesh's State Insurance Plan.</p>
                        <a href="#ruso_sip" class="text-blue-500 font-bold hover:underline" data-page-id="ruso_sip">Go to RUSO-SIP Strategy</a>
                    </div>
                    <div class="card bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <h3 class="text-xl font-semibold mb-2">Insuring AP</h3>
                        <p class="text-gray-600 mb-4">An interactive dashboard translating the State Insurance Plan (SIP) strategy into an actionable vision for achieving "Insurance for All by 2047".</p>
                        <a href="#insuring_ap" class="text-blue-500 font-bold hover:underline" data-page-id="insuring_ap">Go to Insuring AP</a>
                    </div>
                </div>
            `;
      // Re-attach event listeners for the dynamically loaded catalog links
      document
        .querySelectorAll("#content-area .catalog a[data-page-id]")
        .forEach((link) => {
          link.addEventListener("click", handleNavLinkClick);
        });
      // No specific JS initialization needed for homepage
      updateActiveNavLink(pageId);
      return;
    }

    try {
      // Fetch content from the 'content/' folder
      const response = await fetch(`content/${pageId}_content.html`);
      if (!response.ok) {
        // If content is not found or other HTTP error
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const htmlContent = await response.text();
      contentArea.innerHTML = htmlContent;

      // This is the crucial step: Call the global initializer from page_specific_logic.js
      // It will then check the pageId and run the correct initialization function (e.g., initializeInsuringAPPage()).
      if (window.initializePageContent) {
        window.initializePageContent(pageId);
      }

      // Update active navigation link in the header
      updateActiveNavLink(pageId);
    } catch (error) {
      console.error("Failed to load page content:", error);
      contentArea.innerHTML = `<p class="text-red-500 text-center text-xl p-8">Oops! Content could not be loaded for this page. Please try again later or check the console for errors.</p>`;
    }
  }

  // Function to update the active state of navigation links in the header
  function updateActiveNavLink(currentPageId) {
    navLinks.forEach((link) => {
      link.classList.remove("active"); // Remove 'active' from all links
      if (link.dataset.pageId === currentPageId) {
        link.classList.add("active"); // Add 'active' to the current page's link
      }
    });
  }

  // Event handler for all navigation clicks (desktop and mobile)
  function handleNavLinkClick(event) {
    event.preventDefault(); // Prevent default link behavior (full page reload)
    const pageId = event.target.dataset.pageId; // Get the 'data-page-id' from the clicked link
    if (pageId) {
      loadPageContent(pageId); // Load the content

      // Close mobile menu if it's open after clicking a link
      if (!mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }

      // Update URL hash without reloading the page, for bookmarking and history
      window.history.pushState({ pageId: pageId }, "", `#${pageId}`);
    }
  }

  // Attach click event listeners to all navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", handleNavLinkClick);
  });

  // Mobile menu toggle functionality
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden"); // Toggle visibility
    });
  }

  // Handle initial page load based on URL hash or default to homepage
  function handleInitialLoad() {
    const hash = window.location.hash.substring(1); // Get the hash from the URL (e.g., #insuring_ap -> "insuring_ap")
    if (hash) {
      loadPageContent(hash); // Load the page specified in the hash
    } else {
      loadPageContent("homepage"); // If no hash, load the homepage by default
    }
  }

  // Listen for browser back/forward buttons (popstate event)
  window.addEventListener("popstate", (event) => {
    if (event.state && event.state.pageId) {
      // If there's state (meaning a page was loaded by pushState), load that page
      loadPageContent(event.state.pageId);
    } else {
      // If no state (e.g., initial load or user navigated to a # without previous state), fall back to initial load logic
      handleInitialLoad();
    }
  });

  // Set current year in footer (already in page_specific_logic.js for dynamic content, but keeping here for consistency with the main footer)
  const currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear().toString();
  }

  // Call the initial load function when the DOM is fully loaded
  handleInitialLoad();
});
