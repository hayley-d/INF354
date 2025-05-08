using Microsoft.AspNetCore.Mvc;

namespace Assignment3_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            // TODO: Validate cradentials
            return Ok(/*Auth Token here*/);
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterDto registerDto) { 
            // TODO: Create new user
            return Ok(/* Confirmation message*/);
        }

    }
}
