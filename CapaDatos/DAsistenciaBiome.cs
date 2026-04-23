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
    public class DAsistenciaBiome
    {
        #region "PATRON SINGLETON"
        private static DAsistenciaBiome instancia = null;
        private DAsistenciaBiome() { }
        public static DAsistenciaBiome GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DAsistenciaBiome();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<EMeses>> ListaMeses()
        {
            try
            {
                List<EMeses> rptLista = new List<EMeses>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ListaMeses", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EMeses
                                {
                                    IdMes = Convert.ToInt32(dr["IdMes"]),
                                    NombreMes = dr["NombreMes"].ToString()
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EMeses>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<EMeses>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = $"Error al obtener la lista: {ex.Message}"
                };
            }
        }

        public Respuesta<int> GuardarBiometrico(List<BiometricoInputDTO> listaAtrasos, int idMes, int idUsuario)
        {
            Respuesta<int> response = new Respuesta<int>();
            int resultadoCodigo = 0;

            try
            {
                // 1. CREAR LA ESTRUCTURA EN MEMORIA (DataTable)
                // Las columnas deben coincidir exactamente con dbo.typ_BiometricoMasivo
                DataTable dtDatos = new DataTable();
                dtDatos.Columns.Add("IdAsignacion", typeof(int));
                dtDatos.Columns.Add("TotalMinutosAtraso", typeof(int));

                // 2. POBLAR EL DATATABLE CON TU LISTA DTO
                foreach (var item in listaAtrasos)
                {
                    dtDatos.Rows.Add(item.IdAsignacion, item.TotalMinutosAtraso);
                }

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_GuardarBiometricoMasivo", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        // 3. PARÁMETROS ESCALARES
                        cmd.Parameters.AddWithValue("@IdMes", idMes);
                        cmd.Parameters.AddWithValue("@IdUsuarioRegistro", idUsuario);

                        // 4. PARÁMETRO DE TABLA (La magia del MERGE)
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@Datos", dtDatos);
                        tvpParam.SqlDbType = SqlDbType.Structured;
                        tvpParam.TypeName = "dbo.typ_BiometricoMasivo"; // Nombre exacto de tu TYPE en SQL

                        // 5. PARÁMETRO DE SALIDA
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

                if (resultadoCodigo == 1)
                {
                    response.Estado = true;
                    response.Valor = "success";
                    response.Mensaje = "Asistencia masiva guardada correctamente.";
                }
                else
                {
                    response.Estado = false;
                    response.Valor = "warning";
                    response.Mensaje = "No se pudo completar la operación en la base de datos.";
                }
            }
            catch (Exception ex)
            {
                response.Estado = false;
                response.Valor = "error";
                response.Mensaje = $"Error al guardar: {ex.Message}";
            }

            return response;
        }

    }
}
