// ==========================================
// GESTIÓN DE PERMISOS
// ==========================================

const nombreUsuario =
    document.getElementById(
        "nombreUsuario"
    );

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
// MOSTRAR USUARIO
// ==========================================

const correoUsuario =
    localStorage.getItem(
        "correo"
    );

if (correoUsuario) {

    nombreUsuario.textContent =
        correoUsuario;

}

// ==========================================
// CAMBIAR ESTADO
// ==========================================

async function cambiarEstado(
    id,
    nuevoEstado
) {

    try {

        const respuesta =
            await fetch(
                URL_API,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body: JSON.stringify({

                        accion:
                            "actualizarEstado",

                        id:
                            id,

                        nuevoEstado:
                            nuevoEstado

                    })

                }
            );

        const resultado =
            await respuesta.json();

        console.log(
            resultado
        );

        if (
            resultado.resultado !==
            "exito"
        ) {

            throw new Error(
                resultado.mensaje ||
                "No se pudo actualizar el estado."
            );

        }

        await mostrarPermisos();

    }
    catch (error) {

        console.error(
            "Error al cambiar estado:",
            error
        );

        alert(
            "No se pudo actualizar el permiso."
        );

    }

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

        listaPermisos.innerHTML =
            "";

        // ----------------------------------
        // NO HAY PERMISOS
        // ----------------------------------

        if (
            permisos.length === 0
        ) {

            sinPermisos.style.display =
                "block";

            return;

        }

        sinPermisos.style.display =
            "none";

        // ----------------------------------
        // MÁS ANTIGUO PRIMERO
        // ----------------------------------

        const permisosOrdenados =
            [...permisos].sort(
                function (a, b) {

                    return (
                        Number(a.fechaCreacion) -
                        Number(b.fechaCreacion)
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

                const motivo =
                    permiso.motivo ||
                    "Sin motivo";

                const nombreArchivo =
                    permiso.nombreArchivo ||
                    "Sin archivo";

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
                // ARCHIVO
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

                            ${curso}

                        </div>

                        <div class="dato">

                            <strong>
                                Paralelo
                            </strong>

                            ${paralelo}

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

                // ----------------------------------
                // BOTONES PENDIENTES
                // ----------------------------------

                if (
                    permiso.estado ===
                    "Pendiente"
                ) {

                    const botones =
                        document.createElement(
                            "div"
                        );

                    botones.className =
                        "botones";

                    // ------------------------------
                    // APROBAR
                    // ------------------------------

                    const botonAprobar =
                        document.createElement(
                            "button"
                        );

                    botonAprobar.type =
                        "button";

                    botonAprobar.className =
                        "boton-aprobar";

                    botonAprobar.textContent =
                        "✓ Aprobar";

                    botonAprobar.addEventListener(
                        "click",
                        function () {

                            cambiarEstado(
                                permiso.id,
                                "Aprobado"
                            );

                        }
                    );

                    // ------------------------------
                    // RECHAZAR
                    // ------------------------------

                    const botonRechazar =
                        document.createElement(
                            "button"
                        );

                    botonRechazar.type =
                        "button";

                    botonRechazar.className =
                        "boton-rechazar";

                    botonRechazar.textContent =
                        "✕ Rechazar";

                    botonRechazar.addEventListener(
                        "click",
                        function () {

                            cambiarEstado(
                                permiso.id,
                                "Rechazado"
                            );

                        }
                    );

                    botones.appendChild(
                        botonAprobar
                    );

                    botones.appendChild(
                        botonRechazar
                    );

                    tarjeta.appendChild(
                        botones
                    );

                }

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
// VOLVER
// ==========================================

btnVolver.addEventListener(
    "click",
    function () {

        window.location.href =
            "administrador.html";

    }
);

// ==========================================
// CARGAR
// ==========================================

mostrarPermisos();