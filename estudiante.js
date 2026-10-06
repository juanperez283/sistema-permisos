// ==========================================
// PANEL DEL ESTUDIANTE
// ==========================================


// ==========================================
// MOSTRAR NOMBRE DEL USUARIO
// ==========================================

const nombreUsuario =
    document.getElementById("nombreUsuario");

const correoUsuario =
    localStorage.getItem("correoUsuario");


if (correoUsuario) {

    nombreUsuario.textContent =
        correoUsuario;

}


// ==========================================
// SOLICITAR PERMISO
// ==========================================

const btnSolicitar =
    document.getElementById("btnSolicitar");


btnSolicitar.addEventListener(
    "click",
    function () {

        window.location.href =
            "solicitar.html";

    }
);


// ==========================================
// MIS PERMISOS
// ==========================================

const btnMisPermisos =
    document.getElementById("btnMisPermisos");


btnMisPermisos.addEventListener(
    "click",
    function () {

        window.location.href =
            "permisos.html";

    }
);


// ==========================================
// CERRAR SESIÓN
// ==========================================

const btnCerrarSesion =
    document.getElementById("btnCerrarSesion");


btnCerrarSesion.addEventListener(
    "click",
    function () {

        // Eliminar datos de la sesión
        localStorage.removeItem(
            "correoUsuario"
        );

        localStorage.removeItem(
            "rolUsuario"
        );


        // Volver al inicio de sesión
        window.location.href =
            "sesion.html";

    }
);