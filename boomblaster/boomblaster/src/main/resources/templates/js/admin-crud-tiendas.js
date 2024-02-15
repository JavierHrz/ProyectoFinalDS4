//FUNCION PARA LA PAGINACION
document.addEventListener("DOMContentLoaded", function () {
  verificarSesion();
  let baseUrl = "http://localhost:8080";

  const resultadosPorPagina = 5;
  let paginaActual = 1;
  let datosTotales = [];
  let cantidadPaginas = 1;

  function obtenerDatosDesdeURL() {
    fetch(baseUrl + "/local/all")
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
    let tablaDatos = "";
    for (let i = 0; i < datos.length; i++) {
      tablaDatos += `<tr>
            <td>${datos[i].cod_local}</td>
            <td>${datos[i].nombre_local}</td>
            <td>${datos[i].ubicacion}</td>
            <td>${datos[i].telefono}</td>
            <td><button class="btnEliminar" onclick="EliminarLocal(${datos[i].cod_local})">Eliminar</button>
                 <button class="btnActualizar" onclick="ColocarInfo(${datos[i].cod_local})">Actualizar</button></td>
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

  obtenerDatosDesdeURL(baseUrl + "/local/all");

  //METODO PARA ELIMINAR LOCAL
  window.EliminarLocal = function (idLocal) {
    fetch(baseUrl + "/local/" + idLocal, { method: "Delete" }).then((res) => {
      console.log(res);
      obtenerDatosDesdeURL();
    });
  };

  window.AgregarLocal = function () {
    let nombre = document.getElementById("nombre_local").value,
      ubi = document.getElementById("ubicacion").value,
      tel = document.getElementById("telefono").value;

    //VERIFICACION PARA QUE LOS CAMPOS NO ESTEN VACIOS
    if (!nombre || !ubi || !tel) {
      alert("Complete todos los campos");
      return;
    }

    let data = {
      nombre_local: nombre,
      ubicacion: ubi,
      telefono: tel,
    };

    fetch(baseUrl + "/local", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => {
      obtenerDatosDesdeURL();
    });
  };

  window.ColocarInfo = function (idLocal) {
    let local = datosTotales.filter((p) => {
      return p.cod_local == idLocal;
    })[0];

    document.getElementById("nombre_local").value = local.nombre_local;
    document.getElementById("telefono").value = local.telefono;
    document.getElementById("ubicacion").value = local.ubicacion;
    document.getElementById("cod_local").value = idLocal;

    console.log(idLocal);
  };

  window.ActualizarLocal = function () {
    let nombre = document.getElementById("nombre_local").value,
      ubi = document.getElementById("ubicacion").value,
      tel = document.getElementById("telefono").value,
      id = document.getElementById("cod_local").value;

    //VERIFICACION PARA QUE LOS CAMPOS NO ESTEN VACIOS
    if (!nombre || !ubi || !tel) {
      alert("Complete todos los campos");
      return;
    }

    let data = {
      cod_local: id,
      nombre_local: nombre,
      ubicacion: ubi,
      telefono: tel,
    };

    fetch(baseUrl + "/local", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => {
      obtenerDatosDesdeURL();
    });
  };
  mostrarNombreUsuario();
});

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
