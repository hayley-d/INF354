namespace Assignment3_API.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public decimal Price { get; set; }
        public int ProductTypeId { get; set; }
        public int BrandId { get; set; }
        public string Image { get; set; }

        public Brand Brand { get; set; }
        public ProductType ProductType { get; set; }
    }
}
