(function () {
  const h1Text = document.querySelector("h1")?.innerText || "This Site";

  const defaults = {
    siteName: h1Text,
    lastUpdateDate: "",
    lastUpdateShow: false,
    linkHome: true,
    linkApps: true,
    position: "footer",
    sticky: true
  };

  const config = Object.assign({}, defaults, window.BANNER_CONFIG || {});

  // Build inner content
  const parts = [];

  parts.push("<span class='banner-site-name'>" + config.siteName + "</span>");

  if (config.lastUpdateShow && config.lastUpdateDate) {
    parts.push("<span class='banner-update'>Last updated: " + config.lastUpdateDate + "</span>");
  }

  const links = [];
  if (config.linkHome) {
    links.push("<a href='https://themann00.com' target='_blank' rel='noopener'>themann00.com</a>");
  }
  if (config.linkApps) {
    links.push("<a href='https://apps.themann00.com' target='_blank' rel='noopener'>Apps</a>");
  }
  if (links.length > 0) {
    parts.push("<span class='banner-links'>" + links.join(" &nbsp;|&nbsp; ") + "</span>");
  }

  // Build the banner element
  const banner = document.createElement("div");
  banner.id = "themann-banner";
  banner.innerHTML = parts.join(" &nbsp;&mdash;&nbsp; ");

  // Styles
  const isFooter = config.position === "footer";
  const isSticky = config.sticky;

  banner.style.cssText = [
    "width: 100%",
    "box-sizing: border-box",
    "background: #1a1a1a",
    "color: #cccccc",
    "font-size: 13px",
    "font-family: sans-serif",
    "padding: 8px 16px",
    "text-align: center",
    "z-index: 9999",
    isSticky ? "position: fixed" : "position: relative",
    isFooter ? "bottom: 0" : "top: 0",
    "left: 0"
  ].join("; ");

  // Link styles via a style tag (can't inline per-element in this approach easily)
  const style = document.createElement("style");
  style.textContent = `
    #themann-banner a {
      color: #aad4f5;
      text-decoration: none;
    }
    #themann-banner a:hover {
      text-decoration: underline;
    }
  `;
  document.head.appendChild(style);

  // Insert into DOM
  if (document.body) {
    insertBanner();
  } else {
    document.addEventListener("DOMContentLoaded", insertBanner);
  }

  function insertBanner() {
    if (isFooter) {
      document.body.appendChild(banner);
    } else {
      document.body.insertBefore(banner, document.body.firstChild);
    }

    // If sticky, add body padding so content is not hidden under the banner
    const height = banner.offsetHeight;
    if (isSticky) {
      if (isFooter) {
        document.body.style.paddingBottom = height + "px";
      } else {
        document.body.style.paddingTop = height + "px";
      }
    }
  }
})();
