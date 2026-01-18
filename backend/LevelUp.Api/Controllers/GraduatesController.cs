using LevelUp.Api.Data;
using LevelUp.Api.Dtos;
using LevelUp.Api.Models;
using LevelUp.Api.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LevelUp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GraduatesController(GraduatesDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<GraduateResponse>>> GetAll()
    {
        var graduates = await dbContext.Graduates
            .Where(graduate => !graduate.IsDeleted)
            .OrderBy(graduate => graduate.LastName)
            .ThenBy(graduate => graduate.FirstName)
            .ToListAsync();

        var response = graduates.Select(MapGraduate);
        return Ok(response);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<GraduateResponse>> GetById(Guid id)
    {
        var graduate = await dbContext.Graduates
            .FirstOrDefaultAsync(item => item.GraduateId == id && !item.IsDeleted);

        if (graduate is null)
        {
            return NotFound();
        }

        return Ok(MapGraduate(graduate));
    }

    [HttpPost]
    public async Task<ActionResult<GraduateResponse>> Create(CreateGraduateRequest request)
    {
        var now = DateTime.UtcNow;
        var graduate = new Graduate
        {
            GraduateId = Guid.NewGuid(),
            FirstName = request.FirstName.Trim(),
            LastName = request.LastName.Trim(),
            EmailAddress = request.EmailAddress.Trim(),
            PhoneNumber = string.IsNullOrWhiteSpace(request.PhoneNumber) ? null : request.PhoneNumber.Trim(),
            DateOfBirth = request.DateOfBirth,
            DateCreated = now,
            DateEdited = null,
            IsDeleted = false
        };

        dbContext.Graduates.Add(graduate);
        await dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = graduate.GraduateId }, MapGraduate(graduate));
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<GraduateResponse>> Update(Guid id, UpdateGraduateRequest request)
    {
        var graduate = await dbContext.Graduates
            .FirstOrDefaultAsync(item => item.GraduateId == id && !item.IsDeleted);

        if (graduate is null)
        {
            return NotFound();
        }

        graduate.FirstName = request.FirstName.Trim();
        graduate.LastName = request.LastName.Trim();
        graduate.EmailAddress = request.EmailAddress.Trim();
        graduate.PhoneNumber = string.IsNullOrWhiteSpace(request.PhoneNumber) ? null : request.PhoneNumber.Trim();
        graduate.DateOfBirth = request.DateOfBirth;
        graduate.DateEdited = DateTime.UtcNow;

        await dbContext.SaveChangesAsync();

        return Ok(MapGraduate(graduate));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var graduate = await dbContext.Graduates
            .FirstOrDefaultAsync(item => item.GraduateId == id && !item.IsDeleted);

        if (graduate is null)
        {
            return NotFound();
        }

        graduate.IsDeleted = true;
        graduate.DateEdited = DateTime.UtcNow;
        await dbContext.SaveChangesAsync();

        return NoContent();
    }

    private static GraduateResponse MapGraduate(Graduate graduate)
    {
        var age = AgeCalculator.CalculateAge(graduate.DateOfBirth);
        return new GraduateResponse(
            graduate.GraduateId,
            graduate.FirstName,
            graduate.LastName,
            graduate.EmailAddress,
            graduate.PhoneNumber,
            graduate.DateOfBirth,
            age,
            graduate.DateCreated,
            graduate.DateEdited,
            graduate.IsDeleted
        );
    }
}
