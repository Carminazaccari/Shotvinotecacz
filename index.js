const combos = ["Smirnoff + 2 speed", "Vino Balbo + Pritty 3lts", "Fernet Branca + 2 cocas 2lts", "Campari + citric de naranja"];
const preciosCombos = [18000, 9000, 16000, 12000];

const vino = ["Malbec", "Merlot", "Syrah", "Balbo"];
const preciosVino = [5500, 6000, 7000, 4500];

const cerveza = ["Quilmes", "Stella Artois", "Andes Roja", "Imperial"];
const preciosCerveza = [3000, 5000, 4000, 3500];

const vodka = ["Smirnoff", "Absolut", "Finlandia", "Belvedere"];
const preciosVodka = [9000, 15000, 7000, 9000];

const aperitivos = ["Campari", "Aperol", "Fernet Branca", "Gancia"];
const preciosAperitivos = [8000, 7000, 14000, 6000];

const carrito = [];

function validarEdad() {
    const edad = parseInt(document.getElementById("edadInput").value);
    if (!isNaN(edad)) {
        if (edad >= 18) {
            document.getElementById("formEdad").classList.add("oculto");
            document.getElementById("menuPrincipal").classList.remove("oculto");
        } else {
            alert("Lo siento, sos menor de edad y no podés ingresar.");
        }
    } else {
        alert("Por favor ingresá una edad válida.");
    }
}

function mostrarCategoria(categoria) {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";
    let productos = [], precios = [];

    switch (categoria) {
        case "combos":
            productos = combos;
            precios = preciosCombos;
            break;
        case "vino":
            productos = vino;
            precios = preciosVino;
            break;
        case "cerveza":
            productos = cerveza;
            precios = preciosCerveza;
            break;
        case "vodka":
            productos = vodka;
            precios = preciosVodka;
            break;
        case "aperitivos":
            productos = aperitivos;
            precios = preciosAperitivos;
            break;
    }

    document.getElementById("tituloCategoria").innerText = `Elige un producto de ${categoria}`;
    productos.forEach((producto, i) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `${i + 1}. ${producto} - $${precios[i]} <button onclick="agregarAlCarrito('${producto}', ${precios[i]})">Agregar</button>`;
        contenedor.appendChild(div);
    });

    document.getElementById("menuPrincipal").classList.add("oculto");
    document.getElementById("categoriaSeleccionada").classList.remove("oculto");
}

function agregarAlCarrito(producto, precio) {
    carrito.push({ producto, precio });
    alert(`✅ Agregado al carrito: ${producto} - Precio: $${precio}`);
}

function volverMenu() {
    document.getElementById("categoriaSeleccionada").classList.add("oculto");
    document.getElementById("carritoDiv").classList.add("oculto");
    document.getElementById("menuPrincipal").classList.remove("oculto");
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

function salir() {
    alert("¡Gracias por tu compra!");
    location.reload();
}

