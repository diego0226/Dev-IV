using System;
using System.ComponentModel.DataAnnotations;

namespace StoreBackend.Api.Models.Requests;

public class CreateUserRequestModel
{
    [Required]
    public Guid? UserResourceId { get; set; }

    [Required]
    [MaxLength(50)]
    public string? FirstName { get; set; }

    [Required]
    [MaxLength(50)]
    public string? LastName { get; set; }

    [Required]
    [MaxLength(100)]
    [EmailAddress]
    public string? Email { get; set; }

    [Required]
    [MaxLength(20)]
    [Phone]
    public string? PhoneNumber { get; set; }
}
