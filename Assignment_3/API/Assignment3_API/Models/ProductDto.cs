namespace Assignment3_API.Models
{
    public class ProductDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public decimal Price { get; set; }
        public int ProductTypeId { get; set; }
        public int BrandId { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        public string ProductTypeName { get; set; } = string.Empty;
        
        public string BrandName { get; set; } = string.Empty;
   
    }

}
