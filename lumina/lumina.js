/* ============================================================================
   Lumina 首頁 — 前端互動 (原 Claude Design 執行階段的純 JS 重寫版)
   來源設計：claude.ai 設計專案「Wix 網站重構計畫 / Lumina 首頁.dc.html」。
   這裡把設計畫布用的 React runtime 改寫成無依賴的原生 JS，方便日後用 AI 修改。
   涵蓋：hover 樣式、響應式導覽、Hero 輪播、下拉選單、行動選單、FAQ、捲動揭示、客服彈窗。
   ========================================================================== */
(function () {
  'use strict';
  var root = document.getElementById('lumina-root') || document.body;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var HERO_INTERVAL = 5000; // ms（原設計預設值）

  /* ---- style-hover：滑鼠移入套用、移出還原（等同設計畫布行為）---------- */
  function initHover() {
    root.querySelectorAll('[style-hover]').forEach(function (el) {
      var hover = el.getAttribute('style-hover') || '';
      var decls = hover.split(';').map(function (s) { return s.trim(); }).filter(Boolean)
        .map(function (d) { var i = d.indexOf(':'); return [d.slice(0, i).trim(), d.slice(i + 1).trim()]; });
      el.addEventListener('mouseenter', function () {
        el.__base = el.style.cssText;
        decls.forEach(function (d) { el.style.setProperty(d[0], d[1]); });
      });
      el.addEventListener('mouseleave', function () {
        if (el.__base != null) el.style.cssText = el.__base;
      });
    });
  }

  /* ---- 響應式：<900px 切換桌機/行動導覽 -------------------------------- */
  function updateSize() {
    var mobile = window.innerWidth < 900;
    root.querySelectorAll('[data-desktop-nav]').forEach(function (e) {
      e.style.display = mobile ? 'none' : (e.getAttribute('data-desktop-nav') || 'flex');
    });
    root.querySelectorAll('[data-mobile-toggle]').forEach(function (e) {
      e.style.display = mobile ? 'flex' : 'none';
    });
    if (!mobile) {
      var mm = root.querySelector('[data-mobile-menu]');
      if (mm) mm.style.display = 'none';
    }
  }

  /* ---- Hero 輪播 -------------------------------------------------------- */
  var current = 0, timer = null;
  function track() { return root.querySelector('[data-carousel-track]'); }
  function goToSlide(i) {
    var t = track(); if (!t) return;
    var n = t.children.length;
    current = ((i % n) + n) % n;
    t.style.transform = 'translateX(-' + (current * 100) + '%)';
    root.querySelectorAll('[data-dot]').forEach(function (d, di) {
      var on = di === current;
      d.style.width = on ? '26px' : '9px';
      d.style.background = on ? '#FFFFFF' : 'rgba(255,255,255,.45)';
    });
  }
  function startCarousel() {
    if (reduce) return;                 // 尊重使用者「減少動態」偏好
    clearInterval(timer);
    timer = setInterval(function () { goToSlide(current + 1); }, HERO_INTERVAL);
  }

  /* ---- 捲動揭示（以捲動位置判斷，任何速度/直接跳到底皆不漏內容）------- */
  function setupReveal() {
    var els = [].slice.call(root.querySelectorAll('[data-reveal]'));
    if (reduce) return;                 // 減少動態：全部保持可見
    els.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(26px)';
      el.style.transition = 'opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1)';
    });
    function show(el) {
      el.__shown = true;
      el.style.transitionDelay = (el.getAttribute('data-reveal-delay') || 0) + 'ms';
      el.style.opacity = '1';
      el.style.transform = 'none';
    }
    var ticking = false;
    function check() {
      ticking = false;
      var vh = window.innerHeight;
      els.forEach(function (el) {
        if (!el.__shown && el.getBoundingClientRect().top < vh - 20) show(el);
      });
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(check); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    check();
    // 安全網：載入後短暫輪詢，確保不因事件遺漏而永久隱藏
    var n = 0, iv = setInterval(function () { check(); if (++n > 6) clearInterval(iv); }, 250);
  }

  /* ---- 事件委派：輪播箭頭/圓點、行動選單、FAQ、客服 --------------------- */
  function wireActions() {
    root.addEventListener('click', function (ev) {
      var el = ev.target.closest('[data-act]');
      if (!el || !root.contains(el)) return;
      var act = el.getAttribute('data-act');
      if (act === 'prev') { goToSlide(current - 1); startCarousel(); }
      else if (act === 'next') { goToSlide(current + 1); startCarousel(); }
      else if (act === 'dot') { goToSlide(parseInt(el.getAttribute('data-i'), 10) || 0); startCarousel(); }
      else if (act === 'mtoggle') {
        var mm = root.querySelector('[data-mobile-menu]');
        if (mm) mm.style.display = (mm.style.display && mm.style.display !== 'none') ? 'none' : 'block';
      }
      else if (act === 'faq') {
        var item = el.closest('[data-faq]'); if (!item) return;
        var ans = item.querySelector('[data-faq-ans]'), ic = item.querySelector('[data-faq-ic]');
        var open = ans.style.maxHeight && ans.style.maxHeight !== '0px';
        ans.style.maxHeight = open ? '0px' : (ans.scrollHeight + 'px');
        ans.style.opacity = open ? '0' : '1';
        if (ic) ic.style.transform = open ? 'rotate(0deg)' : 'rotate(45deg)';
      }
      else if (act === 'support') {
        var p = root.querySelector('[data-support-panel]');
        if (p) p.style.display = (p.style.display && p.style.display !== 'none') ? 'none' : 'block';
      }
    });
  }

  /* ---- 下拉選單：容器 hover 顯示 --------------------------------------- */
  function wireDropdowns() {
    root.querySelectorAll('[data-dropwrap]').forEach(function (wrap) {
      var d = wrap.querySelector('[data-dropdown]');
      if (!d) return;
      wrap.addEventListener('mouseenter', function () {
        d.style.opacity = '1'; d.style.visibility = 'visible'; d.style.transform = 'translate(-50%,0)';
      });
      wrap.addEventListener('mouseleave', function () {
        d.style.opacity = '0'; d.style.visibility = 'hidden'; d.style.transform = 'translate(-50%,8px)';
      });
    });
  }

  /* ---- 啟動 ------------------------------------------------------------ */
  function mount() {
    initHover();
    wireDropdowns();
    wireActions();
    window.addEventListener('resize', updateSize, { passive: true });
    updateSize();
    setupReveal();
    goToSlide(0);
    startCarousel();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
