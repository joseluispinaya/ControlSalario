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
    public partial class PanelMaterias : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<ESemestres>> ListaSemestres()
        {
            return NMaterias.GetInstance().ListaSemestres();
        }

        // TODO: Refactorizar con Id de sesion Carrera
        [WebMethod]
        public static Respuesta<List<MateriasDTO>> MateriasPorCarreraYSemestre(int IdSemestre)
        {
            return NMaterias.GetInstance().ListaMateriasIds(1, IdSemestre);
        }

        // TODO: Refactorizar con Id de sesion
        [WebMethod]
        public static Respuesta<List<MateriasDTO>> MateriasPorCarreraYSemestreAsi()
        {
            return NMaterias.GetInstance().ListaMateriasIds(1, 0);
        }

        // TODO: Refactorizar con Id de sesion registro
        [WebMethod]
        public static Respuesta<int> GuardarOrEditMateria(EMaterias objeto)
        {
            objeto.IdCarrera = 1;
            return NMaterias.GetInstance().GuardarOrEditMateria(objeto);
        }
    }
}