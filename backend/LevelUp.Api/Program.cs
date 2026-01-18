using LevelUp.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Controllers + Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<GraduatesDbContext>(options =>
    options.UseInMemoryDatabase("GraduatesDb"));
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

// Swagger UI
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// If HTTPS is giving you trouble, comment this out for now
// app.UseHttpsRedirection();

app.UseCors("AllowFrontend");
app.UseAuthorization();

app.MapControllers();

// Optional: quick test endpoint
app.MapGet("/", () => "API running");

app.Run();
