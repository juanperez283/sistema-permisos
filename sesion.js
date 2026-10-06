// ==========================================
// SESIÓN
// ==========================================

const formulario =
    document.querySelector(
        ".formulario-login"
    );

const botonesRol =
    document.querySelectorAll(
        ".boton-rol"
    );

let rolSeleccionado =
    "estudiante";

const URL_API =
    "https://script.google.com/macros/s/AKfycbz-IcfUK5DEphiaGdXLyeLX0UXnnZS8ryuDS5A33gC2l6FFmfr5VZRiN0-_ejgmvyO6Lg/exec";

// ==========================================
// SELECCIONAR ROL
// ==========================================

botonesRol.forEach(
    function (boton) {

        boton.addEventListener(
            "click",
            function () {

                botonesRol.forEach(
                    function (otroBoton) {

                        otroBoton.classList.remove(
                            "activo"
                        );

                    }
                );

                boton.classList.add(
                    "activo"
                );

                if (
                    boton.querySelector(
                        "span"
                    ).textContent ===
                    "Estudiante"
                ) {

                    rolSeleccionado =
                        "estudiante";

                }

                if (
                    boton.querySelector(
                        "span"
                    ).textContent ===
                    "Profesor"
                ) {

                    rolSeleccionado =
                        "profesor";

                }

                if (
                    boton.querySelector(
                        "span"
                    ).textContent ===
                    "Administrador"
                ) {

                    rolSeleccionado =
                        "administrador";

                }

            }
        );

    }
);

// ==========================================
// INICIAR SESIÓN
// ==========================================

formulario.addEventListener(
    "submit",
    async function (evento) {

        evento.preventDefault();

        const correo =
            document
                .getElementById("correo")
                .value
                .trim();

        const contrasena =
            document
                .getElementById("contrasena")
                .value
                .trim();

        if (
            correo === "" ||
            contrasena === ""
        ) {

            alert(
                "Completa todos los campos."
            );

            return;

        }

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
                        body:
                            JSON.stringify({

                                accion:
                                    "iniciarSesion",

                                correo:
                                    correo,

                                contrasena:
                                    contrasena,

                                rol:
                                    rolSeleccionado

                            })

                    }
                );

            const resultado =
                await respuesta.json();

            if (
                resultado.resultado !==
                "exito"
            ) {

                alert(
                    resultado.mensaje
                );

                return;

            }

            // ==========================================
            // GUARDAR SESIÓN
            // ==========================================

            localStorage.setItem(
                "correo",
                resultado.correo
            );

            localStorage.setItem(
                "rolUsuario",
                resultado.rol
            );

            // ==========================================
            // REDIRECCIÓN
            // ==========================================

            if (
                resultado.rol ===
                "estudiante"
            ) {

                window.location.href =
                    "estudiante.html";

            }
            else if (
                resultado.rol ===
                "profesor"
            ) {

                window.location.href =
                    "profesor.html";

            }
            else if (
                resultado.rol ===
                "administrador"
            ) {

                window.location.href =
                    "administrador.html";

            }

        }
        catch (error) {

            console.error(
                "Error al iniciar sesión:",
                error
            );

            alert(
                "No se pudo conectar con el servidor."
            );

        }

    }
);