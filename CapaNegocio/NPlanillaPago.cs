using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using CapaEntidad.DTOs;

namespace CapaNegocio
{
    public class NPlanillaPago
    {
        #region "PATRON SINGLETON"
        private static NPlanillaPago instancia = null;
        private NPlanillaPago() { }
        public static NPlanillaPago GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NPlanillaPago();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<DatosParaPlanillaDTO>> ObtenerDatosParaGenerarPlanilla(int IdCarrera, int IdGestion, int IdMes)
        {
            return DPlanillaPago.GetInstance().ObtenerDatosParaGenerarPlanilla(IdCarrera, IdGestion, IdMes);
        }
    }
}
