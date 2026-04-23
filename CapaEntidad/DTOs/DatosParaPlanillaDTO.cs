namespace CapaEntidad.DTOs
{
    public class DatosParaPlanillaDTO
    {
        public int IdAsistencia { get; set; }
        public int IdAsignacion { get; set; }
        public string Docente { get; set; }
        public string NombreMateria { get; set; }
        public string NombreGrupo { get; set; }
        public int HT { get; set; }
        public int HP { get; set; }
        public int HL { get; set; }
        public decimal CostoHora { get; set; }
        public int TotalMinutosAtraso { get; set; }
    }
}
