/* ============================================================================
   3A 娛樂城 知識庫 — 首頁渲染器
   讀取 window.SITE (data.js) → 建立整頁 DOM。
   內容不寫死在這裡：要改文字/連結/圖片/分類，請改 data.js。
   本檔負責「怎麼呈現」，data.js 負責「呈現什麼」。
   ========================================================================== */
(function () {
  'use strict';
  var S = window.SITE || {};
  var CFG = S.config || {};
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 小工具 ---- */
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function postUrl(slug) { return (CFG.postBase || '#') + encodeURIComponent(slug); }
  function catUrl(slug) { return (CFG.catBase || '#') + encodeURIComponent(slug); }
  // 圖片載入失敗 → 顯示金色漸層底 (避免破圖)
  var IMG_FALLBACK = "this.onerror=null;this.style.visibility='hidden';this.parentNode.classList.add('img-fallback');";
  function imgTag(src, alt, cls) {
    return '<img class="' + (cls || '') + '" src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy" onerror="' + IMG_FALLBACK + '" />';
  }

  /* ---- 圖示庫 ---- */
  var ICON = {
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12Z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2V5Z"/><path d="M18 3v18"/></svg>',
    headset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2.5" y="13" width="4" height="6" rx="1.5"/><rect x="17.5" y="13" width="4" height="6" rx="1.5"/><path d="M20 19a4 4 0 0 1-4 3h-2"/></svg>',
    arrow: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    line: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 5.7 2 10.2c0 4 3.6 7.4 8.5 8 .3.1.8.2.9.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1 .9.6s5.9-3.5 8-6C21.5 13.9 22 12.1 22 10.2 22 5.7 17.5 2 12 2ZM8 13H6.5a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 1 0V12h1a.5.5 0 0 1 0 1Zm2-0.5a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 1 0v3Zm4 0a.5.5 0 0 1-.4.5.5.5 0 0 1-.5-.2l-1.6-2.1v1.8a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .9-.3l1.6 2.1V9.5a.5.5 0 0 1 1 0v3Zm3 0a.5.5 0 0 1 0 1h-1.5a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5H17a.5.5 0 0 1 0 1h-1v.5h1a.5.5 0 0 1 0 1h-1v.5H17Z"/></svg>'
  };
  function icon(n) { return ICON[n] || ''; }

  function logo() {
    var b = S.brand || {};
    var a = el('a', 'logo',
      '<span class="logo-mark">3A</span>' +
      '<span><span class="logo-name">' + esc(b.name || '') + '</span>' +
      '<span class="logo-latin">' + esc(b.latin || '') + '</span></span>');
    a.href = '#home';
    a.setAttribute('aria-label', b.name || '首頁');
    return a;
  }

  /* ================= TOP BAR ================= */
  function topbar() {
    var t = S.topbar || {};
    var bar = el('div', 'topbar');
    bar.innerHTML = '<div class="wrap">' +
      '<div class="notice">' + esc(t.notice || '') + '</div>' +
      '<div class="tb-links">' +
        '<a href="' + esc(CFG.lineUrl || '#') + '" target="_blank" rel="noopener">' + icon('chat') + 'LINE：' + esc(CFG.lineId || '') + '</a>' +
        '<a href="' + esc(CFG.officialSite || '#') + '" target="_blank" rel="noopener">' + icon('globe') + '前往官網</a>' +
        '<span class="tb-lang">' + esc(t.lang || '') + '</span>' +
      '</div></div>';
    return bar;
  }

  /* ================= HEADER ================= */
  function navHref(n) { return n.href ? n.href : catUrl(n.slug); }
  function header() {
    var h = el('header', 'header');
    var wrap = el('div', 'wrap');
    wrap.appendChild(logo());

    var nav = el('nav', 'nav');
    nav.setAttribute('aria-label', '主選單');
    (S.nav || []).forEach(function (n, i) {
      var a = el('a', i === 0 ? 'is-active' : '', esc(n.label));
      a.href = navHref(n);
      if (n.slug) { a.target = '_blank'; a.rel = 'noopener'; }
      nav.appendChild(a);
    });
    wrap.appendChild(nav);

    var cta = el('div', 'header-cta');
    var line = el('a', 'btn btn-ghost btn-sm', icon('chat') + esc((S.cta && S.cta.line.label) || 'LINE'));
    line.href = (S.cta && S.cta.line.href) || '#'; line.target = '_blank'; line.rel = 'noopener';
    var prim = el('a', 'btn btn-gold btn-sm', esc((S.cta && S.cta.primary.label) || '前往官網'));
    prim.href = (S.cta && S.cta.primary.href) || '#'; prim.target = '_blank'; prim.rel = 'noopener';
    var burger = el('button', 'hamburger', icon('menu'));
    burger.setAttribute('aria-label', '開啟選單');
    burger.addEventListener('click', openMenu);
    cta.appendChild(line); cta.appendChild(prim); cta.appendChild(burger);
    wrap.appendChild(cta);

    h.appendChild(wrap);
    return h;
  }

  function mobileNav() {
    var backdrop = el('div', 'mnav-backdrop');
    backdrop.addEventListener('click', closeMenu);
    var panel = el('aside', 'mnav');
    panel.setAttribute('aria-label', '行動選單');
    var head = el('div', 'mnav-head');
    head.appendChild(logo());
    var x = el('button', 'hamburger', icon('close'));
    x.setAttribute('aria-label', '關閉選單');
    x.addEventListener('click', closeMenu);
    head.appendChild(x);
    panel.appendChild(head);
    (S.nav || []).forEach(function (n) {
      var a = el('a', '', esc(n.label)); a.href = navHref(n);
      if (n.slug) { a.target = '_blank'; a.rel = 'noopener'; }
      a.addEventListener('click', closeMenu);
      panel.appendChild(a);
    });
    var box = el('div', 'mnav-cta');
    var l = el('a', 'btn btn-ghost', esc((S.cta && S.cta.line.label) || 'LINE 客服')); l.href = (S.cta && S.cta.line.href) || '#'; l.target = '_blank';
    var r = el('a', 'btn btn-gold', esc((S.cta && S.cta.primary.label) || '前往官網')); r.href = (S.cta && S.cta.primary.href) || '#'; r.target = '_blank';
    box.appendChild(l); box.appendChild(r);
    panel.appendChild(box);
    document.body.appendChild(backdrop);
    document.body.appendChild(panel);
    window.__mnav = { panel: panel, backdrop: backdrop };
  }
  function openMenu() { if (window.__mnav) { window.__mnav.panel.classList.add('is-open'); window.__mnav.backdrop.classList.add('is-open'); } }
  function closeMenu() { if (window.__mnav) { window.__mnav.panel.classList.remove('is-open'); window.__mnav.backdrop.classList.remove('is-open'); } }

  /* ================= MARQUEE ================= */
  function marquee() {
    var items = S.marquee || [];
    if (!items.length) return el('div');
    var line = items.map(function (m) { return '<span>' + esc(m) + '</span>'; }).join('');
    var m = el('div', 'marquee');
    m.innerHTML = '<div class="wrap"><span class="mq-tag">最新公告</span>' +
      '<div class="mq-viewport"><div class="mq-track">' + line + line + '</div></div></div>';
    return m;
  }

  /* ================= HERO ================= */
  function hero() {
    var h = S.hero || {};
    var sec = el('section', 'hero'); sec.id = 'home';
    sec.appendChild(el('div', 'hero-bg'));
    var wrap = el('div', 'wrap');

    var left = el('div', 'hero-left');
    var stats = (h.stats || []).map(function (s) {
      return '<div class="stat"><div class="stat-num">' + esc(s.num) + '</div><div class="stat-label">' + esc(s.label) + '</div></div>';
    }).join('');
    left.innerHTML =
      '<span class="eyebrow">' + esc(h.eyebrow || '') + '</span>' +
      '<h1 class="hero-title">' + esc(h.title || '') +
      '<span class="hero-highlight gold-text">' + esc(h.highlight || '') + '</span></h1>' +
      '<p class="hero-sub">' + esc(h.sub || '') + '</p>' +
      '<div class="hero-actions">' +
        '<a class="btn btn-gold" href="#categories">開始探索' + icon('arrow') + '</a>' +
        '<a class="btn btn-ghost" href="' + esc((S.cta && S.cta.line.href) || '#') + '" target="_blank" rel="noopener">' + icon('chat') + 'LINE 客服</a>' +
      '</div>' +
      '<div class="hero-stats">' + stats + '</div>';
    wrap.appendChild(left);

    // 主打文章卡
    var f = h.feature || {};
    var right = el('div', 'hero-visual');
    var a = el('a', 'feature-card');
    a.href = postUrl(f.slug); a.target = '_blank'; a.rel = 'noopener';
    a.innerHTML =
      '<div class="feature-img">' + imgTag(f.cover, f.title) + '<span class="feature-badge">' + esc(f.badge || '精選') + '</span></div>' +
      '<div class="feature-body">' +
        '<h3>' + esc(f.title) + '</h3>' +
        '<p>' + esc(f.excerpt) + '</p>' +
        '<div class="feature-meta"><span>' + icon('clock') + esc(f.min || 5) + ' 分鐘</span>' +
        '<span class="read-more">閱讀全文' + icon('arrow') + '</span></div>' +
      '</div>';
    right.appendChild(a);
    wrap.appendChild(right);

    sec.appendChild(wrap);
    return sec;
  }

  /* ================= 區塊標頭 ================= */
  function head(eyebrow, title, sub, extraRight) {
    var h = el('div', 'section-head reveal');
    var inner = '<div>' + (eyebrow ? '<span class="eyebrow">' + esc(eyebrow) + '</span>' : '') +
      '<h2 class="section-title">' + esc(title) + '</h2>' +
      (sub ? '<p class="section-sub">' + esc(sub) + '</p>' : '') + '</div>';
    if (extraRight) inner += extraRight;
    h.innerHTML = inner;
    if (extraRight) h.classList.add('with-action');
    return h;
  }

  /* ================= 分類 ================= */
  function categories() {
    var c = S.categories || {};
    var sec = el('section', 'section'); sec.id = 'categories';
    var wrap = el('div', 'wrap');
    wrap.appendChild(head('CATEGORIES', c.title || '主題分類', c.subtitle));
    var grid = el('div', 'cat-grid reveal');
    (c.items || []).forEach(function (it) {
      var a = el('a', 'cat-card'); a.href = catUrl(it.slug); a.target = '_blank'; a.rel = 'noopener';
      a.innerHTML =
        '<div class="cat-img">' + imgTag(it.cover, it.label) + '</div>' +
        '<div class="cat-body"><div><h3>' + esc(it.label) + '</h3>' +
        '<p>' + esc(it.count) + ' 篇文章</p></div>' +
        '<span class="cat-arrow">' + icon('arrow') + '</span></div>';
      grid.appendChild(a);
    });
    wrap.appendChild(grid);
    sec.appendChild(wrap);
    return sec;
  }

  /* ================= 精選攻略 ================= */
  function featured() {
    var f = S.featured || {};
    var sec = el('section', 'section alt');
    var wrap = el('div', 'wrap');
    wrap.appendChild(head('EDITOR’S PICK', f.title || '精選攻略', f.subtitle));
    var grid = el('div', 'feature-grid reveal');

    var m = f.main || {};
    var main = el('a', 'feat-main'); main.href = postUrl(m.slug); main.target = '_blank'; main.rel = 'noopener';
    main.innerHTML =
      '<div class="feat-main-img">' + imgTag(m.cover, m.title) + '</div>' +
      '<div class="feat-main-body">' +
        '<span class="tag">' + esc(m.cat) + '</span>' +
        '<h3>' + esc(m.title) + '</h3>' +
        '<p>' + esc(m.excerpt) + '</p>' +
        '<div class="post-meta"><span>' + icon('clock') + esc(m.min) + ' 分鐘</span></div>' +
      '</div>';
    grid.appendChild(main);

    var list = el('div', 'feat-list');
    (f.side || []).forEach(function (p, i) {
      var a = el('a', 'feat-item'); a.href = postUrl(p.slug); a.target = '_blank'; a.rel = 'noopener';
      a.innerHTML =
        '<span class="feat-num">' + (i + 1) + '</span>' +
        '<div><span class="tag tag-sm">' + esc(p.cat) + '</span>' +
        '<h4>' + esc(p.title) + '</h4>' +
        '<span class="post-meta-sm">' + icon('clock') + esc(p.min) + ' 分鐘</span></div>';
      list.appendChild(a);
    });
    grid.appendChild(list);

    wrap.appendChild(grid);
    sec.appendChild(wrap);
    return sec;
  }

  /* ================= 最新文章 ================= */
  function latest() {
    var l = S.latest || {};
    var sec = el('section', 'section');
    var wrap = el('div', 'wrap');
    var action = '<a class="btn btn-ghost btn-sm reveal" href="' + esc(CFG.officialSite || '#') + '" target="_blank" rel="noopener">看全部文章' + icon('arrow') + '</a>';
    wrap.appendChild(head('LATEST', l.title || '最新文章', l.subtitle, action));
    var grid = el('div', 'post-grid reveal');
    (l.items || []).forEach(function (p) {
      var a = el('a', 'post-card'); a.href = postUrl(p.slug); a.target = '_blank'; a.rel = 'noopener';
      var cover = p.cover
        ? '<div class="post-img">' + imgTag(p.cover, p.title) + '</div>'
        : '<div class="post-img img-fallback"><span class="post-img-cat">' + esc(p.cat) + '</span></div>';
      a.innerHTML = cover +
        '<div class="post-body">' +
          '<span class="tag tag-sm">' + esc(p.cat) + '</span>' +
          '<h3>' + esc(p.title) + '</h3>' +
          '<div class="post-meta"><span>' + esc(p.date || '') + '</span><span>' + icon('clock') + esc(p.min) + ' 分鐘</span></div>' +
        '</div>';
      grid.appendChild(a);
    });
    wrap.appendChild(grid);
    sec.appendChild(wrap);
    return sec;
  }

  /* ================= 為什麼看本站 ================= */
  function trust() {
    var t = S.trust || {};
    var sec = el('section', 'section alt');
    var wrap = el('div', 'wrap');
    wrap.appendChild(head('WHY 3A', t.title || '為什麼參考本站', ''));
    var grid = el('div', 'trust-grid reveal');
    (t.items || []).forEach(function (it) {
      var card = el('div', 'trust-card');
      card.innerHTML = '<div class="trust-ico">' + icon(it.icon) + '</div>' +
        '<h3>' + esc(it.title) + '</h3><p>' + esc(it.desc) + '</p>';
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
    sec.appendChild(wrap);
    return sec;
  }

  /* ================= LINE 客服行動條 ================= */
  function lineCta() {
    var c = S.lineCta || {};
    var sec = el('section', 'section');
    var wrap = el('div', 'wrap');
    var b = el('div', 'band reveal');
    b.innerHTML =
      '<div class="band-text"><h2>' + esc(c.title || '') + '</h2>' +
      '<p>' + esc(c.sub || '') + '</p></div>' +
      '<div class="band-actions">' +
      '<a class="btn btn-line" href="' + esc(CFG.lineUrl || '#') + '" target="_blank" rel="noopener">' + icon('line') + '加入 LINE（' + esc(c.lineId || '') + '）</a>' +
      '<a class="btn btn-ghost" href="' + esc(CFG.officialSite || '#') + '" target="_blank" rel="noopener">前往官網</a></div>';
    wrap.appendChild(b);
    sec.appendChild(wrap);
    return sec;
  }

  /* ================= 頁尾 ================= */
  function footer() {
    var f = S.footer || {};
    var foot = el('footer', 'footer');
    var wrap = el('div', 'wrap');
    var top = el('div', 'footer-top');

    var brand = el('div', 'footer-brand');
    brand.appendChild(logo());
    brand.appendChild(el('p', '', esc((S.brand && S.brand.tagline) || '')));
    var line = el('a', 'footer-line', icon('line') + 'LINE 客服：' + esc(CFG.lineId || ''));
    line.href = CFG.lineUrl || '#'; line.target = '_blank'; line.rel = 'noopener';
    brand.appendChild(line);
    top.appendChild(brand);

    (f.columns || []).forEach(function (col) {
      var c = el('div', 'footer-col');
      c.appendChild(el('h4', '', esc(col.title)));
      (col.links || []).forEach(function (l) {
        var a = el('a', '', esc(l.label));
        a.href = l.slug ? catUrl(l.slug) : (l.href || '#');
        a.target = '_blank'; a.rel = 'noopener';
        c.appendChild(a);
      });
      top.appendChild(c);
    });
    wrap.appendChild(top);

    var legal = el('div', 'footer-legal');
    legal.innerHTML =
      '<div class="age"><span class="age-badge">18+</span><span>' + esc(f.responsible || '') + '</span></div>' +
      '<div class="copyright">' + esc(f.copyright || '') + '</div>';
    wrap.appendChild(legal);

    foot.appendChild(wrap);
    return foot;
  }

  /* ================= 掛載 ================= */
  function mount() {
    var root = document.getElementById('app');
    if (!root) return;
    [topbar, header, marquee, hero, categories, featured, latest, trust, lineCta, footer]
      .forEach(function (fn) { root.appendChild(fn()); });
    mobileNav();

    if (S.brand) document.title = S.brand.name + '知識庫｜出金・紅利・遊戲攻略與安全指南';

    // 進場動畫由 CSS 處理（hero 一次性載入淡入）。內容永遠可見，不依賴捲動事件，
    // 跨瀏覽器且不會有「內容被隱藏」的風險。
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
