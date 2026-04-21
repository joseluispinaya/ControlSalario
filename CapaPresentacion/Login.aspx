<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="CapaPresentacion.Login" %>

<!DOCTYPE html>

<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - EMI</title>

    <link rel="shortcut icon" href="assets/images/favicon.ico">
    <link href="assets/plugins/bootstrap-sweetalert/sweet-alert.css" rel="stylesheet" type="text/css"/>

    <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="assets/css/icons.css" rel="stylesheet" type="text/css">
    <link href="assets/css/loginvoca.css" rel="stylesheet" type="text/css">
</head>
<body>
    <div class="login-card text-center">
        <img src="images/emiss.png" alt="EMI Logo" class="brand-logo">

        <h4 class="mb-4">Iniciar Sesión</h4>

        <div class="form-group text-left">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text bg-dark border-0 text-white">
                        <i class="fas fa-user"></i>
                    </span>
                </div>
                <input type="text" id="inputCorreo" class="form-control" placeholder="Usuario o Correo">
            </div>
        </div>

        <div class="form-group text-left">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text bg-dark border-0 text-white">
                        <i class="fas fa-lock"></i>
                    </span>
                </div>
                <input type="password" id="inputPassword" class="form-control" placeholder="Contraseña">
            </div>
        </div>

        <button type="button" id="btnIngresar" class="btn btn-primary btn-block py-2 mb-3">
            INGRESAR
        </button>

        <a href="#" class="forgot-password" data-toggle="modal" data-target="#modalOlvido">¿Olvidaste tu contraseña?
        </a>
    </div>

    <div class="modal fade" id="modalOlvido" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Recuperar Acceso</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="small text-muted">Ingresa tu correo institucional y te enviaremos las instrucciones.</p>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text bg-dark border-0 text-white">
                                    <i class="fas fa-envelope"></i>
                                </span>
                            </div>
                            <input type="email" id="emailRecuperacion" class="form-control" placeholder="correo@ejemplo.com">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary">Enviar Correo</button>
                </div>
            </div>
        </div>
    </div>

    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/popper.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/plugins/bootstrap-sweetalert/sweet-alert.min.js"></script>
    <script src="assets/plugins/loadingoverlay/loadingoverlay.js"></script>
    <script src="js/Login.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</body>
</html>
