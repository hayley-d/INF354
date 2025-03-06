using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using u21528790_HW01_API.Controllers;
using u21528790_HW01_API.Data;
using u21528790_HW01_API.Models;
using u21528790_HW01_API.Repositories;

namespace u21528790_HW01_API.Tests
{
    public class ProductControllerTest
    {
        private async Task<AppDbContext> GetDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>().UseInMemoryDatabase(databaseName: "TestDb").Options;
            var dbContext = new AppDbContext(options);
            await dbContext.Database.EnsureCreatedAsync();
            dbContext.Products.Add(new Product { ID = 1, Name = "Test Prod", Description = "Desc", Price = 100 });
            await dbContext.SaveChangesAsync();
            return dbContext;
        }

        [Fact]
        public async Task GetProduct_Returns_Product_When_Found()
        {
            var dbContext = await GetDbContext();
            var controller = new ProductController(dbContext);

            var res = await controller.GetProduct(1);

            var okRes = Assert.IsType<OkObjectResult>(res);
            var product = Assert.IsType<Product>(okRes.Value);
            Assert.Equal(1, product.ID);
        }
    }
}
