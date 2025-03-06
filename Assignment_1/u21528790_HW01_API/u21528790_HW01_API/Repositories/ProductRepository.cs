using Microsoft.EntityFrameworkCore;
using u21528790_HW01_API.Data;
using u21528790_HW01_API.Models;

namespace u21528790_HW01_API.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Models.Product>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Models.Product?> GetProduct(int id)
        {
            return await _context.Products.FirstOrDefaultAsync(p => p.ID == id);
        }

        public async Task<Product> AddProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<Product?> UpdateProduct(Product product)
        {
            var prod = await _context.Products.FindAsync(product.ID);
            if (prod == null)
            {
                return null;
            }
            prod.Name = product.Name;
            prod.Description = product.Description;
            prod.Price = product.Price;

            await _context.SaveChangesAsync();
            return prod;
        }
        public async Task<bool> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return false;
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;

        }
    }
}
