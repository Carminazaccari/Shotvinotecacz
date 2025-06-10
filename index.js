const edad = prompt ("¿Cuantos años tenes?")
const edadNumerico = parseInt (edad)
console.log(edadNumerico)
let edadValida = !isNaN(edadNumerico);


       // Si es mayor mostrar el menu //
 if (edadValida) {
    if (edadNumerico >= 18) {
        console.log("Sos mayor de edad, podés ingresar a comprar");

        function mostrarMenu() {
            const opcionMenu = prompt(
                `                    BIENVENIDOS A SHOT
                \n1 - Combos para tu previa.
                \n2 - Cerveza.
                \n3 - Vino.
                \n4 - Vodka.
                \n5 - Aperitivos.`
            );
            return opcionMenu;
        }
        
        let salir = false;

        while (!salir) {
        const opcion = mostrarMenu();

        switch (opcion) {
            case "1":
                const Combos = mostrarSubmenuCombos();
                switch (Combos) {  
                    case "1":
                        console.log("Vodka Smirnoff + 2 speed - $12000");
                        break;
                    case "2":
                        console.log("Vino + Pritty 3l - $14000");
                        break;
                    case "3":
                        console.log("Fernet 700ml + 2 cocas 2l - $110000");
                        break;
                    case "4":
                        console.log("sick pack de andes  - $150000");
                        break;
                    case "6":
                        console.log("Volver al menu principal");
                         salir = true;
                         break;
                    default:
                        console.log("Opción no válida en el submenú de combos");
                     }
                     break;
                
            case "2":
                const cerveza = mostrarSubmenuCerveza();
                switch (cerveza) {
                    case "1":
                        console.log("Quilmes 1l - $1200");
                        break;
                    case "2":
                        console.log("Andes 1,5l - $1400");
                        break;
                    case "3":
                        console.log("Brahma 1l - $1100");
                        break;
                    case "4":
                        console.log("Corona 500ml - $1500");
                        break;
                    case "5":
                        console.log("Volver al menu principal");
                        break;
                    default:
                        console.log("Opción no válida en el submenú de cervezas");
                }
                break;
            case "3":
                const Vino = mostrarSubmenuVino();
                switch (Vino) {  
                    case "1":
                        console.log("Chardonai - $1200");
                        break;
                    case "2":
                        console.log("Merlot - $1400");
                        break;
                    case "3":
                        console.log("Malbec - $1100");
                        break;
                    case "4":
                        console.log("Savinoblanc - $1500");
                        break;
                    case "5":
                        console.log("Volver al menu principal");
                        break;
                    default:
                        console.log("Opción no válida en el submenú de Vinos");
                }
                break;
            case "4":
                const Vodka = mostrarSubmenuVodka();
                switch (Vodka) {  
                    case "1":
                        console.log("Smirnoff - $1200");
                        break;
                    case "2":
                        console.log("Sernova - $1400");
                        break;
                    case "3":
                        console.log("Absolut - $1100");
                        break;
                    case "4":
                        console.log("Skyy - $1500");
                        break;
                    case "5":
                        console.log("Volver al menu principal");
                        break;
                    default:
                        console.log("Opción no válida en el submenú de Vodkas");
                }
                break;
            case "5":
                const Aperitivos = mostrarSubmenuAperitivos();
                switch (Aperitivos) {  
                    case "1":
                        console.log("Campari - $1200");
                        break;
                    case "2":
                        console.log("Vermu - $1400");
                        break;
                    case "3":
                        console.log("Aperol - $1100");
                        break;
                    case "4":
                        console.log("Gancia - $1500");
                        break;
                    case "5":
                        console.log("Volver al menu principal");
                        break;
                    default:
                        console.log("Opción no válida en el submenú de Aperitivos");
                }
                break;
            default:
                console.log("Opción no válida en el menú principal");
        }
 }
    } else {
        console.log("La venta está prohibida a menores de 18 años");
    }
} else {
    console.log("Por favor, ingresá tu edad para continuar.");
}






// FUNCIONES PARA LOS COMBOS //
 function mostrarSubmenuCombos(){
    const eleccionCombos = prompt(
    `                 COMBOS DISPONIBLES:
      \n1 - Vodka Smirnoff + 2 speed - $12000
      \n2 - Vino + Pritty 3l - $14000
      \n3 - Fernet 700ml + 2 cocas 2l - $110000
      \n4 - sick pack de andes  - $150000
      \n5 - Volver`
      );
      return eleccionCombos;


 }


 // FUNCIONES PARA LA CERVEZA//
function mostrarSubmenuCerveza() {
    const eleccionCerveza = prompt(
      `                 CERVEZAS DISPONIBLES:
      \n1 - Quilmes 1l - $1200
      \n2 - Andes 1,5l - $1400
      \n3 - Brahma 1l - $1100
      \n4 - Corona 500ml - $1500
      \n5 - Volver`
            );
            return eleccionCerveza;
        }

 // FUNCIONES PARA VINOS//
function mostrarSubmenuVino() {
    const eleccionVino = prompt(
      `                 VINOS DISPONIBLES:
      \n1 - Chardonai - $1200
      \n2 - Merlot - $1400
      \n3 - Malbec - $1100
      \n4 - Savinoblanc - $1500
      \n5 - Volver`
            );
            return eleccionVino;
        }       

// FUNCIONES PARA VODKAS//
function mostrarSubmenuVodka() {
    const eleccionVodka = prompt(
      `                 VODKAS DISPONIBLES:
      \n1 - Smirnoff - $1200
      \n2 - Sernova - $1400
      \n3 - Absolut - $1100
      \n4 - Skyy - $1500
      \n5 - Volver`
            );
            return eleccionVodka;
        }       

// FUNCIONES PARA APERITIVOS//
function mostrarSubmenuAperitivos() {
    const eleccionAperitivos = prompt(
      `                 Aperitivos DISPONIBLES:
      \n1 - Campari - $1200
      \n2 - Vermu - $1400
      \n3 - Aperol - $1100
      \n4 - Gancia - $1500
      \n5 - Volver`
            );
            return eleccionAperitivos;
        }       
