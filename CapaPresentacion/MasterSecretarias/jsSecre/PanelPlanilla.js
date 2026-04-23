
let tablaData;

$(document).ready(function () {
    cargarGestiones();
    cargarMeses();
});

function cargarGestiones() {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboGestion").html('<option value="">Cargando...</option>');

    $.ajax({
        url: "/PanelBiometrico.aspx/ListaGestiones",
        type: "POST",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                let opcionesHTML = '<option value="">Seleccione Gestion</option>';

                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdGestion}">${row.NombreGestion}</option>`;
                });

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

function cargarMeses() {

    $("#cboMes").html('<option value="">Cargando...</option>');

    $.ajax({
        url: "/PanelBiometrico.aspx/ListaMeses",
        type: "POST",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                let opcionesHTML = '<option value="">Seleccione un Mes</option>';

                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdMes}">${row.NombreMes}</option>`;
                });

                $("#cboMes").html(opcionesHTML);

            } else {
                $("#cboMes").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboMes").html('<option value="">Error de conexión</option>');
        }
    });
}

$("#btnBuscar").on("click", function () {

    let idGestion = $("#cboGestion").val();
    let idMes = $("#cboMes").val();
    // ¡AQUÍ ESTÁ LA LÍNEA QUE FALTABA!
    // Capturamos el valor que el usuario escribió en el input de texto
    let semanas = $("#txtSemanas").val().trim();

    if (idGestion === "") {
        MostrarToastZer("Por favor, seleccione una Gestion.", "Atención", "warning");
        $("#cboGestion").focus();
        return;
    }

    if (idMes === "") {
        MostrarToastZer("Por favor, seleccione un Mes.", "Atención", "warning");
        $("#cboMes").focus();
        return;
    }

    if (semanas === "") { // Ahora usamos la variable que acabamos de crear
        MostrarToastZer("Por favor, ingrese las semanas.", "Atención", "warning");
        $("#txtSemanas").focus();
        return;
    }

    if (parseInt(semanas) <= 0) {
        MostrarToastZer("El número de semanas debe ser mayor a cero.", "Atención", "warning");
        $("#txtSemanas").focus();
        return;
    }

    cargarDatosPlanilla(idGestion, idMes, semanas);

})

let listaDatosPlanilla = [];

function cargarDatosPlanilla(idGestion, idMes, semanas) {
    if ($.fn.DataTable.isDataTable("#tbData")) {
        $("#tbData").DataTable().destroy();
        $('#tbData tbody').empty();
    }

    var request = {
        IdGestion: parseInt(idGestion),
        IdMes: parseInt(idMes),
        Semanas: parseInt(semanas)
    };

    tablaData = $("#tbData").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PanelPlanilla.aspx/ObtenerDatosParaGenerarPlanilla',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",

            // 1. MOSTRAR OVERLAY: Se ejecuta justo antes de ir al servidor
            "beforeSend": function () {
                $("#cargann").LoadingOverlay("show");
            },

            "data": function () {
                return JSON.stringify(request);
            },
            "dataSrc": function (json) {
                if (json.d.Estado) {
                    listaDatosPlanilla = json.d.Data;
                    return json.d.Data;
                } else {
                    MostrarAlerta("¡Advertencia!", json.d.Mensaje, "warning");
                    return [];
                }
            },

            // 2. MANEJO DE ERRORES DE RED (Opcional pero recomendado)
            "error": function (xhr, error, thrown) {
                console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrown);
                MostrarToastZer("Ocurrió un error al cargar la planilla.", "Atención", "error");
            },

            // 3. OCULTAR OVERLAY: Se ejecuta SIEMPRE, haya éxito o error
            "complete": function () {
                $("#cargann").LoadingOverlay("hide");
            }
        },
        "columns": [
            { "data": "Docente", "className": "align-middle font-weight-bold" },
            { "data": "NombreMateria", "className": "align-middle text-primary" },
            {
                "data": null,
                "className": "text-center align-middle",
                render: function (data) {
                    return `<span title="Teóricas" class="text-info">${data.HT}</span> / 
                            <span title="Prácticas" class="text-success">${data.HP}</span> / 
                            <span title="Laboratorio" class="text-secondary">${data.HL}</span>`;
                }
            },
            { "data": "TotalMinutosAtraso", "className": "text-center align-middle text-danger font-weight-bold" },
            { "data": "TotalHorasNoTrabajadas", "className": "text-right align-middle" },
            { "data": "TotalHorasPeriodo", "className": "text-right align-middle" },
            { "data": "TotalHorasTrabajadas", "className": "text-right align-middle font-weight-bold" },
            {
                "data": "CostoHora",
                "className": "text-right align-middle",
                render: function (data) { return 'Bs. ' + parseFloat(data).toFixed(2); }
            },
            {
                "data": "IngresoTotal",
                "className": "text-right align-middle text-success",
                render: function (data) { return 'Bs. ' + parseFloat(data).toFixed(2); }
            },
            {
                "data": "TotalDescuentos",
                "className": "text-right align-middle text-danger",
                render: function (data) { return 'Bs. ' + parseFloat(data).toFixed(2); }
            },
            {
                "data": "TotalAPagar",
                "className": "text-right align-middle font-weight-bold text-primary",
                render: function (data) { return 'Bs. ' + parseFloat(data).toFixed(2); }
            }
        ],
        "order": [],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

// fin codigo