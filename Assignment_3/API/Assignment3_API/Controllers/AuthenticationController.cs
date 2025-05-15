
using Assignment3_API.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Assignment3_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IConfiguration _config;

        public AuthenticationController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            IConfiguration config)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
        }


        /// Registers a new user and generates an email confirmation token.
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            // Validates that the model meets required data annotations
            if (!ModelState.IsValid)
                return BadRequest(new
                {
                    success = false,
                    message = "Invalid data submitted.",
                    errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage)
                });

            // Creates a new user entity
            var user = new AppUser
            {
                UserName = model.Username,
                Email = model.Email
            };

            // Attempts to save the user to the database with the given password
            var result = await _userManager.CreateAsync(user, model.Password);

            // If creation failed return an error
            if (!result.Succeeded)
            {
                var errorMessages = result.Errors.Select(e => e.Description);
                return BadRequest(new
                {
                    success = false,
                    message = "Registration failed.",
                    errors = errorMessages
                });
            }

            return Ok(new
            {
                success = true,
                message = "User registered successfully."
            });
        }


        /// Authenticates the user and returns a JWT token.
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            // Validates that the model meets required data annotations
            if (!ModelState.IsValid)
                return BadRequest(new
                {
                    success = false,
                    message = "Invalid data submitted.",
                    errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage)
                });


            // Looks up the user by username
            var user = await _userManager.FindByNameAsync(model.Username);

            // Checks if users is on system and returns the appropreate error if incorrect
            if (user == null)
                return Unauthorized(new { message = "Invalid username or password." });

            // Verifies the password and returns the appropreate error if incorrect
            if (!await _userManager.CheckPasswordAsync(user, model.Password))
                return Unauthorized(new { message = "Invalid username or password." });

            // If checks pass then generate and return a JWT
            var token = GenerateJwtToken(user);

            return Ok(new
            {
                success = true,
                token
            });
        }

        /// Generates a JWT token for the authenticated user.
        private string GenerateJwtToken(AppUser user)
        {
            // Defines claims to embed inside the token
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            // Gets the secret key from appsettings.json to sign the token
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Tokens:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Builds the token with issuer, audience, claims, expiration, and signing credentials
            // Token valid for 2 hours
            var token = new JwtSecurityToken(
                issuer: _config["Tokens:Issuer"],
                audience: _config["Tokens:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
            );

            // Serializes the token to a string
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
