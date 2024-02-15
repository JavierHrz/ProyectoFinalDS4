let baseUrl = "http://localhost:8080";

window.RegistrarUsuario = function () {
  let nombre = document.getElementById("usuario").value,
    apellido = document.getElementById("apellido").value,
    email = document.getElementById("email").value,
    contra = document.getElementById("contra").value,
    confirmarcontra = document.getElementById("confirmarContra").value;

  if (!nombre || !apellido || !email || !contra || !confirmarcontra) {
    alert("Complete todos los campos");
    return;
  }

  if (contra !== confirmarcontra) {
    alert("La contraseña no coincide");
    return;
  }

  let data = {
    nombre: nombre,
    apellido: apellido,
    correo: email,
    contrasena: contra,
  };

  fetch(baseUrl + "/registro", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => {
      if (res.ok) {
        alert("Usuario registrado exitosamente");
        window.location.href = "http://127.0.0.1:5500/src/main/resources/templates/Login.html";
      } else {
        alert("Error al registrar usuario");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
