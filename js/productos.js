async function cargarProductos() {
    try {
        const ruta = window.location.pathname.includes('/pages/') ? '../db/productos.json' : 'db/productos.json';
        const respuesta = await fetch(ruta);
        const productos = await respuesta.json();
        return productos;
    } catch (error) {
        Swal.fire("Error", "No se pudieron cargar los productos", "error");
        return [];
    }
}

function renderizarProductos(productos, contenedor) {
    contenedor.innerHTML = "";
    for (const producto of productos) {
        const div = document.createElement("div");
        div.className = "producto";
        const precio = producto.precio;
        const precioTransferencia = Math.round(precio * 0.8);
        const cuotas = 6;
        const valorCuota = Math.round(precio / cuotas);

        div.innerHTML =
            '<img src="' + producto.imagen + '" alt="' + producto.nombre + '" />' +
            '<h3 class="producto-nombre">' + producto.nombre + '</h3>' +
            '<p class="producto-precio" style="font-size:2rem;font-weight:700;margin:10px 0 5px 0;">$' + precio.toLocaleString() + '</p>' +
            '<p class="producto-transferencia" style="font-weight:700;margin:0 0 5px 0;">$' + precioTransferencia.toLocaleString() + ' con Transferencia o Efectivo</p>' +
            '<p class="producto-cuotas" style="font-size:1rem;margin:0 0 10px 0;"><b>' + cuotas + ' cuotas</b> sin interés de <b>$' + valorCuota.toLocaleString() + '</b></p>' +
            '<button class="btn-agregar" data-id="' + producto.id + '">Agregar al carrito</button>';
        contenedor.appendChild(div);
    }
}