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
    public class NAsignacionDocen
    {
        #region "PATRON SINGLETON"
        private static NAsignacionDocen instancia = null;
        private NAsignacionDocen() { }
        public static NAsignacionDocen GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NAsignacionDocen();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<ObtenerAsigDocDTO>> ObtenerAsignacioneDocente(int IdCarrera)
        {
            return DAsignacionDocen.GetInstance().ObtenerAsignacioneDocente(IdCarrera);
        }

        public Respuesta<int> RegistroAsignacion(EAsignacionDocen oModel)
        {
            return DAsignacionDocen.GetInstance().RegistroAsignacion(oModel);
        }

        public Respuesta<int> EditarAsignacion(EAsignacionDocen oModel)
        {
            return DAsignacionDocen.GetInstance().EditarAsignacion(oModel);
        }

        public Respuesta<List<AsigBiometricoDTO>> AsignacionBiometrico(int IdCarrera, int IdGestion)
        {
            return DAsignacionDocen.GetInstance().AsignacionBiometrico(IdCarrera, IdGestion);
        }
    }
}
