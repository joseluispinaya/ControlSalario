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
    public class NAsistenciaBiome
    {
        #region "PATRON SINGLETON"
        private static NAsistenciaBiome instancia = null;
        private NAsistenciaBiome() { }
        public static NAsistenciaBiome GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NAsistenciaBiome();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<EMeses>> ListaMeses()
        {
            return DAsistenciaBiome.GetInstance().ListaMeses();
        }

        public Respuesta<int> GuardarBiometrico(List<BiometricoInputDTO> listaAtrasos, int idMes, int idUsuario)
        {
            return DAsistenciaBiome.GetInstance().GuardarBiometrico(listaAtrasos, idMes, idUsuario);
        }
    }
}
