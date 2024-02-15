document.addEventListener("DOMContentLoaded", function () {
  verificarSesion();
  mostrarNombreUsuario();

  const url = "http://localhost:8080/fuegos";
  let data;
  const resultadosPorPagina = 10;
  let paginaActual = 1;
  let listaTipo = document.getElementById("listaTipo");
  let listaExplosion = document.getElementById("listaExplosion");
  let listaOrden = document.getElementById("listaOrden");
  let barraBusqueda = document.getElementById("barraBusqueda");

  fetch(url)
    .then((response) => response.json())
    .then((fuegosData) => {
      data = fuegosData;
      mostrarData(data);
      aplicarFiltros(); // Llamar a la función para aplicar filtros y paginación

      if (listaTipo) {
        listaTipo.addEventListener("change", function () {
          paginaActual = 1; // Reiniciar la página al cambiar los filtros
          aplicarFiltros();
        });
      }

      if (listaExplosion) {
        listaExplosion.addEventListener("change", function () {
          paginaActual = 1; // Reiniciar la página al cambiar los filtros
          aplicarFiltros();
        });
      }

      if (listaOrden) {
        listaOrden.addEventListener("change", function () {
          paginaActual = 1; // Reiniciar la página al cambiar los filtros
          aplicarFiltros();
        });
      }

      if (barraBusqueda) {
        barraBusqueda.addEventListener("input", function () {
          search();
        });
      }

      aplicarFiltros();
    });

  // FUNCION PARA MAPEAR DATOS
  function mostrarData(data) {
    console.log(data);
    let contenedorFuegos = "";
    for (
      let i = (paginaActual - 1) * resultadosPorPagina;
      i < paginaActual * resultadosPorPagina && i < data.length;
      i++
    ) {
      contenedorFuegos += `
        <div class="fuegoArtificial">
      <a href="reportes-seleccion.html?id=${data[i].cod_fuego}&nombre=${encodeURIComponent(
        data[i].nombre
      )}&precio=${data[i].precio}&descripcion=${encodeURIComponent(
        data[i].descripcion
      )}&mediaCalificacion=${data[i].mediaCalificacion}&tipo=${encodeURIComponent(
        data[i].tipo
      )}&cantidad=${data[i].cantidad}&tienda=${encodeURIComponent(
        data[i].tienda
      )}&direccionTienda=${encodeURIComponent(data[i].direccionTienda)}&imagen=${encodeURIComponent(
        data[i].imagen
      )}&magnitud=${encodeURIComponent(data[i].magnitud)}&telefono=${encodeURIComponent(
        data[i].telefono
      )}"> 
        <button>
          <img src="${data[i].imagen}" alt="dato" class="imgFuegoArt">
          <h3>${data[i].nombre}</h3>
          <p class="precio">B/. ${data[i].precio}</p>
          <p>${data[i].descripcion}</p>
          <p>Explosion: ${data[i].magnitud}</p>
        </button>
      </a>
    </div>`;
    }

    let contenedorPrincipal = document.getElementById("contenedorInformacion");
    if (contenedorPrincipal) {
      contenedorPrincipal.innerHTML = contenedorFuegos;
    } else {
      console.error("El elemento no fue encontrado.");
    }
  } // FIN FUNCION PARA MAPEAR DATOS

  function search() {
    let valorBusqueda = barraBusqueda ? barraBusqueda.value.toLowerCase() : "";
    aplicarFiltros(valorBusqueda);
  }

  function aplicarFiltros() {
    let tipoSeleccionado = listaTipo ? listaTipo.value : "";
    let magnitudSeleccionada = listaExplosion ? listaExplosion.value : "";
    let ordenSeleccionado = listaOrden ? listaOrden.value : "";
    let valorBusqueda = barraBusqueda ? barraBusqueda.value.toLowerCase() : "";

    console.log(valorBusqueda);
    // Verificar si se ha seleccionado la opción "Por defecto" en cada filtro
    if (tipoSeleccionado === "default") {
      tipoSeleccionado = "";
    }

    if (magnitudSeleccionada === "default") {
      magnitudSeleccionada = "";
    }

    if (ordenSeleccionado === "default") {
      ordenSeleccionado = "";
    }

    // Filtrar los datos según los valores seleccionados
    let fuegosFiltrados = data.filter(function (fuego) {
      return (
        (tipoSeleccionado === "" || fuego.tipo === tipoSeleccionado) &&
        (magnitudSeleccionada === "" || fuego.magnitud === magnitudSeleccionada) &&
        (fuego.nombre.toLowerCase().includes(valorBusqueda) ||
          fuego.descripcion.toLowerCase().includes(valorBusqueda))
      );
    });

    // Ordenar los datos según la opción de orden seleccionada
    if (ordenSeleccionado === "ascendente") {
      fuegosFiltrados.sort((a, b) => a.precio - b.precio);
    } else if (ordenSeleccionado === "descendente") {
      fuegosFiltrados.sort((a, b) => b.precio - a.precio);
    }

    cantidadPaginas = Math.ceil(fuegosFiltrados.length / resultadosPorPagina); // Calcular la cantidad total de páginas
    mostrarData(fuegosFiltrados);
    generarBotonesPaginacion(); // Llamar a la función para generar los botones de paginación
  }

  // Función para generar botones de paginación
  function generarBotonesPaginacion() {
    let contenedorPaginacion = document.querySelector(".pagination");
    if (contenedorPaginacion) {
      contenedorPaginacion.innerHTML = "";

      for (let i = 1; i <= cantidadPaginas; i++) {
        let botonPagina = document.createElement("button");
        botonPagina.innerText = i;
        botonPagina.addEventListener("click", function () {
          paginaActual = i;
          aplicarFiltros();
        });

        if (i === paginaActual) {
          botonPagina.classList.add("active");
        }

        contenedorPaginacion.appendChild(botonPagina);
      }
    } else {
      console.error("El contenedor de paginación no fue encontrado.");
    }
  }
});

//FUNCION SIDEBAR
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
function cerrarSesion() {
  // Limpiar la información almacenada en la sesión
  sessionStorage.removeItem("nombreUsuario");
  sessionStorage.removeItem("apellidoUsuario");
  sessionStorage.removeItem("codUsuario");
  sessionStorage.removeItem("correo");

  // Redirigir al usuario a la página de inicio de sesión
  window.location.href = "http://127.0.0.1:5500/src/main/resources/templates/Login.html";
}

function verificarSesion() {
  // Verificar si la sesión está activa
  var usuarioAlmacenado = sessionStorage.getItem("nombreUsuario");
  if (!usuarioAlmacenado) {
    // Si no hay información de sesión, redirigir a la página de inicio de sesión
    window.history.replaceState(
      null,
      null,
      "http://127.0.0.1:5500/src/main/resources/templates/Login.html"
    );
    window.location.href = "http://127.0.0.1:5500/src/main/resources/templates/Login.html";
    return; // Detener la ejecución del código
  }
}
