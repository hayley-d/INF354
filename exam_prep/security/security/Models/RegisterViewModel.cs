namespace security.Models
{
    public class RegisterViewModel
    {
            public string Username { get; set; }           // Required username
            public string Email { get; set; }              // Required email
            public string Password { get; set; }           // Required password
            public string PhoneNumber { get; set; }        // Required phone number (validated below)

    }
}
