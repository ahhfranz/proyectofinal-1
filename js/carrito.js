let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(producto) {
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito();
    actualizarCarritoCount();
    Swal.fire("Agregado", "Producto agregado al carrito", "success");
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    renderizarCarritoPanel();
    actualizarCarritoCount();
}

function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    renderizarCarritoPanel();
    actualizarCarritoCount();
    Swal.fire("Carrito vaciado", "", "info");
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function renderizarCarritoPanel() {
    const panel = document.getElementById("carrito-panel");
    if (!panel) return;
    panel.innerHTML = "<h2>Carrito</h2>";
    if (carrito.length === 0) {
        panel.innerHTML += "<p>El carrito está vacío.</p>";
        return;
    }
    carrito.forEach(item => {
        const div = document.createElement("div");
        div.className = "carrito-item";
        div.innerHTML =
            '<img class="carrito-item-img" src="' + item.imagen + '" alt="' + item.nombre + '" />' +
            '<span>' + item.nombre + ' x' + item.cantidad + '</span>' +
            '<span>$' + (item.precio * item.cantidad).toLocaleString() + '</span>' +
            '<button class="btn-eliminar" data-id="' + item.id + '">Eliminar</button>';
        panel.appendChild(div);
    });

    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const totalDiv = document.createElement("div");
    totalDiv.className = "carrito-total";
    totalDiv.innerHTML =
        '<strong>Total: $' + total.toLocaleString() + '</strong>' +
        '<button id="btn-vaciar-carrito">Vaciar carrito</button>' +
        '<button id="btn-finalizar-compra">Finalizar compra</button>';
    panel.appendChild(totalDiv);

    panel.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", e => {
            eliminarDelCarrito(Number(btn.dataset.id));
        });
    });
    document.getElementById("btn-vaciar-carrito").onclick = vaciarCarrito;
    document.getElementById("btn-finalizar-compra").onclick = finalizarCompra;
}

function actualizarCarritoCount() {
    const count = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const countSpan = document.getElementById("cart-count");
    const countSpanMobile = document.getElementById("cart-count-mobile");
    if (countSpan) countSpan.textContent = count;
    if (countSpanMobile) countSpanMobile.textContent = count;
}

function finalizarCompra() {
    if (carrito.length === 0) return;
    Swal.fire("¡Gracias por tu compra!", "Recibirás un email con el detalle.", "success");
    vaciarCarrito();
}