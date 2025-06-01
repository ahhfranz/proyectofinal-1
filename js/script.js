'use strict';

// Variables del menu

const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

if (
  mobileMenuOpenBtn.length &&
  mobileMenu.length &&
  mobileMenuCloseBtn.length &&
  overlay
) {
  for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

    // Funciones del menu

    const mobileMenuCloseFunc = function () {
      if (mobileMenu[i]) mobileMenu[i].classList.remove('active');
      overlay.classList.remove('active');
    };

    if (mobileMenuOpenBtn[i] && mobileMenu[i] && mobileMenuCloseBtn[i]) {
      mobileMenuOpenBtn[i].addEventListener('click', function () {
        mobileMenu[i].classList.add('active');
        overlay.classList.add('active');
      });

      mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
      overlay.addEventListener('click', mobileMenuCloseFunc);
    }
  }
}

// Boton de Inicio a Index.html

const homeBtn = document.getElementById('home-btn');
if (homeBtn) {
  homeBtn.addEventListener('click', function () {
    window.location.href = homeBtn.getAttribute('data-link');
  });
}

// Variables del acordeon

const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

if (accordionBtn.length && accordion.length) {
  for (let i = 0; i < accordionBtn.length; i++) {
    accordionBtn[i].addEventListener('click', function () {
      const clickedBtn = this.nextElementSibling.classList.contains('active');
      for (let i = 0; i < accordion.length; i++) {
        if (clickedBtn) break;
        if (accordion[i].classList.contains('active')) {
          accordion[i].classList.remove('active');
          accordionBtn[i].classList.remove('active');
        }
      }
      this.nextElementSibling.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
}