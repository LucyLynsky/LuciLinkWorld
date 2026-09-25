const App = (() => {
  const LANGS = ["zh", "en"];
  const WEB3FORMS_ACCESS_KEY = "8cffd631-3856-4354-aa4f-ea7423b13d7c";
  const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
  const pages = {
    home: "index.html",
    products: "products.html",
    source: "source.html",
    markets: "markets.html",
    contact: "contact.html"
  };

  function detectLang() {
    const saved = localStorage.getItem("llw-lang");
    if (saved === "fr") {
      localStorage.setItem("llw-lang", "en");
      return "en";
    }
    if (LANGS.includes(saved)) return saved;
    const nav = (navigator.language || "zh").toLowerCase();
    if (nav.startsWith("en")) return "en";
    return "zh";
  }

  function t(path) {
    const lang = document.documentElement.lang || "zh";
    const parts = path.split(".");
    let node = I18N[lang] || I18N.zh;
    for (const p of parts) {
      node = node?.[p];
    }
    return node ?? path;
  }

  function apply() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = t(el.dataset.i18n);
      if (typeof value === "string") el.textContent = value;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder));
    });
    const page = document.body.dataset.page;
    const title = t(`meta.${page}`);
    if (title) document.title = title;
    document.documentElement.lang = document.documentElement.lang;
    document.querySelectorAll(".lang button").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === document.documentElement.lang));
    });
    fillOriginSelects(true);
  }

  function setLang(lang) {
    if (!LANGS.includes(lang)) return;
    localStorage.setItem("llw-lang", lang);
    document.documentElement.lang = lang;
    apply();
    if (document.body.dataset.page === "home") renderHome();
    if (document.body.dataset.page === "products") renderCatalog();
    if (document.body.dataset.page === "product") renderDetail();
    if (document.body.dataset.page === "source") renderSource();
  }

  function chrome(active) {
    const header = document.getElementById("site-header");
    const footer = document.getElementById("site-footer");
    if (header) {
      header.innerHTML = `
        <a class="skip" href="#main">Skip</a>
        <div class="nav" id="nav">
          <a class="brand" href="index.html"><img src="assets/logo/lucilink-gold.svg?v=33" alt="LuciLinkWorld"></a>
          <button class="menu-btn" type="button" aria-label="Menu" id="menu-btn"><span></span><span></span><span></span></button>
          <nav class="nav-links">
            <a href="index.html" class="${active === "home" ? "active" : ""}" data-i18n="nav.home"></a>
            <a href="products.html" class="${active === "products" || active === "product" ? "active" : ""}" data-i18n="nav.products"></a>
            <a href="source.html" class="${active === "source" ? "active" : ""}" data-i18n="nav.source"></a>
            <a href="contact.html" class="${active === "contact" ? "active" : ""}" data-i18n="nav.contact"></a>
          </nav>
          <div class="lang" role="group" aria-label="Language">
            <button type="button" data-lang="zh">中文</button>
            <button type="button" data-lang="en">EN</button>
          </div>
        </div>`;
    }
    if (footer) {
      footer.innerHTML = `
        <div class="footer-inner">
          <div>
            <img src="assets/logo/lucilink-gold.svg?v=33" alt="LuciLinkWorld">
            <p class="footer-title" data-i18n="hero.title"></p>
            <p class="footer-lead" data-i18n="hero.lead"></p>
            <p data-i18n="footer.copy"></p>
          </div>
          <div class="footer-col">
            <h4>LuciLinkWorld</h4>
            <p><a href="products.html" data-i18n="nav.products"></a></p>
            <p><a href="source.html" data-i18n="nav.source"></a></p>
            <p><a href="contact.html" data-i18n="nav.contact"></a></p>
          </div>
          <div class="footer-col">
            <h4 data-i18n="nav.contact"></h4>
            <p><a href="mailto:LuciLinkWorld@gmail.com">LuciLinkWorld@gmail.com</a></p>
            <p>WeChat: LuciLinkWorld</p>
            <p>WhatsApp: LuciLinkWorld</p>
            <p>Huaqiang North, Shenzhen, China</p>
          </div>
        </div>`;
    }
    document.getElementById("menu-btn")?.addEventListener("click", () => {
      document.getElementById("nav")?.classList.toggle("open");
    });
    document.querySelectorAll(".lang button").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.dataset.lang));
    });
    renderFloat();
  }

  function renderFloat() {
    let dock = document.getElementById("float-dock");
    if (!dock) {
      dock = document.createElement("div");
      dock.id = "float-dock";
      dock.className = "float-dock";
      document.body.appendChild(dock);
    }
    dock.innerHTML = `
      <div class="float-item" data-channel="wechat">
        <button class="float-btn wechat" type="button" aria-label="Wechat">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 4C5.91 4 3 6.69 3 10c0 1.89.97 3.57 2.47 4.7L4.8 17.2c-.12.27.2.52.45.38l2.7-1.5c.48.1.98.16 1.5.16.3 0 .6-.02.88-.06C10.04 15.4 10 14.72 10 14c0-3.31 3.13-6 7-6 .16 0 .32 0 .47.02C16.55 5.64 13.3 4 9.5 4zm-2.25 3.25a.88.88 0 1 1 0 1.75.88.88 0 0 1 0-1.75zm4.5 0a.88.88 0 1 1 0 1.75.88.88 0 0 1 0-1.75zM17 9c-3.31 0-6 2.24-6 5s2.69 5 6 5c.4 0 .8-.04 1.17-.1l2.05 1.14c.2.11.45-.08.36-.3l-.5-1.7C21.2 17.1 22 15.64 22 14c0-2.76-2.69-5-5-5zm-1.6 3.1a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4zm3.2 0a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z"/></svg>
          <span>Wechat</span>
        </button>
        <div class="float-pop">
          <img data-src="assets/contact/wechat_large.png?v=42" alt="WeChat QR LuciLinkWorld" decoding="async">
          <p data-i18n="contact.floatWechat"></p>
        </div>
      </div>
      <div class="float-item" data-channel="whatsapp">
        <button class="float-btn whatsapp" type="button" aria-label="Whatsapp">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.33 4.94L2 22l5.39-1.41a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2zm5.76 14.07c-.24.68-1.4 1.25-1.93 1.33-.5.07-1.13.1-1.82-.11-.42-.13-.95-.31-1.64-.6-2.89-1.25-4.77-4.16-4.92-4.35-.14-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1-2.41.24-.27.64-.4.86-.4h.62c.2 0 .46-.04.72.55.27.62.91 2.13.99 2.29.08.16.13.34.03.55-.1.2-.15.34-.3.52-.14.18-.3.4-.43.54-.14.14-.29.3-.12.58.16.27.73 1.2 1.57 1.95 1.08.96 1.99 1.26 2.27 1.4.28.14.44.12.6-.07.16-.2.7-.81.88-1.09.19-.27.37-.23.62-.14.26.1 1.63.77 1.91.91.28.14.47.2.54.32.07.11.07.66-.17 1.34z"/></svg>
          <span>Whatsapp</span>
        </button>
        <div class="float-pop">
          <img data-src="assets/contact/whatsapp_large.png?v=42" alt="WhatsApp QR LuciLinkWorld" decoding="async">
          <p data-i18n="contact.floatWa"></p>
        </div>
      </div>`;
    const loadFloatImage = (item) => {
      item.querySelectorAll("img[data-src]").forEach((img) => {
        if (!img.getAttribute("src")) img.src = img.dataset.src;
      });
    };
    dock.querySelectorAll(".float-item").forEach((item) => {
      item.addEventListener("pointerenter", () => loadFloatImage(item));
      item.addEventListener("focusin", () => loadFloatImage(item));
    });
    dock.querySelectorAll(".float-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const item = btn.closest(".float-item");
        loadFloatImage(item);
        const wasOpen = item.classList.contains("open");
        dock.querySelectorAll(".float-item").forEach((el) => el.classList.remove("open"));
        if (!wasOpen) item.classList.add("open");
      });
    });
    dock.addEventListener("click", (e) => e.stopPropagation());
    document.addEventListener("click", () => {
      dock.querySelectorAll(".float-item").forEach((el) => el.classList.remove("open"));
    });
  }

  function productCard(item) {
    const name = t(`items.${item.id}.name`);
    const card = t(`items.${item.id}.card`);
    const cat = t(`cats.${item.category}`);
    return `
      <a class="card product-card" href="product.html?id=${item.id}">
        <div class="thumb"><img src="${item.images[0]}" alt="${name}" loading="lazy" decoding="async"></div>
        <div class="meta">
          <span class="chip">${cat}</span>
          <h3>${name}</h3>
          <p>${card}</p>
        </div>
      </a>`;
  }

  function renderHome() {
    const root = document.getElementById("home-products");
    if (!root) return;
    root.innerHTML = CATALOG.slice(0, 4).map(productCard).join("");
  }

  function renderCatalog() {
    const root = document.getElementById("catalog");
    if (!root) return;
    const filter = root.dataset.filter || "all";
    const list = filter === "all" ? CATALOG : CATALOG.filter((p) => p.category === filter);
    root.innerHTML = list.map(productCard).join("");
  }

  function bindFilters() {
    document.querySelectorAll(".filters button").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filters button").forEach((b) => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        const catalog = document.getElementById("catalog");
        catalog.dataset.filter = btn.dataset.filter;
        renderCatalog();
      });
    });
  }

  function renderDetail() {
    const id = new URLSearchParams(location.search).get("id");
    const item = CATALOG.find((p) => p.id === id) || CATALOG[0];
    const root = document.getElementById("product-root");
    if (!root) return;
    const name = t(`items.${item.id}.name`);
    const desc = t(`items.${item.id}.desc`);
    root.innerHTML = `
      <div class="detail-gallery">
        ${item.images.map((src, index) => `<img src="${src}" alt="${name}" data-full="${src}" loading="${index === 0 ? "eager" : "lazy"}" decoding="async">`).join("")}
      </div>
      <div>
        <span class="chip">${t(`cats.${item.category}`)}</span>
        <h1 style="margin:10px 0 12px;font-size:clamp(28px,4vw,44px)">${name}</h1>
        <p class="lede">${desc}</p>
        <dl class="specs">
          <div><dt>${t("detail.moq")}</dt><dd>${item.moq}</dd></div>
          <div><dt>${t("detail.fit")}</dt><dd>${item.fit}</dd></div>
          <div><dt>${t("detail.origin")}</dt><dd>${t("detail.originVal")}</dd></div>
        </dl>
        <p class="note">${t("detail.note")}</p>
        <div class="hero-actions" style="margin-top:22px">
          <a class="btn" href="contact.html?item=${encodeURIComponent(name)}">${t("detail.ask")}</a>
          <a class="btn line" href="products.html">${t("detail.back")}</a>
        </div>
      </div>`;
    root.querySelectorAll("[data-full]").forEach((img) => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => openLightbox(img.dataset.full));
    });
  }

  function renderSource() {
    const root = document.getElementById("source-grid");
    if (!root) return;
    root.innerHTML = SOURCE_GALLERY.map((shot) => `
      <a href="${shot.src}" data-full="${shot.src}">
        <img src="${shot.src}" alt="${t("sourceCaps." + shot.key)}" loading="lazy" decoding="async">
      </a>`).join("");
    root.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        openLightbox(a.dataset.full);
      });
    });
  }

  function openLightbox(src) {
    let box = document.getElementById("lightbox");
    if (!box) {
      box = document.createElement("div");
      box.id = "lightbox";
      box.className = "lightbox";
      box.innerHTML = "<img alt=''>";
      box.addEventListener("click", () => box.classList.remove("open"));
      document.body.appendChild(box);
    }
    box.querySelector("img").src = src;
    box.classList.add("open");
  }

  function locLabel(item) {
    return document.documentElement.lang === "en" ? item.en : item.zh;
  }

  function fillOriginSelects(keepValue) {
    const regionSel = document.getElementById("region");
    const citySel = document.getElementById("city");
    if (!regionSel || !citySel || typeof ORIGIN_REGIONS === "undefined") return;
    const prevRegion = keepValue ? regionSel.value : "";
    const prevCity = keepValue ? citySel.value : "";
    regionSel.innerHTML = `<option value="">${t("contact.fRegionPlaceholder")}</option>` +
      ORIGIN_REGIONS.map((r) => `<option value="${r.id}">${locLabel(r)}</option>`).join("");
    if (prevRegion && ORIGIN_REGIONS.some((r) => r.id === prevRegion)) {
      regionSel.value = prevRegion;
    }
    fillCitySelect(keepValue ? prevCity : "");
  }

  function fillCitySelect(keepCity) {
    const regionSel = document.getElementById("region");
    const citySel = document.getElementById("city");
    const otherWrap = document.getElementById("city-other-wrap");
    const otherInput = document.getElementById("city-other");
    if (!regionSel || !citySel) return;
    const region = ORIGIN_REGIONS.find((r) => r.id === regionSel.value);
    if (!region) {
      citySel.innerHTML = `<option value="">${t("contact.fCityPlaceholder")}</option>`;
      citySel.disabled = true;
      citySel.value = "";
      if (otherWrap) otherWrap.hidden = true;
      if (otherInput) {
        otherInput.disabled = true;
        otherInput.required = false;
        otherInput.value = "";
      }
      return;
    }
    citySel.disabled = false;
    citySel.innerHTML = `<option value="">${t("contact.fCityChoose")}</option>` +
      region.cities.map((c) => `<option value="${c.id}">${locLabel(c)}</option>`).join("");
    if (keepCity && region.cities.some((c) => c.id === keepCity)) {
      citySel.value = keepCity;
    } else if (region.id === "other") {
      citySel.value = "other";
    }
    toggleCityOther();
  }

  function toggleCityOther() {
    const citySel = document.getElementById("city");
    const otherWrap = document.getElementById("city-other-wrap");
    const otherInput = document.getElementById("city-other");
    if (!citySel || !otherWrap || !otherInput) return;
    const show = citySel.value === "other";
    otherWrap.hidden = !show;
    otherInput.disabled = !show;
    otherInput.required = show;
    if (!show) otherInput.value = "";
  }

  function originPayload() {
    const regionSel = document.getElementById("region");
    const citySel = document.getElementById("city");
    const otherInput = document.getElementById("city-other");
    const region = ORIGIN_REGIONS.find((r) => r.id === regionSel?.value);
    if (!region) return { region: "", city: "" };
    const city = region.cities.find((c) => c.id === citySel?.value);
    let cityLabel = "";
    if (city?.id === "other") {
      cityLabel = String(otherInput?.value || "").trim();
    } else if (city) {
      cityLabel = `${city.zh} / ${city.en}`;
    }
    return {
      region: `${region.zh} / ${region.en}`,
      city: cityLabel
    };
  }

  function bindForm() {
    const form = document.getElementById("enquiry");
    if (!form) return;
    const status = document.getElementById("form-status");
    const submitBtn = document.getElementById("form-submit");
    const params = new URLSearchParams(location.search);
    const preset = params.get("item");
    if (preset) {
      const itemField = form.querySelector("[name=item]");
      if (itemField) itemField.value = preset;
    }
    fillOriginSelects(true);
    form.querySelector("#region")?.addEventListener("change", () => fillCitySelect(""));
    form.querySelector("#city")?.addEventListener("change", toggleCityOther);

    function setStatus(kind, text) {
      if (!status) return;
      status.hidden = !text;
      status.className = "form-status" + (kind ? ` ${kind}` : "");
      status.textContent = text || "";
    }

    function resetEnquiry() {
      form.reset();
      fillOriginSelects(false);
      if (preset) {
        const itemField = form.querySelector("[name=item]");
        if (itemField) itemField.value = preset;
      }
      setStatus("", "");
    }

    function markSent() {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = t("contact.send");
      }
      setStatus("", "");
      const mask = document.getElementById("form-sent-mask");
      const title = document.getElementById("form-sent-title");
      const okBtn = document.getElementById("form-sent-ok");
      if (title) title.textContent = t("contact.sent");
      if (okBtn) okBtn.textContent = t("contact.sentOk");
      if (mask) {
        mask.hidden = false;
        okBtn?.focus();
      }
    }

    function closeSentBox() {
      const mask = document.getElementById("form-sent-mask");
      if (mask) mask.hidden = true;
      resetEnquiry();
      submitBtn?.focus();
    }

    document.getElementById("form-sent-ok")?.addEventListener("click", closeSentBox);
    document.getElementById("form-sent-mask")?.addEventListener("click", (ev) => {
      if (ev.target.id === "form-sent-mask") closeSentBox();
    });

    function markFail() {
      setStatus("error", t("contact.sendError"));
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = t("contact.send");
      }
    }

    function postViaIframe(payload) {
      return new Promise((resolve) => {
        const frameName = "llw-w3f";
        document.getElementById(frameName)?.remove();
        document.getElementById(frameName + "-form")?.remove();
        const frame = document.createElement("iframe");
        frame.id = frameName;
        frame.name = frameName;
        frame.title = "web3forms";
        frame.setAttribute("aria-hidden", "true");
        frame.style.cssText = "position:absolute;width:0;height:0;border:0;opacity:0";
        const post = document.createElement("form");
        post.id = frameName + "-form";
        post.method = "POST";
        post.action = WEB3FORMS_ENDPOINT;
        post.target = frameName;
        post.acceptCharset = "UTF-8";
        Object.entries(payload).forEach(([key, value]) => {
          if (value === "") return;
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = String(value);
          post.appendChild(input);
        });
        let armed = false;
        let done = false;
        const finish = () => {
          if (done) return;
          done = true;
          resolve(true);
        };
        frame.addEventListener("load", () => {
          if (!armed) return;
          finish();
        });
        document.body.appendChild(frame);
        document.body.appendChild(post);
        requestAnimationFrame(() => {
          armed = true;
          post.submit();
        });
        setTimeout(finish, 2500);
      });
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (form.botcheck?.checked) return;
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const wechat = String(data.get("wechat") || "").trim();
      const whatsapp = String(data.get("whatsapp") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const origin = originPayload();
      if (!name || !origin.region || !origin.city) {
        setStatus("error", t("contact.sendNeedFields"));
        return;
      }
      if (!email && !wechat && !whatsapp && !phone) {
        setStatus("error", t("contact.fContactHint"));
        return;
      }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus("error", t("contact.sendNeedEmail"));
        return;
      }
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = t("contact.sending");
      }
      setStatus("", "");
      const item = String(data.get("item") || "").trim();
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: "LuciLinkWorld enquiry" + (item ? ` - ${item}` : ""),
        from_name: "LuciLinkWorld website",
        name,
        region: origin.region,
        city: origin.city,
        item,
        wechat,
        whatsapp,
        phone,
        message: String(data.get("message") || "").trim()
      };
      if (email) {
        payload.email = email;
        payload.replyto = email;
      }
      if (location.protocol === "file:") {
        postViaIframe(payload).then(markSent);
        return;
      }
      fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then((res) => res.json().then((json) => ({ ok: res.ok, json }), () => ({ ok: false, json: null })))
        .then((result) => {
          if (result.json && result.json.success) {
            markSent();
            return;
          }
          markFail();
        })
        .catch(markFail);
    });
  }

  function init() {
    const page = document.body.dataset.page || "home";
    document.documentElement.lang = detectLang();
    chrome(page);
    apply();
    bindFilters();
    bindForm();
    if (page === "home") renderHome();
    if (page === "products") renderCatalog();
    if (page === "product") renderDetail();
    if (page === "source") renderSource();
  }

  return { init, t, pages };
})();

document.addEventListener("DOMContentLoaded", App.init);
