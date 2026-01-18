namespace LevelUp.Api.Models;

public class Graduate
{
    public Guid GraduateId { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string EmailAddress { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime? DateEdited { get; set; }
    public bool IsDeleted { get; set; }
}
