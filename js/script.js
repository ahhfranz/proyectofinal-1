'use strict';

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


const homeBtn = document.getElementById('home-btn');
if (homeBtn) {
  homeBtn.addEventListener('click', function () {
    window.location.href = homeBtn.getAttribute('data-link');
  });
}

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


(async function main() {
  const contenedorProductos = document.getElementById("productos-container");
  if (contenedorProductos) {
    const productos = await cargarProductos();

    if (window.location.pathname.endsWith("remeras-h.html")) {
      const remerasHombres = productos.filter(
        p => p.categoria === "Hombres" && p.nombre.toLowerCase().includes("remera")
      );
      renderizarProductos(remerasHombres, contenedorProductos);

      contenedorProductos.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-agregar")) {
          const id = Number(e.target.dataset.id);
          const producto = remerasHombres.find(p => p.id === id);
          if (producto) agregarAlCarrito(producto);
          renderizarCarritoPanel();
        }
      });
    } else {
      renderizarProductos(productos, contenedorProductos);

      contenedorProductos.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-agregar")) {
          const id = Number(e.target.dataset.id);
          const producto = productos.find(p => p.id === id);
          if (producto) agregarAlCarrito(producto);
          renderizarCarritoPanel();
        }
      });
    }
  }

  const carritoBtn = document.getElementById("cart-btn");
  const carritoPanel = document.getElementById("carrito-panel");
  if (carritoBtn && carritoPanel) {
    carritoBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      carritoPanel.classList.toggle("visible");
      carritoPanel.classList.toggle("oculto");
      renderizarCarritoPanel();
    });

    document.addEventListener('click', (e) => {
      if (
        carritoPanel.classList.contains('visible') &&
        !carritoPanel.contains(e.target) &&
        !carritoBtn.contains(e.target)
      ) {
        carritoPanel.classList.remove('visible');
        carritoPanel.classList.add('oculto');
      }
    });

    carritoPanel.addEventListener('click', (e) => {
      if (
        e.target.id === "btn-vaciar-carrito" ||
        e.target.id === "btn-finalizar-compra" ||
        e.target.classList.contains("btn-eliminar")
      ) {
        e.stopPropagation();
      }
    });
  }

  actualizarCarritoCount();
  renderizarCarritoPanel();
})();