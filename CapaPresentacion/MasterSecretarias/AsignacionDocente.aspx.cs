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

namespace CapaPresentacion.MasterSecretarias
{
    public partial class AsignacionDocente : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<List<ObtenerAsigDocDTO>> ObtenerAsignacioneDocente()
        {
            // 1. Validar Sesión
            if (HttpContext.Current.Session["UsuarioLogueado"] == null)
            {
                return new Respuesta<List<ObtenerAsigDocDTO>> { Estado = false, Mensaje = "Su sesión ha expirado. Recargue la página." };
            }

            try
            {
                // Obtener el IdCarrera de Secretaria de la sesión (Seguro)
                EUsuarios usuari = (EUsuarios)HttpContext.Current.Session["UsuarioLogueado"];

                return NAsignacionDocen.GetInstance().ObtenerAsignacioneDocente(usuari.IdCarrera);
            }
            catch (Exception ex)
            {
                // Captura cualquier error no previsto en la capa de presentación
                return new Respuesta<List<ObtenerAsigDocDTO>> { Estado = false, Mensaje = "Ocurrió un error inesperado: " + ex.Message };
            }
        }

        // no usar este método, es solo para pruebas
        [WebMethod]
        public static Respuesta<List<ObtenerAsigDocDTO>> ObtenerAsignacioneDocentePrue()
        {
            return NAsignacionDocen.GetInstance().ObtenerAsignacioneDocente(1);
        }

        [WebMethod]
        public static Respuesta<List<EGestiones>> ListaGestiones()
        {
            return NGradoAcademico.GetInstance().ListaGestiones();
        }

        [WebMethod]
        public static Respuesta<List<EGrupos>> ListaGrupos()
        {
            return NGradoAcademico.GetInstance().ListaGrupos();
        }

        [WebMethod]
        public static Respuesta<int> RegistroAsignacion(EAsignacionDocen objeto)
        {
            return NAsignacionDocen.GetInstance().RegistroAsignacion(objeto);
        }

        [WebMethod]
        public static Respuesta<int> EditarAsignacion(EAsignacionDocen objeto)
        {
            return NAsignacionDocen.GetInstance().EditarAsignacion(objeto);
        }

    }
}