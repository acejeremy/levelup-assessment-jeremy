using LevelUp.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace LevelUp.Api.Data;

public class GraduatesDbContext(DbContextOptions<GraduatesDbContext> options) : DbContext(options)
{
    public DbSet<Graduate> Graduates => Set<Graduate>();
}
