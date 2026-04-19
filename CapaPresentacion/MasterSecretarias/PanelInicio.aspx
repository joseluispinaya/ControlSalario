<%@ Page Title="" Language="C#" MasterPageFile="~/MasterSecretarias/HomeSecretarias.Master" AutoEventWireup="true" CodeBehind="PanelInicio.aspx.cs" Inherits="CapaPresentacion.MasterSecretarias.PanelInicio" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Bienvenido al Panel de Inicio
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-sm-6 col-lg-3">
            <div class="card text-center">
                <div class="card-heading">
                    <h4 class="card-title text-muted font-weight-light mb-0">Total Subscription</h4>
                </div>
                <div class="card-body p-t-10">
                    <h2 class="m-t-0 m-b-15"><i class="mdi mdi-arrow-down-bold-circle-outline text-danger m-r-10"></i><b>8952</b></h2>
                    <p class="text-muted m-b-0 m-t-20"><b>48%</b> From Last 24 Hours</p>
                </div>
            </div>
        </div>

        <div class="col-sm-6 col-lg-3">
            <div class="card text-center">
                <div class="card-heading">
                    <h4 class="card-title text-muted font-weight-light mb-0">Order Status</h4>
                </div>
                <div class="card-body p-t-10">
                    <h2 class="m-t-0 m-b-15"><i class="mdi mdi-arrow-up-bold-circle-outline text-primary m-r-10"></i><b>6521</b></h2>
                    <p class="text-muted m-b-0 m-t-20"><b>42%</b> Orders in Last 10 months</p>
                </div>
            </div>
        </div>

        <div class="col-sm-6 col-lg-3">
            <div class="card text-center">
                <div class="card-heading">
                    <h4 class="card-title text-muted font-weight-light mb-0">Unique Visitors</h4>
                </div>
                <div class="card-body p-t-10">
                    <h2 class="m-t-0 m-b-15"><i class="mdi mdi-arrow-up-bold-circle-outline text-primary m-r-10"></i><b>452</b></h2>
                    <p class="text-muted m-b-0 m-t-20"><b>22%</b> From Last 24 Hours</p>
                </div>
            </div>
        </div>

        <div class="col-sm-6 col-lg-3">
            <div class="card text-center">
                <div class="card-heading">
                    <h4 class="card-title text-muted font-weight-light mb-0">Monthly Earnings</h4>
                </div>
                <div class="card-body p-t-10">
                    <h2 class="m-t-0 m-b-15"><i class="mdi mdi-arrow-down-bold-circle-outline text-danger m-r-10"></i><b>5621</b></h2>
                    <p class="text-muted m-b-0 m-t-20"><b>35%</b> From Last 1 Month</p>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
