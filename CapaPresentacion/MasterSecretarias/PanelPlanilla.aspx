<%@ Page Title="" Language="C#" MasterPageFile="~/MasterSecretarias/HomeSecretarias.Master" AutoEventWireup="true" CodeBehind="PanelPlanilla.aspx.cs" Inherits="CapaPresentacion.MasterSecretarias.PanelPlanilla" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../assets/plugins/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/plugins/datatables/buttons.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/plugins/datatables/fixedHeader.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/plugins/datatables/responsive.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/plugins/datatables/scroller.bootstrap.min.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel de Planilla de Pago
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card" id="cargann">
                <div class="card-header bg-primary py-2 px-4">
                    <h3 class="card-title m-0"><i class="fas fa-bookmark mr-2"></i>Generacion Planilla de Pago</h3>
                </div>
                <div class="card-body">

                    <div class="row mb-4">
                        <div class="col-md-3">
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-white font-weight-bold" style="width: 80px;">Gestión</span>
                                </div>
                                <select class="custom-select custom-select-sm" id="cboGestion"></select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-white font-weight-bold" style="width: 80px;">Meses</span>
                                </div>
                                <select class="custom-select custom-select-sm" id="cboMes"></select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="semanas-mes" title="Carga Semanas"><i class="fas fa-calendar-plus mr-1"></i>Semanas</span>
                                </div>
                                <input type="number" class="form-control input-sm text-right form-new" id="txtSemanas" min="0" value="0">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <button type="button" id="btnBuscar" class="btn btn-sm btn-primary"><i class="fas fa-search-plus mr-2"></i>Buscar datos</button>
                        </div>
                    </div>

                    <div class="table-responsive mt-3">
                        <table id="tbData" class="table table-sm table-striped table-bordered" cellspacing="0" width="100%">
                            <thead>
                                <tr>
                                    <th>Docentes</th>
                                    <th>Materia</th>
                                    <th>Hrs (T/P/L)</th>
                                    <th>Min Atraso</th>
                                    <th>Hrs No Trab</th>
                                    <th>Hrs Prdo</th>
                                    <th>Hrs Trab</th>
                                    <th>Cat.</th>
                                    <th>Total</th>
                                    <th>Dsctos</th>
                                    <th>Tot. Pago</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>

                    <div class="row justify-content-center mt-4">
                        <button type="button" id="btnGuardarRegistro" class="btn btn-success btn-sm mr-3"><i class="fas fa-save mr-2"></i>Guardar Planilla</button>
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

    <script src="jsSecre/PanelPlanilla.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
