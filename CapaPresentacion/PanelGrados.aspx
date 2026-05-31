<%@ Page Title="" Language="C#" MasterPageFile="~/HomeMaster.Master" AutoEventWireup="true" CodeBehind="PanelGrados.aspx.cs" Inherits="CapaPresentacion.PanelGrados" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/plugins/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/buttons.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/fixedHeader.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/responsive.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/scroller.bootstrap.min.css" rel="stylesheet" type="text/css" />
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
    Panel de Grados Academicos
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header py-2 px-4" style="background-color: #02264D;">
                    <h3 class="card-title m-0"><i class="fas fa-bookmark mr-2"></i>Lista Grados Academicos</h3>
                </div>
                <div class="card-body">
                    <div class="row justify-content-center mb-4">
                        <button type="button" id="btnRegistro" class="btn btn-emi-warning btn-lg px-5 shadow font-weight-bold"><i class="fas fa-edit mr-2"></i>Nuevo Registro</button>
                    </div>


                    <div class="row mt-3">
                        <div class="col-lg-12 col-sm-12 col-12">
                            <table id="tbGrados" class="table table-sm table-striped table-bordered" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Nro Carreras</th>
                                        <th>Estado</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="mdData" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title m-0" id="myModalLabel">Grados</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="txtNombre">Nombre Grado</label>
                        <input type="text" class="form-control input-sm form-new" id="txtNombre" name="Nombre Grado">
                    </div>
                    <div class="form-group">
                        <label for="cboEstado">Estado</label>
                        <select class="form-control form-control-sm form-new" id="cboEstado">
                            <option value="1">Activo</option>
                            <option value="0">No Activo</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-warning" data-dismiss="modal"><i class="fas fa-times-circle mr-2"></i>Cerrar</button>
                    <button id="btnGuardarCambios" type="button" class="btn btn-sm btn-primary"><i class="fas fa-save mr-2"></i>Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="assets/plugins/datatables/dataTables.bootstrap4.min.js"></script>

    <script src="assets/plugins/datatables/dataTables.buttons.min.js"></script>
    <script src="assets/plugins/datatables/buttons.bootstrap4.min.js"></script>

    <script src="assets/plugins/datatables/jszip.min.js"></script>
    <script src="assets/plugins/datatables/pdfmake.min.js"></script>
    <script src="assets/plugins/datatables/vfs_fonts.js"></script>
    <script src="assets/plugins/datatables/buttons.html5.min.js"></script>
    <script src="assets/plugins/datatables/buttons.print.min.js"></script>
    <script src="assets/plugins/datatables/dataTables.fixedHeader.min.js"></script>
    <script src="assets/plugins/datatables/dataTables.keyTable.min.js"></script>
    <script src="assets/plugins/datatables/dataTables.scroller.min.js"></script>


    <script src="assets/plugins/datatables/dataTables.responsive.min.js"></script>
    <script src="assets/plugins/datatables/responsive.bootstrap4.min.js"></script>

    <script src="js/PanelGrados.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
