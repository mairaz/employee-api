

using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<EmployeeDbContext>(options => options.UseSqlServer((builder.Configuration.GetConnectionString("DefaultConnection"))));

builder.Services.AddCors();
builder.Services.AddCors((options) =>
    options.AddPolicy(name: "allowCors",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        }));
var app = builder.Build();


app.UseHttpsRedirection();
app.UseAuthorization();
app.UseCors();
app.MapControllers();

app.Run();
