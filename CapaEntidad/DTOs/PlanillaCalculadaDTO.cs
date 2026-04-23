namespace CapaEntidad.DTOs
{
    public class PlanillaCalculadaDTO
    {
        public int IdAsistencia { get; set; }
        public string Docente { get; set; }
        public string NombreMateria { get; set; }

        // Para mostrarlos unidos
        public int HT { get; set; }
        public int HP { get; set; }
        public int HL { get; set; }
        public int TotalMinutosAtraso { get; set; }
        public decimal CostoHora { get; set; }

        // Los datos financieros calculados
        public decimal TotalHorasPeriodo { get; set; }
        public decimal TotalHorasNoTrabajadas { get; set; }
        public decimal TotalHorasTrabajadas { get; set; }
        public decimal IngresoTotal { get; set; }
        public decimal TotalDescuentos { get; set; }
        public decimal TotalAPagar { get; set; }
        public string Observacion { get; set; }
    }
}
