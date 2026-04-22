
let tablaData;
let idEditar = 0;

$(document).ready(function () {
    cargarRoles();
    cargarGradosAcadeTable();
});

function cargarRoles() {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboRoles").html('<option value="">Cargando...</option>');

    $.ajax({
        url: "UsuariosPage.aspx/ListaRoles",
        type: "POST",
        data: "{}", // <-- Mejor compatibilidad con WebMethods sin parámetros
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">Seleccione Rol</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdRol}">${row.NombreRol}</option>`;
                });

                //$.each(response.d.Data, function (i, row) {
                //    if (row.Estado === true) {
                //        opcionesHTML += `<option value="${row.IdGestion}">${row.NombreGestion}</option>`;
                //    }
                //});

                // 3. Inyectamos todo al DOM en un solo movimiento
                $("#cboRoles").html(opcionesHTML);

            } else {
                $("#cboRoles").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboRoles").html('<option value="">Error de conexión</option>');
        }
    });
}

function cargarGradosAcadeTable() {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboGradosData").html('<option value="">Cargando grados...</option>');

    $.ajax({
        url: "PanelGrados.aspx/ListaGradosAcademicos",
        type: "POST",
        data: "{}", // <-- Mejor compatibilidad con WebMethods sin parámetros
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">-- Seleccione un Grado --</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdGradoAcademico}">${row.GradoAcademico}</option>`;
                });

                //$.each(response.d.Data, function (i, row) {
                //    if (row.Estado === true) {
                //        opcionesHTML += `<option value="${row.IdGradoAcademico}">${row.Nombre}</option>`;
                //    }
                //});

                // 3. Inyectamos todo al DOM en un solo movimiento
                $("#cboGradosData").html(opcionesHTML);

            } else {
                $("#cboGradosData").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboGradosData").html('<option value="">Error de conexión</option>');
        }
    });
}

$("#cboGradosData").on("change", function () {
    const idGrados = $(this).val();

    $("#cboCarreras").empty().append('<option value="">Seleccione Carrera</option>');
    $("#cboCarreras").prop("disabled", true);

    if (idGrados) {
        cargarCarreras(idGrados);
    }
});

function cargarCarreras(idGrados) {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboCarreras").html('<option value="">Cargando...</option>');

    var request = {
        IdGradoAcademico: parseInt(idGrados)
    };

    $.ajax({
        url: "PanelCarreras.aspx/ObtenerCarrerasPorGrado",
        type: "POST",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">Seleccione</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdCarrera}">${row.NombreCarrera}</option>`;
                });

                $("#cboCarreras").html(opcionesHTML);
                $("#cboCarreras").prop("disabled", false);

            } else {
                $("#cboCarreras").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboCarreras").html('<option value="">Error de conexión</option>');
        }
    });
}

$("#btnRegistro").on("click", function () {

    idEditar = 0;

    $("#txtNombres").val("");
    $("#txtApellidos").val("");
    $("#txtCorreo").val("");
    $("#txtNroci").val("");
    $("#cboRoles").val("");

    //$("#cboGradosData").val("");
    //$("#cboCarreras").val("");

    $("#cboEstado").val(1).prop("disabled", true);

    $('#imgDirectReg').attr('src', "images/sinFoto.png");
    $("#txtFotoUr").val("");
    $(".custom-file-label").text('Ningún archivo seleccionado');

    $("#myModalLabel").text("Nuevo Registro");

    $("#mdData").modal("show");

})

const TAMANO_MAXIMO = 2 * 1024 * 1024; // 2 MB en bytes

function esImagen(file) {
    return file && file.type.startsWith("image/");
}

function mostrarImagenSeleccionada(input) {
    let file = input.files[0];
    let reader = new FileReader();

    // Si NO se seleccionó archivo (ej: presionaron "Cancelar")
    if (!file) {
        resetearVistaFoto(input);
        //$('#imgDirectReg').attr('src', "images/sinFoto.png");
        //$(input).next('.custom-file-label').text('Ningún archivo seleccionado');
        return;
    }

    // Validación: si no es imagen, mostramos error
    if (!esImagen(file)) {
        MostrarToastZer("El archivo seleccionado no es una imagen válida.", "Atención", "error");
        //toastr.error("El archivo seleccionado no es una imagen válida.");
        resetearVistaFoto(input);
        //$('#imgDirectReg').attr('src', "images/sinFoto.png");
        //$(input).next('.custom-file-label').text('Ningún archivo seleccionado');
        //input.value = "";
        return;
    }

    // 3. Validación: Tamaño máximo
    if (file.size > TAMANO_MAXIMO) {
        toastr.error("La imagen supera el tamaño máximo permitido de 2 MB.");
        resetearVistaFoto(input);
        return;
    }

    // Si todo es válido → mostrar vista previa
    reader.onload = (e) => $('#imgDirectReg').attr('src', e.target.result);
    reader.readAsDataURL(file);

    // Mostrar nombre del archivo
    $(input).next('.custom-file-label').text(file.name);
}

// Función auxiliar para limpiar (DRY - Don't Repeat Yourself)
function resetearVistaFoto(input) {
    $('#imgDirectReg').attr('src', "images/sinFoto.png");
    $(input).next('.custom-file-label').text('Ningún archivo seleccionado');
    input.value = ""; // Limpia el input file
}

$('#txtFotoUr').change(function () {
    mostrarImagenSeleccionada(this);
});

function habilitarBoton() {
    $('#btnGuardarCambios').prop('disabled', false);
}


$("#btnGuardarCambios").on("click", function () {
    // Bloqueo inmediato
    $('#btnGuardarCambios').prop('disabled', true);

    let idRol = $("#cboRoles").val();
    let idCarrera = $("#cboCarreras").val();

    const inputs = $("#mdData input.model").serializeArray();
    const inputs_sin_valor = inputs.filter(item => item.value.trim() === "");

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo: "${inputs_sin_valor[0].name}"`;
        MostrarToastZer(mensaje, "Atención", "warning");
        //toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus();
        habilitarBoton();
        return;
    }

    if (idRol === "") {
        MostrarToastZer("Por favor, seleccione un Rol.", "Atención", "warning");
        $("#cboRoles").focus();
        habilitarBoton();
        return;
    }

    if (idCarrera === "") {
        MostrarToastZer("Por favor, seleccione una Carrera.", "Atención", "warning");
        $("#cboCarreras").focus();
        habilitarBoton();
        return;
    }

    // 2. ARMAR EL OBJETO
    const objeto = {
        IdUsuario: idEditar,
        IdRol: parseInt(idRol),
        IdCarrera: parseInt(idCarrera),
        Nombres: $("#txtNombres").val().trim(),
        Apellidos: $("#txtApellidos").val().trim(),
        Correo: $("#txtCorreo").val().trim(),
        NroCi: $("#txtNroci").val().trim(),
        Estado: ($("#cboEstado").val() === "1" ? true : false),
        FotoUrl: "" // Lo enviamos siempre vacío. Si hay foto nueva, el Base64 la reemplazará en C#.
    };

    // 3. PROCESAR EL INPUT FILE
    const fileInput = document.getElementById('txtFotoUr');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Extraemos solo el texto Base64, quitando la cabecera (data:image/jpeg;base64,)
            const base64String = e.target.result.split(',')[1];

            // Disparamos el AJAX enviando la imagen
            enviarAjaxUsuarios(objeto, base64String);
        };
        reader.readAsDataURL(file);
    } else {
        // Si no hay foto, disparamos el AJAX mandando el base64 vacío
        enviarAjaxUsuarios(objeto, "");
    }

});

function enviarAjaxUsuarios(objeto, base64String) {
    $("#mdData").find("div.modal-content").LoadingOverlay("show");

    $.ajax({
        type: "POST",
        url: "UsuariosPage.aspx/GuardarOrEditUsuarios",
        data: JSON.stringify({ objeto: objeto, base64Image: base64String }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#mdData").find("div.modal-content").LoadingOverlay("hide");

            AlertaTimerTipo(
                response.d.Estado ? '¡Excelente!' : 'Atención', // Título dinámico
                response.d.Mensaje, // Texto del servidor
                response.d.Valor // Icono (success/error/warning)
            );

            if (response.d.Estado) {
                $("#mdData").modal("hide");
                idEditar = 0;
            }
        },
        error: function () {
            $("#mdData").find("div.modal-content").LoadingOverlay("hide");
            MostrarToastZer("No se pudo conectar con el servidor.", "Atención", "error");
            //toastr.error("No se pudo conectar con el servidor.");
        },
        complete: function () {
            habilitarBoton();
        }
    });
}

// fin