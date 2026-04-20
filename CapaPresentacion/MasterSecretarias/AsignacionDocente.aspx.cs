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

        // TODO: Refactorizar con Id de sesion Carrera
        [WebMethod]
        public static Respuesta<List<ObtenerAsigDocDTO>> ObtenerAsignacioneDocente()
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