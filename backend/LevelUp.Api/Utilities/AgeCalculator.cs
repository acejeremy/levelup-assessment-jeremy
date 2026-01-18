namespace LevelUp.Api.Utilities;

public static class AgeCalculator
{
    public static int CalculateAge(DateOnly dateOfBirth, DateOnly? today = null)
    {
        var reference = today ?? DateOnly.FromDateTime(DateTime.UtcNow);
        var age = reference.Year - dateOfBirth.Year;
        if (dateOfBirth > reference.AddYears(-age))
        {
            age--;
        }

        return age;
    }
}
