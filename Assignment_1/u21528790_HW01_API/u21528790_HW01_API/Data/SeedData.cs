namespace u21528790_HW01_API.Data
{
    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider, IApplicationBuilder applicationBuilder)
        {
            var context = serviceProvider.GetRequiredService<AppDbContext>();
            if (!context.Products.Any())
            {
                context.Products.AddRange(
                    new Models.Product { Name = "Ferris the small Squishable Rustacean", Description = "Rust mascot plushie", Price = 60.00M },
                    new Models.Product { Name = "Sliced bread Sticker", Description = "&bread[..]", Price = 80.00M }
                    );
                context.SaveChanges();
            }
        }
    }
}
