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
    public partial class PanelBiometrico : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EMeses>> ListaMeses()
        {
            return NAsistenciaBiome.GetInstance().ListaMeses();
        }

        [WebMethod]
        public static Respuesta<List<EGestiones>> ListaGestiones()
        {
            return NGradoAcademico.GetInstance().ListaGestiones();
        }

        [WebMethod]
        public static Respuesta<List<AsigBiometricoDTO>> AsignacionBiometrico(int IdCarrera, int IdGestion)
        {
            return NAsignacionDocen.GetInstance().AsignacionBiometrico(IdCarrera, IdGestion);
        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<int> GuardarBiometrico(List<BiometricoInputDTO> listaAtrasos, int idMes)
        {
            if (HttpContext.Current.Session["UsuarioLogueado"] == null)
            {
                return new Respuesta<int> { Estado = false, Valor = "error", Mensaje = "Su sesión ha expirado. Recargue la página." };
            }

            try
            {
                if (listaAtrasos == null || !listaAtrasos.Any())
                {
                    return new Respuesta<int> { Estado = false, Valor = "error", Mensaje = "No se encontró datos en la lista de minutos." };
                }

                EUsuarios usuari = (EUsuarios)HttpContext.Current.Session["UsuarioLogueado"];

                return NAsistenciaBiome.GetInstance().GuardarBiometrico(listaAtrasos, idMes, usuari.IdUsuario);

            }
            catch (Exception ex)
            {
                return new Respuesta<int> { Estado = false, Valor = "error", Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

    }
}