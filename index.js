let productosGlobal = {};

fetch('productos.json')
  .then(res => res.json())
  .then(data => {
    productosGlobal = data;
  })
  .catch(err => console.error("Error al cargar los productos:", err));

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function validarEdad() {
  const edad = parseInt(document.getElementById("edadInput").value);
  if (!isNaN(edad)) {
    if (edad >= 18) {
      document.getElementById("formEdad").classList.add("oculto");
      document.getElementById("menuPrincipal").classList.remove("oculto");
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Acceso denegado',
        text: 'Lo siento, sos menor de edad y no podés ingresar.'
      });
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Edad no válida',
      text: 'Por favor ingresá una edad válida.'
    });
  }
}

function mostrarCategoria(categoria) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  const productos = productosGlobal[categoria];

  if (!productos || productos.length === 0) {
    contenedor.innerHTML = "<p>No hay productos disponibles en esta categoría.</p>";
    return;
  }

  document.getElementById("tituloCategoria").innerText = `Elige un producto de ${categoria}`;

  productos.forEach((producto, i) => {
    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
      <span>${i + 1}. ${producto.nombre} - $${producto.precio}</span>
      <button class="btnAgregar" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Agregar</button>
    `;

    contenedor.appendChild(div);
  });

  
  const botonesAgregar = document.querySelectorAll(".btnAgregar");
  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", (e) => {
      const nombre = e.target.getAttribute("data-nombre");
      const precio = parseFloat(e.target.getAttribute("data-precio"));
      agregarAlCarrito(nombre, precio);
    });
  });

  document.getElementById("menuPrincipal").classList.add("oculto");
  document.getElementById("categoriaSeleccionada").classList.remove("oculto");
}

function agregarAlCarrito(producto, precio) {
  carrito.push({ producto, precio });
  actualizarStorage();
  Swal.fire({
    icon: 'success',
    title: 'Producto agregado',
    text: `${producto} - Precio: $${precio}`
  });
}

function verCarrito() {
  const lista = document.getElementById("carritoLista");
  lista.innerHTML = "";

  if (carrito.length === 0) {
    lista.innerHTML = "<li>Tu carrito está vacío.</li>";
  } else {
    carrito.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.producto} - $${item.precio}
        <button class="eliminarBtn" data-index="${index}">Eliminar</button>
      `;
      lista.appendChild(li);
    });

    
    const viejoBtn = document.getElementById("btnVaciarCarrito");
    if (viejoBtn) viejoBtn.remove();

    
    const contenedorCarrito = document.getElementById("carritoDiv");
    const btnVaciar = document.createElement("button");
    btnVaciar.id = "btnVaciarCarrito";
    btnVaciar.textContent = "Vaciar carrito";
    btnVaciar.addEventListener("click", vaciarCarrito);
    contenedorCarrito.appendChild(btnVaciar);

    
    const botonesEliminar = document.querySelectorAll(".eliminarBtn");
    botonesEliminar.forEach(boton => {
      boton.addEventListener("click", () => {
        const index = parseInt(boton.getAttribute("data-index"));
        eliminarProducto(index);
      });
    });
  }

  document.getElementById("menuPrincipal").classList.add("oculto");
  document.getElementById("carritoDiv").classList.remove("oculto");
}

function volverMenu() {
  document.getElementById("categoriaSeleccionada").classList.add("oculto");
  document.getElementById("carritoDiv").classList.add("oculto");

  
  const viejoBtn = document.getElementById("btnVaciarCarrito");
  if (viejoBtn) viejoBtn.remove();

  document.getElementById("menuPrincipal").classList.remove("oculto");
}

function salir() {
  Swal.fire({
    icon: 'success',
    title: '¡Gracias por tu compra!',
    showConfirmButton: false,
    timer: 2000
  }).then(() => {
    location.reload();
  });
}

function confirmarCompra() {
  if (carrito.length === 0) {
    Swal.fire({
      icon: 'info',
      title: 'Carrito vacío',
      text: 'Agregá productos antes de finalizar la compra.'
    });
    return;
  }

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  const resumen = carrito.map(item => `• ${item.producto} - $${item.precio}`).join('<br>');

  Swal.fire({
    title: '¿Confirmar compra?',
    html: `${resumen}<br><br><b>Total: $${total}</b>`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, comprar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: 'success',
        title: '¡Compra realizada!',
        text: 'Gracias por tu compra.',
        showConfirmButton: false,
        timer: 2500
      }).then(() => {
        carrito.length = 0;
        actualizarStorage();
        location.reload();
      });
    }
  });
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarStorage();
  verCarrito();
}

function vaciarCarrito() {
  Swal.fire({
    title: '¿Vaciar carrito?',
    text: "Se eliminarán todos los productos.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, vaciar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      carrito.length = 0;
      actualizarStorage();
      verCarrito();
      Swal.fire('Carrito vaciado', '', 'success');
    }
  });
}

function actualizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

document.addEventListener("DOMContentLoaded", () => {
 
  document.getElementById("btnValidarEdad").addEventListener("click", validarEdad);
  document.getElementById("btnCombo").addEventListener("click", () => mostrarCategoria('combos'));
  document.getElementById("btnCerveza").addEventListener("click", () => mostrarCategoria('cerveza'));
  document.getElementById("btnVino").addEventListener("click", () => mostrarCategoria('vino'));
  document.getElementById("btnVodka").addEventListener("click", () => mostrarCategoria('vodka'));
  document.getElementById("btnAperitivos").addEventListener("click", () => mostrarCategoria('aperitivos'));
  document.getElementById("btnVerCarrito").addEventListener("click", verCarrito);
  document.getElementById("btnSalir").addEventListener("click", salir);
  document.getElementById("btnVolverDesdeCategoria").addEventListener("click", volverMenu);
  document.getElementById("btnVolverDesdeCarrito").addEventListener("click", volverMenu);
  document.getElementById("btnConfirmarCompra").addEventListener("click", confirmarCompra);
});
