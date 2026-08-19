/* QualyDent Gold — interações da página */
(function () {
  'use strict';

  /* ---------- dados reais das unidades (WhatsApp verificado) ---------- */
  var UNITS = {
    riodosul: {
      name: 'Rio do Sul',
      phone: '554735211777',
      label: '(47) 3521-1777'
    },
    otacilio: {
      name: 'Otacílio Costa',
      phone: '554999389545',
      label: '(49) 99938-9545'
    }
  };
  var DEFAULT_MSG = 'Olá! Vim pelo site da QualyDent Gold e gostaria de agendar uma consulta.';

  function waLink(unitKey, message) {
    var u = UNITS[unitKey];
    var text = encodeURIComponent(message || DEFAULT_MSG);
    return 'https://wa.me/' + u.phone + '?text=' + text;
  }
  window.QD_waLink = waLink; // exposto para uso inline se necessário

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- ano no rodapé ---------- */
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- header: encolhe ao rolar ---------- */
    var header = document.querySelector('.site-header');
    var onScroll = function () {
      if (window.scrollY > 40) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------- navegação mobile ---------- */
    var navToggle = document.querySelector('.nav-toggle');
    var mobileNav = document.querySelector('.mobile-nav');
    function closeMobileNav() {
      if (!mobileNav) return;
      mobileNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    if (navToggle && mobileNav) {
      navToggle.addEventListener('click', function () {
        var open = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!open));
        mobileNav.classList.toggle('is-open', !open);
        document.body.style.overflow = !open ? 'hidden' : '';
      });
      mobileNav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeMobileNav);
      });
    }

    /* ---------- revelar ao rolar ---------- */
    var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ---------- acordeão de FAQ (genérico) ---------- */
    document.querySelectorAll('.faq-mini-item').forEach(function (item) {
      var q = item.querySelector('.faq-mini-q');
      var a = item.querySelector('.faq-mini-a');
      if (!q || !a) return;
      q.addEventListener('click', function () {
        var isOpen = item.getAttribute('data-open') === 'true';
        // fecha os irmãos do mesmo grupo (acordeão exclusivo por lista)
        var list = item.parentElement;
        list.querySelectorAll('.faq-mini-item[data-open="true"]').forEach(function (other) {
          if (other !== item) {
            other.setAttribute('data-open', 'false');
            other.querySelector('.faq-mini-a').style.maxHeight = null;
            other.querySelector('.faq-mini-q').setAttribute('aria-expanded', 'false');
          }
        });
        item.setAttribute('data-open', String(!isOpen));
        q.setAttribute('aria-expanded', String(!isOpen));
        a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
      });
    });

    /* ---------- modal "escolha sua unidade" para WhatsApp ---------- */
    var overlay = document.getElementById('wa-modal');
    var optRio = document.getElementById('wa-opt-riodosul');
    var optOta = document.getElementById('wa-opt-otacilio');
    var modalTitle = document.getElementById('wa-modal-title');

    function openModal(message, title) {
      if (!overlay) return;
      optRio.href = waLink('riodosul', message);
      optOta.href = waLink('otacilio', message);
      if (modalTitle) modalTitle.textContent = title || 'Para qual unidade deseja falar?';
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function closeModal() {
      if (!overlay) return;
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-wa-open]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal(btn.getAttribute('data-wa-message'), btn.getAttribute('data-wa-title'));
      });
    });
    if (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay || e.target.closest('.modal-close')) closeModal();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
      });
    }

    /* ---------- liga automaticamente os links diretos por unidade ---------- */
    document.querySelectorAll('[data-wa-direct]').forEach(function (a) {
      var unit = a.getAttribute('data-wa-direct');
      var msg = a.getAttribute('data-wa-message');
      a.href = waLink(unit, msg);
    });

    /* ---------- roda a lista de tratamentos com scroll do mouse (desktop) ---------- */
    var igTrack = document.querySelector('.ig-track');
    if (igTrack) {
      igTrack.addEventListener('wheel', function (e) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          igTrack.scrollLeft += e.deltaY;
          e.preventDefault();
        }
      }, { passive: false });
    }
  });
})();
