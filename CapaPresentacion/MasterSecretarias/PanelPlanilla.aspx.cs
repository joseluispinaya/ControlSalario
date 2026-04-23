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
    public partial class PanelPlanilla : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<List<PlanillaCalculadaDTO>> ObtenerDatosParaGenerarPlanilla(int IdGestion, int IdMes, int Semanas)
        {
            if (HttpContext.Current.Session["UsuarioLogueado"] == null)
            {
                return new Respuesta<List<PlanillaCalculadaDTO>> { Estado = false, Mensaje = "Su sesión ha expirado. Recargue la página." };
            }

            try
            {
                EUsuarios usuari = (EUsuarios)HttpContext.Current.Session["UsuarioLogueado"];

                // Aquí usamos IdCarrera porque es la Secretaria/Jefe
                var resp = NPlanillaPago.GetInstance().ObtenerDatosParaGenerarPlanilla(usuari.IdCarrera, IdGestion, IdMes);

                if (!resp.Estado || !resp.Data.Any())
                {
                    return new Respuesta<List<PlanillaCalculadaDTO>> { Estado = false, Mensaje = "No se encontraron datos biométricos registrados para este mes." };
                }

                List<PlanillaCalculadaDTO> listaCalculada = new List<PlanillaCalculadaDTO>();

                foreach (var item in resp.Data)
                {
                    // 1. Horas del Periodo (HT + HP + HL) * SemanasMes
                    decimal horasSemanales = item.HT + item.HP + item.HL;
                    decimal totalHorasPeriodo = horasSemanales * Semanas;

                    // 2. Horas No Trabajadas (TotalMinutosAtraso / 45.0)
                    decimal totalHorasNoTrabajadas = Math.Round(item.TotalMinutosAtraso / 45.0m, 2);

                    // 3. Horas Trabajadas (TotalHorasPeriodo - TotalHorasNoTrabajadas)
                    decimal totalHorasTrabajadas = totalHorasPeriodo - totalHorasNoTrabajadas;

                    // 4. Ingreso Total (TotalHorasPeriodo * CostoHora)
                    decimal ingresoTotal = Math.Round(totalHorasPeriodo * item.CostoHora, 2);

                    // 5. Total Descuentos ((CostoHora * TotalMinutosAtraso) / 45.0)
                    decimal totalDescuentos = Math.Round((item.CostoHora * item.TotalMinutosAtraso) / 45.0m, 2);

                    // 6. Total a Pagar (IngresoTotal - TotalDescuentos)
                    decimal totalAPagar = ingresoTotal - totalDescuentos;

                    listaCalculada.Add(new PlanillaCalculadaDTO
                    {
                        IdAsistencia = item.IdAsistencia,
                        Docente = item.Docente,
                        NombreMateria = item.NombreMateria,
                        HT = item.HT,
                        HP = item.HP,
                        HL = item.HL,
                        TotalMinutosAtraso = item.TotalMinutosAtraso,
                        CostoHora = item.CostoHora,

                        TotalHorasPeriodo = totalHorasPeriodo,
                        TotalHorasNoTrabajadas = totalHorasNoTrabajadas,
                        TotalHorasTrabajadas = totalHorasTrabajadas,
                        IngresoTotal = ingresoTotal,
                        TotalDescuentos = totalDescuentos,
                        TotalAPagar = totalAPagar,
                        Observacion = "" // Enviamos vacío como pediste
                    });
                }

                return new Respuesta<List<PlanillaCalculadaDTO>>
                {
                    Estado = true,
                    Data = listaCalculada,
                    Mensaje = "Planilla calculada exitosamente."
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<PlanillaCalculadaDTO>> { Estado = false, Mensaje = "Ocurrió un error inesperado: " + ex.Message };
            }
        }

    }
}