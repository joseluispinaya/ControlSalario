<%@ Page Title="" Language="C#" MasterPageFile="~/HomeMaster.Master" AutoEventWireup="true" CodeBehind="PanelBiometrico.aspx.cs" Inherits="CapaPresentacion.PanelBiometrico" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .input-reducido {
            width: 60px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel de Asignación Biometrico
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card" id="cargann">
                <div class="card-header bg-primary py-2 px-4">
                    <h3 class="card-title m-0"><i class="fas fa-bookmark mr-2"></i>Control Biometrico Asistencia</h3>
                </div>
                <div class="card-body">

                    <div class="row mb-4">
                        <div class="col-md-3">
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-white font-weight-bold" style="width: 85px;">Grados</span>
                                </div>
                                <select class="custom-select custom-select-sm" id="cboGradosData"></select>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-white font-weight-bold" style="width: 85px;">Carrera</span>
                                </div>
                                <select class="custom-select custom-select-sm" id="cboCarreras" disabled></select>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-white font-weight-bold" style="width: 85px;">Gestión</span>
                                </div>
                                <select class="custom-select custom-select-sm" id="cboGestion"></select>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <button type="button" id="btnBuscar" class="btn btn-sm btn-primary"><i class="fas fa-search-plus mr-2"></i>Buscar</button>
                        </div>
                    </div>

                    <div class="table-responsive mt-2">
                        <table id="tbData" class="table table-sm table-hover align-middle" cellspacing="0" width="100%">
                            <thead>
                                <tr>
                                    <th>Docente</th>
                                    <th>Materia</th>
                                    <th>Semestre</th>
                                    <th>Min. Atraso</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>

                    <div class="row mt-4">
                        <div class="col-md-6 offset-md-3">
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <label class="input-group-text" for="cboMes">Seleccione Mes</label>
                                        </div>
                                        <select class="custom-select custom-select-sm" id="cboMes">
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <button type="button" id="btnRegistroBio" class="btn btn-sm btn-success"><i class="fas fa-save mr-2"></i>Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="js/AsignacionBio.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
