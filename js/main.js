/**
 * Çağrı Grill – Premium dark theme
 * Sticky nav, scroll reveal, reviews slider, form, smooth scroll
 */
(function () {
  'use strict';

  var header = document.getElementById('header');
  var menuToggle = document.querySelector('.menu-toggle');
  var siteNav = document.querySelector('.site-nav');
  var reviewsTrack = document.getElementById('reviewsTrack');
  var reviewDots = document.getElementById('reviewDots');
  var reserveForm = document.getElementById('reserveForm');

  // Sticky header – add .scrolled on scroll
  if (header) {
    function onScroll() {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu
  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', function () {
      siteNav.classList.toggle('is-open');
      menuToggle.classList.toggle('is-open');
    });
    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        siteNav.classList.remove('is-open');
        menuToggle.classList.remove('is-open');
      });
    });
  }

  // Scroll reveal – Intersection Observer
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting)
          entry.target.classList.add('visible');
      });
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.05 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // Reviews slider
  if (reviewsTrack && reviewDots) {
    var cards = reviewsTrack.querySelectorAll('.review-card');
    var count = cards.length;
    var current = 0;
    var cardWidth = 0;
    var gap = 24;

    function updateSlider() {
      if (!cards.length) return;
      cardWidth = cards[0].offsetWidth + gap;
      reviewsTrack.style.transform = 'translateX(-' + current * cardWidth + 'px)';
      reviewDots.querySelectorAll('button').forEach(function (btn, i) {
        btn.classList.toggle('active', i === current);
      });
    }

    for (var i = 0; i < count; i++) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Yorum ' + (i + 1));
      (function (idx) {
        btn.addEventListener('click', function () {
          current = idx;
          updateSlider();
        });
      })(i);
      reviewDots.appendChild(btn);
    }
    reviewDots.querySelectorAll('button')[0].classList.add('active');

    window.addEventListener('resize', updateSlider);
    updateSlider();

    setInterval(function () {
      current = (current + 1) % count;
      updateSlider();
    }, 5000);
  }

  // Reserve form – prevent default, show message (optional: send to WhatsApp)
  if (reserveForm) {
    reserveForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var phone = document.getElementById('rphone') && document.getElementById('rphone').value;
      var name = document.getElementById('rname') && document.getElementById('rname').value;
      var date = document.getElementById('rdate') && document.getElementById('rdate').value;
      var time = document.getElementById('rtime') && document.getElementById('rtime').value;
      var note = document.getElementById('rnote') && document.getElementById('rnote').value;
      var msg = 'Merhaba, rezervasyon yapmak istiyorum. Ad: ' + (name || '') + ', Tarih: ' + (date || '') + ', Saat: ' + (time || '') + (note ? ', Not: ' + note : '');
      var wa = 'https://wa.me/905XXXXXXXXX?text=' + encodeURIComponent(msg);
      window.open(wa, '_blank');
    });
  }

  // Smooth scroll for anchor links (fallback if CSS scroll-behavior not enough)
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    var id = a.getAttribute('href');
    if (id === '#') return;
    var target = document.querySelector(id);
    if (target) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  });
})();
