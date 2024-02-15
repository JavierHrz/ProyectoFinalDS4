//FUNCION PARA LA PAGINACION
document.addEventListener("DOMContentLoaded", function () {
  verificarSesion();
  mostrarNombreUsuario();
  let baseUrl = "http://localhost:8080";

  const resultadosPorPagina = 5;
  let paginaActual = 1;
  let datosTotales = [];
  let cantidadPaginas = 1;
  let barraBusqueda = document.getElementById("barraBusqueda");

  function obtenerDatosDesdeURL() {
    fetch(baseUrl + "/comentarios/all")
      .then((response) => response.json())
      .then((data) => {
        datosTotales = data;
        cantidadPaginas = Math.ceil(datosTotales.length / resultadosPorPagina);
        mostrarDatosPaginados(paginaActual);
        generarBotonesPaginacion();
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
  }

  function mostrarDatosEnTabla(datos) {
    console.log(datos);
    let tablaDatos = "";
    for (let i = 0; i < datos.length; i++) {
      tablaDatos += `<tr>
            <td>${datos[i].cod_comentario}</td>
            <td>${datos[i].nombre + " " + datos[i].apellido}</td>
            <td>${datos[i].comentario}</td>
            <td>${datos[i].calificacion}</td>
            <td>${datos[i].video}</td>
            <td>${datos[i].nombreFuego}</td>
            <td><button class="btnEliminar" onclick="EliminarComentario(${
              datos[i].cod_comentario
            })">Eliminar</button></td>
            </tr>`;
    }

    let cuerpoTabla = document.getElementById("cuerpoTabla");
    if (cuerpoTabla) {
      cuerpoTabla.innerHTML = tablaDatos;
    } else {
      console.error('El elemento con ID "cuerpoTabla" no fue encontrado.');
    }
  }

  function mostrarDatosPaginados(pagina) {
    let indiceInicial = (pagina - 1) * resultadosPorPagina;
    let indiceFinal = pagina * resultadosPorPagina;
    let datosPagina = datosTotales.slice(indiceInicial, indiceFinal);
    mostrarDatosEnTabla(datosPagina);
  }

  function generarBotonesPaginacion() {
    let contenedorPaginacion = document.querySelector(".pagination");
    if (contenedorPaginacion) {
      contenedorPaginacion.innerHTML = "";

      for (let i = 1; i <= cantidadPaginas; i++) {
        let botonPagina = document.createElement("button");
        botonPagina.innerText = i;

        botonPagina.addEventListener(
          "click",
          (function (pagina) {
            return function () {
              paginaActual = pagina;
              mostrarDatosPaginados(paginaActual);

              // Remover la clase 'active' de todos los botones
              document
                .querySelectorAll(".pagination button")
                .forEach((btn) => btn.classList.remove("active"));

              // Agregar la clase 'active' al botón seleccionado
              botonPagina.classList.add("active");
            };
          })(i)
        );

        if (i === paginaActual) {
          botonPagina.classList.add("active");
        }

        contenedorPaginacion.appendChild(botonPagina);
      }
    } else {
      console.error("El contenedor de paginación no fue encontrado.");
    }
  }

  obtenerDatosDesdeURL(baseUrl + "/comentarios/all");

  //METODO PARA ELIMINAR LOCAL
  window.EliminarComentario = function (cod_comentario) {
    fetch(baseUrl + "/comentarios/" + cod_comentario, { method: "DELETE" }).then((res) => {
      console.log(res);
      obtenerDatosDesdeURL();
    });
  };

  // Agregar eventos a los campos de búsqueda
  if (barraBusqueda) {
    barraBusqueda.addEventListener("input", function () {
      paginaActual = 1;
      aplicarFiltros();
    });
  }

  let barraBusquedaUsuario = document.querySelector(".filtroBusqueda[name='nombre_tienda']");
  if (barraBusquedaUsuario) {
    barraBusquedaUsuario.addEventListener("input", function () {
      paginaActual = 1;
      aplicarFiltros();
    });
  }

  // Función para aplicar la búsqueda
  function aplicarFiltros() {
    let valorBusqueda = barraBusqueda ? barraBusqueda.value.toLowerCase() : "";

    let valorBusquedaUsuario = barraBusquedaUsuario ? barraBusquedaUsuario.value.toLowerCase() : "";

    // Filtrar y mostrar resultados
    let comentariosFiltrados = datosTotales.filter(function (comentario) {
      return (
        (valorBusquedaUsuario === "" ||
          comentario.nombre.toLowerCase().includes(valorBusquedaUsuario)) &&
        (valorBusqueda === "" ||
          comentario.nombre.toLowerCase().includes(valorBusqueda) ||
          comentario.apellido.toLowerCase().includes(valorBusqueda) ||
          comentario.comentario.toLowerCase().includes(valorBusqueda))
      );
    });

    // Mostrar los resultados filtrados
    mostrarDatosEnTabla(comentariosFiltrados);
    generarBotonesPaginacion();
  }

  obtenerDatosDesdeURL(baseUrl + "/comentarios/all");
});

//FUNCIONES SIDEBAR
function seleccionarOpcion(idOpcion) {
  var opciones = document.getElementsByClassName("dropdown-content");
  for (var i = 0; i < opciones.length; i++) {
    opciones[i].style.display = "none";
  }
  document.getElementById(idOpcion).style.display = "block";
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
    var nombreUs = document.getElementById("usuarioNombre"); //ID DEL CONTENEDOR DEL NOMBRE DEL USUARIO
    if (nombreUs) {
      nombreUs.textContent = usuarioAlmacenado; //CAMBIEN AQUI TAMBIEN EL ID SI EL QUE CONTENDOR ES DIFERENTE EN EL HTML
    }
  } else {
    console.log("No se encontro el nombre");
    //SI NO HAY NOMBRE PARA OBTENER EN LA SESION REDIRIGIMOS AL INICIO DE SESION PARA OBTENERLO
    alert("Debe iniciar sesion para acceder a esta pagina");
    window.location.href = "/src/main/resources/templates/Login.html";
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
