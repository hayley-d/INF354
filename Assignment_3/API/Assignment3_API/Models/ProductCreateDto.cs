namespace Assignment3_API.Models
{
    public class ProductCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int BrandId { get; set; }
        public int ProductTypeId { get; set; }
        public string Image { get; set; } = string.Empty;
    }
}
