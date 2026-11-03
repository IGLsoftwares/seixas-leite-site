/* Seixas & Leite · interações do site */
(() => {
  const WHATSAPP = "5592993260101";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const openWhatsApp = (text) =>
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank", "noopener");

  /* ---------- Espaços de imagem vazios ---------- */
  // Enquanto o cliente não envia as fotos, o espaço mostra um fundo da marca + legenda.
  $$(".slot").forEach((slot) => {
    const img = $("img", slot);
    const empty = () => slot.classList.add("is-empty");
    if (!img) return empty();
    if (img.complete && !img.naturalWidth) empty();
    img.addEventListener("error", empty);
    img.addEventListener("load", () => slot.classList.remove("is-empty"));
  });

  /* ---------- Header ---------- */
  const header = $(".header");
  const toTop = $(".to-top");
  const onScroll = () => {
    const y = scrollY;
    header.classList.toggle("is-scrolled", y > 40);

    toTop.classList.toggle("is-visible", y > innerHeight * 0.9);
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  const burger = $(".burger");
  const menu = $("#menu-mobile");
  const setMenu = (open) => {
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.setAttribute("aria-hidden", !open);
  };
  burger.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
  matchMedia("(min-width: 1101px)").addEventListener("change", (e) => e.matches && setMenu(false));

  /* ---------- Link ativo no menu ---------- */
  const navLinks = $$(".nav__link");
  const sectionObs = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        navLinks.forEach((l) => l.classList.toggle("is-current", l.hash === `#${en.target.id}`));
      }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  navLinks.forEach((l) => {
    const sec = $(l.hash);
    if (sec) sectionObs.observe(sec);
  });
  // Seções sem link no menu limpam o destaque
  $$("#inicio, #checklist, #depoimentos, #faq").forEach((s) =>
    new IntersectionObserver(
      ([en]) => en.isIntersecting && navLinks.forEach((l) => l.classList.remove("is-current")),
      { rootMargin: "-45% 0px -50% 0px" }
    ).observe(s)
  );

  /* ---------- Hero: entrada animada do banner ---------- */
  // O site abre direto; o texto do banner entra logo no primeiro quadro.
  const heroSlide = $(".hero .slide");
  if (heroSlide && !reduceMotion) {
    heroSlide.classList.remove("is-active");
    requestAnimationFrame(() => requestAnimationFrame(() => heroSlide.classList.add("is-active")));
  }

  /* ---------- Abas de serviços ---------- */
  $$("[data-tabs]").forEach((wrap) => {
    const tabs = $$(".tab", wrap);
    const ink = $(".tabs__ink", wrap);
    const moveInk = () => {
      const t = $(".tab.is-active", wrap);
      ink.style.width = `${t.offsetWidth}px`;
      ink.style.transform = `translateX(${t.offsetLeft}px)`;
    };
    const select = (tab) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on);
        t.tabIndex = on ? 0 : -1;
        $(`#${t.getAttribute("aria-controls")}`).hidden = !on;
      });
      tab.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
      moveInk();
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(t));
      t.addEventListener("keydown", (e) => {
        const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (!k) return;
        const next = tabs[(i + k + tabs.length) % tabs.length];
        next.focus();
        select(next);
      });
    });
    addEventListener("resize", moveInk);
    document.fonts?.ready.then(moveInk);
    moveInk();
  });

  /* ---------- Checklist "é comum, mas não é normal" ---------- */
  const checklist = $("[data-checklist]");
  if (checklist) {
    const boxes = $$("input", checklist);
    const btn = $("button", checklist);
    const bar = $(".meter__bar span");
    const count = $("[data-count]");
    const update = () => {
      const n = boxes.filter((b) => b.checked).length;
      count.textContent = n;
      bar.style.setProperty("--p", (n / boxes.length) * 100);
      btn.disabled = n === 0;
    };
    checklist.addEventListener("change", update);
    checklist.addEventListener("submit", (e) => {
      e.preventDefault();
      const items = boxes.filter((b) => b.checked).map((b) => `• ${b.value}`);
      openWhatsApp(`Olá! Fiz o teste no site da Seixas & Leite e me identifiquei com:\n${items.join("\n")}\n\nGostaria de uma orientação.`);
    });
    update();
  }

  /* ---------- Especialistas: ver formação ---------- */
  $$(".person").forEach((p) => {
    const btn = $(".person__toggle", p);
    btn.addEventListener("click", () => {
      const open = p.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open);
      btn.firstChild.textContent = open ? "Fechar " : "Ver formação ";
    });
  });

  /* ---------- Depoimentos: carrossel ---------- */
  $$("[data-carousel]").forEach((car) => {
    const track = $(".carousel__track", car);
    const cards = $$(".quote-card", track);
    const dotsWrap = $(".carousel__dots", car);
    let index = 0;
    let auto;
    const perView = () => (innerWidth <= 640 ? 1 : innerWidth <= 980 ? 2 : 3);
    const maxIndex = () => Math.max(0, cards.length - perView());

    const build = () => {
      dotsWrap.innerHTML = "";
      for (let i = 0; i <= maxIndex(); i++) {
        const b = document.createElement("button");
        b.setAttribute("aria-label", `Ir para o depoimento ${i + 1}`);
        b.addEventListener("click", () => go(i));
        dotsWrap.append(b);
      }
      go(Math.min(index, maxIndex()));
    };
    const go = (i) => {
      const max = maxIndex();
      index = i > max ? 0 : i < 0 ? max : i;
      track.style.transform = `translateX(${-cards[index].offsetLeft}px)`;
      $$("button", dotsWrap).forEach((d, n) => d.classList.toggle("is-active", n === index));
      clearInterval(auto);
      if (!reduceMotion) auto = setInterval(() => go(index + 1), 6000);
    };
    $(".arrow--next", car).addEventListener("click", () => go(index + 1));
    $(".arrow--prev", car).addEventListener("click", () => go(index - 1));
    car.addEventListener("mouseenter", () => clearInterval(auto));
    car.addEventListener("mouseleave", () => go(index));
    swipe(track, (dir) => go(index + dir));
    let rt;
    addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(build, 150); });
    build();
  });

  /* ---------- Revelar ao rolar ---------- */
  const revealObs = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-visible");
        revealObs.unobserve(en.target);
      }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal").forEach((el) => revealObs.observe(el));

  /* ---------- Parallax do banner das sócias ---------- */
  const duo = $(".duo");
  const duoImg = $(".duo__media", duo);
  if (duo && !reduceMotion) {
    let ticking = false;
    const parallax = () => {
      const r = duo.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) {
        const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        duoImg.style.transform = `translateY(${p * -60}px)`;
      }
      ticking = false;
    };
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(parallax); } }, { passive: true });
    parallax();
  }

  /* ---------- Formulário → WhatsApp ---------- */
  const form = $("[data-contact]");
  if (form) {
    const tel = $("#f-tel", form);
    // máscara simples (92) 99999-9999
    tel.addEventListener("input", () => {
      const d = tel.value.replace(/\D/g, "").slice(0, 11);
      tel.value = d.length > 6 ? `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`
        : d.length > 2 ? `(${d.slice(0, 2)}) ${d.slice(2)}` : d;
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = $(".form__msg", form);
      let ok = true;
      $$("[required]", form).forEach((f) => {
        const valid = f.type === "checkbox" ? f.checked : f.value.trim() !== "" && (f !== tel || tel.value.replace(/\D/g, "").length >= 10);
        f.closest(".field")?.classList.toggle("is-invalid", !valid);
        if (!valid) ok = false;
      });
      if (!ok) {
        msg.textContent = "Preencha nome, telefone, assunto e aceite o contato para continuar.";
        return;
      }
      const data = new FormData(form);
      openWhatsApp(
        `Olá! Meu nome é ${data.get("nome")}.\nAssunto: ${data.get("area")}\nTelefone: ${data.get("telefone")}` +
          (data.get("mensagem").trim() ? `\n\n${data.get("mensagem").trim()}` : "")
      );
      msg.textContent = "Abrimos o WhatsApp com sua mensagem. É só enviar!";
      form.reset();
    });
    $$("input, select", form).forEach((f) => f.addEventListener("input", () => f.closest(".field")?.classList.remove("is-invalid")));
  }

  /* ---------- Ano no rodapé ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Gesto de arrastar (celular) ---------- */
  function swipe(el, cb) {
    let x0 = null, y0 = null;
    el.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    el.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      const dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) cb(dx < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });
  }
})();
