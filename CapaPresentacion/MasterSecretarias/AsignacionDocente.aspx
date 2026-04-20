<%@ Page Title="" Language="C#" MasterPageFile="~/MasterSecretarias/HomeSecretarias.Master" AutoEventWireup="true" CodeBehind="AsignacionDocente.aspx.cs" Inherits="CapaPresentacion.MasterSecretarias.AsignacionDocente" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../assets/plugins/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/plugins/datatables/buttons.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/plugins/datatables/fixedHeader.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/plugins/datatables/responsive.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/plugins/datatables/scroller.bootstrap.min.css" rel="stylesheet" type="text/css" />

    <link href="../assets/pluginzero/select2/select2.min.css" rel="stylesheet" type="text/css" />
    <style>
        .sin-margin-bottom {
            margin-bottom: 0;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel de Asignación de Docentes
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card shadow-sm border-0" id="loadinzero">
                <div class="card-body">
                    <input id="txtIdDocente" value="0" type="hidden" />

                    <div class="row">
                        <div class="col-md-5 mb-3">
                            <div class="border rounded bg-light p-3 h-100">
                                <div class="d-flex align-items-center mb-3">
                                    <img id="imgDoce" src="../images/sinFoto.png" alt="Perfil" class="rounded-circle shadow-sm mr-3" style="width: 65px; height: 65px; object-fit: cover;">
                                    <div>
                                        <h5 id="lblNombres" class="mb-1 text-primary font-weight-bold" style="font-size: 1.1rem;">Esperando..</h5>
                                        <span id="lblDatos" class="badge badge-secondary p-1">Esperando..</span>
                                    </div>
                                </div>
                                <hr class="mt-0">
                                <div class="form-group mb-0">
                                    <label for="cboBuscarDocente" class="small font-weight-bold text-muted mb-1"><i class="fas fa-search mr-1"></i>Buscar Docente</label>
                                    <select class="form-control form-control-sm" id="cboBuscarDocente" style="width: 100%;">
                                        <option value=""></option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4 mb-3">
                            <div class="p-2 h-100">
                                <div class="input-group input-group-sm mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text bg-white font-weight-bold" style="width: 85px;">Gestión</span>
                                    </div>
                                    <select class="custom-select custom-select-sm" id="cboGestion"></select>
                                </div>

                                <div class="input-group input-group-sm mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text bg-white font-weight-bold" style="width: 85px;">Materia</span>
                                    </div>
                                    <select class="custom-select custom-select-sm" id="cboMaterias"></select>
                                </div>

                                <div class="input-group input-group-sm mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text bg-white font-weight-bold" style="width: 85px;">Grupo</span>
                                    </div>
                                    <select class="custom-select custom-select-sm" id="cboGrupos"></select>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3 mb-3">
                            <div class="p-2 h-100 d-flex flex-column justify-content-between">
                                <div>
                                    <div class="input-group input-group-sm mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="addon-hp" title="Costo Hora"><i class="fas fa-dollar-sign mr-1"></i>Costo Hr</span>
                                        </div>
                                        <input type="number" class="form-control input-sm text-right form-new" id="txtCostoHora" min="0" value="0">
                                    </div>

                                    <div class="input-group input-group-sm mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="addon-hl" title="Carga Horaria"><i class="fas fa-clock mr-1"></i>Carga Hrs</span>
                                        </div>
                                        <input type="number" class="form-control input-sm text-right form-new" id="txtCargaHoraria" min="0" value="0">
                                    </div>
                                </div>

                                <div class="mt-auto">
                                    <button type="button" id="btnNuevoRegistro" class="btn btn-sm btn-block btn-outline-info mb-3 font-weight-bold shadow-sm">
                                        <i class="fas fa-plus mr-2"></i>Nuevo Registro
                                    </button>

                                    <button type="button" id="btnGuardarRegistro" class="btn btn-sm btn-block btn-success font-weight-bold shadow-sm" disabled>
                                        <i class="fas fa-save mr-2"></i>Guardar Asignación
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12">
            <div class="card shadow-sm border-0 mt-2">
                <div class="card-header bg-primary text-white py-2 px-4 border-0">
                    <h6 class="card-title m-0"><i class="fas fa-bookmark mr-2"></i>Lista Asignaciones de materias</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive mt-2">
                        <table id="tbData" class="table table-sm table-hover table-bordered" cellspacing="0" width="100%">
                            <thead class="thead-light">
                                <tr>
                                    <th>Id</th>
                                    <th>Docente</th>
                                    <th>Nro CI</th>
                                    <th>Materia</th>
                                    <th>Grupo</th>
                                    <th>Carga Horaria</th>
                                    <th class="text-center">Opciones</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="../assets/plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="../assets/plugins/datatables/dataTables.bootstrap4.min.js"></script>

    <script src="../assets/plugins/datatables/dataTables.buttons.min.js"></script>
    <script src="../assets/plugins/datatables/buttons.bootstrap4.min.js"></script>

    <script src="../assets/plugins/datatables/jszip.min.js"></script>
    <script src="../assets/plugins/datatables/pdfmake.min.js"></script>
    <script src="../assets/plugins/datatables/vfs_fonts.js"></script>
    <script src="../assets/plugins/datatables/buttons.html5.min.js"></script>
    <script src="../assets/plugins/datatables/buttons.print.min.js"></script>
    <script src="../assets/plugins/datatables/dataTables.fixedHeader.min.js"></script>
    <script src="../assets/plugins/datatables/dataTables.keyTable.min.js"></script>
    <script src="../assets/plugins/datatables/dataTables.scroller.min.js"></script>


    <script src="../assets/plugins/datatables/dataTables.responsive.min.js"></script>
    <script src="../assets/plugins/datatables/responsive.bootstrap4.min.js"></script>

    <script src="../assets/pluginzero/select2/select2.min.js"></script>
    <script src="../assets/pluginzero/select2/es.min.js"></script>

    <script src="jsSecre/AsignacionDoc.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
