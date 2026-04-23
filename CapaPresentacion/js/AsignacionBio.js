
$(document).ready(function () {
    $("#cboCarreras").empty().append('<option value="">-- Seleccione grado primero --</option>');
    cargarGestiones();
    cargarGradosAcadeTable();
    cargarMeses();
});

function cargarMeses() {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboMes").html('<option value="">Cargando...</option>');

    $.ajax({
        url: "PanelBiometrico.aspx/ListaMeses",
        type: "POST",
        data: "{}", // <-- Mejor compatibilidad con WebMethods sin parámetros
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">Seleccione un Mes</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdMes}">${row.NombreMes}</option>`;
                });

                // 3. Inyectamos todo al DOM en un solo movimiento
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
    $("#tbData tbody").html("");
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


function cargarGestiones() {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboGestion").html('<option value="">Cargando...</option>');

    $.ajax({
        url: "PanelBiometrico.aspx/ListaGestiones",
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

$("#btnBuscar").on("click", function () {

    let idGestion = $("#cboGestion").val();
    let idGrado = $("#cboGradosData").val();
    let idCarrera = $("#cboCarreras").val();

    if (idGestion === "") {
        MostrarToastZer("Por favor, seleccione una Gestion.", "Atención", "warning");
        $("#cboGestion").focus();
        return;
    }

    if (idGrado === "") {
        MostrarToastZer("Por favor, seleccione un Grado.", "Atención", "warning");
        $("#cboGradosData").focus();
        return;
    }

    if (idCarrera === "") {
        MostrarToastZer("Por favor, seleccione una Carrera.", "Atención", "warning");
        $("#cboCarreras").focus();
        return;
    }

    cargarDatosBio(idCarrera, idGestion);

})

let listaDatosBio = [];

function cargarDatosBio(idCarrera, idGestion) {

    $("#tbData tbody").html("");

    var request = {
        IdCarrera: parseInt(idCarrera),
        IdGestion: parseInt(idGestion)
    };

    $.ajax({
        url: "PanelBiometrico.aspx/AsignacionBiometrico",
        type: "POST",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {

            if (response.d.Estado) {

                listaDatosBio = response.d.Data;

                listaDatosBio.forEach((item, index) => {

                    $("#tbData tbody").append(
                        $("<tr>").append(

                            $("<td class='text-center'>").append(
                                $("<span>")
                                    .addClass("docente-badge")
                                    .text(item.Docente)
                            ),

                            $("<td>").html(
                                "<i class='fas fa-book mr-2 text-primary'></i>" +
                                item.NombreMateria
                            ),

                            $("<td class='text-center'>").append(
                                $("<span>")
                                    .addClass("semestre-badge")
                                    .text(item.NombreSemestre)
                            ),

                            $("<td class='text-center'>").append(
                                $("<input>").attr({
                                    type: "number",
                                    value: 0,
                                    min: 0,
                                    step: "1",
                                    class: "form-control cantidad-input input-reducido input-atraso",
                                    "data-index": index
                                }).on("input", function () {

                                    if (this.value === "" ||
                                        isNaN(this.value) ||
                                        parseInt(this.value) < 0) {

                                        this.value = 0;
                                    }

                                })
                            )

                        )
                    );
                });
            } else {
                MostrarAlerta("¡Advertencia!", response.d.Mensaje, "warning");
            }
        }
    });
}

$('#btnRegistroBio').on('click', function () {

    let idMes = $("#cboMes").val();
    let listaFinal = [];
    let valido = true;
    let primerInputInvalido = null;

    $('#btnRegistroBio').prop('disabled', true);

    if (idMes === "") {
        MostrarToastZer("Por favor, seleccione un Mes.", "Atención", "warning");
        $("#cboMes").focus();
        $('#btnRegistroBio').prop('disabled', false);
        return;
    }

    $(".cantidad-input").each(function () {
        let inputSelect = $(this);
        let valor = inputSelect.val();

        // 1. Limpiamos nuestra clase de error por si ya lo corrigió
        inputSelect.removeClass("input-error");

        // 2. Validación de respaldo (por si burlaron tu evento 'input')
        if (valor === "" || isNaN(valor) || parseInt(valor) < 0) {
            valido = false;

            // Le aplicamos tu nueva clase roja que respeta tus bordes
            inputSelect.addClass("input-error");

            if (!primerInputInvalido) {
                primerInputInvalido = inputSelect;
            }
        } else {
            let minutos = parseInt(valor);
            let index = inputSelect.data("index");

            // 3. Agregamos a la lista, asegurando que si es 0 también se mande
            listaFinal.push({
                IdAsignacion: listaDatosBio[index].IdAsignacion,
                TotalMinutosAtraso: minutos
            });
        }
    });

    // Si hay error, no registra
    if (!valido) {
        MostrarAlerta("¡Advertencia!", "Verifique los minutos ingresados. Hay valores no válidos.", "warning");
        if (primerInputInvalido) primerInputInvalido.focus();
        $('#btnRegistroBio').prop('disabled', false);
        return;
    }

    // Si no cargaron datos en la tabla aún
    if (listaFinal.length === 0) {
        MostrarToastZer("No hay docentes en la lista para registrar.", "Atención", "info");
        $('#btnRegistroBio').prop('disabled', false);
        return;
    }

    //console.log(listaFinal);

    // Si todo está perfecto, disparamos el AJAX
    registrarAsistenciaBio(listaFinal, idMes);

});

function registrarAsistenciaBio(listaFinal, idMes) {
    $("#cargann").LoadingOverlay("show");

    $.ajax({
        type: "POST",
        url: "PanelBiometrico.aspx/GuardarBiometrico",
        data: JSON.stringify({ listaAtrasos: listaFinal, idMes: parseInt(idMes) }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#cargann").LoadingOverlay("hide");

            AlertaTimerTipo(
                response.d.Estado ? '¡Excelente!' : 'Atención',
                response.d.Mensaje,
                response.d.Valor
            );

            if (response.d.Estado) {
                // Limpiamos la tabla visualmente y vaciamos el array
                $("#tbData tbody").html("");
                listaDatosBio = [];

                // Opcional: Podrías resetear el combo del mes aquí si lo deseas
                $("#cboMes").val("");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#cargann").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            MostrarToastZer("No se pudo conectar con el servidor.", "Atención", "error");
        },
        complete: function () {
            $('#btnRegistroBio').prop('disabled', false);
        }
    });
}

// fin