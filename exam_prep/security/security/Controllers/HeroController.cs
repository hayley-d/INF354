using Microsoft.AspNetCore.Mvc;

namespace security.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HeroController : Controller
    {
        private readonly IRepository _repository;

        public HeroController(Irepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        [Route("AddHeroWithQuotes")]
        public async Task<IActionResult> AddHeroWithQuotes(HeroViewModel hero)
        {
            var hero = new HeroController
            {
                Firstname = hero.FirstName,
                LastName = hero.LastName,
                Age = hero.Age,
                Quote = hero.Quote
            };

            try
            {
                _repository.Add(hero);
                await _repository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest("Invalid transaction");
            }
            return Ok("Hero saved to the database");
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
