using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using security.Models;
using System.Text.RegularExpressions;
using System.Text;
using Microsoft.AspNetCore.Authorization;
namespace security.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;

        public AuthenticationController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }


        [HttpPost]
        [Route("RegisterUser")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterViewModel model)
        {
            // Check if username already exists
            var existingUser = await _userManager.FindByNameAsync(model.Username);
            if (existingUser != null)
            {
                return Conflict($"An account with username '{model.Username}' already exists."); // 409 Conflict
            }

            // Validate phone number: must be 10 digits and start with 0
            /*if (string.IsNullOrWhiteSpace(model.PhoneNumber) ||
                model.PhoneNumber.Length != 10 ||
                !model.PhoneNumber.All(char.IsDigit) ||
                model.PhoneNumber[0] != '0')
            {
                return BadRequest("Please enter a valid 10-digit phone number starting with 0.");
            }*/


            try
            {
                // Validate Phone number
                string phoneNumberPattern = @"^0\d{9}$";
                bool isValidNumber = Regex.IsMatch(model.PhoneNumber, phoneNumberPattern);
                if (isValidNumber) return BadRequest("Please enter a valid 10-digit phone number");

                // Create the new user
                var user = new IdentityUser
                {
                    Id = Guid.NewGuid().ToString(),
                    UserName = model.Username,
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber
                };

                var result = await _userManager.CreateAsync(user, model.Password);

                if (!result.Succeeded || result.Errors.Count() > 0)
                {
                    StringBuilder errorList = new StringBuilder("The following account registration errors need to be resolved. ");
                    foreach (var error in result.Errors)
                    {
                        errorList.Append($"{error.Code}: {error.Description}");
                    }

                    return BadRequest($"{errorList}");
                }

                // Return success message
                return Ok($"Your account '{model.Username}' was created successfully.");
            }
            catch (Exception ex)
            {
                // Catch unexpected issues (e.g., DB down) and return 500
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while creating the account: {ex.Message}");
            }
        }

        // This endpoint can only be called by users in the "Admin" role
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Authorize(AuthentificationSchemes = "Bearer")]
        [Route("RemoveRoles")]
        public async Task<IActionResult> RemoveRoles(string emailAddress, [FromBody] string[] rolesToRemove)
        {
            // Step 1: Find the user by email
            var user = await _userManager.FindByEmailAsync(emailAddress);
            if (user == null)
            {
                return NotFound($"No user found with email: {emailAddress}");
            }

            // Step 2: Attempt to remove the specified roles
            var result = await _userManager.RemoveFromRolesAsync(user, rolesToRemove);

            if (!result.Succeeded)
            {
                // Step 3: If removal fails, return 400 with all error messages
                var errors = result.Errors.Select(e => e.Description);
                return BadRequest(new { Errors = errors });
            }

            // Step 4: Success — return 200 OK with a confirmation message
            return Ok($"Roles {string.Join(", ", rolesToRemove)} successfully removed.");
        }

    }
}
