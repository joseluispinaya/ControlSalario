using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using CapaEntidad.DTOs;

namespace CapaDatos
{
    public class DPlanillaPago
    {
        #region "PATRON SINGLETON"
        private static DPlanillaPago instancia = null;
        private DPlanillaPago() { }
        public static DPlanillaPago GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DPlanillaPago();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<DatosParaPlanillaDTO>> ObtenerDatosParaGenerarPlanilla(int IdCarrera, int IdGestion, int IdMes)
        {
            try
            {
                List<DatosParaPlanillaDTO> rptLista = new List<DatosParaPlanillaDTO>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerDatosParaGenerarPlanilla", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdCarrera", IdCarrera);
                        comando.Parameters.AddWithValue("@IdGestion", IdGestion);
                        comando.Parameters.AddWithValue("@IdMes", IdMes);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new DatosParaPlanillaDTO
                                {
                                    IdAsistencia = Convert.ToInt32(dr["IdAsistencia"]),
                                    IdAsignacion = Convert.ToInt32(dr["IdAsignacion"]),
                                    Docente = dr["Docente"].ToString(),
                                    NombreMateria = dr["NombreMateria"].ToString(),
                                    NombreGrupo = dr["NombreGrupo"].ToString(),
                                    HT = Convert.ToInt32(dr["HT"]),
                                    HP = Convert.ToInt32(dr["HP"]),
                                    HL = Convert.ToInt32(dr["HL"]),
                                    CostoHora = Convert.ToDecimal(dr["CostoHora"]),
                                    TotalMinutosAtraso = Convert.ToInt32(dr["TotalMinutosAtraso"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<DatosParaPlanillaDTO>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<DatosParaPlanillaDTO>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

    }
}
