// ==========================================
// MIS PERMISOS
// ==========================================

const listaPermisos =
    document.getElementById(
        "listaPermisos"
    );

const sinPermisos =
    document.getElementById(
        "sinPermisos"
    );

const btnVolver =
    document.getElementById(
        "btnVolver"
    );

const URL_API =
    "https://script.google.com/macros/s/AKfycbz-IcfUK5DEphiaGdXLyeLX0UXnnZS8ryuDS5A33gC2l6FFmfr5VZRiN0-_ejgmvyO6Lg/exec";

// ==========================================
// MOSTRAR PERMISOS
// ==========================================

async function mostrarPermisos() {

    try {

        const correoUsuario =
            localStorage.getItem(
                "correo"
            );

        if (!correoUsuario) {

            alert(
                "No se encontró la sesión del estudiante."
            );

            return;

        }

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

        // ----------------------------------
        // FILTRAR PERMISOS DEL ESTUDIANTE
        // ----------------------------------

        const misPermisos =
            permisos.filter(
                function (permiso) {

                    return (
                        permiso.correoUsuario ===
                        correoUsuario
                    );

                }
            );

        listaPermisos.innerHTML =
            "";

        // ----------------------------------
        // NO HAY PERMISOS
        // ----------------------------------

        if (
            misPermisos.length === 0
        ) {

            sinPermisos.style.display =
                "block";

            return;

        }

        sinPermisos.style.display =
            "none";

        // ----------------------------------
        // ORDENAR DEL MÁS NUEVO AL MÁS VIEJO
        // ----------------------------------

        const permisosOrdenados =
            [...misPermisos].sort(
                function (a, b) {

                    return (
                        Number(b.fechaCreacion) -
                        Number(a.fechaCreacion)
                    );

                }
            );

        // ----------------------------------
        // CREAR TARJETAS
        // ----------------------------------

        permisosOrdenados.forEach(
            function (permiso) {

                const tarjeta =
                    document.createElement(
                        "article"
                    );

                tarjeta.className =
                    "tarjeta-permiso";

                // ----------------------------------
                // ESTADO
                // ----------------------------------

                let claseEstado =
                    "estado-pendiente";

                if (
                    permiso.estado ===
                    "Aprobado"
                ) {

                    claseEstado =
                        "estado-aprobado";

                }

                if (
                    permiso.estado ===
                    "Rechazado"
                ) {

                    claseEstado =
                        "estado-rechazado";

                }

                // ----------------------------------
                // DATOS
                // ----------------------------------

                const nombreEstudiante =
                    permiso.nombreEstudiante ||
                    "No registrado";

                const nombrePadre =
                    permiso.nombrePadre ||
                    "No registrado";

                const curso =
                    permiso.curso ||
                    "No registrado";

                const paralelo =
                    permiso.paralelo ||
                    "No registrado";

                const fechaSolicitud =
                    permiso.fechaSolicitud ||
                    "No registrada";

                const fechaPermiso =
                    permiso.fechaPermiso ||
                    "No registrada";

                const nombreArchivo =
                    permiso.nombreArchivo ||
                    "Sin archivo";

                const motivo =
                    permiso.motivo ||
                    "Sin motivo";

                // ----------------------------------
                // ENLACE DEL ARCHIVO
                // ----------------------------------

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

                // ----------------------------------
                // TARJETA
                // ----------------------------------

                tarjeta.innerHTML = `

                    <div class="cabecera-permiso">

                        <h3>
                            ${curso}
                            -
                            Paralelo
                            ${paralelo}
                        </h3>

                        <span
                            class="estado ${claseEstado}"
                        >
                            ${permiso.estado}
                        </span>

                    </div>

                    <div class="datos">

                        <div class="dato">

                            <strong>
                                Estudiante
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
                                Fecha de solicitud
                            </strong>

                            ${fechaSolicitud}

                        </div>

                        <div class="dato">

                            <strong>
                                Fecha respaldada
                            </strong>

                            ${fechaPermiso}

                        </div>

                        <div class="dato">

                            <strong>
                                Archivo
                            </strong>

                            ${archivoHTML}

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
// BOTÓN VOLVER
// ==========================================

btnVolver.addEventListener(
    "click",
    function () {

        window.location.href =
            "estudiante.html";

    }
);

// ==========================================
// EJECUTAR
// ==========================================

mostrarPermisos();