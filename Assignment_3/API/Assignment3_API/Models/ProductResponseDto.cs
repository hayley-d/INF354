namespace Assignment3_API.Models
{
    public class ProductResponseDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; } = "";
        public decimal Price { get; set; }
        public string Description { get; set; } = "";
        public string Image { get; set; } = "";
        public int BrandId { get; set; }
        public string BrandName { get; set; } = "";
        public int ProductTypeId { get; set; }
        public string ProductTypeName { get; set; } = "";
    }
}
