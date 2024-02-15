document.addEventListener("DOMContentLoaded", function () {
  mostrarNombreUsuario();
});
function enviarRegistro() {
  event.preventDefault();

  const username = document.getElementById("usuario").value;
  const password = document.getElementById("contraseña").value;
  const correo = document.getElementById("email").value;

  // Verificar si los campos requeridos están llenos
  if (!username || !password || !correo) {
    alert("Por favor, complete todos los campos requeridos.");
    return;
  }

  // Resto del código para enviar el formulario
  fetch("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ usuario, contraseña, email }),
  })
    .then((res) => {
      if (res.ok) {
        window.location.href = "/Reportes.html";
      }
      throw new Error("Error en la solicitud");
    })
    .catch((error) => {
      console.error("Error de red:", error);
    });
}

function Olvidar() {
  event.preventDefault();
  const email = document.getElementById("E-mail").value;
  fetch("/auth/password-reset-request?mail=" + email, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      throw new Error("Error en la solicitud");
    })
    .catch((error) => {
      console.error("Error de red:", error);
    });
}

function CambioContra() {
  const correo = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;
  const confirmarContrasena = document.getElementById("confirmarContrasena").value;
  if (contrasena == confirmarContrasena) {
    let data = {
      correo: correo,
      contrasena: contrasena,
    };

    fetch("/cambioContrasena", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Contraseña reestablecida correctamente");
          window.location.href = "Login.html";
        }
        throw new Error("Error en la solicitud");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else if (contrasena != confirmarContrasena) {
    alert("Las contraseñas no coinciden");
  }
}
function cancelarRegistro(event) {
  event.preventDefault();
  console.log("Cancelando registro");
  window.location.href = "Reportes.html";
}

function cancelarRegistro2(event) {
  event.preventDefault();
  console.log("Cancelando registro");
  window.location.href = "login.html";
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
