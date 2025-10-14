using Microsoft.EntityFrameworkCore;
using OnboardingAPI.Data;
using OnboardingAPI.Interfaces;
using OnboardingAPI.Services;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Добавляем БД (PostgreSQL)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Регистрируем HttpClient для ExpressService
builder.Services.AddHttpClient();

// Регистрируем сервисы
// builder.Services.AddScoped<IExpressService, ExpressService>(); - открыть если будет использоваться ExpressService.cs
builder.Services.AddScoped<IExpressService, MockExpressService>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<IOnboardingService, OnboardingService>();

// Регистрируем фоновую службу
builder.Services.AddHostedService<BackgroundWorkerService>();

// Добавляем сервисы контроллеров
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true;
    });

// Добавляем настройки CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});


// Добавляем Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

// ВАЖНО: UseCors должен быть ДО UseAuthorization и MapControllers
app.UseCors("AllowAll");

app.UseAuthorization();
app.MapControllers();
app.Run();