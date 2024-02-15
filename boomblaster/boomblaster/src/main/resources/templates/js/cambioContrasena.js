let url = "http://localhost:8080";

window.CambioContra = function () {
  let correo = document.getElementById("usuario").value;
  let contrasena = document.getElementById("contrasena").value;
  let confirmarContrasena = document.getElementById("confirmarContrasena").value;

  if (contrasena == confirmarContrasena) {
    let data = {
      correo: correo,
      contrasena: contrasena,
    };

    console.log("Datos a enviar:", data);

    fetch(url + "/cambioContrasena", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos recibidos:", data);
        console.log(response);
        alert("asada");
        if (data.ok) {
          alert("Contraseña restablecida correctamente");
          window.location.href = "Login.html";
        } else {
          throw new Error("Error en la solicitud");
        }
      })
      .catch((error) => {
        alert("Contraseña restablecida correctamente");
        window.location.href = "Login.html";
      });
  } else {
    alert("Las contraseñas no coinciden");
  }
};
