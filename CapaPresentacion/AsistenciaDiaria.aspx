<%@ Page Title="" Language="C#" MasterPageFile="~/HomeMaster.Master" AutoEventWireup="true" CodeBehind="AsistenciaDiaria.aspx.cs" Inherits="CapaPresentacion.AsistenciaDiaria" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .btn-emi-warning {
            background-color: #FFD100;
            color: #02264D;
            border: none;
            transition: all 0.3s ease;
        }

            .btn-emi-warning:hover {
                background-color: #E6BC00;
                color: #02264D;
                transform: translateY(-2px); /* Pequeño salto al pasar el mouse */
            }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel de Asistencia Diaria
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card shadow-sm" id="cargann">
                <div class="card-header text-white py-2 px-4" style="background-color: #02264D;">
                    <h3 class="card-title m-0"><i class="fas fa-calendar-check mr-2"></i>Control de Asistencia Diaria</h3>
                </div>
                <div class="card-body">

                    <div class="row mb-3">
                        <div class="col-md-3">
                            <div class="input-group input-group-sm mb-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-light font-weight-bold" style="width: 85px;">Grados</span>
                                </div>
                                <select class="custom-select custom-select-sm" id="cboGradosData"></select>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="input-group input-group-sm mb-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-light font-weight-bold" style="width: 85px;">Carrera</span>
                                </div>
                                <select class="custom-select custom-select-sm" id="cboCarreras" disabled></select>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="input-group input-group-sm mb-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-light font-weight-bold">Gestión</span>
                                </div>
                                <select class="custom-select custom-select-sm" id="cboGestion"></select>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="input-group input-group-sm mb-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-light font-weight-bold">Fecha</span>
                                </div>
                                <input type="date" class="form-control form-control-sm" id="txtFechaAsistencia">
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-12 text-right">
                            <button type="button" id="btnBuscar" class="btn btn-emi-warning btn-lg px-5 shadow font-weight-bold">
                                <i class="fas fa-search mr-2"></i>Buscar Horarios
                            </button>
                            <button type="button" id="btnGuardarAsistencia" class="btn btn-emi-warning btn-lg px-5 shadow font-weight-bold ml-2" disabled>
                                <i class="fas fa-save mr-2"></i>Guardar Asistencia
                            </button>
                        </div>
                    </div>

                    <hr>

                    <div class="table-responsive">
                        <table id="tbData" class="table table-sm table-bordered table-hover align-middle text-center">
                            <thead class="thead-light">
                                <tr>
                                    <th class="text-left">Docente</th>
                                    <th class="text-left">Materia</th>
                                    <th>Horario Oficial</th>
                                    <th style="width: 140px;">Estado</th>
                                    <th style="width: 130px;">H. Ingreso</th>
                                    <th style="width: 130px;">H. Salida</th>
                                    <th style="width: 90px;">Atraso</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="js/AsistenciaDiaria.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>

</asp:Content>
