using Assignment3_API.Data;
using Assignment3_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Assignment3_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductTypesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductTypesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductType>>> GetProductTypes()
        {
            return await _context.ProductTypes.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductType>> GetProductType(int id)
        {
            var type = await _context.ProductTypes.FindAsync(id);
            if (type == null) return NotFound();
            return type;
        }

        [HttpPost]
        public async Task<ActionResult<ProductType>> PostProductType(ProductType type)
        {
            _context.ProductTypes.Add(type);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProductType), new { id = type.ProductTypeId }, type);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductType(int id, ProductType type)
        {
            if (id != type.ProductTypeId) return BadRequest();
            _context.Entry(type).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductType(int id)
        {
            var type = await _context.ProductTypes.FindAsync(id);
            if (type == null) return NotFound();
            _context.ProductTypes.Remove(type);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
