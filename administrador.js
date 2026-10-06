// ==========================================
// PANEL DEL ADMINISTRADOR
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
// LISTA DE PERMISOS
// ==========================================

const btnListaPermisos =
    document.getElementById("btnListaPermisos");


btnListaPermisos.addEventListener(
    "click",
    function () {

        window.location.href =
            "lista-permisos.html";

    }
);


// ==========================================
// GESTIÓN DE PERMISOS
// ==========================================

const btnGestionPermisos =
    document.getElementById("btnGestionPermisos");


btnGestionPermisos.addEventListener(
    "click",
    function () {

        window.location.href =
            "gestion-permisos.html";

    }
);


// ==========================================
// GENERAL
// ==========================================

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