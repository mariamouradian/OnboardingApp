using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnboardingAPI.Data;
using OnboardingAPI.Models;

namespace OnboardingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        // Получить задачи сотрудника
        [HttpGet("employee/{employeeId}")]
        public async Task<IActionResult> GetEmployeeTasks(int employeeId)
        {
            var tasks = await _context.Tasks
                .Where(t => t.EmployeeId == employeeId)
                .OrderBy(t => t.Order)
                .ToListAsync();

            return Ok(tasks);
        }

        // Добавить новую задачу (для HR)
        [HttpPost]
        public async Task<IActionResult> AddTask([FromBody] OnboardingTask task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return Ok(task);
        }

        // Отметить задачу выполненной
        [HttpPut("{taskId}/complete")]
        public async Task<IActionResult> CompleteTask(int taskId)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            if (task == null) return NotFound();

            task.IsCompleted = true;
            task.IsSkipped = false;
            await _context.SaveChangesAsync();

            return Ok(task);
        }

        // Пропустить задачу
        [HttpPut("{taskId}/skip")]
        public async Task<IActionResult> SkipTask(int taskId)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            if (task == null) return NotFound();
            if (!task.IsSkippable) return BadRequest("Эту задачу нельзя пропустить");

            task.IsSkipped = true;
            task.IsCompleted = false;
            await _context.SaveChangesAsync();

            return Ok(task);
        }

        // Изменить порядок задач
        [HttpPut("reorder")]
        public async Task<IActionResult> ReorderTasks([FromBody] List<int> taskIdsInOrder)
        {
            var tasks = await _context.Tasks
                .Where(t => taskIdsInOrder.Contains(t.Id))
                .ToListAsync();

            for (int i = 0; i < taskIdsInOrder.Count; i++)
            {
                var task = tasks.FirstOrDefault(t => t.Id == taskIdsInOrder[i]);
                if (task != null) task.Order = i + 1;
            }

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}