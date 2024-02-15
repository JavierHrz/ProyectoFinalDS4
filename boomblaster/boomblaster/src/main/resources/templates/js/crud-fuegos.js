document.addEventListener("DOMContentLoaded", function () {
  verificarSesion();
  let baseUrl = "http://localhost:8080";

  const resultadosPorPagina = 5;
  let paginaActual = 1;
  let datosTotales = [];
  let cantidadPaginas = 1;

  function obtenerDatosDesdeURL() {
    fetch(baseUrl + "/crudFuego/all")
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
    <td id="idFuego">${datos[i].cod_fuego}</td>
    <td id="nombreFuego">${datos[i].nombre}</td>
    <td id="tipoFuego">${datos[i].tipoFuego}</td>
    <td id="cantidadFuego">${datos[i].cantidad}</td>
    <td id="precioFuego">${datos[i].precio}</td>
    <td id="descripcionFuego">${datos[i].descripcion}</td>
    <td id="imagenFuego">${datos[i].imagen}</td>
    <td id="tiendaFuego">${datos[i].tienda}</td>
    <td id="nmagnitudFuego">${datos[i].magnitud}</td>
    <td id="botonesFuego"><button class="btnEliminar" onclick="EliminarFuego(${datos[i].cod_fuego})">Eliminar</button>
         <button class="btnActualizar" onclick="ColocarInfo(${datos[i].cod_fuego})">Actualizar</button></td>
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

  // Metodo para obtener las tiendas y mapearlas en el select de los filtros
  function obtenerTiendas() {
    fetch(baseUrl + "/local/all")
      .then((response) => response.json())
      .then((data) => {
        tiendas = data;
        mapearNombresTiendasEnSelect();
      })
      .catch((error) => console.error("Error al obtener las tiendas:", error));
  }

  // Método para mapear solo los nombres de las tiendas en el select
  function mapearNombresTiendasEnSelect() {
    let selectTienda = document.getElementById("tienda");
    if (selectTienda) {
      // Mapear solo los nombres de las tiendas en el select
      tiendas.forEach((tienda) => {
        let option = document.createElement("option");
        option.value = tienda.nombre_local;
        option.textContent = tienda.nombre_local;
        selectTienda.appendChild(option);
      });
    } else {
      console.error('El elemento con ID "tienda" no fue encontrado.');
    }
  }

  obtenerDatosDesdeURL(baseUrl + "/crudFuego/all");
  obtenerTiendas();

  //METODO PARA ELIMINAR FUEGOS ARTIFICIALES
  window.EliminarFuego = function (idFuego) {
    fetch(baseUrl + "/crudFuego/" + idFuego, {
      method: "DELETE",
    }).then((res) => {
      console.log(res);
      obtenerDatosDesdeURL();
    });
  }; //FIN ELIMINAR FUEGO

  //METODO PARA AGREGAR FUEGO ARTIFICIAL
  window.AgregarFuego = function () {
    let nombreF = document.getElementById("nombreFuego").value,
      precioF = document.getElementById("precio").value,
      cantidadF = document.getElementById("cantidad").value,
      tipoF = document.getElementById("tipo").value,
      urlF = document.getElementById("url").value,
      tiendaF = document.getElementById("tienda").value,
      magnitudF = document.getElementById("magnitud").value,
      descripcionF = document.getElementById("descripcion").value;

    //VERIFICACION PARA QUE LOS CAMPOS NO ESTEN VACIOS
    if (
      !nombreF ||
      !precioF ||
      !cantidadF ||
      !tipoF ||
      !urlF ||
      !tiendaF ||
      !magnitudF ||
      !descripcionF
    ) {
      alert("Complete todos los campos");
      return;
    }

    let data = {
      nombre: nombreF,
      precio: precioF,
      cantidad: cantidadF,
      tipoFuego: tipoF,
      imagen: urlF,
      tienda: tiendaF,
      magnitud: magnitudF,
      descripcion: descripcionF,
    };

    console.log(data);

    fetch(baseUrl + "/crudFuego", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }).then((res) => {
      obtenerDatosDesdeURL();
    });
  }; //FIN AGREGAR FUEGO

  //METODOS PARA ACTUALIZAR FUEGO
  window.ColocarInfo = function (idFuego) {
    let fuego = datosTotales.filter((f) => {
      console.log(idFuego);
      return f.cod_fuego == idFuego;
    })[0];

    document.getElementById("nombreFuego").value = fuego.nombre;
    document.getElementById("precio").value = fuego.precio;
    document.getElementById("cantidad").value = fuego.cantidad;
    document.getElementById("tipo").value = fuego.tipoFuego;
    document.getElementById("url").value = fuego.imagen;
    document.getElementById("tienda").value = fuego.tienda;
    document.getElementById("magnitud").value = fuego.magnitud;
    document.getElementById("descripcion").value = fuego.descripcion;
  };

  window.ActualizarFuego = function () {
    let nombreF = document.getElementById("nombreFuego"),
      precioF = document.getElementById("precio"),
      cantidadF = document.getElementById("cantidad"),
      tipoF = document.getElementById("tipo"),
      urlF = document.getElementById("url"),
      tiendaF = document.getElementById("tienda"),
      magnitudF = document.getElementById("magnitud"),
      descripcionF = document.getElementById("descripcion");
    idF = document.getElementById("idFueguinho");

    //VERIFICACION PARA QUE LOS CAMPOS NO ESTEN VACIOS
    if (
      !nombreF ||
      !precioF ||
      !cantidadF ||
      !tipoF ||
      !urlF ||
      !tiendaF ||
      !magnitudF ||
      !descripcionF
    ) {
      alert("Complete todos los campos");
      return;
    }

    let data = {
      cod_fuego: idF,
      nombre: nombreF,
      precio: precioF,
      cantidad: cantidadF,
      tipo: tipoF,
      url: urlF,
      tienda: tiendaF,
      magnitud: magnitudF,
      descripcion: descripcionF,
    };

    fetch(baseUrl + "/crudFuego", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
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
    //alert("Debe iniciar sesion para acceder a esta pagina");
    //window.location.href = "/src/main/resources/templates/Login.html";
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
