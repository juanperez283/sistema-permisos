// ==========================================
// PROFESOR
// ==========================================


// ==========================================
// MOSTRAR USUARIO
// ==========================================

const nombreUsuario =
    document.getElementById(
        "nombreUsuario"
    );


const correoUsuario =
    localStorage.getItem(
        "correoUsuario"
    );


if (correoUsuario) {

    nombreUsuario.textContent =
        correoUsuario;

}


// ==========================================
// LISTA DE PERMISOS
// ==========================================

const btnListaPermisos =
    document.getElementById(
        "btnListaPermisos"
    );


btnListaPermisos.addEventListener(
    "click",
    function () {

        window.location.href =
            "lista-permisos.html";

    }
);


// ==========================================
// CERRAR SESIÓN
// ==========================================

const btnCerrarSesion =
    document.getElementById(
        "btnCerrarSesion"
    );


btnCerrarSesion.addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "correoUsuario"
        );

        localStorage.removeItem(
            "rolUsuario"
        );

        window.location.href =
            "sesion.html";

    }
);