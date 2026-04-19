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
            <div class="card">
                <div class="card-body">
                    <%--<h4 class="m-t-0 m-b-15">Detalle del Cliente</h4>--%>
                    <input id="txtIdDocente" value="0" type="hidden" />
                    <div class="row">
                        <div class="col-lg-9">
                            <div class="row">
                                <div class="col-sm-7">
                                    <%--<h4 class="m-t-0 m-b-15 text-center">Detalle del Docente</h4>--%>
                                    <div class="media-main">
                                        <a class="float-left" href="#">
                                            <img class="thumb-lg rounded-circle" id="imgDoce" src="../images/sinFoto.png" alt="">
                                        </a>
                                        <div class="info pl-3">
                                            <h4 id="lblNombres" class="mt-3">Esperando..</h4>
                                            <p id="lblDatos" class="text-muted">Esperando..</p>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <hr>
                                    <div class="form-group mt-3">
                                        <label for="cboBuscarDocente">Buscar Docente</label>
                                        <select class="form-control form-control-sm" id="cboBuscarDocente" style="width: 100%;">
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-5">
                                    
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <label class="input-group-text" for="cboGestion">Gestion</label>
                                        </div>
                                        <select class="custom-select" id="cboGestion">
                                        </select>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <label class="input-group-text" for="cboMaterias">Materia</label>
                                        </div>
                                        <select class="custom-select" id="cboMaterias">
                                        </select>
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <label class="input-group-text" for="cboGrupos">Select Grupo</label>
                                        </div>
                                        <select class="custom-select" id="cboGrupos">
                                        </select>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="addon-hp" title="Costo Hora">Categoria</span>
                                </div>
                                <input type="number" class="form-control form-new model" id="txtCostoHora" name="Categoria" min="0" value="0" aria-describedby="addon-hp">
                            </div>
                            
                            <div class="input-group input-group-sm mb-4">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="addon-hl" title="Carga Horaria">Carga Hrs</span>
                                </div>
                                <input type="number" class="form-control form-new model" id="txtCargaHoraria" name="Carga Hrs" min="0" value="0" aria-describedby="addon-hl">
                            </div>

                            <button type="button" id="btnRegistro" class="btn btn-sm btn-block btn-success">
                                <i class="fas fa-save mr-2"></i>Guardar Asignacion
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>

    <div class="row">
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header bg-primary py-2 px-4">
                <h3 class="card-title m-0"><i class="fas fa-bookmark mr-2"></i>Lista Asignaciones de materias</h3>
            </div>
            <div class="card-body">
                <div class="row mt-3">
                    <div class="col-lg-12 col-sm-12 col-12">
                        <table id="tbData" class="table table-sm table-striped table-bordered" cellspacing="0" width="100%">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Docente</th>
                                    <th>Nro CI</th>
                                    <th>Materia</th>
                                    <th>Grupo</th>
                                    <th>Carga Horaria</th>
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
