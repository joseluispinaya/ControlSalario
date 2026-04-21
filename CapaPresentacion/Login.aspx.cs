using CapaEntidad.Entidades;
using CapaEntidad.DTOs;
using CapaEntidad.Responses;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CapaPresentacion
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.AppendHeader("Cache-Control", "no-store");
        }

        [WebMethod]
        public static Respuesta<EUsuarios> Logeo(string Correo, string Clave)
        {
            try
            {
                var resp = NUsuarios.GetInstance().LoginUsuario(Correo);

                if (!resp.Estado || resp.Data == null)
                {
                    return new Respuesta<EUsuarios>
                    {
                        Estado = false,
                        Mensaje = resp.Mensaje // Mensaje genérico por seguridad
                    };
                }

                var objUser = resp.Data;

                // Validar Estado
                if (!objUser.Estado)
                {
                    return new Respuesta<EUsuarios> { Estado = false, Mensaje = "Su cuenta se encuentra inactiva." };
                }

                // Validar Contraseña (Simulación directa vs Hash real)
                // NOTA: Cuando pases a producción, aquí usarás: BCrypt.Net.BCrypt.Verify(Clave, objUser.ClaveHash)
                if (Clave != objUser.Clave)
                {
                    return new Respuesta<EUsuarios> { Estado = false, Mensaje = "Usuario o Contraseña incorrectos." };
                }

                objUser.Clave = "";

                string rutaUrl;
                switch (objUser.IdRol)
                {
                    case 1:
                        rutaUrl = "Inicio.aspx";
                        break;

                    case 2:
                        rutaUrl = "MasterSecretarias/PanelInicio.aspx";
                        break;

                    case 3:
                        rutaUrl = "MasterSecretarias/PanelInicio.aspx";
                        break;

                    case 0:
                    default:
                        rutaUrl = "ErrorAcceso.aspx";
                        break;

                }

                return new Respuesta<EUsuarios>
                {
                    Estado = true,
                    Data = objUser,
                    Valor = rutaUrl,
                    Mensaje = "Bienvenido al sistema"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<EUsuarios>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }

    }
}