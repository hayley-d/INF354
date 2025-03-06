using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using u21528790_HW01_API.Data;

namespace u21528790_HW01_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private AppDbContext _appDbContext;
        public ProductController(AppDbContext context) {
            _appDbContext = context;
        }

        // GET api/Product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Product>>> GetProducts()
        {
            return await _appDbContext.Products.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _appDbContext.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(product);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _appDbContext.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            else
            {
                _appDbContext.Products.Remove(product);
                await _appDbContext.SaveChangesAsync();
                return NoContent();
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProduct(int id,Models.Product product)
        {
            
            if (id != product.ID)
            {
                return BadRequest();
            }
            else
            {
                _appDbContext.Entry(product).State = EntityState.Modified;
                await _appDbContext.SaveChangesAsync();
                return NoContent();
            }
        }

        [HttpPost]
        public async Task<IActionResult> addProduct([FromBody] Models.Product product)
        {
            if (product == null)
            {
                return BadRequest();
            }

            _appDbContext.Products.Add(product);
            await _appDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProduct), new { id = product.ID }, product);
        }
    }
}
