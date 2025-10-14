using Microsoft.AspNetCore.Mvc;
using OnboardingAPI.Interfaces;
using OnboardingAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OnboardingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // Базовый путь: /api/notifications
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        // Внедрение зависимости сервиса уведомлений через конструктор
        public NotificationsController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        // GET: api/notifications/{departmentId}
        [HttpGet("{departmentId}")]
        public async Task<ActionResult<IEnumerable<Notification>>> GetNotifications(int departmentId)
        {
            try
            {
                // Получаем уведомления для конкретного подразделения через сервис
                var notifications = await _notificationService.GetNotificationsForHR(departmentId);
                return Ok(notifications);
            }
            catch (System.Exception ex)
            {
                // Обработка ошибок
                return StatusCode(500, $"Ошибка при получении уведомлений: {ex.Message}");
            }
        }

        // PUT: api/notifications/mark-as-read/{id}
        [HttpPut("mark-as-read/{id}")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            try
            {
                var result = await _notificationService.MarkAsRead(id);
                if (!result)
                    return NotFound($"Уведомление с ID {id} не найдено");

                return Ok(new { message = "Уведомление помечено как прочитанное" });
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, $"Ошибка при обновлении уведомления: {ex.Message}");
            }
        }

        // GET: api/notifications/unread-count/{departmentId}
        [HttpGet("unread-count/{departmentId}")]
        public async Task<ActionResult<int>> GetUnreadNotificationsCount(int departmentId)
        {
            try
            {
                var notifications = await _notificationService.GetNotificationsForHR(departmentId);
                var unreadCount = notifications.Count(n => !n.IsRead);
                return Ok(unreadCount);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, $"Ошибка при получении количества уведомлений: {ex.Message}");
            }
        }
    }
}