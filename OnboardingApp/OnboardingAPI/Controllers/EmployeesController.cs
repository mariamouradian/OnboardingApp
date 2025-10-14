using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnboardingAPI.Data;
using OnboardingAPI.Interfaces;
using OnboardingAPI.Models;
using OnboardingAPI.Services;

namespace OnboardingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IExpressService _expressService;
        private readonly ILogger<EmployeesController> _logger; // Добавляем логгер

        public EmployeesController(AppDbContext context, IExpressService expressService, ILogger<EmployeesController> logger)
        {
            _context = context;
            _expressService = expressService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var employees = await _context.Employees
                .Include(e => e.Department)
                .Include(e => e.Tasks)
                .Select(e => new // Используется проекция, чтобы избежать циклических ссылок
                {
                    e.Id,
                    e.FirstName,
                    e.LastName,
                    e.Email,
                    e.Position,
                    e.HireDate,
                    Department = e.Department != null ? new
                    {
                        e.Department.Id,
                        e.Department.Name,
                        e.Department.HRContact
                    } : null,
                    Tasks = e.Tasks.Select(t => new
                    {
                        t.Id,
                        t.Title,
                        t.Description,
                        t.IsCompleted,
                        t.IsSkipped
                    })
                })
                .ToListAsync();

            return Ok(employees);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            // Создаем задачи по умолчанию
            var defaultTasks = DefaultTasksService.GetDefaultTasks(employee.Id, employee.HireDate);
            _context.Tasks.AddRange(defaultTasks);
            await _context.SaveChangesAsync();

            // Отправка уведомления в Express.ms
            try
            {
                await _expressService.SendMessageToChat(
                    "general",
                    $"Новый сотрудник: {employee.FirstName} {employee.LastName}. Создано {defaultTasks.Count} задач onboarding."
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при отправке сообщения в Express.ms");
            }

            return Ok(new
            {
                employee,
                tasksCreated = defaultTasks.Count
            });
        }
    }
}