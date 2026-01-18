namespace LevelUp.Api.Dtos;

public record GraduateResponse(
    Guid GraduateId,
    string FirstName,
    string LastName,
    string EmailAddress,
    string? PhoneNumber,
    DateOnly DateOfBirth,
    int Age,
    DateTime DateCreated,
    DateTime? DateEdited,
    bool IsDeleted
);
