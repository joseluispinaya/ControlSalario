<%@ Page Title="" Language="C#" MasterPageFile="~/HomeMaster.Master" AutoEventWireup="true" CodeBehind="PanelBiometrico.aspx.cs" Inherits="CapaPresentacion.PanelBiometrico" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .input-reducido {
            width: 70px;
            text-align: center;
            font-weight: bold;
        }

        #tbData {
            border-radius: 8px;
            overflow: hidden;
        }

            #tbData tbody tr {
                transition: all .2s ease;
            }

                #tbData tbody tr:hover {
                    background: #f5f9ff;
                    transform: scale(1.01);
                }

            #tbData td {
                vertical-align: middle;
            }

        .docente-badge {
            background: #eaf4ff;
            padding: 6px 12px;
            border-radius: 20px;
            font-weight: 600;
            color: #0d6efd;
        }

        .semestre-badge {
            background: #fff3cd;
            padding: 5px 10px;
            border-radius: 15px;
            font-weight: bold;
        }

        .input-atraso {
            border: 2px solid #28a745;
            border-radius: 20px;
        }

            .input-atraso:focus {
                box-shadow: 0 0 6px rgba(40,167,69,.4);
            }

        .input-error {
            border: 2px solid #dc3545 !important; /* Rojo Bootstrap */
        }

            .input-error:focus {
                box-shadow: 0 0 6px rgba(220,53,69,.5) !important;
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

                    <div class="table-responsive mt-3">
                        <table id="tbData" class="table table-sm table-bordered table-hover shadow-sm">
                            <thead class="thead-dark">
                                <tr class="text-center">
                                    <th style="width: 35%">Docente</th>
                                    <th style="width: 35%">Materia</th>
                                    <th style="width: 15%">Semestre</th>
                                    <th style="width: 15%">Min. Atraso</th>
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
                                            <label class="input-group-text" for="cboMes">Seleccione un Mes</label>
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
