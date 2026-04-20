
// Variable global para la tabla
let tablaData;
let idEditar = 0;

$(document).ready(function () {
    listaAsignaciones();
    cargarBuscadorDocentes();
    cargarMateriasPorCarrera();
    cargarGestiones();
    cargarGrupos();
});

function listaAsignaciones() {
    // if ($.fn.DataTable.isDataTable("#tbData")) {
    //     $("#tbData").DataTable().destroy();
    //     $('#tbData tbody').empty();
    // }

    tablaData = $("#tbData").DataTable({
        responsive: true,
        "ajax": {
            "url": 'AsignacionDocente.aspx/ObtenerAsignacioneDocente',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (json) {
                if (json.d.Estado) {
                    return json.d.Data;
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdAsignacion", "visible": false, "searchable": false },
            { "data": "NomDocente", "className": "align-middle" },
            { "data": "CI", "className": "align-middle" },
            { "data": "NombreMateria", "className": "align-middle" },
            { "data": "NombreGrupo", "className": "align-middle" },
            { "data": "CargaHorariaMensual", "className": "align-middle" },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm mr-2"><i class="fas fa-pencil-alt"></i></button>' +
                    '<button class="btn btn-success btn-detalle btn-sm"><i class="fas fa-address-book"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "90px",
                "className": "text-center align-middle"
            }
        ],
        "order": [],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

function cargarGrupos() {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboGrupos").html('<option value="">Cargando...</option>');

    $.ajax({
        url: "AsignacionDocente.aspx/ListaGrupos",
        type: "POST",
        data: "{}", // <-- Mejor compatibilidad con WebMethods sin parámetros
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">Seleccione Grupo</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdGrupo}">${row.NombreGrupo}</option>`;
                });

                //$.each(response.d.Data, function (i, row) {
                //    if (row.Estado === true) {
                //        opcionesHTML += `<option value="${row.IdGrupo}">${row.NombreGrupo}</option>`;
                //    }
                //});

                // 3. Inyectamos todo al DOM en un solo movimiento
                $("#cboGrupos").html(opcionesHTML);

            } else {
                $("#cboGrupos").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboGrupos").html('<option value="">Error de conexión</option>');
        }
    });
}

function cargarGestiones() {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboGestion").html('<option value="">Cargando...</option>');

    $.ajax({
        url: "AsignacionDocente.aspx/ListaGestiones",
        type: "POST",
        data: "{}", // <-- Mejor compatibilidad con WebMethods sin parámetros
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">Seleccione Gestion</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdGestion}">${row.NombreGestion}</option>`;
                });

                //$.each(response.d.Data, function (i, row) {
                //    if (row.Estado === true) {
                //        opcionesHTML += `<option value="${row.IdGestion}">${row.NombreGestion}</option>`;
                //    }
                //});

                // 3. Inyectamos todo al DOM en un solo movimiento
                $("#cboGestion").html(opcionesHTML);

            } else {
                $("#cboGestion").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboGestion").html('<option value="">Error de conexión</option>');
        }
    });
}

function cargarMateriasPorCarrera() {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboMaterias").html('<option value="">Cargando...</option>');

    $.ajax({
        url: "PanelMaterias.aspx/MateriasPorCarreraYSemestreAsi",
        type: "POST",
        data: "{}", // <-- Mejor compatibilidad con WebMethods sin parámetros
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">Seleccione Materia</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdMateria}">${row.NombreMateria}</option>`;
                });

                //$.each(response.d.Data, function (i, row) {
                //    if (row.Estado === true) {
                //        opcionesHTML += `<option value="${row.IdGradoAcademico}">${row.Nombre}</option>`;
                //    }
                //});

                // 3. Inyectamos todo al DOM en un solo movimiento
                $("#cboMaterias").html(opcionesHTML);

            } else {
                $("#cboMaterias").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboMaterias").html('<option value="">Error de conexión</option>');
        }
    });
}

// inicio configuracion docentes
function cargarBuscadorDocentes() {
    $("#cboBuscarDocente").select2({
        ajax: {
            url: "/PanelDocentes.aspx/FiltroDocentes",
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            delay: 250,
            data: function (params) {
                return JSON.stringify({ busqueda: params.term });
            },
            processResults: function (data) {
                return {
                    results: data.d.Data.map((item) => ({
                        id: item.IdDocente,
                        text: item.Nombres + ' ' + item.Apellidos,
                        nroCi: item.CI,
                        celular: item.Celular,
                        imagen: item.ImagenUrl,
                        dataCompleta: item
                    }))
                };
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            }
        },
        language: "es",
        placeholder: 'Buscar por Nombre o CI...',
        minimumInputLength: 3,
        templateResult: formatoResultadosDocente
    });
}

function formatoResultadosDocente(data) {
    if (data.loading) return data.text;

    var imagenMostrar = data.imagen ? data.imagen : '../images/sinFoto.png';

    var contenedor = $(
        `<div class="d-flex align-items-center">
            <img src="${imagenMostrar}" style="height:40px; width:40px; margin-right:10px; border-radius:50%; object-fit:cover;"/>
            <div>
                <div style="font-weight: bold;">${data.text}</div>
                <div style="font-size: 0.85em; color: #666;">CI: ${data.nroCi} | Cel: ${data.celular}</div>
            </div>
         </div>`
    );

    return contenedor;
}

$("#cboBuscarDocente").on("select2:select", function (e) {
    const data = e.params.data;
    $("#txtIdDocente").val(data.id);
    $("#lblNombres").text("Doc: " + data.text);
    $("#lblDatos").text("Nro CI: " + data.nroCi);
    $("#imgDoce").attr("src", data.imagen || "../images/sinFoto.png");
    $("#cboBuscarDocente").val(null).trigger("change");
});

// 1. FUNCIÓN PARA LIMPIAR Y REINICIAR ESTADOS
function limpiarFormulario() {
    idEditar = 0;

    // Limpiar combos (ajusta si usas Select2)
    //$("#cboBuscarDocente").val("");
    $("#cboGestion").val("");
    $("#cboMaterias").val("");
    $("#cboGrupos").val("");

    // Restablecer números
    $("#txtCostoHora").val("0");
    $("#txtCargaHoraria").val("0");
    $("#txtIdDocente").val("0");

    // Restablecer visuales del docente
    $("#lblNombres").text("Esperando..");
    $("#lblDatos").text("Esperando..");
    $("#imgDoce").attr("src", "../images/sinFoto.png");

    // Bloquear el botón de guardar y regresar su texto original
    $('#btnGuardarRegistro').prop('disabled', true);
    $('#btnGuardarRegistro').html('<i class="fas fa-save mr-2"></i>Guardar Asignación').removeClass('btn-warning').addClass('btn-success');
}

// 2. EVENTO: NUEVO REGISTRO
$("#btnNuevoRegistro").on("click", function () {
    limpiarFormulario();
    $('#btnGuardarRegistro').prop('disabled', false); // Habilitamos para registrar
    //$("#cboBuscarDocente").select2("open");
    //$("#cboBuscarDocente").focus();
});

// 3. EVENTO: EDITAR REGISTRO
$('#tbData tbody').on('click', '.btn-editar', function () {
    let fila = $(this).closest('tr');
    if (fila.hasClass('child')) { fila = fila.prev(); }
    let data = tablaData.row(fila).data();

    idEditar = data.IdAsignacion;

    // Llenar campos
    $("#cboGestion").val(data.IdGestion);
    $("#cboMaterias").val(data.IdMateria);
    $("#cboGrupos").val(data.IdGrupo);
    $("#txtCostoHora").val(data.CostoHora);
    $("#txtCargaHoraria").val(data.CargaHorariaMensual);
    $("#txtIdDocente").val(data.IdDocente);

    // Llenar tarjeta visual del docente
    $("#lblNombres").text("Doc: " + data.NomDocente);
    $("#lblDatos").text("Nro CI: " + data.CI);
    $("#imgDoce").attr("src", data.ImagenUrl || "../images/sinFoto.png");

    // Habilitar botón de guardar y cambiar su apariencia para indicar Edición
    $('#btnGuardarRegistro').prop('disabled', false);
    $('#btnGuardarRegistro').html('<i class="fas fa-sync-alt mr-2"></i>Actualizar Asignación').removeClass('btn-success').addClass('btn-warning');
});

$('#tbData tbody').on('click', '.btn-detalle', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    const textoSms = `Detalle asignacion de: ${data.NombreMateria}.`;
    MostrarAlerta("¡Mensaje!", textoSms, "info");

});

// 4. EVENTO: GUARDAR REGISTRO
function habilitarBoton() {
    // Solo habilitamos si realmente se está intentando guardar algo válido
    if (idEditar !== 0 || $("#txtIdDocente").val() !== "0") {
        $('#btnGuardarRegistro').prop('disabled', false);
    }
}

$("#btnGuardarRegistro").on("click", function () {

    $('#btnGuardarRegistro').prop('disabled', true);

    let idGestion = $("#cboGestion").val();
    let idMateria = $("#cboMaterias").val();
    let idGrupo = $("#cboGrupos").val();
    let costoHora = $("#txtCostoHora").val().trim();

    let idDocente = $("#txtIdDocente").val().trim();

    if (idDocente === "0" || idDocente === "") {
        MostrarToastZer("Por favor, Seleccione un Docente", "Atención", "warning");
        habilitarBoton();
        return;
    }

    if (costoHora === "" || isNaN(costoHora)) {
        MostrarToastZer("Por favor, ingrese el Costo Hr. valido", "Atención", "warning");
        $("#txtCostoHora").focus();
        habilitarBoton();
        return;
    }

    if ($("#txtCargaHoraria").val().trim() === "") {
        MostrarToastZer("Por favor, ingrese la Carga Hrs.", "Atención", "warning");
        $("#txtCargaHoraria").focus();
        habilitarBoton();
        return;
    }

    if (idGestion === "") {
        MostrarToastZer("Por favor, seleccione una Gestion.", "Atención", "warning");
        $("#cboGestion").focus();
        habilitarBoton();
        return;
    }

    if (idMateria === "") {
        MostrarToastZer("Por favor, seleccione una Materia.", "Atención", "warning");
        $("#cboMaterias").focus();
        habilitarBoton();
        return;
    }

    if (idGrupo === "") {
        MostrarToastZer("Por favor, seleccione un Grupo.", "Atención", "warning");
        $("#cboGrupos").focus();
        habilitarBoton();
        return;
    }

    const costoFinal = parseFloat(costoHora);

    if (costoFinal <= 0) {
        MostrarToastZer("El costo Hora debe ser mayor a 0.", "Atención", "warning");
        $("#txtCostoHora").focus();
        habilitarBoton();
        return;
    }

    const objeto = {
        IdAsignacion: idEditar,
        IdDocente: parseInt(idDocente),
        IdMateria: parseInt(idMateria),
        IdGestion: parseInt(idGestion),
        IdGrupo: parseInt(idGrupo),
        CostoHora: costoFinal,
        CargaHorariaMensual: parseInt($("#txtCargaHoraria").val()) || 0
    }

    $("#loadinzero").LoadingOverlay("show");

    const url = idEditar === 0 ? "AsignacionDocente.aspx/RegistroAsignacion" : "AsignacionDocente.aspx/EditarAsignacion";

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify({ objeto: objeto }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#loadinzero").LoadingOverlay("hide");

            AlertaTimerTipo(
                response.d.Estado ? '¡Excelente!' : 'Atención',
                response.d.Mensaje,
                response.d.Valor
            );

            if (response.d.Estado) {
                // RECARGA OPTIMIZADA (No destruye la tabla)
                if (tablaData) {
                    tablaData.ajax.reload(null, false);
                }

                // LIMPIAR TODO EL FORMULARIO Y BLOQUEAR BOTÓN
                limpiarFormulario();
            }

        },
        error: function (xhr) {
            console.log(xhr.responseText);
            $("#loadinzero").LoadingOverlay("hide");
            MostrarToastZer("No se pudo conectar con el servidor.", "Atención", "error");
        },
        complete: function () {
            habilitarBoton();
        }
    });

})

// fin codigo