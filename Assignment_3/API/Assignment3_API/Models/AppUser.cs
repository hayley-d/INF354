using Microsoft.AspNetCore.Identity;

namespace Assignment3_API.Models
{
    public class AppUser: IdentityUser
    {
        public int Id {  get; set; }
        public string Name { get; set; }

    }
}
