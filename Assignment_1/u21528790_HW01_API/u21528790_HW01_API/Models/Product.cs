using System.ComponentModel.DataAnnotations;

namespace u21528790_HW01_API.Models
{
    public class Product
    {
        [Key]
        public int ID {  get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public decimal Price { get; set; }
    }
}
