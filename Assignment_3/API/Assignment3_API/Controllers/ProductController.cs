﻿using Assignment3_API.Data;
using Assignment3_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Assignment3_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// Retrieves all products from the database and maps them to a simplified DTO.
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _context.Products
                .Select(p => new ProductDto
                {
                    ProductId = p.ProductId,
                    Name = p.Name,
                    Description = p.Description,
                    DateCreated = p.DateCreated,
                    Price = p.Price,
                    ProductTypeId = p.ProductTypeId,
                    BrandId = p.BrandId,
                    IsActive = p.IsActive,
                    IsDeleted = p.IsDeleted,
                    BrandName = _context.Brands
                        .Where(b => b.BrandId == p.BrandId)
                        .Select(b => b.Name)
                        .FirstOrDefault(),
                    ProductTypeName = _context.ProductTypes
                        .Where(pt => pt.ProductTypeId == p.ProductTypeId)
                        .Select(pt => pt.Name)
                        .FirstOrDefault()
                })
                .ToListAsync();

            return Ok(products);
        }


        /// Retrieves a single product by ID, including its brand and type navigation properties.
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(p => p.Brand)
                .Include(p => p.ProductType)
                .FirstOrDefaultAsync(p => p.ProductId == id);

            if (product == null) return NotFound();
            return product;
        }

        /// Creates a new product from the submitted ProductCreateDto.
        /// Validates foreign key relationships (brand and type) and returns a response DTO.
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(ProductCreateDto req)
        {
            // Look up associated Brand and ProductType
            var brand = await _context.Brands.FindAsync(req.BrandId);

            var productType = await _context.ProductTypes.FindAsync(req.ProductTypeId);

            if (brand == null || productType == null)
                return BadRequest("Invalid brand or product type.");

            // Create the new Product object
            var product = new Product
            {
                Name = req.Name,
                Description = req.Description,
                Price = req.Price,
                BrandId = req.BrandId,
                ProductTypeId = req.ProductTypeId,
                Image = req.Image,
                DateCreated = DateTime.UtcNow,
                DateModified = DateTime.UtcNow,
                IsActive = true,
                IsDeleted = false,
                Brand = brand,
                ProductType = productType
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            // Construct and return a simplified response DTO
            var response = new ProductResponseDto
            {
                ProductId = product.ProductId,
                Name = product.Name,
                Price = product.Price,
                Description = product.Description,
                Image = product.Image,
                BrandId = product.BrandId,
                BrandName = brand.Name,
                ProductTypeId = product.ProductTypeId,
                ProductTypeName = productType.Name
            };

            return CreatedAtAction(nameof(GetProduct), new { id = product.ProductId }, response);

        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.ProductId) return BadRequest();
            _context.Entry(product).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
