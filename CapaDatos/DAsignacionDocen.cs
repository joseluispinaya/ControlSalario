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
    public class DAsignacionDocen
    {
        #region "PATRON SINGLETON"
        private static DAsignacionDocen instancia = null;
        private DAsignacionDocen() { }
        public static DAsignacionDocen GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DAsignacionDocen();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<ObtenerAsigDocDTO>> ObtenerAsignacioneDocente(int IdCarrera)
        {
            try
            {
                List<ObtenerAsigDocDTO> rptLista = new List<ObtenerAsigDocDTO>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerAsignacioneDocente", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdCarrera", IdCarrera);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ObtenerAsigDocDTO
                                {
                                    IdAsignacion = Convert.ToInt32(dr["IdAsignacion"]),
                                    IdDocente = Convert.ToInt32(dr["IdDocente"]),
                                    IdMateria = Convert.ToInt32(dr["IdMateria"]),
                                    IdGestion = Convert.ToInt32(dr["IdGestion"]),
                                    IdGrupo = Convert.ToInt32(dr["IdGrupo"]),
                                    CI = dr["CI"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    ImagenUrl = dr["ImagenUrl"].ToString(),
                                    NomDocente = dr["Docente"].ToString(),
                                    NombreMateria = dr["NombreMateria"].ToString(),
                                    NombreGrupo = dr["NombreGrupo"].ToString(),
                                    CostoHora = Convert.ToDecimal(dr["CostoHora"]),
                                    CargaHorariaMensual = Convert.ToInt32(dr["CargaHorariaMensual"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ObtenerAsigDocDTO>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ObtenerAsigDocDTO>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<int> RegistroAsignacion(EAsignacionDocen oModel)
        {
            Respuesta<int> response = new Respuesta<int>();
            int resultadoCodigo = 0;
            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarAsignacionDocente", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdDocente", oModel.IdDocente);
                        cmd.Parameters.AddWithValue("@IdMateria", oModel.IdMateria);
                        cmd.Parameters.AddWithValue("@IdGestion", oModel.IdGestion);
                        cmd.Parameters.AddWithValue("@IdGrupo", oModel.IdGrupo);
                        cmd.Parameters.AddWithValue("@CostoHora", oModel.CostoHora);
                        cmd.Parameters.AddWithValue("@CargaHorariaMensual", oModel.CargaHorariaMensual);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Int)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);
                        con.Open();
                        cmd.ExecuteNonQuery();
                        resultadoCodigo = Convert.ToInt32(outputParam.Value);
                    }
                }
                response.Data = resultadoCodigo;
                switch (resultadoCodigo)
                {
                    case 1: // Exito
                        response.Estado = true;
                        response.Valor = "success";
                        response.Mensaje = "Asignacion registrada correctamente.";
                        break;

                    case 2: // duplicado
                        response.Estado = false;
                        response.Valor = "warning";
                        response.Mensaje = "Ya existe una asignación para esta Materia, Gestión y Grupo.";
                        break;

                    case 3: // Gestion cerrada
                        response.Estado = false;
                        response.Valor = "warning";
                        response.Mensaje = "La gestion seleccionada se encuentra Inactiva.";
                        break;

                    case 0: // Error
                    default:
                        response.Estado = false;
                        response.Valor = "error";
                        response.Mensaje = "No se pudo completar la operación.";
                        break;
                }
            }
            catch (Exception ex)
            {
                response.Estado = false;
                response.Mensaje = $"Error al guardar: {ex.Message}";
            }
            return response;
        }

        public Respuesta<int> EditarAsignacion(EAsignacionDocen oModel)
        {
            Respuesta<int> response = new Respuesta<int>();
            int resultadoCodigo = 0;
            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_EditarAsignacionDocente", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdAsignacion", oModel.IdAsignacion);
                        cmd.Parameters.AddWithValue("@IdDocente", oModel.IdDocente);
                        cmd.Parameters.AddWithValue("@IdMateria", oModel.IdMateria);
                        cmd.Parameters.AddWithValue("@IdGestion", oModel.IdGestion);
                        cmd.Parameters.AddWithValue("@IdGrupo", oModel.IdGrupo);
                        cmd.Parameters.AddWithValue("@CostoHora", oModel.CostoHora);
                        cmd.Parameters.AddWithValue("@CargaHorariaMensual", oModel.CargaHorariaMensual);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Int)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);
                        con.Open();
                        cmd.ExecuteNonQuery();
                        resultadoCodigo = Convert.ToInt32(outputParam.Value);
                    }
                }
                response.Data = resultadoCodigo;
                switch (resultadoCodigo)
                {
                    case 1: // Exito
                        response.Estado = true;
                        response.Valor = "success";
                        response.Mensaje = "Asignacion actualizada correctamente.";
                        break;

                    case 2: // duplicado
                        response.Estado = false;
                        response.Valor = "warning";
                        response.Mensaje = "Ya existe una asignación para esta Materia, Gestión y Grupo.";
                        break;

                    case 3: // Gestion cerrada
                        response.Estado = false;
                        response.Valor = "warning";
                        response.Mensaje = "La gestion seleccionada se encuentra Inactiva.";
                        break;

                    case 0: // Error
                    default:
                        response.Estado = false;
                        response.Valor = "error";
                        response.Mensaje = "No se pudo completar la operación.";
                        break;
                }
            }
            catch (Exception ex)
            {
                response.Estado = false;
                response.Mensaje = $"Error al actualizar: {ex.Message}";
            }
            return response;
        }

        public Respuesta<List<AsigBiometricoDTO>> AsignacionBiometrico(int IdCarrera, int IdGestion)
        {
            try
            {
                List<AsigBiometricoDTO> rptLista = new List<AsigBiometricoDTO>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerAsignacionesParaBiometrico", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdCarrera", IdCarrera);
                        comando.Parameters.AddWithValue("@IdGestion", IdGestion);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new AsigBiometricoDTO
                                {
                                    IdAsignacion = Convert.ToInt32(dr["IdAsignacion"]),
                                    Docente = dr["Docente"].ToString(),
                                    NombreMateria = dr["NombreMateria"].ToString(),
                                    NombreGrupo = dr["NombreGrupo"].ToString(),
                                    NombreSemestre = dr["NombreSemestre"].ToString()
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<AsigBiometricoDTO>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<AsigBiometricoDTO>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

    }
}
