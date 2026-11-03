using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("User")]
public class User
{
    [Key] //atributos
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int UserId { get; private set; }

    [Required]
    public Guid UserResourceId { get; set; }

    [Column("FirstName")]
    [StringLength(50)]
    public string? FirstName { get; set; }

    [Column("LastName")]
    [StringLength(50)]
    public string? LastName { get; set; }

    [Column("Email")]
    [StringLength(100)]
    public string? Email { get; set; }

    [Column("PhoneNumber")]
    [StringLength(20)]
    public string? PhoneNumber { get; set; }
}
