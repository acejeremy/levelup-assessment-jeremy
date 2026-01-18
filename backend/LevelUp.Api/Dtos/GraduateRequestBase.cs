using System.ComponentModel.DataAnnotations;
using LevelUp.Api.Utilities;

namespace LevelUp.Api.Dtos;

public abstract class GraduateRequestBase : IValidatableObject
{
    [Required]
    [MaxLength(80)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [MaxLength(80)]
    public string LastName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(200)]
    public string EmailAddress { get; set; } = string.Empty;

    [MaxLength(40)]
    public string? PhoneNumber { get; set; }

    [Required]
    public DateOnly DateOfBirth { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        var age = AgeCalculator.CalculateAge(DateOfBirth);
        if (age < 18)
        {
            yield return new ValidationResult(
                "Graduate must be at least 18 years old.",
                [nameof(DateOfBirth)]
            );
        }
    }
}
