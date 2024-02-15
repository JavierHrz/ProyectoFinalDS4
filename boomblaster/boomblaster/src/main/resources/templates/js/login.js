let baseUrl = "http://localhost:8080";

function cerrarMensajeError() {
  document.getElementById("mensajeErrorBarra").style.display = "none";
}

function mostrarMensajeError(mensaje) {
  const mensajeErrorBarra = document.getElementById("mensajeErrorBarra");
  const mensajeError = document.getElementById("mensajeError");

  mensajeError.innerHTML = mensaje;
  mensajeErrorBarra.style.display = "block";
}

function iniciarSesion() {
  var usuario = {
    correo: document.getElementById("correo").value,
    contrasena: document.getElementById("contrasena").value,
  };

  console.log("Datos del usuario:", usuario);

  // Limpiar mensajes de error anteriores
  document.getElementById("mensajeError").innerHTML = "";

  fetch(baseUrl + "/iniciar-sesion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 401) {
        // Credenciales incorrectas
        throw new Error("Ingresa correctamente el correo y la contraseña.");
      } else {
        // Otro tipo de error
        throw new Error("Error de inicio de sesión. Inténtalo de nuevo.");
      }
    })
    .then((data) => {
      console.log("Datos recibidos del servidor:", data);

      if (data) {
        let codRol = data.codRol;

        console.log(data);
        // Se guarda el nombre y el apellido del usuario:
        sessionStorage.setItem("nombreUsuario", data.nombre);
        sessionStorage.setItem("apellidoUsuario", data.apellido);
        sessionStorage.setItem("codUsuario", data.codUsuario);
        sessionStorage.setItem("correo", data.correo);

        var usuarioAlmacenado = sessionStorage.getItem("nombreUsuario");
        var apellidoAlmacenado = sessionStorage.getItem("apellidoUsuario");
        console.log("Nombre del usuario almacenado:", usuarioAlmacenado, apellidoAlmacenado);
        if (codRol === 1) {
          // USUARIO
          window.location.href = "/src/main/resources/templates/Reportes.html";
        } else if (codRol === 2) {
          // ADMIN
          window.location.href = "/src/main/resources/templates/Admin-reportes.html";
        } else {
          console.log("Error al iniciar sesión");
        }
      }
    })
    .catch((error) => {
      console.error(error.message);
      mostrarMensajeError("Correo o contraseñas incorrectos. Intentalo de nuevo");

    });
}
