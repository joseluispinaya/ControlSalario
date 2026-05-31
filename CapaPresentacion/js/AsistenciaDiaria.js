


$(document).ready(function () {

    $("#cboCarreras").empty().append('<option value="">-- Seleccione grado primero --</option>');
    cargarGestiones();
    cargarGradosAcadeTable();

    // Evento del botón buscar
    $("#btnBuscar").on("click", function () {
        // Aquí podrías poner una validación básica, ej: if($("#txtFechaAsistencia").val() == "") { MostrarAlerta... }

        // Llamamos a la función ficticia
        listaAsistencia();
    });

    // Delegación de eventos para el cambio de estado (Presente / Falta / Licencia)
    // Usamos delegación porque las filas se crean dinámicamente
    $("#tbData tbody").on("change", ".selEstadoAsistencia", function () {
        let valorSeleccionado = $(this).val();
        let fila = $(this).closest("tr");
        let inputsHora = fila.find(".txtHoraIngreso, .txtHoraSalida");
        let badgeAtraso = fila.find(".badge-atraso");

        if (valorSeleccionado === "1") { // Presente
            inputsHora.prop("disabled", false);
        } else { // Falta (2) o Licencia (3)
            inputsHora.prop("disabled", true);
            inputsHora.val(""); // Limpiamos las horas ingresadas

            // Opcional: Cambiar visualmente el atraso a 0 o un texto
            badgeAtraso.text("0 min").removeClass("badge-danger").addClass("badge-success");
        }
    });

});

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

// Función con datos Hardcodeados para pruebas de diseño
function listaAsistencia() {

    // 1. Limpiamos la tabla
    $("#tbData tbody").html("");

    // 2. Simulamos lo que devolvería tu C# (Response.d.Data)
    const mockData = [
        {
            IdHorario: 10,
            IdAsistenciaDiaria: 150, // Ya tiene registro guardado previamente
            Docente: "Ing. Marcelo Soliz",
            NombreMateria: "Redes de Computadoras II",
            HoraEntradaProgramada: "15:45",
            HoraSalidaProgramada: "17:15",
            HoraIngreso: "15:51", // Llegó tarde
            HoraSalida: "17:21",
            MinutosAtraso: 6,
            IdEstadoAsistencia: 1 // Presente
        },
        {
            IdHorario: 11,
            IdAsistenciaDiaria: 0, // Registro nuevo, aún no guardado
            Docente: "Ing. Marbin Aponte",
            NombreMateria: "Bases de Datos II",
            HoraEntradaProgramada: "08:00",
            HoraSalidaProgramada: "09:30",
            HoraIngreso: null,
            HoraSalida: null,
            MinutosAtraso: 0,
            IdEstadoAsistencia: 1 // Por defecto Presente
        },
        {
            IdHorario: 12,
            IdAsistenciaDiaria: 151,
            Docente: "Ing. Josue Moreno",
            NombreMateria: "Sistemas Operativos",
            HoraEntradaProgramada: "10:00",
            HoraSalidaProgramada: "12:00",
            HoraIngreso: null,
            HoraSalida: null,
            MinutosAtraso: 0,
            IdEstadoAsistencia: 2 // Tiene una falta ya registrada
        }
    ];

    // 3. Recorremos los datos y armamos el HTML
    mockData.forEach((item) => {

        // Verificamos si los inputs deben estar bloqueados desde el inicio (Ej: si ya era Falta)
        let disabledInputs = (item.IdEstadoAsistencia != 1) ? "disabled" : "";

        // Verificamos color del badge de atraso
        let badgeClass = (item.MinutosAtraso > 0) ? "badge-danger" : "badge-success";

        // HTML limpio usando Template Literals
        let tr = `
            <tr>
                <input type="hidden" class="hdnIdHorario" value="${item.IdHorario}">
                <input type="hidden" class="hdnIdAsistenciaDiaria" value="${item.IdAsistenciaDiaria}">

                <td class="text-left align-middle font-weight-bold">${item.Docente}</td>
                
                <td class="text-left align-middle">
                    <i class="fas fa-book mr-2 text-primary"></i>${item.NombreMateria}
                </td>
                
                <td class="align-middle">
                    <span class="badge badge-info text-dark" style="font-size: 13px;">
                        ${item.HoraEntradaProgramada} - ${item.HoraSalidaProgramada}
                    </span>
                </td>
                
                <td class="align-middle">
                    <select class="custom-select custom-select-sm selEstadoAsistencia">
                        <option value="1" ${item.IdEstadoAsistencia == 1 ? 'selected' : ''}>Presente</option>
                        <option value="2" ${item.IdEstadoAsistencia == 2 ? 'selected' : ''}>Falta</option>
                        <option value="3" ${item.IdEstadoAsistencia == 3 ? 'selected' : ''}>Licencia</option>
                    </select>
                </td>

                <td class="align-middle">
                    <input type="time" class="form-control form-control-sm text-center txtHoraIngreso" 
                           value="${item.HoraIngreso || ''}" ${disabledInputs}>
                </td>
                
                <td class="align-middle">
                    <input type="time" class="form-control form-control-sm text-center txtHoraSalida" 
                           value="${item.HoraSalida || ''}" ${disabledInputs}>
                </td>
                
                <td class="align-middle">
                    <span class="badge badge-atraso ${badgeClass}" style="font-size: 14px;">
                        ${item.MinutosAtraso} min
                    </span>
                </td>
            </tr>
        `;

        // Agregamos la fila a la tabla
        $("#tbData tbody").append(tr);
    });

    // Activamos el botón de guardar ahora que hay datos en la tabla
    $("#btnGuardarAsistencia").prop("disabled", false);
}