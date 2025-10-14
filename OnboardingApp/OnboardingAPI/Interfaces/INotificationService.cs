using OnboardingAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OnboardingAPI.Interfaces
{
    /// <summary>
    /// Интерфейс сервиса для работы с уведомлениями системы адаптации
    /// </summary>
    public interface INotificationService
    {
        /// <summary>
        /// Создает новое уведомление в системе
        /// </summary>
        /// <param name="message">Текст уведомления</param>
        /// <param name="employeeId">ID сотрудника (опционально)</param>
        /// <param name="taskId">ID задачи (опционально)</param>
        /// <param name="departmentId">ID подразделения</param>
        /// <param name="type">Тип уведомления</param>
        /// <returns>Task</returns>
        Task CreateNotification(string message, int? employeeId, int? taskId, int departmentId, NotificationType type);

        /// <summary>
        /// Получает список уведомлений для HR-специалистов подразделения
        /// </summary>
        /// <param name="departmentId">ID подразделения</param>
        /// <returns>Список уведомлений</returns>
        Task<List<Notification>> GetNotificationsForHR(int departmentId);

        /// <summary>
        /// Помечает уведомление как прочитанное
        /// </summary>
        /// <param name="notificationId">ID уведомления</param>
        /// <returns>True если успешно, false если уведомление не найдено</returns>
        Task<bool> MarkAsRead(int notificationId);

        /// <summary>
        /// Получает количество непрочитанных уведомлений для подразделения
        /// </summary>
        /// <param name="departmentId">ID подразделения</param>
        /// <returns>Количество непрочитанных уведомлений</returns>
        Task<int> GetUnreadCount(int departmentId);

        /// <summary>
        /// Помечает все уведомления подразделения как прочитанные
        /// </summary>
        /// <param name="departmentId">ID подразделения</param>
        /// <returns>Количество помеченных уведомлений</returns>
        Task<int> MarkAllAsRead(int departmentId);

        /// <summary>
        /// Удаляет уведомление по ID
        /// </summary>
        /// <param name="notificationId">ID уведомления</param>
        /// <returns>True если успешно, false если уведомление не найдено</returns>
        Task<bool> DeleteNotification(int notificationId);

        /// <summary>
        /// Получает уведомление по ID
        /// </summary>
        /// <param name="notificationId">ID уведомления</param>
        /// <returns>Уведомление или null если не найдено</returns>
        Task<Notification?> GetNotificationById(int notificationId);

        /// <summary>
        /// Получает уведомления для конкретного сотрудника
        /// </summary>
        /// <param name="employeeId">ID сотрудника</param>
        /// <returns>Список уведомлений сотрудника</returns>
        Task<List<Notification>> GetNotificationsForEmployee(int employeeId);

        /// <summary>
        /// Получает уведомления по типу для подразделения
        /// </summary>
        /// <param name="departmentId">ID подразделения</param>
        /// <param name="type">Тип уведомления</param>
        /// <returns>Список уведомлений</returns>
        Task<List<Notification>> GetNotificationsByType(int departmentId, NotificationType type);

        /// <summary>
        /// Очищает старые уведомления (старше указанного количества дней)
        /// </summary>
        /// <param name="days">Количество дней</param>
        /// <returns>Количество удаленных уведомлений</returns>
        Task<int> CleanupOldNotifications(int days = 30);
    }
}