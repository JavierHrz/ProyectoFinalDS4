const url = "http://localhost:8080/comentarios";
const urlParams = new URLSearchParams(window.location.search);
let cod_fuego = urlParams.get("id");
console.log("Codigo del fuego:", cod_fuego);
let data;

// FUNCION PARA MAPEAR DATOS
function mostrarData(data) {
  if (!data || !Array.isArray(data)) {
    console.error("Los datos de comentarios no son válidos.");
    return;
  }

  let comentariosexistentes = "";
  for (let i = 0; i < data.length; i++) {
    let tipoContenido = "sinContenido";

    if (data[i].video) {
      const extensionesVideo = [".mp4", ".avi"];
      const esVideo = extensionesVideo.some((ext) => data[i].video.endsWith(ext));

      if (esVideo) {
        tipoContenido = "video";
      } else if (data[i].video.includes("youtube.com")) {
        tipoContenido = "youtube";
      } else {
        tipoContenido = "imagen";
      }
    }

    // Construir la URL del iframe de YouTube
    const youtubeIframeUrl = tipoContenido === "youtube" ? construirURLYouTube(data[i].video) : "";

    comentariosexistentes += `
      <div class="comentario" id="comentario">
        <div>
          ${
            tipoContenido === "video"
              ? `<video controls width="560" height="315"><source src="${data[i].video}" type="video/mp4"></video>`
              : tipoContenido === "youtube"
              ? `<iframe width="420" height="315" src="${youtubeIframeUrl}" frameborder="0" allowfullscreen></iframe>`
              : tipoContenido === "imagen"
              ? `<img src="${data[i].video}" alt="Imagen">`
              : ""
          }
        </div>
        <div class="personaC">
          <div>
            <h4 class="nombreComentario">${data[i].nombre + " " + data[i].apellido}</h4>
            <p>${data[i].comentario}</p>
          </div>
          <div>
            <p>Clasificación: ${data[i].calificacion}</p>
          </div>
        </div>
      </div>
      <hr>`;
  }

  let contenedorComentario = document.getElementById("comentariosexistentes");
  if (contenedorComentario) {
    contenedorComentario.innerHTML = comentariosexistentes;
  } else {
    console.error("El elemento no fue encontrado.");
  }
}

// Función para construir la URL del iframe de YouTube
function construirURLYouTube(url) {
  const videoId = obtenerIdDeVideoDeUrlYouTube(url);

  return `https://www.youtube.com/embed/${videoId}`;
}

// Función para obtener el ID del video de YouTube desde la URL
function obtenerIdDeVideoDeUrlYouTube(url) {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
}

const urlAgregarComentario = "http://localhost:8080/comentarios";
function agregarComentario() {
  let codUsuario = sessionStorage.getItem("codUsuario");
  let textoComentario = document.getElementById("textoComentario").value;
  let url = document.getElementById("urlMedia").value;
  let calificacion = document.getElementById("calificacion").value;

  if (codUsuario != null) {
    let comentario = {
      cod_usuario: codUsuario,
      comentario: textoComentario,
      video: url,
      calificacion: calificacion,
      cod_fuego: cod_fuego,
    };

    fetch(urlAgregarComentario, {
      method: "POST",
      body: JSON.stringify(comentario),
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error al agregar comentario: ${res.status}`);
        }
        console.log("Comentario agregado correctamente");
        location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  } //FIN verificacion  de usuario logueado
  else {
    let textito = "Debe iniciar sesion para realizar comentarios";
    if (confirm(textito)) {
      window.location.href = "Login.html";
    }
  }
}
