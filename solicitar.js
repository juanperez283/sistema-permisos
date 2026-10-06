// ==========================================
// SOLICITAR PERMISO
// ==========================================

const formularioPermiso =
  document.getElementById("formularioPermiso");

const fechaSolicitud =
  document.getElementById("fechaSolicitud");

const fechaPermiso =
  document.getElementById("fechaPermiso");

const motivo =
  document.getElementById("motivo");

const contador =
  document.getElementById("contador");

const archivo =
  document.getElementById("archivo");

const btnCancelar =
  document.getElementById("btnCancelar");

const URL_API =
  "https://script.google.com/macros/s/AKfycbz-IcfUK5DEphiaGdXLyeLX0UXnnZS8ryuDS5A33gC2l6FFmfr5VZRiN0-_ejgmvyO6Lg/exec";

// ==========================================
// FECHA ACTUAL
// ==========================================

const ahora = new Date();

const año = ahora.getFullYear();

const mes =
  String(ahora.getMonth() + 1).padStart(2, "0");

const dia =
  String(ahora.getDate()).padStart(2, "0");

const fechaActual =
  `${año}-${mes}-${dia}`;

fechaSolicitud.value = fechaActual;

fechaPermiso.min = fechaActual;

// ==========================================
// CONTADOR DE CARACTERES
// ==========================================

motivo.addEventListener("input", function () {

  contador.textContent =
    `${motivo.value.length}/500`;

});

// ==========================================
// CONVERTIR ARCHIVO A BASE64
// ==========================================

function convertirArchivoBase64(archivo) {

  return new Promise(function (resolve, reject) {

    const lector =
      new FileReader();

    lector.onload = function () {

      const resultado =
        lector.result;

      const base64 =
        resultado.split(",")[1];

      resolve(base64);

    };

    lector.onerror = function () {

      reject(
        new Error("No se pudo leer el archivo.")
      );

    };

    lector.readAsDataURL(archivo);

  });

}

// ==========================================
// ENVIAR SOLICITUD
// ==========================================

formularioPermiso.addEventListener(
  "submit",
  async function (evento) {

    evento.preventDefault();

    if (!archivo.files.length) {

      alert("Debes seleccionar un archivo.");

      return;

    }

    const archivoSeleccionado =
      archivo.files[0];

    try {

      const datosArchivo =
        await convertirArchivoBase64(
          archivoSeleccionado
        );

      const solicitud = {

        id: Date.now(),

        correoUsuario:
          localStorage.getItem("correo"),

        nombreEstudiante:
          document
            .getElementById("nombreEstudiante")
            .value
            .trim(),

        nombrePadre:
          document
            .getElementById("nombrePadre")
            .value
            .trim(),

        curso:
          document
            .getElementById("curso")
            .value,

        paralelo:
          document
            .getElementById("paralelo")
            .value,

        fechaSolicitud:
          fechaSolicitud.value,

        fechaPermiso:
          fechaPermiso.value,

        motivo:
          motivo.value.trim(),

        nombreArchivo:
          archivoSeleccionado.name,

        tipoArchivo:
          archivoSeleccionado.type,

        datosArchivo:
          datosArchivo,

        fechaCreacion:
          Date.now(),

        estado:
          "Pendiente"

      };

      const respuesta =
        await fetch(URL_API, {

          method: "POST",

          headers: {
            "Content-Type":
              "text/plain;charset=utf-8"
          },

          body: JSON.stringify({

            id: solicitud.id,

            correoUsuario:
              solicitud.correoUsuario,

            nombreEstudiante:
              solicitud.nombreEstudiante,

            nombrePadre:
              solicitud.nombrePadre,

            curso:
              solicitud.curso,

            paralelo:
              solicitud.paralelo,

            fechaSolicitud:
              solicitud.fechaSolicitud,

            fechaPermiso:
              solicitud.fechaPermiso,

            motivo:
              solicitud.motivo,

            nombreArchivo:
              solicitud.nombreArchivo,

            tipoArchivo:
              solicitud.tipoArchivo,

            datosArchivo:
              solicitud.datosArchivo,

            archivoURL:
              "",

            fechaCreacion:
              solicitud.fechaCreacion,

            estado:
              solicitud.estado

          })

        });

      const resultado =
        await respuesta.json();

      console.log(resultado);

      if (resultado.resultado === "exito") {

        alert(
          "Permiso enviado correctamente."
        );

        formularioPermiso.reset();

        contador.textContent =
          "0/500";

      }
      else {

        alert(
          "No se pudo registrar el permiso."
        );

      }

    }
    catch (error) {

      console.error(
        "Error:",
        error
      );

      alert(
        "Ocurrió un error al enviar el permiso."
      );

    }

  }
);

// ==========================================
// CANCELAR
// ==========================================

btnCancelar.addEventListener(
  "click",
  function () {

    formularioPermiso.reset();

    contador.textContent =
      "0/500";

    fechaSolicitud.value =
      fechaActual;

  }
);