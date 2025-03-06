using Microsoft.EntityFrameworkCore;
using u21528790_HW01_API.Models;

namespace u21528790_HW01_API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Models.Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Models.Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2); 
        }
    }
}
