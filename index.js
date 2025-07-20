let productosGlobal = {};

fetch('productos.json')
  .then(res => res.json())
  .then(data => {
    productosGlobal = data;
  })
  .catch(err => console.error("Error al cargar los productos:", err));

const carrito = [];

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
      ${i + 1}. ${producto.nombre} - $${producto.precio}
      <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar</button>
    `;
    contenedor.appendChild(div);
  });

  document.getElementById("menuPrincipal").classList.add("oculto");
  document.getElementById("categoriaSeleccionada").classList.remove("oculto");
}

function agregarAlCarrito(producto, precio) {
  carrito.push({ producto, precio });
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
    carrito.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.producto} - $${item.precio}`;
      lista.appendChild(li);
    });
  }

  document.getElementById("menuPrincipal").classList.add("oculto");
  document.getElementById("carritoDiv").classList.remove("oculto");
}

function volverMenu() {
  document.getElementById("categoriaSeleccionada").classList.add("oculto");
  document.getElementById("carritoDiv").classList.add("oculto");
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
        location.reload();
      });
    }
  });
}
