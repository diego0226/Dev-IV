using System;

namespace StoreBackend.Api.Models.Responses;

public class UserResponseModel
{
    public Guid UserResourceId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
}
