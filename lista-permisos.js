const nombreUsuario =
    document.getElementById("nombreUsuario");

const textoRol =
    document.getElementById("textoRol");

const iconoUsuario =
    document.getElementById("iconoUsuario");

const listaPermisos =
    document.getElementById("listaPermisos");

const sinPermisos =
    document.getElementById("sinPermisos");

const curso =
    document.getElementById("curso");

const paralelo =
    document.getElementById("paralelo");

const btnVolver =
    document.getElementById("btnVolver");

const URL_API =
    "https://script.google.com/macros/s/AKfycbz-IcfUK5DEphiaGdXLyeLX0UXnnZS8ryuDS5A33gC2l6FFmfr5VZRiN0-_ejgmvyO6Lg/exec";

const correoUsuario =
    localStorage.getItem("correo");

const rolUsuario =
    localStorage.getItem("rolUsuario");

// ==========================================
// MOSTRAR USUARIO
// ==========================================

if (correoUsuario) {

    nombreUsuario.textContent =
        correoUsuario;

}

// ==========================================
// CAMBIAR ROL E ICONO
// ==========================================

if (rolUsuario === "administrador") {

    textoRol.textContent =
        "Administrador";

    iconoUsuario.textContent =
        "👨‍💼";

}
else {

    textoRol.textContent =
        "Profesor";

    iconoUsuario.textContent =
        "👨‍🏫";

}

// ==========================================
// MOSTRAR PERMISOS
// ==========================================

async function mostrarPermisos() {

    try {

        const respuesta =
            await fetch(
                URL_API
            );

        if (!respuesta.ok) {

            throw new Error(
                "No se pudieron obtener los permisos."
            );

        }

        const permisos =
            await respuesta.json();

        let permisosAceptados =
            permisos.filter(
                function (permiso) {

                    return (
                        permiso.estado ===
                        "Aprobado"
                    );

                }
            );

        if (curso.value !== "") {

            permisosAceptados =
                permisosAceptados.filter(
                    function (permiso) {

                        return (
                            permiso.curso ===
                            curso.value
                        );

                    }
                );

        }

        if (paralelo.value !== "") {

            permisosAceptados =
                permisosAceptados.filter(
                    function (permiso) {

                        return (
                            permiso.paralelo ===
                            paralelo.value
                        );

                    }
                );

        }

        listaPermisos.innerHTML =
            "";

        if (
            permisosAceptados.length === 0
        ) {

            sinPermisos.style.display =
                "block";

            return;

        }

        sinPermisos.style.display =
            "none";

        permisosAceptados =
            [...permisosAceptados].sort(
                function (a, b) {

                    return (
                        Number(b.fechaCreacion) -
                        Number(a.fechaCreacion)
                    );

                }
            );

        permisosAceptados.forEach(
            function (permiso) {

                const tarjeta =
                    document.createElement(
                        "article"
                    );

                tarjeta.className =
                    "tarjeta-permiso";

                const nombreEstudiante =
                    permiso.nombreEstudiante ||
                    "No registrado";

                const nombrePadre =
                    permiso.nombrePadre ||
                    "No registrado";

                const motivo =
                    permiso.motivo ||
                    "Sin motivo";

                const nombreArchivo =
                    permiso.nombreArchivo ||
                    "Sin archivo";

                let archivoHTML =
                    nombreArchivo;

                if (
                    permiso.archivoURL
                ) {

                    archivoHTML = `

                        <a
                            href="${permiso.archivoURL}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            ${nombreArchivo}
                        </a>

                    `;

                }

                tarjeta.innerHTML = `

                    <div class="cabecera-permiso">

                        <h3>

                            ${permiso.curso}

                            -

                            Paralelo

                            ${permiso.paralelo}

                        </h3>

                        <span
                            class="estado estado-aprobado"
                        >

                            Aceptado

                        </span>

                    </div>

                    <div class="datos">

                        <div class="dato">

                            <strong>
                                Nombre del estudiante
                            </strong>

                            ${nombreEstudiante}

                        </div>

                        <div class="dato">

                            <strong>
                                Padre o madre
                            </strong>

                            ${nombrePadre}

                        </div>

                        <div class="dato">

                            <strong>
                                Curso
                            </strong>

                            ${permiso.curso}

                        </div>

                        <div class="dato">

                            <strong>
                                Paralelo
                            </strong>

                            ${permiso.paralelo}

                        </div>

                        <div class="dato">

                            <strong>
                                Fecha de solicitud
                            </strong>

                            ${permiso.fechaSolicitud}

                        </div>

                        <div class="dato">

                            <strong>
                                Fecha respaldada
                            </strong>

                            ${permiso.fechaPermiso}

                        </div>

                    </div>

                    <div class="motivo">

                        <strong>
                            Motivo
                        </strong>

                        ${motivo}

                    </div>

                    <div class="archivo">

                        📎 Archivo adjunto:

                        ${archivoHTML}

                    </div>

                `;

                listaPermisos.appendChild(
                    tarjeta
                );

            }
        );

    }
    catch (error) {

        console.error(
            "Error al cargar permisos:",
            error
        );

        listaPermisos.innerHTML =
            "";

        sinPermisos.style.display =
            "block";

        sinPermisos.textContent =
            "No se pudieron cargar los permisos.";

    }

}

// ==========================================
// FILTROS
// ==========================================

curso.addEventListener(
    "change",
    mostrarPermisos
);

paralelo.addEventListener(
    "change",
    mostrarPermisos
);

// ==========================================
// BOTÓN VOLVER
// ==========================================

btnVolver.addEventListener(
    "click",
    function () {

        if (
            rolUsuario ===
            "administrador"
        ) {

            window.location.href =
                "administrador.html";

        }
        else {

            window.location.href =
                "profesor.html";

        }

    }
);

// ==========================================
// CARGAR
// ==========================================

mostrarPermisos();