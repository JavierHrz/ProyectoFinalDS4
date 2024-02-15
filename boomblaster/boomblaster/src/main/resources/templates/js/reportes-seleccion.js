document.addEventListener("DOMContentLoaded", function () {
  mostrarNombreUsuario();  
  // Obtener los parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const productoSeleccionado = obtenerParametrosProducto(urlParams);
  ocultarParametrosDeURL();
  // Mostrar la información en la página
  mostrarInformacionProducto(productoSeleccionado);

  fetch(url + "/info/" + cod_fuego)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error de red: ${response.status}`);
    }
    return response.json();
  })
  .then((dataComentarios) => {
    data = dataComentarios;
    console.log(data);
    mostrarData(data);
  })
  .catch((error) => {
    console.error("Error al obtener datos de comentarios:", error);
  });
}); //FIN DOMContentLoaded

function obtenerParametrosProducto(urlParams) {
  return {
    id: urlParams.get("id"),
    nombre: urlParams.get("nombre"),
    precio: urlParams.get("precio"),
    descripcion: urlParams.get("descripcion"),
    mediaCalificacion: urlParams.get("mediaCalificacion"),
    tipo: urlParams.get("tipo"),
    cantidad: urlParams.get("cantidad"),
    tienda: urlParams.get("tienda"),
    direccionTienda: urlParams.get("direccionTienda"),
    imagen: urlParams.get("imagen"),
    magnitud: urlParams.get("magnitud"),
    telefono: urlParams.get("telefono"),
  };
}

function mostrarInformacionProducto(productoSeleccionado) {
  let contenedorFuego = document.querySelector(".contenedorFuegoArtificial");
  if (contenedorFuego) {
    contenedorFuego.innerHTML = `
        <img src="${decodeURIComponent(
          productoSeleccionado.imagen
        )}" alt="dato" class="imgFuegoArt">
        <div class="InfoFuegoArtificial">
            <h3>${decodeURIComponent(productoSeleccionado.nombre)}</h3>
            <p class="precio">$${productoSeleccionado.precio}</p>
            <p class="desc">${decodeURIComponent(productoSeleccionado.descripcion)}</p>
            <div class="textito">
                <p>Calificación: ${decodeURIComponent(
                  productoSeleccionado.mediaCalificacion
                )}/10</p>
                <p>Tipo: ${decodeURIComponent(productoSeleccionado.tipo)}</p>
                <p>Disponibles: ${productoSeleccionado.cantidad}</p>
                <p>Magnitud de explosion: ${productoSeleccionado.magnitud}</p>
                
            </div>
        </div>`;

    let masInfo = document.querySelector(".masInfo");
    if (masInfo) {
      masInfo.innerHTML = `
          <h3>Información adicional</h3>
          <p>Tienda: ${decodeURIComponent(productoSeleccionado.tienda)}</p>
          <hr>
          <p>Dirección: ${decodeURIComponent(productoSeleccionado.direccionTienda)}</p>
          <hr>
          <p>Telefono: ${decodeURIComponent(productoSeleccionado.telefono)}</p>
      `;
    }
  } else {
    console.error("El contenedor de información no fue encontrado.");
  }
}
function ToggleMenu() {
  const menuToggle = document.querySelector(".menutoggle");
  menuToggle.classList.toggle("active");
  const sidebar = document.querySelector("nav");
  sidebar.classList.toggle("active");
  const rep = document.querySelector(".titlerep");
  rep.classList.toggle("active");
  const user = document.querySelector(".user");
  user.classList.toggle("active");
}

//FUNCION PARA OBTENER EL NOMBRE DE USUARIO QUE INICIO SESION
function mostrarNombreUsuario() {
  var usuarioAlmacenado = sessionStorage.getItem("nombreUsuario");
  var apellidoAlmacenado = sessionStorage.getItem("apellidoUsuario");
  console.log("Nombre del usuario almacenado:", usuarioAlmacenado, apellidoAlmacenado);
  if (usuarioAlmacenado) {
    var nombreUs = document.getElementById("usuarioNombre"); // ID DEL CONTENEDOR DEL NOMBRE DEL USUARIO
    var botonInicioSesion = document.getElementById("botonInicioSesion"); // ID DEL BOTÓN DE INICIO DE SESIÓN

    if (nombreUs) {
      nombreUs.textContent = usuarioAlmacenado + " " + apellidoAlmacenado; // CAMBIA AQUÍ TAMBIÉN EL ID SI EL QUE CONTIENE ES DIFERENTE EN EL HTML
    }

    // Oculta el botón de inicio de sesión si está presente
    if (botonInicioSesion) {
      botonInicioSesion.style.display = "none";
    }
  } else {
    console.log("No se encontró el nombre");
  }
}
function ocultarParametrosDeURL() {
  if (history.replaceState) {
    const urlSinParametros = window.location.pathname;
    history.replaceState(null, null, urlSinParametros);
  }
}