using Microsoft.EntityFrameworkCore;
using OnboardingAPI.Data;
using OnboardingAPI.Interfaces;
using OnboardingAPI.Models;

namespace OnboardingAPI.Services
{
    public class OnboardingService : IOnboardingService
    {
        private readonly AppDbContext _context;
        private readonly INotificationService _notificationService;
        private readonly ILogger<OnboardingService> _logger;

        public OnboardingService(AppDbContext context, INotificationService notificationService, ILogger<OnboardingService> logger)
        {
            _context = context;
            _notificationService = notificationService;
            _logger = logger;
        }

        public async Task CheckOverdueTasks()
        {
            var now = TimeOnly.FromDateTime(DateTime.Now);
            var today = DateOnly.FromDateTime(DateTime.Now);

            var overdueTasks = await _context.Tasks
                .Include(t => t.Employee!)
                .ThenInclude(e => e.Department!)
                .Where(t => !t.IsCompleted && !t.IsSkipped &&
                           t.EndTime < now &&
                           DateOnly.FromDateTime(t.Employee!.HireDate) <= today) // ← ИЗМЕНИЛИ == на <=
                .ToListAsync();

            foreach (var task in overdueTasks)
            {
                var message = $"Сотрудник {task.Employee!.FirstName} {task.Employee.LastName} " +
                             $"не выполнил задание '{task.Title}' в срок. " +
                             $"Подразделение: {task.Employee.Department!.Name}";

                await _notificationService.CreateNotification(
                    message: message,
                    employeeId: task.EmployeeId,
                    taskId: task.Id,
                    departmentId: task.Employee.DepartmentId,
                    type: NotificationType.TaskOverdue);
            }
        }
    }
}