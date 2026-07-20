const navigationItems = [
  ["Search", "/search.html"],
  ["Buy", "/buy.html"],
  ["Sell", "/sell.html"],
  ["Listings", "/listings.html"],
  ["Our Agents", "/agents.html"],
  ["Projects", "/projects.html"],
  ["About", "/about.html"],
  ["Contact", "/contact.html"],
];

const currentPath = window.location.pathname.replace(/\/$/, "") || "/";

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const links = navigationItems.map(([label, href]) => {
      const isCurrent = currentPath === href.replace(/\.html$/, "") || currentPath === href;
      const className = label === "Contact" ? ' class="nav-cta"' : "";
      return `<a${className} href="${href}"${isCurrent ? ' aria-current="page"' : ""}>${label}</a>`;
    }).join("");

    this.innerHTML = `
      <header class="site-header" aria-label="Site header">
        <div class="container nav">
          <a class="brand" href="/" aria-label="Cite International Realty Corp home">
            Cite International Realty Corp | 千禧地产
            <small>New York Commercial Real Estate Advisory</small>
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" aria-label="Open navigation">
            <span></span>
          </button>
          <nav class="nav-links" id="primary-navigation" aria-label="Primary navigation">${links}</nav>
        </div>
      </header>`;

    const button = this.querySelector(".nav-toggle");
    const nav = this.querySelector(".nav-links");

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      button.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      nav.classList.toggle("is-open", !isOpen);
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", "Open navigation");
        nav.classList.remove("is-open");
      }
    });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer" id="legal" aria-label="Footer">
        <div class="container footer-grid">
          <div>
            <div class="footer-brand">Cite International Realty Corp | 千禧地产</div>
            <p class="footer-meta">New York Commercial Real Estate Advisory</p>
            <p class="footer-meta">(Christine) Xinyue Cui, NY Licensed Real Estate Professional</p>
            <p class="footer-meta">Phone: <a href="tel:+19175089318">917-508-9318</a></p>
            <p class="footer-meta">Email: <a href="mailto:christineciterealty@gmail.com">christineciterealty@gmail.com</a></p>
          </div>
          <nav class="footer-links" aria-label="Footer navigation">
            <a href="/#markets">NYC Commercial Real Estate</a>
            <a href="/#manhattan-office">Manhattan Office Space</a>
            <a href="/#queens-industrial">Queens Warehouse</a>
            <a href="/#chinatown-retail">Chinatown Retail</a>
            <a href="/#nyc-investment">NYC Investment Property</a>
            <a href="/disclaimer.html">Disclaimer</a>
            <a href="/terms.html">Terms of Use</a>
            <a href="/fair-housing.html">Fair Housing</a>
            <a href="/dmca.html">DMCA</a>
            <a href="/privacy.html">Privacy Policy</a>
          </nav>
          <p class="footer-legal-note">All information provided on this website is for general informational purposes only and does not constitute an offer to sell, a solicitation to buy, legal advice, tax advice, financial advice, or investment advice. Property information, pricing, availability, projections, and market conditions are subject to change and should be independently verified.</p>
        </div>
      </footer>`;
  }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);

